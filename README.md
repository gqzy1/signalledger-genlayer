> **Steward remediation pending deployment.** This branch contains a candidate with owner-scoped monitor IDs and an eight-monitor per-owner quota. The existing public deployment still runs the previous source. The app is intentionally disabled until a new matching deployment is verified.

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

**Deployed and real semantic acceptance complete.** Canonical contract: `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247`. Six real finalized transactions establish outage, recovery and UNKNOWN retention. The earlier source-lag failure remains archived. See [onchain report](ONCHAIN_REPORT.md) and [product acceptance](PRODUCT_ACCEPTANCE_REPORT.md).

[Open the product](https://gqzy1.github.io/signalledger-genlayer/) · [Verified onchain example, no wallet](https://gqzy1.github.io/signalledger-genlayer/?w=1)

The complete official primitive source lives at `intelligent-contract/contracts/signal_ledger.py`. [Source provenance](intelligent-contract/SOURCE_PROVENANCE.md) and `npm run check:source` verify its SHA256. [Repository A](https://github.com/gqzy1/signal-ledger-primitive) supplies the canonical source and contract tests.

Network is fixed to **Stable Studionet, 61999, https://studio.genlayer.com/api**. `genlayer-js` is pinned to `1.1.8`. No other network is configured.

## Run

Node 22+:

```bash
npm ci
npm run check:source
npm test
npm run build
npm run dev
```

`npm run preflight` performs only chain ID and source schema reads; it does not deploy, sign or submit. The development server defaults to loopback; use an explicit host if your environment supports it.

## Deployment preparation

The manual GitHub Pages workflow builds and publishes the static product. Pages is configured for GitHub Actions. The canonical address and actual live acceptance are recorded in `deployment.json`. The production site is a static build; no private keys, paid service or runtime API secret is needed.

Read [DEMO.md](DEMO.md) for the product walkthrough, [ONCHAIN_REPORT.md](ONCHAIN_REPORT.md) for finalized consensus evidence, and [PRODUCT_ACCEPTANCE_REPORT.md](PRODUCT_ACCEPTANCE_REPORT.md) for completed product verification and limitations. The original [test plan](LIVE_ACCEPTANCE.md) and [initial checkpoint](CHECKPOINT.md) remain available as historical documentation.

## Sustainable use

Use manual checks on concise, explicitly dated public announcements. Faucet GEN funds Studio transactions; available faucet funds and network/model quotas are not guaranteed indefinitely. No recurring server costs or paid APIs are required by this implementation. Wallet approvals are required for each onchain action. Local storage keeps only the last transaction ID.

Sources are owner selected and are not certified official. The candidate limits each owner to eight monitors with owner-scoped IDs, plus 256 records per monitor. It removes the shared 128-monitor ceiling. Per-address quotas isolate ordinary accounts but do not fully prevent Sybil activity across multiple addresses. The candidate is not deployed yet.

MIT licensed. All contract source, frontend code and build configuration needed for this product are included.
