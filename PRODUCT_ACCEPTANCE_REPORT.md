# SignalLedger acceptance status — final release reconciliation

## Current owner-scoped deployment and published frontend

- Contract `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`: `DEPLOYED_USER_REPORTED`, Stable Studionet 61999.
- Source identity: `VERIFIED (MANUAL_LOCAL_CHROME)`, based on the user-provided comparison of Explorer deployment-transaction source and A fixed source plus the existing frozen A/B byte-identity chain. Both measured 10,516 UTF-8 bytes, SHA256 `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`. This is not a cloud RPC capture; see [source provenance](intelligent-contract/SOURCE_PROVENANCE.md).
- User-confirmed Studio baseline: owner `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc`, monitor `cf-peering-20261018`; count 1 / owner count 1 / OPERATIONAL / revision 1 / checks 1; record 1 succeeds.
- PR #3 at `ae7efbba417c4655c9d7ae9d7ebc59c4b843ba8b`: existing 54/54 offline tests, source check and build PASS; GitHub CI SUCCESS. These unchanged tests are reused for this documentation-only change; FAST-6 does not rerun tests or production builds.
- Public read-only acceptance: PASS_USER_REPORTED. Source binding, latest observation and accepted state OPERATIONAL / revision 1 / checks 1, and history UNKNOWN → OPERATIONAL with record digest `3493caca77d291c3efd5e98c1e5f8687d5a32f6d03f19e302e2b77c52d1887ba` were confirmed by the user on the public site. No new cloud monitor read is claimed here.
- Last confirmed pre-reconciliation release: `3edf396b00cbc5025b222ab8b6708db43792baca`, Pages [39214181853](https://github.com/gqzy1/signalledger-genlayer/actions/runs/39214181853), build/deploy success; bundle `assets/index-CeU5nQHj.js`, SHA256 `215c2aee1c856ed5b5cfd19632555dadf07c06c60a47b44478da790ad770ccca` from actual production bytes at 2026-10-19T08:13:24.424776+00:00. The current release record is [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json); this snapshot is retained as historical evidence after the next release.
- Dependency changes have their own isolated Draft PR and audit/validation report; this documentation change does not upgrade packages or repeat tests.
- All seven candidate PRs are merged; final metadata reconciliation/build/publication is authorized by the current request. deployment.json now records manual VERIFIED and user public acceptance. Historical cloud RPC/Explorer 403/1010 has no independently demonstrated general resolution. The final new release acceptance is recorded only after its actual deployment and browser check.
- No new deployment transaction hash supplied. Six original hashes remain historical. No FAST-4 transaction, source mutation, RPC/Studio retest, Pages publication or Portal submission.

## Historical scope of every PASS below

All original deployment, browser, source-hash and Projects READY statements below apply only to the old deployment `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247` and the archived October 13 release. They are retained as historical evidence and do not certify the new deployment or authorize resubmission. The current user-reported public acceptance and subsequent release records above are separate from this historical block. Portal submission has not been performed; final reconciliation acceptance is not inferred from these archived PASS statements.

# Historical SignalLedger product acceptance

## Onchain primitive
PASS: deployed official source; real outage, recovery and UNKNOWN retention; six finalized majority-agreed successful transactions. See ONCHAIN_REPORT.md and evidence-fast2/ONCHAIN_EVIDENCE_INDEX.json. The earlier recovery source-lag failure remains in the historical record.

## Product source and build
PASS: full canonical contract is included byte for byte and matches the deployed source SHA256. The frontend normalizes actual lowercase Studio votes and selects the actual leader execution receipt even when the RPC array appends a failing validator receipt. Finality, majority and execution requirements remain mandatory. The verified example uses real finalized reads, verifies the deployed source digest, and exposes each observation separately from retained state. Local production build passed. Frontend regression/unit coverage totals 34 tests; contract coverage totals 42 tests.

## Browser verification
Public HTTPS access, JavaScript/CSS assets, source verification, finalized revision 4, four real observations, UNKNOWN retention and no-wallet example load: PASS.
Missing browser/OKX provider errors and invalid-address prevention: PASS in the real public browser.
Transaction tracking: PASS in the published Chrome browser on 2026-10-13. Resuming transaction 0x4a5d1d1f7cc99ae7bdd34c0144d7b3f668eab52e0b8926d64a33471df903a5a2 displayed “Finalized, consensus agreed, execution succeeded.” This is the real mixed leader/validator receipt covered by the regression. Pages run 38359735246 published application commit 84f53bd2531012794b0d8adddade731690bb92f7; the previously observed false failure is fixed in that live build.
Browser visual QA: PASS for the desktop Chrome viewport on the public homepage and verified example, including state/history and tracker sections; no obvious clipping or layout errors. Mobile visual QA: NOT RUN. Invalid transaction ID displayed “Enter a 32-byte transaction ID.” Missing browser wallet displayed “Install or enable the selected browser wallet.” Invalid contract address displayed “Enter a nonzero contract address.”
Product extension-wallet live connection/write E2E: NOT RUN.
Official Studio built-in wallet signing/live execution: PASS for all six transactions; it is distinct from the product extension-wallet flow.
No simulated signing or mock wallet is counted as real wallet E2E. Portal submission: NOT RUN.

## Submission packaging
Repository B contains the entire official Python source, deployment manifest, source provenance, MIT License, walkthrough, deployment metadata, real onchain reports and independent Projects submission URLs. SUBMISSION_PROJECTS.md provides the prepared fields. Final public read-only website verification is complete. Both repositories contain the documented contract and product evidence for submission review. Extension-wallet live connection/write E2E and mobile visual QA remain explicitly NOT RUN. Historical CHECKPOINT, FAST2_PREFLIGHT and FAST2_EXECUTION_CHECKPOINT files describe their earlier stages; ONCHAIN_REPORT.md and this report describe the final status. This verification required no additional transactions, redeployment or application logic changes.

## Signal Desk interface

The UI-only redesign preserves client.ts, domain.ts, deployment.json, all archived onchain evidence and the complete official contract source unchanged. It separates latest observation from accepted/retained state, displays actual revision and recorded-check counts, renders the latest ten records as a revision ledger, and presents transaction finality, agreement and execution separately using the existing receipt success rules. Archived transaction buttons only resume read-only tracking. No transaction was submitted for this redesign.

Local verification: 34 existing frontend tests PASS; official source SHA256 verification PASS; TypeScript and Vite production build PASS. Publication and public browser verification: PASS. Product checks run 38383828153 and Pages run 38383958340 succeeded for UI application commit 46adcd5e79f335fe4a1a213fd806ec8d10c88014. Public homepage and ?w=1 rendered the new Signal Desk assets (index-h-nLNUaO.js / index-COGq8vnG.css). The no-wallet example verified the official source and read revision 4, four observations, latest UNKNOWN and retained OPERATIONAL. Read-only tracking of the archived insufficient-evidence transaction displayed FINALIZED / MAJORITY_AGREE / SUCCESS. Missing browser wallet, invalid address and invalid transaction ID messages were verified on the public site. Desktop visual inspection covered hero, source binding, state/ledger and tracker, with no visible clipping and no horizontal overflow at the observed 1348 CSS-pixel viewport. Narrow/mobile visual QA: NOT RUN; responsive CSS is implemented at 1050 and 650 pixels. Existing live extension-wallet/write E2E remains NOT RUN. Projects READY remains the established acceptance conclusion.
