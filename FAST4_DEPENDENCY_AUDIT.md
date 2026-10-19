# FAST-4 dependency audit and minimal tested remediation

## Reproduction and result

Repository B PR #3 exact baseline: ae7efbba417c4655c9d7ae9d7ebc59c4b843ba8b. Original package-lock.json SHA256: 147488d0d0ceb79a4856aec0da4bc909e266ab6b6787d89b2eb2c66252aa28e6. Existing CI job 117839571305 in run 39183007627 records Node 22.23.3 / npm 10.9.9. FAST-4 used the same official Node archive (SHA256 df450af89261115ef9f9e3830c3eeb2cc9213b63c720b1af623cb5dcbe2e02de) and bundled npm 10.9.9.

`npm audit --json` ran against the original unchanged lockfile before any dependency edits; it exited 1 and reported 4 vulnerable package nodes: 2 critical, 1 high, 1 moderate. No baseline npm ci or test rerun was performed. Baseline versions below are lock-resolved versions, also reproducible by the original CI npm ci; FAST-4 did not pretend to inspect a separately installed original node_modules.

Final candidate: vite 7.3.6, vitest 4.1.11, @vitest/mocker 4.1.11, esbuild 0.28.2. Tinypool is absent from the final graph. Default npm ci, npm ls --all, source check, 54/54 tests and TypeScript/Vite build PASS in Node 22.23.3/npm 10.9.9. Final npm audit exits 0, zero findings. Runtime dependencies and their existing lock entries remain unchanged. No app, contract, test implementation, source-verification mechanism or workflow is changed.

## Every original advisory occurrence

The audit contains 11 advisory-object occurrences but 10 unique GHSA IDs. Four is a package-node summary, not a count of distinct advisory IDs. The same GHSA-82fw-gwwq-j7x9 appears for both vitest and @vitest/mocker (different npm numeric source IDs); do not count it as two independent vulnerabilities. The two tinypool GHSAs concern separate construction/run option paths and are retained separately.

