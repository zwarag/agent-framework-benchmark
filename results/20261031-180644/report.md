# Pokédex framework benchmark

Run `20261031-180644`, started 2026-10-31T18:06:44.454Z.
3 iteration(s) per cell (framework x rendering mode x tooling); numbers are medians across iterations.
Cells are grouped by rendering mode: compare frameworks within one mode, and one framework across modes.
Lighthouse values are for the home page (`/`): the median of 5 runs, taken per metric, so LCP
and TBT can come from different runs. Each iteration's measure/results.json has all 6 URLs.
Sorted by mode, then total tokens.

## Building the app (agent)

Total tokens = cache reads + uncached input (input and cache writes) + output.

| Framework | Mode | Tooling | Tests | Measured | Total tokens (M) | Cache read (M) | Uncached input (k) | Output (k) | Cost ($) | Time (min) | Turns |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| angular | csr | off | 3/3 | 3/3 | 3.01 | 2.86 | 115 | 42 | 2.29 | 7.1 | 54 |
| angular | csr | on | 3/3 | 3/3 | 4.08 | 3.88 | 133 | 53 | 3.00 | 9.1 | 66 |
| next | csr | on | 3/3 | 3/3 | 4.15 | 3.96 | 137 | 51 | 2.91 | 9.6 | 78 |
| vanilla | csr | off | 3/3 | 3/3 | 4.95 | 4.78 | 136 | 48 | 2.96 | 9.2 | 88 |
| next | csr | off | 3/3 | 3/3 | 5.20 | 5.01 | 134 | 49 | 3.06 | 12.1 | 76 |
| sveltekit | csr | on | 3/3 | 3/3 | 5.24 | 5.07 | 130 | 44 | 2.91 | 9.9 | 77 |
| sveltekit | csr | off | 3/3 | 3/3 | 6.81 | 6.59 | 157 | 53 | 3.75 | 10.9 | 97 |
| next | ssr | on | 3/3 | 3/3 | 3.77 | 3.61 | 119 | 41 | 2.49 | 6.8 | 71 |
| vanilla | ssr | off | 3/3 | 3/3 | 3.90 | 3.73 | 119 | 44 | 2.59 | 7.2 | 66 |
| next | ssr | off | 3/3 | 3/3 | 4.19 | 4.02 | 126 | 43 | 2.67 | 7.5 | 74 |
| sveltekit | ssr | off | 3/3 | 3/3 | 5.04 | 4.87 | 166 | 47 | 2.89 | 7.4 | 75 |
| angular | ssr | on | 3/3 | 3/3 | 5.67 | 5.42 | 158 | 63 | 3.64 | 11.5 | 75 |
| sveltekit | ssr | on | 3/3 | 3/3 | 5.99 | 5.78 | 160 | 46 | 3.38 | 8.6 | 77 |
| angular | ssr | off | 3/3 | 3/3 | 6.55 | 6.34 | 151 | 59 | 3.65 | 10.3 | 81 |

## Page loads (Lighthouse, mobile settings)

| Framework | Mode | Tooling | Mobile perf | LCP (ms) | FCP (ms) | TBT (ms) | CLS | JS (KiB) | A11y |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| angular | csr | off | 95 | 2004 | 1202 | 20 | 0.111 | 84 | 100 |
| angular | csr | on | 95 | 1351 | 1263 | 37 | 0.130 | 82 | 100 |
| next | csr | on | 97 | 1600 | 764 | 26 | 0.111 | 139 | 100 |
| vanilla | csr | off | 97 | 1666 | 759 | 0 | 0.111 | 7 | 100 |
| next | csr | off | 95 | 1606 | 763 | 28 | 0.130 | 139 | 100 |
| sveltekit | csr | on | 99 | 2109 | 1054 | 0 | 0.000 | 38 | 100 |
| sveltekit | csr | off | 99 | 2184 | 1058 | 0 | 0.000 | 44 | 100 |
| next | ssr | on | 100 | 1916 | 782 | 29 | 0.000 | 136 | 100 |
| vanilla | ssr | off | 100 | 782 | 781 | 0 | 0.000 | 1 | 100 |
| next | ssr | off | 100 | 1905 | 779 | 29 | 0.000 | 136 | 100 |
| sveltekit | ssr | off | 100 | 1657 | 1053 | 0 | 0.000 | 36 | 100 |
| angular | ssr | on | 100 | 1614 | 1355 | 16 | 0.000 | 95 | 100 |
| sveltekit | ssr | on | 100 | 1139 | 1054 | 0 | 0.000 | 36 | 100 |
| angular | ssr | off | 99 | 1805 | 1354 | 35 | 0.000 | 97 | 100 |

## Code

Non-blank lines in the app's source files (comments included). Not counted: JSON, lockfiles,
tests, generated files, and verbatim copies of the provided design files.

