# FAST-4 release preparation and integration route

Status updated by FAST-6: PREPARATION ONLY. Source identity is VERIFIED (manual); no PR merge, Pages publication, Portal submission or blockchain write. Cloud access and public frontend acceptance remain unresolved.

## Preserved candidate graph

- A #2: main -> security/owner-scoped-monitors-20261019; head 65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873.
- B #2: main -> security/owner-scoped-monitors-20261019; head a6d103828c2cb8140a1b24a6377fb8971b45fd9e.
- B #3: security/owner-scoped-monitors-20261019 -> fix/frontend-finalized-reads-20261019; head ae7efbba417c4655c9d7ae9d7ebc59c4b843ba8b.
- Documentation branch docs/fast4-provenance-20261019 and dependency branch security/fast4-dev-dependencies-20261019 are separate children of B #3 head. Neither changes shared candidate refs or retargets existing PRs.

The stacked relationship is intentional. It is an integration prerequisite, not a reason to retarget #3 directly to main and silently include contract changes. B #3 remains eight changed files against its security base. A/B #2 and B #3 remain OPEN/DRAFT.

## Recommended later integration (requires separate merge/release authorization)

1. Review A #2 and integrate the canonical candidate into A main, preserving canonical source bytes.
2. Review and integrate B #2 into B main; recheck A/B byte equality. Contract source copy integration is explicit here, never hidden inside the frontend PR.
3. Once its security base is integrated, reconcile B #3's base with main and verify the frontend diff still excludes contract source edits; integrate B #3.
4. Integrate the provenance-only and dependency-only child PRs. When bases change after upstream integration, recheck diffs/merge results and run only checks justified by changed code or dependency state.
5. The source identity gate is already VERIFIED through the user-performed local Chrome comparison plus A/B byte identity, SHA256 c24e2801e3e7266a2858596a248b3fd99801dce993e1398c3bd6840f90321d54. See intelligent-contract/SOURCE_PROVENANCE.md. Do not retry the restricted RPC or repeat passed tests to restate that result. Configuration/status fields remain unchanged by FAST-6 and require separate authorization to synchronize.
6. Under explicit publication authorization, publish the integrated frontend. A new Pages success is release evidence, not live monitor acceptance. Perform one targeted public read-only acceptance: actual request target, owner-qualified reference, OPERATIONAL/revision/checks and record 1. Distinguish static HTTP success, RPC errors and UI rendering. Record actual observed values rather than forcing the baseline if state has changed.

## Evidence boundaries

New contract 0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4 is DEPLOYED_USER_REPORTED. Source identity is VERIFIED (MANUAL_LOCAL_CHROME) for the frozen candidates; cloud independent retrieval remains blocked, and unchanged deployment.json retains earlier pending metadata. The public site remains the October 13 historical release for 0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247. The October 19 final-review HTTP 200 bundle evidence does not verify any RPC response or new monitor UI.

No new deployment transaction hash was supplied. All six original hashes and the complete historicalDeployment object remain unchanged. Original ONCHAIN_REPORT.md and evidence-fast2 files are retained without edits. Repository source consistency is independently checkable; deployed bytes are a different evidence boundary. Runtime chain/source checks in src/client.ts are unchanged.

Existing PR #3 CI run 39183007627 confirms 54/54 tests, source check and production build PASS. This documentation-only branch reuses that result; it does not repeat the tests. The dependency branch reports its own audit and necessary post-change verification in FAST4_DEPENDENCY_AUDIT.md.

No claim of new frontend release readiness is made until the reviewed dependency fix and all candidates are correctly integrated, configuration/status synchronization is separately authorized, and appropriate publication/live acceptance is completed. The recorded manual source identity does not itself approve those stages. Preparation is not publication.

## FAST-6 isolated documentation descendants

A documentation branch is based on A #2 (65da22cdbf3faf46bd104a5ce2e3d9fa4f93c873); the corresponding B documentation branch is based on B #4 (1b2242de42f9860e865dc9e077c9a51eb93909d1). Both use docs/fast6-deployment-status-20261019 within their own repository. This preserves the five original heads and keeps their new PR diffs Markdown-only. B #4 already includes deployment.json, so it is not repurposed as the FAST-6 pure-documentation PR.

Later authorized order: A #2 -> A FAST-6 docs; B #2 -> B #3 -> B #4 -> B #5 -> B FAST-6 docs. Use ordinary merge commits and retain parent branches. Before retargeting B #3 to main, prove a6d1038… is actually its ancestor; before retargeting B #4/#5, prove ae7efbb… is a main ancestor. A FAST-6 docs may target main only after 65da22c… is an A/main ancestor; B FAST-6 docs may target main only after 1b2242d… is a B/main ancestor. At every retarget, review the complete child diff and preserve the sibling changes. Squash/rebase would invalidate the original-SHA ancestry assumption and requires a preserved, traceable alternative integration plan. None of these actions occurs in FAST-6.

FAST-6 uses Markdown/relative-link/diff-only checks and reuses unchanged prior CI evidence. Documentation commits include [skip ci] to avoid automatically repeating pytest, 54 tests and builds under the existing push/PR workflows; this is not a new CI success. No workflow file is changed. Future actual integration baseline validation remains separate.
