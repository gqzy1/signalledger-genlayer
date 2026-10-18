# Source provenance and Steward remediation

Canonical repository: https://github.com/gqzy1/signal-ledger-primitive

Canonical candidate path: `contracts/signal_ledger.py`.

The full candidate source in this repository is copied byte-for-byte from the A repository branch prepared for the Steward remediation.

Candidate SHA256: `7462e8ade28735235649b3953dfb5e6d2164520a760a3791d22e1992a9adc952`.

**Deployment status: NOT DEPLOYED.** The previous deployed contract remains `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247` with the previous source SHA256 `89d4f8e3ee117a9dbe6acd086f3363645cad34ba84fc83e54a1773d291be7daa`. That deployment predates owner-scoped monitor IDs and per-owner quotas and must not be represented as satisfying the new review request.

The public frontend intentionally blocks contract binding while `candidateRemediation.status` is `PENDING_DEPLOYMENT`. After a separately authorized Stable Studionet deployment, update `deployment.json`, retrieve and hash the deployed source, record the new address and real transaction evidence, and then change the candidate status. No transaction is initiated by this repository change.
