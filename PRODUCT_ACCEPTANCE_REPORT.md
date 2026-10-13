# SignalLedger product acceptance

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
