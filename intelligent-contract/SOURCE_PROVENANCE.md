# Source provenance and deployment status

Canonical repository: https://github.com/gqzy1/signal-ledger-primitive

Canonical candidate: `contracts/signal_ledger.py` at `65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873` (Repository A Draft PR #2).

The complete candidate in `intelligent-contract/contracts/signal_ledger.py` is byte-for-byte identical to that canonical candidate. Both Git blob IDs are `a3d28492b07ad5ef10bb82b8cf9d147d0fbf32a5`; local candidate SHA256 is `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`. FAST-4 does not alter either contract source.

## Three independent statuses

| Dimension | Status | Evidence and limits |
|---|---|---|
| New contract deployment | DEPLOYED_USER_REPORTED | Stable Studionet 61999, `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`; the user confirmed successful Studio reads. |
| New deployed source bytes/hash | SOURCE_VERIFICATION_PENDING | `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54` is the expected repository candidate hash, not an independently captured deployed-source hash. No new deployment transaction hash was supplied. |
| Published website | HISTORICAL_RELEASE | The public website still serves the previous deployment `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`; the new frontend has not been published or accepted. |

User-confirmed Studio baseline: `get_count()` = 1; `get_owner_count("0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc")` = 1; `get_monitor("0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc::cf-peering-20261018")` returns OPERATIONAL, revision 1, checks 1; `get_record(monitor_ref, 1)` succeeds. These are user-confirmed results, not FAST-4 independently executed reads.

Official RPC: https://studio.genlayer.com/api. Earlier HTTP 403 / Cloudflare 1010 prevented independent work from some environments. FAST-4 makes no RPC request, does not infer present access from that historical block, and does not claim source verification. The earlier remediation report's disclosed test-isolation incident is not a dedicated deployed-byte/hash acceptance capture.

The frontend still retrieves deployed source bytes, computes SHA256, checks chain 61999 and rejects binding on mismatch. Removing the obsolete pending-deployment guard did not remove that runtime protection. Local `npm run check:source` verifies repository consistency only.

## Historical deployment evidence

Previous address: `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`. Previous source SHA256: `89d4f8e3ee117a9dbe6acd086f3363645cad34ba84fc83e54a1773d291be7daa`.

The previous deployment transaction `0xad010dbb93a50af9674658311f8f100aca36022e596c6149bcd7daa5fc2bb4b8`, all six original transaction hashes, and original evidence remain archived in `deployment.json`, `DEPLOYMENT_MANIFEST_STUDIONET.md`, `../ONCHAIN_REPORT.md` and `../evidence-fast2/`. They must never be attributed to the new address. A/B candidate source equality does not prove equality with deployed bytes.
