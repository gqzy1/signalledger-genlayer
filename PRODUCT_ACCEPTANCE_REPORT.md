# SignalLedger product acceptance

## Onchain primitive
PASS: deployed official source; real outage, recovery and UNKNOWN retention; six finalized majority-agreed successful transactions. See ONCHAIN_REPORT.md and evidence-fast2/ONCHAIN_EVIDENCE_INDEX.json. The earlier recovery source-lag failure remains in the historical record.

## Product source and build
PASS: full canonical contract is included byte for byte and matches the deployed source SHA256. The frontend normalizes actual lowercase Studio votes and preserves finality, majority and execution requirements. The verified example uses real finalized reads, verifies the deployed source digest, and exposes each observation separately from retained state. Local production build passed. Frontend regression/unit coverage totals 31 tests; contract coverage totals 42 tests.

## Browser verification
Public website and frontend read-only browser verification: VERIFICATION PENDING.
Product extension-wallet live connection/write E2E: NOT RUN.
Official Studio built-in wallet signing/live execution: PASS for all six transactions; it is distinct from the product extension-wallet flow.
No simulated signing or mock wallet is counted as real wallet E2E. Portal submission: NOT RUN.

## Submission packaging
Repository B contains the entire official Python source, deployment manifest, source provenance, MIT License, walkthrough, deployment metadata, real onchain reports and independent Projects submission URLs. SUBMISSION_PROJECTS.md provides the prepared fields. Website verification must complete before claiming the public product acceptance is ready.