| Package and baseline version | npm severity | Advisory / npm source | Applicable audit range | Official patched releases for that package | Classification |
|---|---|---|---|---|---|---|
| @vitest/mocker 3.2.4 | moderate | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) / npm 1193684 | `>=2.1.0 <4.1.11` | 4.1.11; 5.0.0-rc.2 | development; not optional |
| tinypool 1.1.1 | critical | [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3) / npm 1241260 | `<=2.1.0` | 2.1.1 | development; not optional |
| tinypool 1.1.1 | critical | [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) / npm 1241261 | `<2.1.2` | 2.1.2 | development; not optional |
| vite 7.1.7 | moderate | [GHSA-93m4-6634-74q7](https://github.com/advisories/GHSA-93m4-6634-74q7) / npm 1109137 | `>=7.1.0 <=7.1.10` | 7.1.11; 7.0.8; 6.4.1; 5.4.21; 5.4.21; 5.4.21; 5.4.21 | development; not optional |
| vite 7.1.7 | moderate | [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9) / npm 1116230 | `>=7.0.0 <=7.3.1` | 8.0.5; 7.3.2; 6.4.2 | development; not optional |
| vite 7.1.7 | high | [GHSA-v2wj-q39q-566r](https://github.com/advisories/GHSA-v2wj-q39q-566r) / npm 1116232 | `>=7.1.0 <=7.3.1` | 8.0.5; 7.3.2 | development; not optional |
| vite 7.1.7 | high | [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583) / npm 1116235 | `>=7.0.0 <=7.3.1` | 8.0.5; 7.3.2; 6.4.2 | development; not optional |
| vite 7.1.7 | moderate | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) / npm 1120785 | `>=7.0.0 <=7.3.4` | 8.0.16; 7.3.5; 6.4.3 | development; not optional |
| vite 7.1.7 | high | [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) / npm 1123526 | `>=7.0.0 <=7.3.4` | 8.0.16; 7.3.5; 6.4.3 | development; not optional |
| vitest 3.2.4 | critical | [GHSA-5xrq-8626-4rwp](https://github.com/advisories/GHSA-5xrq-8626-4rwp) / npm 1139528 | `<3.2.6` | 4.1.0; 3.2.6 | development; not optional |
| vitest 3.2.4 | moderate | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) / npm 1193683 | `>=2.1.0 <4.1.11` | 4.1.11; 5.0.0-rc.2 | development; not optional |

For Vite rows listing several patched release lines, the relevant compatible Vite 7 floors are 7.1.11, 7.3.2 and 7.3.5 respectively; do not downgrade to another major's listed fix. For the Vitest UI issue the 3.x backport is 3.2.6, but the mocker issue requires 4.1.11; the 3.x line has no planned fix according to the maintainer advisory. All original GHSA metadata snapshots have withdrawn_at = null. They are not dismissed as withdrawn. npm moderate and GitHub API medium are the same severity level label.

npm's aggregate Vite range says 7.0.0 - 7.3.3 while two individual via entries and official GHSA ranges include 7.3.4. This mismatch is preserved in raw evidence; the remediation uses each actual advisory's patched release rather than trusting the aggregate range. npm suggests vitest 3.2.7 as a non-major fix, but that is still inside the official mocker range and retains a vulnerable tinypool dependency; that suggestion was not accepted as a complete fix.

## Full resolved dependency paths

- `signalledger -> @vitejs/plugin-react@5.0.3 -> vite@7.1.7` (includes peer resolution)
- `signalledger -> vite@7.1.7`
- `signalledger -> vitest@3.2.4 -> @vitest/mocker@3.2.4 -> vite@7.1.7` (includes peer resolution)
- `signalledger -> vitest@3.2.4 -> vite@7.1.7`
- `signalledger -> vitest@3.2.4 -> vite-node@3.2.4 -> vite@7.1.7`
- `signalledger -> vitest@3.2.4`
- `signalledger -> vitest@3.2.4 -> @vitest/mocker@3.2.4`
- `signalledger -> vitest@3.2.4 -> tinypool@1.1.1`

The exact node locations, dependency/peer edge kinds and all simple resolved paths (including the five esbuild paths) are in evidence-fast4/dependency-paths-before.json. Vite's five paths converge on one hoisted node; they are not five installations. All affected nodes have dev=true and are not optional. Vite and Vitest are root development dependencies; mocker and tinypool are transitive development dependencies. Peer edges do not turn a dev-only path into production use. No affected production node appears in this audit. Development/CI exposure remains relevant; dev classification is not a declaration that the tools are harmless.

## Specific esbuild assessment and intermediate finding

Original esbuild 0.25.12 is dev-only, reached via Vite; platform @esbuild/* binaries are optional development dependencies, distinct from the non-optional esbuild wrapper. Original npm audit does not flag esbuild. Official GHSA-67mh-4wv8-2f99 applies <=0.24.2 with fix 0.25.0; original 0.25.12 is outside that range. GHSA-g7r4-m6w7-qqqr applies >=0.27.3 <0.28.1, also excluding original 0.25.12. No independent scanner was run; no speculative scanner alert or unrelated advisory is represented as an npm finding.

An initial candidate vite 7.3.5 + vitest 4.1.11 removed the original four nodes but resolved esbuild 0.27.7, triggering one real low finding GHSA-g7r4-m6w7-qqqr. That intermediate audit is retained and is not presented as clean. Official fix: esbuild 0.28.1. Vite 7.3.5 only allows ^0.27.0, while Vite 7.3.6 allows ^0.27.0 || ^0.28.0; therefore use the smallest following Vite release 7.3.6 and resolve esbuild 0.28.2 within its supported range. No override, force fix or dependency constraint bypass is committed.

## Compatibility and controlled lock update

- Vite 7.3.6 supports Node ^20.19.0 || >=22.12.0, satisfied by Node 22.23.3. @vitejs/plugin-react 5.0.3 supports the Vite 7 line and remains unchanged.
- Vitest 4.1.11 supports Node ^20.0.0 || ^22.0.0 || >=24.0.0 and Vite ^6 || ^7 || ^8. A test-tool major change is necessary to use the maintained mocker fix. No application runtime or SDK major is changed. Existing 54 tests are unchanged and pass under this runner.
- The final graph removes tinypool entirely; no unsupported tinypool major override is used. Vite's documented esbuild range accepts the resolved 0.28.2. npm ls --all exits 0 with no invalid peers.
- Plain npm 10.9.9 lock updates initially hit an internal Arborist edgesOut error in optional peer resolution. A temporary legacy-peer lock resolution was attempted; default npm ci correctly rejected missing peer entries. No failing lockfile was committed. Running the normal lock-only resolver again restored peer metadata. Final lock generation and clean installation use the default peer policy; no .npmrc, legacy-peer setting, --force or npm audit fix --force is committed. Failures are not PASS evidence.
- The final update changes only two root dev pins and the required development dependency graph. Production lock entries are compared byte-for-byte as parsed entries and remain equal. Package count changes and optional platform binary changes are captured by the lock diff. No general dependency refresh or runtime package upgrade is included.

## Validation and limits

Evidence: audit-before.json, audit-intermediate.json, audit-after.json, advisory-review.json (official GitHub advisory API URL/withdrawn/ranges/fixes), dependency-paths-before.json, validation.json and validation.log. Registry package metadata was checked for the chosen engines/dependency/peer ranges. The original passing 54 tests were reused before dependency edits. The intermediate dependency candidate and final dependency candidate each justified a fresh validation; final checks are distinguished by their exact lock hash in validation.json. GitHub push/PR workflows run automatically under the unchanged repository workflow; no manual historical reruns were requested.

Source consistency SHA256 remains c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54. Candidate source bytes equal Repository A commit 65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873. This is repository verification only, not proof of the new deployed bytes. Static Pages serves a browser bundle rather than Vite/Vitest dev servers, but clean build tooling is still desirable. Zero npm findings means zero findings returned for this graph and audit snapshot, not proof that all possible vulnerabilities are absent. Existing chunk-size/deprecation warnings, when present, are separate from advisory findings.

This dependency-only branch intentionally targets PR #3's frontend branch. The separate docs/fast4-provenance-20261019 child PR reconciles provenance. A #2 -> B #2 -> B #3 upstream integration, followed by the two child changes, source verification, authorized publication and targeted live read acceptance remain separate release gates. Nothing is merged, published, deployed, signed or submitted to the Portal by FAST-4.
