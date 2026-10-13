# Minimum live acceptance — approval required

All steps below are NOT RUN at FAST-1. Use only Stable Studionet 61999 and faucet funds. No private key or seed phrase is needed; deployment and writes require user-approved browser-wallet actions.

1. Deploy the exact official source with no constructor arguments in Stable Studio. Archive source SHA256, contract address, deployment transaction, successful finalized receipt and schema. Bind the same address in the frontend and verify the source digest.
2. Create a monitor through the frontend for a clearly labeled, controlled public test announcement with today's explicit UTC update time. Record finalized receipt and get_monitor. These are acceptance fixtures, not claims about a real service.
3. Publish an outage announcement at the fixed fixture URL, check it through the frontend, and verify UNKNOWN → OUTAGE. Publish a newer recovery at the same URL, wait at least 60 seconds and check OUTAGE → OPERATIONAL. Save actual hashes, consensus results, validator evidence and finalized records.
4. Replace the fixture with out-of-scope/future-maintenance or ambiguous evidence, then check that UNKNOWN is recorded and OPERATIONAL is preserved. Verify one non-owner check rejection and an older/same-time conflicting update rejection. Each intentionally failing transaction requires approval too.
5. Test one genuine dated public service announcement, without claiming the selected source is certified official. Validate the actual scoped judgment. Confirm read-only reload in another browser session, wallet rejection, account change and pending-transaction recovery.
6. Archive evidence, set canonical contractAddress and actual validation status in deployment.json, rebuild, and publish the static frontend with the manual Pages workflow. Do not submit either Portal track until both have genuine reproducible chain evidence.

The outage, recovery and UNKNOWN fixture checks can reuse one monitor and source URL. They are a compact real consensus acceptance sequence. GitHub source commits and unit tests are not substitutes for real LLM/validator behavior.

No executable deployment or transaction script is provided or run by the preflight check.
