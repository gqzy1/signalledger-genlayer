# Stable Studionet deployment manifest

## Current deployment reported by the user

- Network: Stable GenLayer Studionet; Chain ID: 61999.
- Official RPC: https://studio.genlayer.com/api.
- Contract: `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`.
- Deployment status: `DEPLOYED_USER_REPORTED`.
- Source identity: `VERIFIED (MANUAL_LOCAL_CHROME)`, through the user-provided Explorer/A SHA256 comparison and existing A/B candidate byte equality; cloud independent retrieval remains blocked.
- Manually compared source SHA256: `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`; both compared sources measured 10,516 characters / 10,516 UTF-8 bytes. See [source provenance](SOURCE_PROVENANCE.md) for origin, exact covered commits and limits.
- Deployment transaction: not supplied; no new hash is asserted.
- Owner: `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc`; monitor: `cf-peering-20261018`.
- User-confirmed Studio reads: count 1, owner count 1, OPERATIONAL, revision 1, checks 1; record 1 returned successfully.
- Public frontend: published owner-scoped version; source binding and OPERATIONAL / revision 1 / checks 1 with UNKNOWN → OPERATIONAL history were user-confirmed.
- Revision 1 evidence digest: `3493caca77d291c3efd5e98c1e5f8687d5a32f6d03f19e302e2b77c52d1887ba` (announcement record digest, distinct from contract-source SHA256).
- Last confirmed release before reconciliation: [3edf396b00cbc5025b222ab8b6708db43792baca](https://github.com/gqzy1/signalledger-genlayer/actions/runs/39214181853), Pages #4 build/deploy success. Current release commit/run/bundle: [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json).

These statuses are separate. All seven PRs are merged; final reconciliation synchronizes deployment.json under the current authorization. The local Chrome source comparison and public browser acceptance are user evidence; they do not prove general recovery from historical official RPC/Explorer 403/1010. The final production release is accepted only after its actual workflow and targeted read-only browser check. See [source provenance](SOURCE_PROVENANCE.md).

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
