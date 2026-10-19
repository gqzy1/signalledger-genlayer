> **Historical deployment manifest — pre-Steward remediation.** The address and hash below describe the original deployed source, not the security candidate. Do not use this manifest as proof that the requested owner-scoped quota fix is deployed until a new deployment is verified.

# Stable Studionet deployment manifest

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
