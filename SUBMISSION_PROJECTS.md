> **Draft status: NOT READY FOR RESUBMISSION.** The new deployment is user-confirmed; independent source verification, candidate integration and new frontend live acceptance are pending. FAST-4 does not submit the Portal.

# Projects — SignalLedger

## Name and description

SignalLedger — Read the signal. Record the shift.

A static React product that binds an immutable service scope and announcement source to a GenLayer contract, then reads finalized announcement interpretations and state history. UNKNOWN preserves the last accepted state. This is announcement interpretation, not measured uptime or source certification.

Runtime binding verifies chain 61999 and hashes fetched deployed source before allowing a binding. Owner actions use an EIP-1193 wallet or OKX Wallet; guest reads require no wallet. These capabilities in the candidate are separate from the currently published historical build.

## Current and historical links

- Website (historical release, old contract): https://gqzy1.github.io/signalledger-genlayer/
- Published historical example: https://gqzy1.github.io/signalledger-genlayer/?w=1
- Repository: https://github.com/gqzy1/signalledger-genlayer
- New contract (`DEPLOYED_USER_REPORTED`): https://explorer-studio.genlayer.com/address/0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4
- Historical contract and original transaction evidence: https://explorer-studio.genlayer.com/address/0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247

The user confirmed owner `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc` / monitor `cf-peering-20261018`, OPERATIONAL / revision 1 / checks 1, count and owner count 1, and successful record 1 in Studio. Independent deployed-source bytes/hash remain `SOURCE_VERIFICATION_PENDING`. No new deployment transaction hash has been supplied. The old six transaction hashes are not new-deployment evidence.

## Evidence and supplementary URLs for this track

1. https://github.com/gqzy1/signalledger-genlayer/blob/fix/frontend-finalized-reads-20261019/FRONTEND_READ_REMEDIATION_REPORT.md
2. https://github.com/gqzy1/signalledger-genlayer/pull/3
3. https://github.com/gqzy1/signalledger-genlayer/tree/docs/fast4-provenance-20261019
4. https://github.com/gqzy1/signalledger-genlayer/blob/main/ONCHAIN_REPORT.md (old deployment only)
5. https://gqzy1.github.io/signalledger-genlayer/?w=1 (published old build only)

The included candidate source is byte-for-byte identical to Repository A candidate commit `65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873`, expected SHA256 `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`; that equality does not prove new deployed-source equality. The repository is MIT licensed.

Before submission, integrate reviewed Draft candidates in the documented order, capture independent deployed-source equality, publish the new frontend under separate authorization and complete one targeted public read-only acceptance. Replace branch-scoped links with integrated permanent evidence when appropriate. Unit tests, Studio signing and product extension-wallet E2E are separate statuses; no simulated signing is live wallet evidence.
