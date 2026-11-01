#!/usr/bin/env bash
# Container entrypoint for one maintenance step: restores an agent's app, applies change
# requests 1..STEP-1 as already done, adds change STEP to SPEC.md and its test, and lets a fresh
# Claude Code session implement it. Started by bench/maintain.mjs.
#
# Mounts: /in/app (the app before this step, read-only), /in/changes (maintenance/), /out.
# Env: FRAMEWORK, RENDER_MODE, TOOLING, STEP, PROMPT, MODEL, EFFORT, and the credential.
set -euo pipefail

: "${FRAMEWORK:?}" "${RENDER_MODE:?}" "${TOOLING:?}" "${STEP:?}" "${PROMPT:?}" "${MODEL:?}" "${EFFORT:?}"
export RENDER_MODE
OUT=/out
WORK=/home/agent/work
mkdir -p "$OUT"
cd "$WORK"
git config user.name bench
git config user.email bench@localhost
printf '%s\n' node_modules/ dist/ build/ .output/ .next/ .nuxt/ .svelte-kit/ .angular/ .vercel/ .vinxi/ '*.tsbuildinfo' >> .git/info/exclude

if [ "$TOOLING" = on ]; then
  /home/agent/setup-tooling.sh "$FRAMEWORK" /home/agent/mcp.json "$OUT/tooling-versions.json" > "$OUT/tooling.log" 2>&1
else
  echo '{ "mcpServers": {} }' > /home/agent/mcp.json
  echo '[]' > "$OUT/tooling-versions.json"
fi

rm -rf app
cp -r /in/app app
for ((j = 1; j < STEP; j++)); do
  printf '\n' >> SPEC.md
  cat "/in/changes/m$j/CHANGE.md" >> SPEC.md
  cp "/in/changes/m$j/maint-$j.spec.mjs" tests/specs/
done
git add -A
git commit -qm "App after change $((STEP - 1))"
printf '\n' >> SPEC.md
cat "/in/changes/m$STEP/CHANGE.md" >> SPEC.md
cp "/in/changes/m$STEP/maint-$STEP.spec.mjs" tests/specs/

{
  echo "framework=$FRAMEWORK"
  echo "render_mode=$RENDER_MODE"
  echo "tooling=$TOOLING"
  echo "step=$STEP"
  echo "prompt=$PROMPT"
  echo "model=$MODEL"
  echo "effort=$EFFORT"
  echo "claude_code=$(claude --version)"
  echo "started=$(date -u +%FT%TZ)"
} > "$OUT/run-info.txt"

STRICT_MCP=(--strict-mcp-config)
if [ "$FRAMEWORK" = sveltekit ] && [ "$TOOLING" = on ]; then STRICT_MCP=(); fi
set +e
claude -p "$PROMPT" \
  --model "$MODEL" --effort "$EFFORT" \
  --mcp-config /home/agent/mcp.json "${STRICT_MCP[@]}" \
  --dangerously-skip-permissions \
  --output-format stream-json --verbose \
  > "$OUT/transcript.jsonl" 2> "$OUT/claude-stderr.log"
echo "claude_exit=$?" >> "$OUT/run-info.txt"
set -e
echo "finished=$(date -u +%FT%TZ)" >> "$OUT/run-info.txt"

git add -A app
echo "app_diff=$(git diff --cached --shortstat -- app ':!app/package-lock.json' | sed 's/^ *//')" >> "$OUT/run-info.txt"
tar --exclude=node_modules --exclude=.angular --exclude=.next --exclude=.svelte-kit --exclude=.nuxt --exclude=.output --exclude=.vinxi -czf "$OUT/app.tar.gz" -C "$WORK" app
