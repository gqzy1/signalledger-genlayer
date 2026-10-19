# Source provenance and deployment status

Canonical repository: https://github.com/gqzy1/signal-ledger-primitive

Canonical candidate: `contracts/signal_ledger.py` at `65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873` (Repository A merged PR #2).

The complete candidate in `intelligent-contract/contracts/signal_ledger.py` is byte-for-byte identical to that canonical candidate. Both Git blob IDs are `a3d28492b07ad5ef10bb82b8cf9d147d0fbf32a5`; local candidate SHA256 is `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`. FAST-4 does not alter either contract source.

## Three independent statuses

| Dimension | Status | Evidence and limits |
|---|---|---|
| New contract deployment | DEPLOYED_USER_REPORTED | Stable Studionet 61999, `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`; the user confirmed successful Studio reads. |
| New source identity | VERIFIED — MANUAL_LOCAL_CHROME | User-performed local Chrome comparison returned `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54` for Explorer deployment-transaction source and A fixed source; existing A/B byte equality extends coverage to the frozen B candidates. No cloud retrieval or new transaction hash is asserted. |
| Published website | PUBLISHED_USER_READ_ONLY_ACCEPTED | Pages #4 published the integrated owner-scoped frontend; the user confirmed source binding, OPERATIONAL / revision 1 / checks 1, history and evidence digest. Current production commit/run/bundle: [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json). |

User-confirmed Studio baseline: `get_count()` = 1; `get_owner_count("0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc")` = 1; `get_monitor("0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc::cf-peering-20261018")` returns OPERATIONAL, revision 1, checks 1; `get_record(monitor_ref, 1)` succeeds. These are user-confirmed results, not FAST-4 independently executed reads.

Official RPC: https://studio.genlayer.com/api. Earlier HTTP 403 / Cloudflare 1010 prevented independent work from some environments. FAST-4/FAST-5 cloud work did not resolve that block. FAST-6 makes no RPC request and does not infer current cloud access from the manual browser result. The earlier remediation report's disclosed test-isolation incident is not counted as a dedicated deployed-byte/hash capture.

## FAST-5 manual evidence, synchronized by FAST-6

The user reported the local Chrome result on 2026-10-19 at 14:07:09 Asia/Shanghai (report time, not a separately known execution time). Explorer deployment-transaction source and A commit `65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873` / `contracts/signal_ledger.py` each measured **10,516 characters / 10,516 UTF-8 bytes**, both SHA256 `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`. Evidence package: `SignalLedger_FAST5_Review_Package (1).zip`, SHA256 `f944830c74d1483c45c515eaca5444b272813c4e5f4e599ba229a0c3d41a0208`; its manual-source-verification.json and updated FAST-5 main report record the result. No raw manual source export or new deployment transaction hash is invented.

Existing GitHub byte evidence covers B #2 `a6d103828c2cb8140a1b24a6377fb8971b45fd9e`, B #3 `ae7efbba417c4655c9d7ae9d7ebc59c4b843ba8b`, B #4 `1b2242de42f9860e865dc9e077c9a51eb93909d1` and B #5 `cf4cfccd1bd276f511402f95b320a836fef7c0b5`: their contract blob equals A, and the child changes do not edit it. FAST-6 documentation-only descendants preserve that source identity. Coverage does not extend to arbitrary future source edits or the old main/public build. [A counterpart evidence record](https://github.com/gqzy1/signal-ledger-primitive/blob/docs/fast6-deployment-status-20261019/SOURCE_VERIFICATION.md).

**Current configuration boundary:** FAST-6 changed only Markdown; final reconciliation now synchronizes deployment.json to VERIFIED (MANUAL_LOCAL_CHROME), preserving DEPLOYED_USER_REPORTED and all historical addresses/transactions. All seven candidates are merged. The user-reported public acceptance, build/deploy records and manual source evidence remain separately attributed. Source equality alone is never publication or frontend acceptance.

Pages [#4](https://github.com/gqzy1/signalledger-genlayer/actions/runs/39214181853) successfully published `3edf396b00cbc5025b222ab8b6708db43792baca`. The user completed public source binding and monitor reads: OPERATIONAL / revision 1 / checks 1, history UNKNOWN → OPERATIONAL, record digest `3493caca77d291c3efd5e98c1e5f8687d5a32f6d03f19e302e2b77c52d1887ba`. This is user-reported public acceptance, not a new cloud RPC capture. The current production commit/run/bundle record is [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json); deployment.json retains the explicitly dated pre-reconciliation snapshot rather than predicting a future run.

The current A/main 04e019f3a55f5385450612ded0a3ffd0a263a6ad and integrated B/main 3edf396b00cbc5025b222ab8b6708db43792baca retain identical 10,516-byte contract source. This is current repository byte identity, not a newly acquired cloud deployment export. The official Cloudflare incident https://www.cloudflarestatus.com/incidents/wpvuoqdcmu2k resolved at 2026-10-18T08:50:00Z (16:50 Asia/Shanghai); that service-announcement time does not prove Studio/Explorer access restrictions are universally removed.

The frontend still retrieves deployed source bytes, computes SHA256, checks chain 61999 and rejects binding on mismatch. Removing the obsolete pending-deployment guard did not remove that runtime protection. Local `npm run check:source` verifies repository consistency only.

## Historical deployment evidence

Previous address: `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`. Previous source SHA256: `89d4f8e3ee117a9dbe6acd086f3363645cad34ba84fc83e54a1773d291be7daa`.

The previous deployment transaction `0xad010dbb93a50af9674658311f8f100aca36022e596c6149bcd7daa5fc2bb4b8`, all six original transaction hashes, and original evidence remain archived in `deployment.json`, `DEPLOYMENT_MANIFEST_STUDIONET.md`, `../ONCHAIN_REPORT.md` and `../evidence-fast2/`. They must never be attributed to the new address. A/B candidate source equality does not prove equality with deployed bytes.
