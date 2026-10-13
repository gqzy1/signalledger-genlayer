# Product walkthrough

Current state: deployed at `0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247` on Stable Studionet 61999. Monitor `fast2-eu-api` has real finalized records: UNKNOWN -> OUTAGE, then OUTAGE -> OUTAGE. The second observation retrieved the earlier outage source despite a published recovery, so the recovery scenario FAILED. UNKNOWN retention and product wallet E2E remain NOT RUN. The production website has not been published. See FAST2_EXECUTION_CHECKPOINT.md for hashes and evidence.

1. Open the app and enter the deployed canonical contract address. “Verify & bind” reads the network, source code and finalized count. Mismatched source prevents binding.
2. Select Browser wallet or OKX, then connect. The wallet must be on Stable Studionet 61999.
3. Enter a unique lowercase monitor ID, exact service/component/region and a short public HTTPS announcement URL with explicit update dates. Create the monitor and approve the wallet request.
4. Wait for finalization, agreement and successful execution. The app then reads finalized monitor state; the initial status is UNKNOWN.
5. As the owner, select “Verify announcement” and approve. The leader and independent validators retrieve and interpret the source; successful accepted observations appear as a transition or confirmation.
6. Read the source excerpt, source update time, checked time and digest. Inspect raw receipts and Explorer evidence.
7. Load the same ID without a wallet for public reads. A non-owner cannot run a check.

If evidence is incomplete, UNKNOWN is recorded and the last accepted state stays visible. If the source fails, changes mid-consensus, contains old/conflicting evidence, or validators disagree, no successful update is claimed.

Polling ends after forty attempts. Preserve the returned transaction ID and use Resume tracking. Do not blindly resubmit a pending action. A FINALIZED receipt without agreement and successful execution is shown as unverified, not success.
