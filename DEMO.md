> **Current owner-scoped public frontend.** Pages [#4](https://github.com/gqzy1/signalledger-genlayer/actions/runs/39214181853) successfully published `3edf396b00cbc5025b222ab8b6708db43792baca`. The user completed public source binding and monitor reads: OPERATIONAL / revision 1 / checks 1, history UNKNOWN → OPERATIONAL, record digest `3493caca77d291c3efd5e98c1e5f8687d5a32f6d03f19e302e2b77c52d1887ba`. This is user-reported public acceptance, not a new cloud RPC capture. The current production commit/run/bundle record is [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json); deployment.json retains the explicitly dated pre-reconciliation snapshot rather than predicting a future run.

For the current read-only monitor, bind the configured contract and load `0xeb56f245efeced0899b7e23697fee512a39dbdcc::cf-peering-20261018`. Expected user-confirmed history: UNKNOWN → OPERATIONAL, revision/checks 1. Do not run a new check or create a monitor to repeat this acceptance.

> **Historical walkthrough below.** The remaining example and six transactions belong only to the old deployment. Its public URLs now open the current release; the old monitor/four-observation narrative is preserved as historical evidence, not current acceptance.

# SignalLedger walkthrough

Historical published contract: `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`, Stable Studionet 61999.

## Public verified example
Open https://gqzy1.github.io/signalledger-genlayer/?w=1. The app verifies the deployed source and loads monitor `fast2-eu-api` from finalized chain state, without a wallet. View the four real observations: OUTAGE, a repeated old-source OUTAGE, accepted recovery to OPERATIONAL, and UNKNOWN retaining OPERATIONAL. Source bulletins are explicitly synthetic test data. The old-source check is preserved rather than hidden.

Read the accepted update, last checked time, revision, observation signal, exact evidence quote and rendered-source digest. UNKNOWN does not imply fresh normal operation; it records insufficient current scoped evidence while retaining the last accepted state.

## Owner workflow
1. Choose a browser wallet or OKX Wallet on Stable Studionet.
2. Verify and bind the canonical contract. A source digest mismatch blocks binding.
3. Enter a unique lowercase ID, fixed service scope and a concise dated public HTTPS source; approve create_monitor.
4. As the owner, approve Verify announcement. A check requires the current revision and at least 60 seconds since the prior check.
5. Preserve the returned transaction hash. Resume tracking and inspect the Explorer link instead of blindly resubmitting.
6. Public reads use `owner-address::monitor-id`; a connected owner can load their own monitor by ID. A non-owner cannot check it.

Wallet approvals are required for owner writes. See PRODUCT_ACCEPTANCE_REPORT.md for the exact live browser-wallet coverage; Studio signing and product extension signing are not conflated. Do not perform extra transactions merely to inspect this verified example.

## Evidence
See ONCHAIN_REPORT.md, evidence-fast2/ONCHAIN_EVIDENCE_INDEX.json and deployment.json. All six transactions were FINALIZED / MAJORITY_AGREE / SUCCESS. Portal submission status is separate from the live product example.