| Framework | Mode | Tooling | Lines of code |
| --- | --- | --- | ---: |
| angular | csr | off | 1636 |
| angular | csr | on | 1861 |
| next | csr | on | 1581 |
| vanilla | csr | off | 1562 |
| next | csr | off | 1487 |
| sveltekit | csr | on | 1411 |
| sveltekit | csr | off | 1352 |
| next | ssr | on | 1521 |
| vanilla | ssr | off | 1438 |
| next | ssr | off | 1378 |
| sveltekit | ssr | off | 1395 |
| angular | ssr | on | 1905 |
| sveltekit | ssr | on | 1492 |
| angular | ssr | off | 1949 |

## Versions

Direct dependencies of each app, as installed for measurement, and the agent tooling.

- **angular.csr.tools-off-1**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/router@22.2.4`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.csr.tools-off-2**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/router@22.2.4`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.csr.tools-off-3**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/router@22.2.4`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.csr.tools-on-1**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/router@22.2.4`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: MCP @angular/cli@22.2.5; skill angular/skills@2a2b801
  - MCP servers in the session: angular-cli:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.csr.tools-on-2**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/router@22.2.4`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `jsdom@30.1.3`, `prettier@3.9.10`, `typescript@6.0.3`, `vitest@5.0.5`
  - Tooling: MCP @angular/cli@22.2.5; skill angular/skills@2a2b801
  - MCP servers in the session: angular-cli:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.csr.tools-on-3**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/router@22.2.4`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: MCP @angular/cli@22.2.5; skill angular/skills@2a2b801
  - MCP servers in the session: angular-cli:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.ssr.tools-off-1**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/platform-server@22.2.4`, `@angular/router@22.2.4`, `@angular/ssr@22.2.5`, `express@5.3.0`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `@types/express@5.0.6`, `@types/node@22.20.5`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.ssr.tools-off-2**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/platform-server@22.2.4`, `@angular/router@22.2.4`, `@angular/ssr@22.2.5`, `express@5.3.0`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `@types/express@5.0.6`, `@types/node@22.20.5`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.ssr.tools-off-3**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/platform-server@22.2.4`, `@angular/router@22.2.4`, `@angular/ssr@22.2.5`, `express@5.3.0`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `@types/express@5.0.6`, `@types/node@22.20.5`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.ssr.tools-on-1**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/platform-server@22.2.4`, `@angular/router@22.2.4`, `@angular/ssr@22.2.5`, `express@5.3.0`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `@types/express@5.0.6`, `@types/node@22.20.5`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: MCP @angular/cli@22.2.5; skill angular/skills@2a2b801
  - MCP servers in the session: angular-cli:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.ssr.tools-on-2**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/platform-server@22.2.4`, `@angular/router@22.2.4`, `@angular/ssr@22.2.5`, `express@5.3.0`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `@types/express@5.0.6`, `@types/node@22.20.5`, `jsdom@30.1.3`, `prettier@3.9.10`, `typescript@6.0.3`, `vitest@5.0.5`
  - Tooling: MCP @angular/cli@22.2.5; skill angular/skills@2a2b801
  - MCP servers in the session: angular-cli:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **angular.ssr.tools-on-3**: `@angular/common@22.2.4`, `@angular/compiler@22.2.4`, `@angular/core@22.2.4`, `@angular/forms@22.2.4`, `@angular/platform-browser@22.2.4`, `@angular/platform-server@22.2.4`, `@angular/router@22.2.4`, `@angular/ssr@22.2.5`, `express@5.3.0`, `rxjs@7.8.2`, `tslib@2.9.1`, `@angular/build@22.2.5`, `@angular/cli@22.2.5`, `@angular/compiler-cli@22.2.4`, `@types/express@5.0.6`, `@types/node@22.20.5`, `prettier@3.9.10`, `typescript@6.0.3`
  - Tooling: MCP @angular/cli@22.2.5; skill angular/skills@2a2b801
  - MCP servers in the session: angular-cli:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.csr.tools-off-1**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.csr.tools-off-2**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@26.6.6`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@7.0.2`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.csr.tools-off-3**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.csr.tools-on-1**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@24.19.2`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@5.9.3`
  - Tooling: MCP next-devtools-mcp@0.4.0; skill vercel/next.js@fac5fc8 (--skill next-dev-loop)
  - MCP servers in the session: next-devtools:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.csr.tools-on-2**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@26.6.6`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@5.9.3`
  - Tooling: MCP next-devtools-mcp@0.4.0; skill vercel/next.js@fac5fc8 (--skill next-dev-loop)
  - MCP servers in the session: next-devtools:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.csr.tools-on-3**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`
  - Tooling: MCP next-devtools-mcp@0.4.0; skill vercel/next.js@3bccd4d (--skill next-dev-loop)
  - MCP servers in the session: next-devtools:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.ssr.tools-off-1**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.ssr.tools-off-2**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@26.6.6`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@7.0.2`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.ssr.tools-off-3**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@24.19.2`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@5.9.3`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.ssr.tools-on-1**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `server-only@0.0.1`, `@types/node@26.6.6`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@6.0.3`
  - Tooling: MCP next-devtools-mcp@0.4.0; skill vercel/next.js@fac5fc8 (--skill next-dev-loop)
  - MCP servers in the session: next-devtools:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.ssr.tools-on-2**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@24.19.2`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@5.9.3`
  - Tooling: MCP next-devtools-mcp@0.4.0; skill vercel/next.js@fac5fc8 (--skill next-dev-loop)
  - MCP servers in the session: next-devtools:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **next.ssr.tools-on-3**: `next@16.4.3`, `react@19.3.1`, `react-dom@19.3.1`, `@types/node@26.6.6`, `@types/react@19.3.0`, `@types/react-dom@19.3.0`, `typescript@7.0.2`
  - Tooling: MCP next-devtools-mcp@0.4.0; skill vercel/next.js@3bccd4d (--skill next-dev-loop)
  - MCP servers in the session: next-devtools:connected
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.csr.tools-off-1**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.csr.tools-off-2**: `@sveltejs/adapter-static@4.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `svelte@5.57.3`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.csr.tools-off-3**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `svelte@5.57.3`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.csr.tools-on-1**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `svelte-check@4.7.7`, `typescript@6.0.3`, `vite@8.3.5`
  - Tooling: plugin svelte@svelte@75a688c (@sveltejs/mcp@0.1.28)
  - MCP servers in the session: plugin:svelte:svelte:pending
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.csr.tools-on-2**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `svelte@5.57.3`, `vite@8.3.5`
  - Tooling: plugin svelte@svelte@75a688c (@sveltejs/mcp@0.1.28)
  - MCP servers in the session: plugin:svelte:svelte:pending
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.csr.tools-on-3**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `svelte-check@4.7.7`, `typescript@6.0.3`, `vite@8.3.5`
  - Tooling: plugin svelte@svelte@75a688c (@sveltejs/mcp@0.1.28)
  - MCP servers in the session: plugin:svelte:svelte:pending
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.ssr.tools-off-1**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `svelte@5.57.3`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.ssr.tools-off-2**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `svelte@5.57.3`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.ssr.tools-off-3**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `svelte-check@4.7.7`, `typescript@6.0.3`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.ssr.tools-on-1**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `svelte-check@4.7.7`, `typescript@6.0.3`, `vite@8.3.5`
  - Tooling: plugin svelte@svelte@75a688c (@sveltejs/mcp@0.1.28)
  - MCP servers in the session: plugin:svelte:svelte:pending
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.ssr.tools-on-2**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `svelte-check@4.7.7`, `typescript@6.0.3`, `vite@8.3.5`
  - Tooling: plugin svelte@svelte@75a688c (@sveltejs/mcp@0.1.28)
  - MCP servers in the session: plugin:svelte:svelte:pending
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **sveltekit.ssr.tools-on-3**: `@sveltejs/adapter-node@6.0.1`, `@sveltejs/kit@3.1.1`, `@sveltejs/vite-plugin-svelte@7.3.1`, `@types/node@24.19.2`, `svelte@5.57.3`, `svelte-check@4.7.7`, `typescript@6.0.3`, `vite@8.3.5`
  - Tooling: plugin svelte@svelte@75a688c (@sveltejs/mcp@0.1.28)
  - MCP servers in the session: plugin:svelte:svelte:pending
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **vanilla.csr.tools-off-1**: `typescript@7.0.2`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **vanilla.csr.tools-off-2**: `typescript@7.0.2`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **vanilla.csr.tools-off-3**: `typescript@7.0.2`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **vanilla.ssr.tools-off-1**: `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **vanilla.ssr.tools-off-2**: `@types/node@24.19.2`, `typescript@7.0.2`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2
- **vanilla.ssr.tools-off-3**: `@types/node@24.19.2`, `typescript@7.0.2`, `vite@8.3.5`
  - Tooling: none
  - MCP servers in the session: none
  - Node v24.22.1, npm 11.19.1, Claude Code 2.1.310 (Claude Code), agent-browser agent-browser 0.39.2

## Iterations

| Iteration | Claude Code | Model | Node | Final tests | Problems |
| --- | --- | --- | --- | --- | --- |
| angular.csr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.csr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.csr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.csr.tools-on-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.csr.tools-on-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.csr.tools-on-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.ssr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.ssr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.ssr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.ssr.tools-on-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.ssr.tools-on-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| angular.ssr.tools-on-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.csr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.csr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.csr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.csr.tools-on-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.csr.tools-on-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.csr.tools-on-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.ssr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.ssr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.ssr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.ssr.tools-on-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.ssr.tools-on-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| next.ssr.tools-on-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.csr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.csr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.csr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.csr.tools-on-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.csr.tools-on-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.csr.tools-on-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.ssr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.ssr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.ssr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.ssr.tools-on-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.ssr.tools-on-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| sveltekit.ssr.tools-on-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| vanilla.csr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| vanilla.csr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| vanilla.csr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| vanilla.ssr.tools-off-1 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| vanilla.ssr.tools-off-2 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
| vanilla.ssr.tools-off-3 | 2.1.310 (Claude Code) | claude-opus-5-5 (high) | v24.22.1 | pass | — |
