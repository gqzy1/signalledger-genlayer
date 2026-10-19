> **Published owner-scoped frontend.** Deployment is user-reported; source identity is VERIFIED by the local Chrome manual comparison and A/B byte identity. Public monitor acceptance was completed by the user. Historical RPC/Explorer restrictions are not independently proven resolved for all environments. See current release evidence below.

# SignalLedger

**Every signal. A traceable record.**

A minimal React product for registering a fixed service scope and source, requesting independent GenLayer interpretation, and reading the resulting service-announcement transition history.

## Signal Desk interface

A graphite observation desk with warm white text, signal green accepted states, amber UNKNOWN observations and red outage signals. Source verification, current state, the revision ledger and transaction evidence have dedicated sections. The latest observation is displayed separately from the retained accepted state; UNKNOWN never implies an operational guarantee. The read-only example needs no wallet. Archived transaction links can be tracked without submitting a new transaction.

## What you can do

- Connect an EIP-1193 browser wallet or OKX Wallet to Stable Studionet.
- Bind a contract only after the deployed source SHA256 matches the official included source.
- Create an immutable service/component/region monitor and source URL.
- Load a public monitor by owner-qualified reference (`owner-address::monitor-id`) without a wallet, or load your own monitor by ID when connected.
- As its owner, verify the latest announcement and inspect the latest ten chain records.
- Track finality, consensus evidence and execution; inspect raw receipts and resume a submitted transaction without resubmitting it.

An UNKNOWN observation preserves the previous accepted state. Source update and check time remain visible. This is announcement interpretation, not measured uptime or a guarantee that a service works.

## Current status

| Dimension | Current status |
|---|---|
| New deployment | `DEPLOYED_USER_REPORTED`: `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4` on Stable Studionet 61999. |
| Source identity | `VERIFIED (MANUAL_LOCAL_CHROME)` for the frozen A/B candidates; SHA256 `c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54`. Historical cloud access restrictions have no independently demonstrated general resolution. |
| Published website | Published for `0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4`; public source binding and OPERATIONAL / revision 1 / checks 1 were user-confirmed. |

The user confirmed Studio count 1, owner count 1, monitor `cf-peering-20261018` under owner `0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc`, OPERATIONAL / revision 1 / checks 1, and successful record 1. This is user-confirmed evidence. No new deployment hash is asserted. [Source provenance](intelligent-contract/SOURCE_PROVENANCE.md) records the manual evidence; deployment.json now records VERIFIED (MANUAL_LOCAL_CHROME). Six original transactions and historical outage/recovery/UNKNOWN acceptance remain attached only to the old deployment. See [source provenance](intelligent-contract/SOURCE_PROVENANCE.md) and [product acceptance](PRODUCT_ACCEPTANCE_REPORT.md).

Pages [#4](https://github.com/gqzy1/signalledger-genlayer/actions/runs/39214181853) successfully published `3edf396b00cbc5025b222ab8b6708db43792baca`. The user completed public source binding and monitor reads: OPERATIONAL / revision 1 / checks 1, history UNKNOWN → OPERATIONAL, record digest `3493caca77d291c3efd5e98c1e5f8687d5a32f6d03f19e302e2b77c52d1887ba`. This is user-reported public acceptance, not a new cloud RPC capture. The current production commit/run/bundle record is [release.json](https://gqzy1.github.io/signalledger-genlayer/release.json); deployment.json retains the explicitly dated pre-reconciliation snapshot rather than predicting a future run.

[Open the product](https://gqzy1.github.io/signalledger-genlayer/) · [Published owner-scoped example, no wallet](https://gqzy1.github.io/signalledger-genlayer/?w=1)

The complete official primitive source lives at `intelligent-contract/contracts/signal_ledger.py`. [Source provenance](intelligent-contract/SOURCE_PROVENANCE.md) and `npm run check:source` verify its SHA256. [Repository A](https://github.com/gqzy1/signal-ledger-primitive) supplies the canonical source and contract tests.

Network is fixed to **Stable Studionet, 61999, https://studio.genlayer.com/api**. `genlayer-js` is pinned to `1.1.8`. No other network is configured.

## Run

Node 22 (FAST-4 reproduction: Node 22.23.3 / npm 10.9.9):

```bash
npm ci
npm run check:source
npm test
npm run build
npm run dev
```

`npm run preflight` performs only chain ID and source schema reads; it does not deploy, sign or submit. The development server defaults to loopback; use an explicit host if your environment supports it.

## Publication evidence

The manual GitHub Pages workflow builds and publishes the static product. Pages is configured for GitHub Actions. `deployment.json` separates user-reported deployment, manually verified source identity, user public acceptance and the preserved historical release. The manual Pages workflow emits `release.json` after building, using the real GitHub SHA/run ID and bundle bytes; this avoids self-referential guessed commit/run/hash fields. Repository consistency checks alone do not establish deployed-source equality. The production site is a static build; no private keys, paid service or runtime API secret is needed.

Read [DEMO.md](DEMO.md) for the product walkthrough, [ONCHAIN_REPORT.md](ONCHAIN_REPORT.md) for finalized consensus evidence, and [PRODUCT_ACCEPTANCE_REPORT.md](PRODUCT_ACCEPTANCE_REPORT.md) for completed product verification and limitations. The original [test plan](LIVE_ACCEPTANCE.md) and [initial checkpoint](CHECKPOINT.md) remain available as historical documentation.

## Sustainable use

Use manual checks on concise, explicitly dated public announcements. Faucet GEN funds Studio transactions; available faucet funds and network/model quotas are not guaranteed indefinitely. No recurring server costs or paid APIs are required by this implementation. Wallet approvals are required for each onchain action. Local storage keeps only the last transaction ID.

Sources are owner selected and are not certified official. The candidate limits each owner to eight monitors with owner-scoped IDs, plus 256 records per monitor. It removes the shared 128-monitor ceiling. Per-address quotas isolate ordinary accounts but do not fully prevent Sybil activity across multiple addresses. The new deployment is user-confirmed; manual source identity is VERIFIED. All seven candidate PRs are merged and the user completed public read-only acceptance; the final reconciliation publication is authorized separately by the current request. Historical official cloud RPC/Explorer 403/1010 has no independently demonstrated general resolution.

MIT licensed. All contract source, frontend code and build configuration needed for this product are included.
