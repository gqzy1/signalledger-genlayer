> **Historical acceptance plan.** The numbered steps below describe the original verification procedure, not instructions to repeat transactions on the deployed contract. Actual revisions, six transactions, the recovered cache issue and completed scenarios are documented in [ONCHAIN_REPORT.md](ONCHAIN_REPORT.md). Product browser coverage is in [PRODUCT_ACCEPTANCE_REPORT.md](PRODUCT_ACCEPTANCE_REPORT.md).

# Minimum live acceptance — FAST-2

Only Stable Studionet 61999, https://studio.genlayer.com/api. Deployment and contract writes require an authorized signer. Never request or export a private key or seed phrase.

## Minimum transaction scope

The original minimum plan covered five transactions. The actual execution required six because the first recovery attempt observed an older source: one deployment, one create_monitor and four check calls in total. Additional failing transactions are not required by this minimum; refusal paths use existing tests unless real execution is necessary. Do not automatically retry a submitted transaction. Recover its original hash first. Stop after two consecutive failures of the same consensus type and investigate without weakening validation.

1. Deploy the exact canonical source (SHA256 89d4f8e3ee117a9dbe6acd086f3363645cad34ba84fc83e54a1773d291be7daa), empty constructor. Save address, transaction hash, FINALIZED status, execution result, Explorer link and actual receipt. Independently read deployed code and match the source digest.
2. Through the frontend create monitor `fast2-eu-api`, scope `SignalLedger Test Service / EU API`, source `https://raw.githubusercontent.com/gqzy1/signal-ledger-primitive/main/evidence/test-announcement.txt`. The source is explicitly SYNTHETIC TEST DATA, not a claim about a real provider. Confirm finalized get_monitor.
3. Keep the outage bulletin unchanged throughout consensus. Call check with revision 0; verify actual model/validator evidence, MAJORITY_AGREE, successful FINALIZED execution and UNKNOWN -> OUTAGE in finalized reads.
4. After the previous transaction is finalized, update the SAME URL with a strictly newer UTC timestamp and explicit full EU API recovery. Verify publication; wait at least 60 seconds after last_checked; call check with revision 1. Preserve the source during execution. Verify OUTAGE -> OPERATIONAL and the actual consensus and finalized record.
5. After finality, publish an explicitly dated notice only about an unrelated US dashboard, with no current EU API evidence. Wait at least 60 seconds after last_checked; call check with revision 2. Verify signal UNKNOWN, empty updated_at/quote, INSUFFICIENT_EVIDENCE, and accepted state remains OPERATIONAL. Save actual consensus and finalized reads.
6. Exercise wallet connection, frontend create/check, read-only reload, source verification and submitted-hash recovery. Clearly separate real browser checks from unit-only wallet rejection/account-change coverage. Archive raw receipts, source versions and final reads. Only then populate deployment.json and publish GitHub Pages. Confirm the public site reads the real monitor without a wallet.

If the bulletin is older than seven days at execution, refresh it before the first check. Every valid source update must be no later than the transaction datetime. Source text is limited to 24,000 characters; exact excerpts are 12–400 characters. Use the fixed scope verbatim and do not change URL between cases.

## Completed real acceptance

Deployment, source verification, monitor creation, outage, approved recovery recheck and UNKNOWN retention: PASS. Exactly six real transactions were sent. The original recovery attempt failed its intended scenario because an old source was observed; its successful transaction and historical record remain archived. See ONCHAIN_REPORT.md. Product wallet and website coverage are recorded independently in PRODUCT_ACCEPTANCE_REPORT.md. No Portal submission occurred.
