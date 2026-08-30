# Wave 4-A GoHighLevel Pilot — Operator Handoff

## Status and authority

This packet supports a **separately authorized, controlled Preview-only verification** of the existing server-owned pilot. It is not authorization to configure Vercel, call GoHighLevel, deploy, publish, approve a Sales Partner, issue a referral, or operate payouts.

The source contract remains:

- `docs/sales-partner-machine/w4-a-ghl-automated-pilot.md`
- `docs/sales-partner-machine/go-high-level-contract.md`

## Non-negotiable boundary

Keep all configuration values in the approved secret manager or Vercel Preview environment only. Never place a token, CRM identifier, endpoint, controlled-test address, full request payload, raw API response, or screen capture containing personal data in Git, chat, source code, browser code, PR text, or this record.

The browser may call only the same-origin endpoint `POST /api/sales-partner-application`. It must not receive a GoHighLevel URL, private integration credential, location reference, pipeline reference, stage reference, or configuration value.

## Preflight authorization record

Before any environment configuration, an authorized operator must confirm all items below outside this repository.

- [ ] Written approval names the existing Vercel project and explicitly limits work to its Preview environment.
- [ ] One controlled internal test contact is approved under the applicable privacy policy.
- [ ] GoHighLevel private-integration access and the target location are approved for this closed pilot.
- [ ] The Applications pipeline, stage, owner/review route, permitted tags, duplicate policy, and test-record retention/deletion policy are approved.
- [ ] The required consent language and approved follow-up workflow are confirmed.
- [ ] A rollback owner and record-cleanup owner are assigned.
- [ ] A pre-change restore point and the current Preview deployment record are retained out of band.

If any item is missing, do not configure an environment or submit a form.

## Secure Preview-only configuration checklist

Configure only the six variable *categories* specified in the existing pilot runbook: private integration authorization, location, Applications pipeline, Applications stage, controlled-test allowlist, and pilot tag. Confirm the following without recording their values here:

- [ ] Each variable exists in the existing Vercel project’s **Preview** target only.
- [ ] The Production environment contains none of those pilot variables.
- [ ] Client bundles, built assets, repository history, command output, and PR text contain none of their values.
- [ ] The controlled-test allowlist contains only the approved one-contact pilot scope.
- [ ] The operator has confirmed the project remains linked to the intended Preview deployment path.

A Vercel target flag is intent, not proof. Before using the form, independently verify the actual deployment target and project identity. If the approved release-guardrails resource is available in the reviewed codebase, use it; otherwise stop and obtain the prescribed release evidence through the authorized process.

## Controlled verification procedure

1. Verify the deployment is `READY`, the actual target is Preview, the Vercel project is the intended signup project, and the response has the approved noindex posture.
2. From the Preview origin, submit exactly one valid application with the approved controlled contact, required consent, and no honeypot value.
3. Confirm the response is an accepted reference only—not an approval, account, payout, referral, or earnings assertion.
4. In GoHighLevel, verify exactly one contact and one open Application opportunity were created with the approved tags and required intake fields.
5. Re-submit the same payload once during the same pilot process. Verify that the duplicate policy prevents an additional remote opportunity write.
6. Verify the approved follow-up occurs no more than once, then apply the approved retention/deletion policy to the controlled test record.
7. Record only the evidence categories below. Do not retain raw CRM data or personal data in this repository.

## Evidence record template

Store the following summary in the approved internal system, not in the repository:

| Evidence category | Record only |
|---|---|
| Authorization | approver role, approval timestamp, Preview-only scope |
| Release identity | deployment reference, actual target, project identity, restore-point reference |
| Form safeguards | consent accepted, honeypot rejected when exercised, non-allowlisted attempt rejected when authorized to test |
| CRM outcome | one contact / one opportunity confirmation, tag and field-mapping confirmation, duplicate-policy result |
| Follow-up and retention | single-workflow confirmation, record disposition confirmation |
| Incident response | whether rollback occurred, responsible role, remediation reference |

## Stop conditions and rollback

Immediately stop the pilot and leave Production untouched if the actual target is not Preview, the project identity does not match, the test contact is not permitted, environment scope is unclear, any value appears in a client bundle, a remote write is duplicated, or the workflow produces an unapproved outcome.

Rollback is fail-closed:

1. Stop submissions and do not retry against Production.
2. Remove the pilot variable categories from the Preview environment or restore the approved prior Preview release.
3. Do not repoint a Production alias or alter Production variables.
4. Reconcile the controlled records under the approved retention/deletion policy.
5. Record an incident summary without credentials, identifiers, or personal data; require a new authorization before retrying.

## Handover completion criteria

This packet is complete when the next operator can identify the required approvals, secure configuration boundaries, verification evidence, and rollback path without asking for secrets in chat or inspecting source for sensitive values. It does **not** make the pilot live-ready or Production-ready.
