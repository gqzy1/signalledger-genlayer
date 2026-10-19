# SignalLedger frontend read remediation

Scope: frontend/configuration only. No contract source edits, deployment, transaction, signature, write method, merge, Pages publication or Portal submission.

## Verified baselines

Authenticated GitHub account: `gqzy1` (ID 155161534).

- Projects main: `dddaea896ec39e636d36795fc5cc566d13f38650`.
- Projects security candidate / Draft PR #2: `a6d103828c2cb8140a1b24a6377fb8971b45fd9e`, OPEN/DRAFT.
- Contracts main: `7b3bdb2ea856473a4d7722b492dd17fd2fe60189`.
- Contracts candidate: `65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873`.
- This change is based on the Projects security candidate. Its PR targets that branch so the remediation diff contains no contract changes; neither existing candidate branch is updated.
- Live site: https://gqzy1.github.io/signalledger-genlayer/ returned HTTP 200. Response Date: 2026-10-19 00:47:19 GMT. HTML Last-Modified: 2026-10-13 10:32:35 GMT.
- Released JS: `assets/index-h-nLNUaO.js`, SHA256 `554fd4db62eeda09ef404eedc9a67f0da25ac68c43150372e3938e3317797798`.
- Released JS contains the old `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247` address, old source hash, and bare-ID read path. The supplied new address is absent.
- Fixed network configuration is already correct: Stable Studionet 61999, `https://studio.genlayer.com/api`.

The user supplied the deployed address `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`, owner `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc`, monitor `cf-peering-20261018`, and successful Studio count/monitor/record results. These are explicitly identified as user-confirmed evidence, not newly produced transaction evidence.

## Findings and causal limits

1. **Confirmed release/configuration drift.** The released app defaults to the historical contract, historical monitor, and historical expected source SHA256. Entering the new address in that app cannot pass the old source-hash pin when its code matches the owner-scoped candidate. Changing only the address is insufficient.
2. **Confirmed read-interface mismatch in the released app.** New `get_monitor(monitor_ref)` and `get_record(monitor_ref, revision)` require one owner-qualified string, with integer revision as the second positional argument for records. The released app forwards a bare ID unchanged. The candidate adds reference handling, but its example still resolves a bare ID through the connected wallet before the configured example owner. That can select the wrong namespace when another wallet is connected.
3. **JSON decoding is not established as the original cause.** Pinned `genlayer-js` 1.1.8 encodes positional arguments into calldata/RLP, uses JSON-RPC POST `gen_call` with `type: read` and `latest-final`, then decodes calldata into a string. Contract monitor/record methods return JSON strings. One JSON.parse is correct. No SDK upgrade, return-envelope workaround, double JSON decoding, or block-tag substitution is justified.
4. **Initial state was already valid.** The original monitor parser accepts UNKNOWN/revision 0. Its history loop performs no get_record call at revision 0. These are not failures; regression tests now lock in this behavior.
5. **Confirmed UI error-state weakness.** The task wrapper previously retained the last error while later work ran, and load() could update monitor state before a history read failed. Some successful internal refreshes did not replace earlier read messages. Clearing the message when work starts and committing a complete monitor/history result together removes that ambiguity.
6. **Exact reported error provenance remains unproven.** The literal `Error getting the contract state` is not hardcoded in the app or the pinned SDK. It can arrive from an RPC error/status and be propagated by the SDK. No original failing request, response, or console capture was supplied. The confirmed integration defects must not be presented as proof of the exact backend cause of that earlier message. A stale notification can coexist with successful reads. Offline tests cover this exact returned error and its subsequent replacement by a successful load.

## Changes

| File | Change |
|---|---|
| deployment.json | New supplied address/owner/example; expected candidate source hash; user-reported evidence labels; preserve historical deployment and six archived transaction hashes without attributing them to the new address. |
| src/client.ts | Keep chain/source verification, remove the obsolete pending-deployment block, and add method/arguments/address context while preserving read-error cause/details. |
| src/domain.ts | Share owner-reference resolution; validate JSON strings and all fields needed for rendering; accept UNKNOWN/zero counters/empty timestamps. |
| src/monitor.ts | Load an owner-qualified finalized monitor and at most ten records; no revision-zero request; return a complete result before UI commit. |
| src/main.tsx | Bind the public example explicitly to its configured owner, reset stale notifications, commit monitor/history together, and clearly label old transactions. |
| tests/reads.test.ts | 18 offline regressions using actual pinned SDK calldata encoding/decoding with HTTP interception. |
| scripts/offline-read-smoke.mjs | Optional production-bundle DOM smoke check with synthetic fixtures and HTTP interception. |
| FRONTEND_READ_REMEDIATION_REPORT.md | Findings, verification, limitations and release disposition. |

The included intelligent-contract source is unchanged from the candidate, SHA256 `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`. This is the expected repository hash, not a new claim of independently captured deployed-source proof. Runtime binding still hashes fetched deployed bytes and rejects a mismatch before enabling the product.

## Verification

- `npm run check:source`: PASS.
- `npm test`: **54/54 PASS**, 3 files (29 domain + 7 client + 18 new read regressions). Existing write-helper tests use a mocked SDK and never send transactions.
- `npm run build`: PASS (TypeScript and Vite). Existing large-chunk advisory remains; no dependency changes.
- Offline production-bundle DOM smoke: PASS, zero page errors. UNKNOWN/revision 0/checks 0 renders; history remains empty; guest check button is disabled; injected RPC error displays method and target; a successful retry replaces the error. All HTTP is intercepted. This is a jsdom functional check, not a real-browser visual or live-chain acceptance claim. The harness adapts the ESM boot wrapper for evaluation; application logic is unmodified.
- Source and CSS unchanged: released and rebuilt CSS SHA256 both `c8b4ab1f9a5a4ffb835487deb7cd675bbaa910e15cdfc29d4e7ee75efd40537d`.
- `git diff --check`: PASS.

Reproduce the required checks with `npm ci && npm run check:source && npm test && npm run build`. Do not run `npm run preflight` as part of this offline verification; that script accesses the live network. The optional DOM check uses jsdom 30.1.2 supplied by the execution environment: `SIGNALLEDGER_JSDOM_MODULE=/absolute/path/to/jsdom node scripts/offline-read-smoke.mjs`. It does not add a product dependency.

### Test-isolation incident

The first attempt incorrectly spied on the exposed reader.request while SDK contract actions retained an internal client closure. As a result, several real read-only get_monitor/get_record requests and the binding read path escaped the intended mocks. The test output returned the already-confirmed OPERATIONAL/revision 1/checks 1 monitor and record. The exact external request count was not instrumented. This unintentionally repeated completed reads and violated the requested no-repeat boundary; it was disclosed and stopped. No write method, signature or transaction was invoked. The final test harness intercepts fetch itself and blocks unmocked requests before any HTTP can occur. Final PASS results above are from that isolated harness; the initial failed run is not counted as passing evidence.

## Release disposition

**A new frontend release is required.** The current public site remains the old release. This work prepares a separate Draft PR and stops; it neither merges security changes nor publishes Pages. No new deployment transaction hashes are invented, and historical reports are not relabeled as proof for the new contract. Before publishing, integrate the security candidate and frontend fix and reconcile the existing pending/historical provenance documentation with separately verified new deployment evidence. No contract redeployment is required by this frontend change.
