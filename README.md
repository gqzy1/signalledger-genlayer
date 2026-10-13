# SignalLedger

**Read the signal. Record the shift.**

A minimal React product for registering a fixed service scope and source, requesting independent GenLayer interpretation, and reading the resulting service-announcement transition history.

## What you can do

- Connect an EIP-1193 browser wallet or OKX Wallet to Stable Studionet.
- Bind a contract only after the deployed source SHA256 matches the official included source.
- Create an immutable service/component/region monitor and source URL.
- Load any monitor by ID without connecting a wallet.
- As its owner, verify the latest announcement and inspect the latest ten chain records.
- Track finality, consensus evidence and execution; inspect raw receipts and resume a submitted transaction without resubmitting it.

An UNKNOWN observation preserves the previous accepted state. Source update and check time remain visible. This is announcement interpretation, not measured uptime or a guarantee that a service works.

## Current status

**Development checkpoint — NOT DEPLOYED.** `deployment.json` contains no address and explicitly records live validation as NOT RUN. The app shows empty state until a real verified contract is attached; there are no production mock results.

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

The manual GitHub Pages workflow is included, but has not been triggered. After live acceptance, fill the canonical address in `deployment.json`, enable Pages with GitHub Actions, and run “Publish frontend (manual)”. The production site is a static build; no private keys, paid service or runtime API secret is needed.

Read [DEMO.md](DEMO.md) for the workflow and [LIVE_ACCEPTANCE.md](LIVE_ACCEPTANCE.md) for the minimum real deployment checks. See [CHECKPOINT.md](CHECKPOINT.md) for executed checks and limitations.

## Sustainable use

Use manual checks on concise, explicitly dated public announcements. Faucet GEN funds Studio transactions; available faucet funds and network/model quotas are not guaranteed indefinitely. No recurring server costs or paid APIs are required by this implementation. Wallet approvals are required for each onchain action. Local storage keeps only the last transaction ID.

Sources are owner selected and are not certified official. The contract has bounded capacities (128 monitors, 256 records per monitor), rejects source drift and stale evidence, and may fail to reach consensus on ambiguous pages. A new monitor continues future checks at capacity while prior history remains readable.

MIT licensed. All contract source, frontend code and build configuration needed for this product are included.
