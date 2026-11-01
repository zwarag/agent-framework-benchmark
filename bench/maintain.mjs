#!/usr/bin/env node
// Maintenance phase: gives every app of a finished run the change requests in maintenance/,
// one after another, each to a fresh agent session working on the previous step's app.
//
//   node bench/maintain.mjs runs/<id> [--steps=1,2,3,4] [--pick=1] [--cells=a,b] [--model=ID] [--effort=LEVEL]
//
// --pick=N keeps the first N passing iterations of each cell (default all). Steps run
// step-major (step 1 for every app, then step 2, ...), so drift spreads across cells. A step
// whose agent already finished is skipped, so the command can be re-run to resume. Results go to
// <iteration>/maint-<k>/ and <runDir>/maintenance.md.

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FRAMEWORKS, parseCell } from './frameworks.mjs';
import { readRunInfo } from './report.mjs';
import { summarizeTranscript } from './tokens.mjs';

const BENCH = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(BENCH, '..');
const CHANGES = path.join(ROOT, 'maintenance');
const STEP_NAMES = fs.readdirSync(CHANGES).filter((d) => /^m\d+$/.test(d)).sort();

const args = process.argv.slice(2);
const runDirArg = args.find((a) => !a.startsWith('--'));
if (!runDirArg) {
  console.error('Usage: maintain.mjs runs/<id> [--steps=1,2,3,4] [--pick=N] [--cells=a,b]');
  process.exit(1);
}
const opt = (key) => args.find((a) => a.startsWith(`--${key}=`))?.split('=')[1];
const runDir = path.resolve(runDirArg);
const steps = (opt('steps') ?? STEP_NAMES.map((s) => s.slice(1)).join(',')).split(',').map(Number);
const pick = Number(opt('pick') ?? Infinity);
const cellFilter = opt('cells')?.split(',');
const reportOnly = args.includes('--report-only');
const config = JSON.parse(fs.readFileSync(path.join(runDir, 'config.json'), 'utf8'));
const model = opt('model') ?? config.model;
const effort = opt('effort') ?? config.effort;
const containerArgs = ['--userns=keep-id:uid=1000,gid=1000', `--cpus=${config.cpus ?? 4}`, `--memory=${config.memory ?? '8g'}`];
const blockPokeapi = ['--add-host=pokeapi.co:127.0.0.1', '--add-host=www.pokeapi.co:127.0.0.1'];
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

const changeTitle = (k) => fs.readFileSync(path.join(CHANGES, `m${k}/CHANGE.md`), 'utf8').match(/^## (.+)$/m)[1];
const prompt = (label, mode, k) =>
  `The app in app/ implements SPEC.md using ${label}, with ${mode === 'ssr' ? 'server-side' : 'client-side'} rendering ` +
  `(rendering mode \`${mode}\`). SPEC.md has a new section at the end, "${changeTitle(k)}", and ` +
  `tests/specs/maint-${k}.spec.mjs tests it. Implement that change in the existing app. ` +
  'Work autonomously until `npm test` passes.';

function iterations() {
  const byCell = new Map();
  for (const d of fs.readdirSync(runDir, { withFileTypes: true })) {
    if (!d.isDirectory() || !/-\d+$/.test(d.name)) continue;
    const key = d.name.replace(/-\d+$/, '');
    const cell = parseCell(key);
    if (!cell || (cellFilter && !cellFilter.includes(key))) continue;
    const dir = path.join(runDir, d.name);
    if (readRunInfo(path.join(dir, 'agent/run-info.txt')).final_test_exit !== '0') continue;
    if (!byCell.has(key)) byCell.set(key, []);
    byCell.get(key).push({ dir, cell, n: Number(d.name.match(/-(\d+)$/)[1]) });
  }
  return [...byCell.values()].flatMap((its) => its.sort((a, b) => a.n - b.n).slice(0, pick));
}

function credentialName() {
  for (const name of ['ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN']) if (process.env[name]) return name;
  throw new Error('No Claude credentials: set ANTHROPIC_API_KEY, or CLAUDE_CODE_OAUTH_TOKEN from `claude setup-token`');
}

function runLogged(cmd, cmdArgs, logFile, env) {
  return new Promise((resolve) => {
    const out = fs.openSync(logFile, 'a');
    const child = spawn(cmd, cmdArgs, { stdio: ['ignore', out, out], env });
    child.on('exit', (code) => {
      fs.closeSync(out);
      resolve(code ?? 1);
    });
  });
}

function unpackApp(tarball, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  const r = spawnSync('tar', ['-xzf', tarball, '-C', dest]);
  if (r.status !== 0) throw new Error(`tar failed for ${tarball}`);
}

function previousApp(it, k) {
  if (k === 1) {
    const base = path.join(it.dir, 'maint-0');
    if (!fs.existsSync(path.join(base, 'app/package.json'))) unpackApp(path.join(it.dir, 'agent/repo.tar.gz'), base);
    return path.join(base, 'app');
  }
  const prev = path.join(it.dir, `maint-${k - 1}`);
  const unpacked = path.join(prev, 'app-out');
  if (!fs.existsSync(unpacked)) unpackApp(path.join(prev, 'agent/app.tar.gz'), unpacked);
  return path.join(unpacked, 'app');
}

function hitUsageLimit(transcript) {
  if (!fs.existsSync(transcript)) return false;
  const lines = fs.readFileSync(transcript, 'utf8').trim().split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const e = JSON.parse(lines[i]);
      if (e.type === 'result') return Boolean(e.is_error) && /usage limit|rate limit|limit reached|quota/i.test(String(e.result ?? ''));
    } catch {}
  }
  return false;
}

