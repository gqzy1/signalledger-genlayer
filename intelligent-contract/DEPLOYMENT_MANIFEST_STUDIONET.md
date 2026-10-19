# Stable Studionet deployment manifest

## Current deployment reported by the user

- Network: Stable GenLayer Studionet; Chain ID: 61999.
- Official RPC: https://studio.genlayer.com/api.
- Contract: `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`.
- Deployment status: `DEPLOYED_USER_REPORTED`.
- Independent deployed-source status: `SOURCE_VERIFICATION_PENDING`.
- Expected candidate SHA256: `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54` (repository bytes only).
- Deployment transaction: not supplied; no new hash is asserted.
- Owner: `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc`; monitor: `cf-peering-20261018`.
- User-confirmed Studio reads: count 1, owner count 1, OPERATIONAL, revision 1, checks 1; record 1 returned successfully.
- New public frontend: not published; live frontend read-only acceptance pending.

These statuses are separate. FAST-4 does not perform fresh Studio tests or RPC reads. See [source provenance](SOURCE_PROVENANCE.md) for byte equality and verification limits.

## Historical deployment — original evidence retained

The following archived manifest, transaction and successful source retrieval apply only to `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`. They do not establish the new deployment's source hash or new frontend acceptance.


- Chain ID: 61999
- RPC: https://studio.genlayer.com/api
- GenVM runner: v0.2.16, py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6
- JS SDK: genlayer-js 1.1.8
- Constructor arguments: none
- Source SHA256: 89d4f8e3ee117a9dbe6acd086f3363645cad34ba84fc83e54a1773d291be7daa
- Contract address: 0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247
- Deployment transaction: 0xad010dbb93a50af9674658311f8f100aca36022e596c6149bcd7daa5fc2bb4b8 — FINALIZED / MAJORITY_AGREE / SUCCESS
- Live consensus: PASS for deployment, creation, outage, approved recovery recheck and UNKNOWN retention. Product extension-wallet E2E: NOT RUN (see product acceptance report).

The deployed source was retrieved from the canonical RPC and its SHA256 matches the complete official source above. All three real semantic scenarios passed; see ../ONCHAIN_REPORT.md. The historical four-transaction checkpoint preserves the original source-lag failure.
