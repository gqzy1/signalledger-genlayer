> **Release evidence reconciled; Portal not submitted.** Deployment remains user-reported, source identity is VERIFIED through the local Chrome comparison plus A/B byte equality, all seven candidates are merged, and public source binding/monitor acceptance was user-confirmed. Final reconciliation deployment and browser results are recorded separately, never inferred from source equality.

# Projects — SignalLedger

## Name and description

SignalLedger — Read the signal. Record the shift.

A static React product that binds an immutable service scope and announcement source to a GenLayer contract, then reads finalized announcement interpretations and state history. UNKNOWN preserves the last accepted state. This is announcement interpretation, not measured uptime or source certification.

Runtime binding verifies chain 61999 and hashes fetched deployed source before allowing a binding. Owner actions use an EIP-1193 wallet or OKX Wallet; guest reads require no wallet. The owner-scoped frontend is published; the user confirmed the public read-only flow. Runtime checks remain enabled.

## Current and historical links

- Website (published owner-scoped frontend): https://gqzy1.github.io/signalledger-genlayer/
- Published owner-scoped example: https://gqzy1.github.io/signalledger-genlayer/?w=1
- Repository: https://github.com/gqzy1/signalledger-genlayer
- New contract (`DEPLOYED_USER_REPORTED`): https://explorer-studio.genlayer.com/address/0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4
- Historical contract and original transaction evidence: https://explorer-studio.genlayer.com/address/0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247

The user confirmed owner `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc` / monitor `cf-peering-20261018`, OPERATIONAL / revision 1 / checks 1, count and owner count 1, and successful record 1 in Studio. Source identity is `VERIFIED (MANUAL_LOCAL_CHROME)` for the fixed candidates in [source provenance](intelligent-contract/SOURCE_PROVENANCE.md); no cloud independent retrieval is claimed. Historical cloud RPC/Explorer 403/1010 is not independently shown generally resolved. deployment.json now records manual VERIFIED and the separate user public acceptance. No new deployment transaction hash has been supplied. The old six transaction hashes are not new-deployment evidence.

Pages [#4](https://github.com/gqzy1/signalledger-genlayer/actions/runs/39214181853) successfully published `3edf396b00cbc5025b222ab8b6708db43792baca`. The user completed public source binding and monitor reads: OPERATIONAL / revision 1 / checks 1, history UNKNOWN → OPERATIONAL, record digest `3493caca77d291c3efd5e98c1e5f8687d5a32f6d03f19e302e2b77c52d1887ba`. This is user-reported public acceptance, not a new cloud RPC capture. The current production commit/run/bundle record is [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json); deployment.json retains the explicitly dated pre-reconciliation snapshot rather than predicting a future run.

## Evidence and supplementary URLs for this track

1. https://github.com/gqzy1/signalledger-genlayer/blob/fix/frontend-finalized-reads-20261019/FRONTEND_READ_REMEDIATION_REPORT.md
2. https://github.com/gqzy1/signalledger-genlayer/pull/3
3. https://github.com/gqzy1/signalledger-genlayer/tree/docs/fast4-provenance-20261019
4. https://github.com/gqzy1/signalledger-genlayer/blob/main/ONCHAIN_REPORT.md (old deployment only)
5. https://gqzy1.github.io/signalledger-genlayer/?w=1 (current owner-scoped example; archived transaction evidence is separate)

The included candidate source is byte-for-byte identical to Repository A candidate commit `65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873`, expected SHA256 `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`; that repository equality is combined with the separately recorded user manual Explorer/A hash comparison to establish the documented source identity. The repository is MIT licensed.

The seven reviewed candidates are already merged, the integrated frontend has been published and the user supplied public read-only acceptance. This request authorizes metadata synchronization and a final production publication/browser acceptance, whose actual results must be recorded separately. No Portal submission is performed here. Do not repeat the completed manual source comparison or deploy again merely to synchronize documents. Replace branch-scoped links with integrated permanent evidence when appropriate. Unit tests, Studio signing and product extension-wallet E2E are separate statuses; no simulated signing is live wallet evidence.