async function runStep(it, k, credential) {
  const stepDir = path.join(it.dir, `maint-${k}`);
  const agentOut = path.join(stepDir, 'agent');
  if (fs.existsSync(path.join(agentOut, 'app.tar.gz'))) return 'done';
  const before = previousApp(it, k);
  if (!fs.existsSync(path.join(before, 'package.json'))) return 'no-app';
  fs.rmSync(stepDir, { recursive: true, force: true });
  fs.mkdirSync(agentOut, { recursive: true });
  const name = `pokedex-maint-${path.basename(it.dir)}-${k}`.replace(/\./g, '_');
  const env = {
    ...process.env,
    FRAMEWORK: it.cell.framework,
    RENDER_MODE: it.cell.mode,
    TOOLING: it.cell.tooling,
    STEP: String(k),
    PROMPT: prompt(FRAMEWORKS[it.cell.framework].label, it.cell.mode, k),
    MODEL: model,
    EFFORT: effort,
  };
  log(`Maint start: ${path.basename(it.dir)} step ${k}`);
  await runLogged(
    'podman',
    [
      'run', '--rm', '--name', name, '--replace', ...containerArgs, ...blockPokeapi,
      '-v', `${before}:/in/app:ro,Z`, '-v', `${CHANGES}:/in/changes:ro,Z`, '-v', `${agentOut}:/out:Z`,
      '-e', 'FRAMEWORK', '-e', 'RENDER_MODE', '-e', 'TOOLING', '-e', 'STEP', '-e', 'PROMPT', '-e', 'MODEL', '-e', 'EFFORT', '-e', credential,
      '--entrypoint', '/home/agent/run-maintenance.sh', 'pokedex-agent',
    ],
    path.join(stepDir, 'container.log'),
    env,
  );
  if (hitUsageLimit(path.join(agentOut, 'transcript.jsonl'))) {
    fs.writeFileSync(path.join(stepDir, 'USAGE_LIMIT'), 'exclude this step\n');
    fs.rmSync(path.join(agentOut, 'app.tar.gz'), { force: true });
    return 'limit';
  }
  if (!fs.existsSync(path.join(agentOut, 'app.tar.gz'))) return 'no-output';

  const after = path.join(stepDir, 'app-out');
  unpackApp(path.join(agentOut, 'app.tar.gz'), after);
  const specs = Array.from({ length: k }, (_, j) => `/in/changes/m${j + 1}/maint-${j + 1}.spec.mjs`).join(' ');
  const code = await runLogged(
    'podman',
    [
      'run', '--rm', ...containerArgs, ...blockPokeapi, '-e', `RENDER_MODE=${it.cell.mode}`,
      '-v', `${path.join(after, 'app')}:/src:ro,Z`, '-v', `${CHANGES}:/in/changes:ro,Z`, 'pokedex-base',
      'bash', '-c', `cp -r /src app && cp ${specs} tests/specs/ && npm test`,
    ],
    path.join(agentOut, 'final-test.log'),
    process.env,
  );
  fs.appendFileSync(path.join(agentOut, 'run-info.txt'), `final_test_exit=${code}\n`);
  log(`Maint done:  ${path.basename(it.dir)} step ${k} (${code === 0 ? 'pass' : `fail, exit ${code}`})`);
  return code === 0 ? 'pass' : 'fail';
}

