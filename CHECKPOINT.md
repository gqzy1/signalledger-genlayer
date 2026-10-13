# FAST-1 checkpoint — 2026-10-13

| Check actually executed | Result |
|---|---|
| Vitest | PASS: 30 cases, 2 files |
| TypeScript + Vite production build | PASS |
| Official full contract copy and manifest SHA256 | PASS |
| npm audit --omit=dev | PASS: 0 reported vulnerabilities |
| Wrong network/account, wallet rejection, source mismatch, receipt proof requirements | PASS in explicit unit test doubles |
| Stable RPC source schema preflight | PASS, no transaction |
| Browser visual QA and mobile rendering | NOT RUN: cloud browser cannot reach this container's loopback; local Chromium missing, attempted official download invalid. Bounded attempts stopped. |
| Real wallet connection/signing and live contract read/write E2E | NOT RUN |
| GitHub Pages publication | NOT RUN; workflow is manual only |
| Portal submission | NOT RUN |

Tests use explicit doubles only within tests/. Production code does not provide synthetic monitor states or claim a deployed contract. The initial manifest address is null and liveValidation is NOT RUN.

The build has a nonblocking SDK bundle-size warning (approximately 727 kB minified / 177 kB gzip). No paid dependency or remote backend is required. The final build passed including test TypeScript; no test was skipped.

The browser environment is the remaining UI-verification limitation. No known failing code test remains. Genuine LLM consensus and wallet behavior remain to be measured in LIVE_ACCEPTANCE.md after approval. No pre-existing user repository was changed.
