# Projects — SignalLedger

## Name and description
SignalLedger — Read the signal. Record the shift.

A static React application that uses the deployed SignalLedger Intelligent Contract to bind a service scope and announcement source, request an independently verified interpretation, and read finalized state history. The public verified example loads real chain records without a wallet; owner writes use an EIP-1193 browser wallet or OKX Wallet. The application verifies the complete deployed contract source before enabling a binding, checks the network/account before writes, and tracks finality, consensus and execution separately.

UNKNOWN is visible as an observation and preserves the last accepted state; source-update and checked timestamps remain visible. The sample service is explicitly synthetic test data. Announcement interpretation is not a live uptime measurement or a source certification.

## Links
- Website: https://gqzy1.github.io/signalledger-genlayer/
- Verified onchain example: https://gqzy1.github.io/signalledger-genlayer/?w=1
- Repository: https://github.com/gqzy1/signalledger-genlayer
- Canonical contract: https://explorer-studio.genlayer.com/address/0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247

## Evidence and supplementary URLs for this track
1. https://github.com/gqzy1/signalledger-genlayer/blob/main/PRODUCT_ACCEPTANCE_REPORT.md
2. https://github.com/gqzy1/signalledger-genlayer/blob/main/DEMO.md
3. https://github.com/gqzy1/signalledger-genlayer/blob/main/deployment.json
4. https://github.com/gqzy1/signalledger-genlayer/blob/main/intelligent-contract/SOURCE_PROVENANCE.md
5. https://gqzy1.github.io/signalledger-genlayer/?w=1

These evidence URLs are distinct from the Intelligent Contracts submission draft. This repository includes the COMPLETE official Python contract at intelligent-contract/contracts/signal_ledger.py with a source digest check, rather than a wrapper or abbreviated example. MIT License covers the repository. No Portal entry has been sent.

Read PRODUCT_ACCEPTANCE_REPORT.md for the exact browser and wallet testing coverage. Unit tests are not represented as live browser-wallet writes; official Studio signing and extension signing have separate statuses.
