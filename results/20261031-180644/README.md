# Pilot run 20261031-180644

4 frameworks (Angular, Next.js, SvelteKit, vanilla) × rendering mode (`ssr`, `csr`) × official AI tooling (`on`, `off`) = 14 cells, 3 iterations each, 42 builds. Then every app got 4 change requests from `maintenance/`, each implemented by a fresh agent session: 168 maintenance sessions. Claude Code 2.1.310, `claude-opus-5-5`, effort `high`, harness commit `1944760` (build) and `2983a4e` (maintenance).

With 3 iterations per cell this is a pilot: read it as tendencies, not a ranking. The per-run spread was about ±34 % for builds and ±13 % for maintenance, so detecting a 20 % difference with 80 % power would take about 42 builds or 7 maintenance runs per cell.

## Build: total tokens (M), median of 3

| | SSR, tooling on | SSR, off | CSR, on | CSR, off |
| --- | ---: | ---: | ---: | ---: |
| Angular | 5.67 | 6.55 | 4.08 | 3.01 |
| Next.js | 3.77 | 4.19 | 4.15 | 5.20 |
| SvelteKit | 5.99 | 5.04 | 5.24 | 6.81 |
| vanilla | — | 3.90 | — | 4.95 |

## Maintenance: total tokens for all 4 changes (M), sum of medians

| | SSR, tooling on | SSR, off | CSR, on | CSR, off |
| --- | ---: | ---: | ---: | ---: |
| Angular | 0.89 | 0.95 | 0.92 | 0.73 |
| Next.js | 0.69 | 0.79 | 0.80 | 0.78 |
| SvelteKit | 0.88 | 0.61 | 0.74 | 0.69 |
| vanilla | — | 0.87 | — | 0.85 |

## Observations

- All 42 builds passed, as did all 168 maintenance sessions with every earlier test re-run.
- Two builds (`next.csr.tools-on-1`, `angular.csr.tools-on-2`) first failed on a test that read `<select>` options before CSR apps had loaded them. That was a harness bug. After the fix (`7097221`) both apps passed 3 times out of 3 and were re-measured, and their `run-info.txt` keeps `final_test_exit_original=1`.
- Angular is not consistently the most expensive framework once the rendering mode is fixed and the tests run under a non-`localhost` hostname. Angular with CSR was the cheapest build cell.
- Whether SSR or CSR is cheaper to build depends on the framework.
- CSR costs page-load quality: CLS 0.11–0.17 versus 0 with SSR, and mobile performance 93–99 versus 99–100.
- Agents rarely used the official MCPs and skills (0–5 calls per run, Next.js never). No consistent tooling effect is visible.
- Maintenance costs roughly 1/5 to 1/8 of a build, and the spread between frameworks is small (0.61–0.95 M).

Full tables: `report.md` (build, Lighthouse, lines of code) and `maintenance.md` (per change: passed, tokens, minutes, changed lines).
