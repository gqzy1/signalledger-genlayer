# SignalLedger walkthrough

Canonical contract: `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`, Stable Studionet 61999.

## Public verified example
Open https://gqzy1.github.io/signalledger-genlayer/?w=1. The app verifies the deployed source and loads monitor `fast2-eu-api` from finalized chain state, without a wallet. View the four real observations: OUTAGE, a repeated old-source OUTAGE, accepted recovery to OPERATIONAL, and UNKNOWN retaining OPERATIONAL. Source bulletins are explicitly synthetic test data. The old-source check is preserved rather than hidden.

Read the accepted update, last checked time, revision, observation signal, exact evidence quote and rendered-source digest. UNKNOWN does not imply fresh normal operation; it records insufficient current scoped evidence while retaining the last accepted state.

## Owner workflow
1. Choose a browser wallet or OKX Wallet on Stable Studionet.
2. Verify and bind the canonical contract. A source digest mismatch blocks binding.
3. Enter a unique lowercase ID, fixed service scope and a concise dated public HTTPS source; approve create_monitor.
4. As the owner, approve Verify announcement. A check requires the current revision and at least 60 seconds since the prior check.
5. Preserve the returned transaction hash. Resume tracking and inspect the Explorer link instead of blindly resubmitting.
6. Other users can load the monitor by ID without a wallet. A non-owner cannot check it.

Wallet approvals are required for owner writes. See PRODUCT_ACCEPTANCE_REPORT.md for the exact live browser-wallet coverage; Studio signing and product extension signing are not conflated. Do not perform extra transactions merely to inspect this verified example.

## Evidence
See ONCHAIN_REPORT.md, evidence-fast2/ONCHAIN_EVIDENCE_INDEX.json and deployment.json. All six transactions were FINALIZED / MAJORITY_AGREE / SUCCESS. Portal submission status is separate from the live product example.