const median = (xs) => {
  const s = xs.filter((x) => typeof x === 'number').sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const fmt = (x, d = 0, scale = 1) => (x === null ? '—' : (x * scale).toFixed(d));

function writeReport() {
  const rows = new Map();
  for (const it of iterations()) {
    const key = path.basename(it.dir).replace(/-\d+$/, '');
    if (!rows.has(key)) rows.set(key, { cell: it.cell, steps: new Map() });
    for (const k of STEP_NAMES.map((s) => Number(s.slice(1)))) {
      const agentOut = path.join(it.dir, `maint-${k}/agent`);
      const info = readRunInfo(path.join(agentOut, 'run-info.txt'));
      if (!info.final_test_exit) continue;
      let summary = null;
      try {
        summary = summarizeTranscript(path.join(agentOut, 'transcript.jsonl'));
      } catch {}
      const changed = Number(info.app_diff?.match(/(\d+) insertion/)?.[1] ?? 0) + Number(info.app_diff?.match(/(\d+) deletion/)?.[1] ?? 0);
      if (!rows.get(key).steps.has(k)) rows.get(key).steps.set(k, []);
      rows.get(key).steps.get(k).push({ pass: info.final_test_exit === '0', tokens: summary?.tokens.total ?? null, cost: summary?.costUSD ?? null, min: summary ? summary.wallMs / 60000 : null, changed });
    }
  }
  const stepKeys = STEP_NAMES.map((s) => Number(s.slice(1)));
  const lines = [
    '# Maintenance phase',
    '',
    `Run \`${path.basename(runDir)}\`. Each change goes to a fresh agent session working on the app left by the previous step.`,
    'Per step: tests passed / apps, median total tokens (M), median minutes, median changed lines in app/.',
    'Total = sum over steps of the medians.',
    '',
    `| Framework | Mode | Tooling | ${stepKeys.map((k) => `Change ${k}`).join(' | ')} | Total tokens (M) | Total cost ($) |`,
    `| --- | --- | --- | ${stepKeys.map(() => '---:').join(' | ')} | ---: | ---: |`,
  ];
  const sorted = [...rows.values()].sort((a, b) => a.cell.mode.localeCompare(b.cell.mode) || a.cell.framework.localeCompare(b.cell.framework) || a.cell.tooling.localeCompare(b.cell.tooling));
  for (const { cell, steps: s } of sorted) {
    let tokens = 0;
    let cost = 0;
    const cols = stepKeys.map((k) => {
      const xs = s.get(k) ?? [];
      if (!xs.length) return '—';
      const t = median(xs.map((x) => x.tokens));
      tokens += t ?? 0;
      cost += median(xs.map((x) => x.cost)) ?? 0;
      return `${xs.filter((x) => x.pass).length}/${xs.length} · ${fmt(t, 2, 1e-6)} · ${fmt(median(xs.map((x) => x.min)), 1)} · ${fmt(median(xs.map((x) => x.changed)))}`;
    });
    lines.push(`| ${cell.framework} | ${cell.mode} | ${cell.tooling} | ${cols.join(' | ')} | ${(tokens / 1e6).toFixed(2)} | ${cost.toFixed(2)} |`);
  }
  fs.writeFileSync(path.join(runDir, 'maintenance.md'), `${lines.join('\n')}\n`);
  log(`Report: ${path.join(runDir, 'maintenance.md')}`);
}

async function main() {
  if (reportOnly) return writeReport();
  const credential = credentialName();
  const its = iterations();
  log(`Maintenance: ${its.length} apps x steps ${steps.join(',')} (model ${model}, effort ${effort})`);
  for (const k of steps) {
    for (const it of its) {
      if (fs.existsSync(path.join(runDir, 'STOP'))) {
        log('STOP file found; no more agents start');
        return writeReport();
      }
      const result = await runStep(it, k, credential);
      if (result === 'limit') {
        fs.writeFileSync(path.join(runDir, 'STOP'), `usage limit hit in ${path.basename(it.dir)} step ${k}\n`);
        log(`Usage limit hit in ${path.basename(it.dir)} step ${k}; stopping`);
        return writeReport();
      }
    }
  }
  writeReport();
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
