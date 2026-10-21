# Security Requirements

## Principles
- Minimize data collection and third-party services.
- Treat all browser input, provider responses and webhook payloads as untrusted until validated.
- Enforce authentication, authorization and payment state transitions on the server/database.
- Use least privilege and secure defaults.
- No application can be guaranteed “100% secure”; verify controls and record residual risks.

## Authentication and sessions
- Use a maintained auth provider (proposed: Supabase Auth) and follow its current official guidance for framework/server sessions.
- Require authentication for member pages and every member-specific API/server action.
- Validate sessions on the server using supported helpers; never trust a user ID supplied in the request body or URL as proof of identity.
- Use the provider's recommended secure cookies/session controls. Set Secure in production, HttpOnly where applicable, and appropriate SameSite attributes for cookie sessions.
- Configure email verification and password recovery according to the selected login method; rate-limit sensitive auth actions where supported.
- Avoid account enumeration in public errors. Do not log passwords, raw tokens, recovery links or session cookies.

## Authorization and roles
- Define roles/permissions centrally. Member and admin are distinct trust levels.
- Verify the actor's role and resource-level permission on every protected server action, route handler and database operation.
- Public signup and ordinary profile updates must not write role/permission fields.
- Grant the first admin through a documented owner-controlled procedure. Admin role changes must be restricted, validated and attributable.
- Test direct URL access, manipulated IDs, request-body role injection, horizontal privilege escalation and vertical privilege escalation.
- Use Supabase RLS policies as a second enforcement layer; do not rely only on application route guards.
- Keep service-role/elevated credentials server-only and use the minimum scope/operations needed.

## Database and personal data
- Use foreign keys, constraints and safe migrations.
- Default private tables to deny public access, then add narrow RLS policies for each required action.
- Members should access only their own profile, memberships and purchases.
- Admin access must be deliberate and limited to the documented admin role/permissions.
- Collect only necessary profile/contact information. Do not collect health details unless the product scope, privacy requirements and protections are explicitly reviewed.
- Define retention, correction and deletion processes with the owner before production use.
- Keep backups protected and document restore procedures.

## Payment security
- Use the selected provider's supported hosted/redirect checkout or documented compliant checkout component; the application must not collect/store raw card numbers or CVV.
- Compute price and currency from trusted server-side plan records. Ignore client-provided amounts, discounts, status flags and membership duration unless validated against server-side rules.
- Create a pending internal order before redirecting to checkout and bind it to the authenticated member and selected plan.
- Verify provider callback/signature server-side. Follow current official provider documentation for signature construction, raw-body requirements, timestamps and replay protection.
- Validate webhook signature before acting, validate expected order/payment identifiers, amount, currency and final status, and update state transactionally where practical.
- Store provider event IDs and process idempotently so retries cannot duplicate activation or financial state changes.
- Treat browser redirects as user experience only, never as proof of payment.
- Keep provider secret keys and webhook secrets out of browser bundles, Git and logs. Separate sandbox and live credentials.
- Do not activate membership for failed, cancelled, pending, unverified or mismatched payment states.
- Define refund/cancellation and reconciliation handling before production. Do not claim automated refunds exist until implemented and tested.

## Contact forms and public endpoints
- Validate/normalize all fields server-side with an allowlisted schema.
- Apply field length, request body size, rate-limit and anti-abuse controls.
- Render user-submitted text safely; never inject raw HTML.
- Avoid logging full messages, phone numbers or other unnecessary personal data.
- Return generic safe errors without stack traces or internal provider/service details.

## Secrets and configuration
- Commit `.env.example` only, with variable names and empty values.
- Never place private API keys, payment secrets or Supabase service-role credentials in `NEXT_PUBLIC_*` variables.
- Use separate local, preview, sandbox and production values.
- Review source, Git history and built browser assets for leaks. Rotate exposed credentials promptly; deleting them in a later commit is insufficient.

## Application hardening
- Enforce HTTPS in production.
- Review Content Security Policy, frame protections, MIME sniffing protections, referrer policy and other suitable security headers.
- Apply CSRF protections when required by the chosen cookie/session/request design.
- Prefer same-origin server routes; restrict CORS if cross-origin access is necessary.
- Use parameterized database operations and safe query construction.
- Keep dependencies supported and review security audit output. Do not automatically assume every scanner finding is exploitable or harmless; triage and document.
- Add safe error boundaries and avoid leaking operational details to visitors.
- Protect admin mutations against accidental/destructive changes; consider audit records for sensitive operations.

## Monitoring and incident response
- Monitor errors, authentication anomalies and failed webhook processing without logging secrets or excess personal data.
- Define how to investigate mismatched/pending payments and reconcile with the provider.
- Assign owners for dependency updates, secret rotation, backup restore and incident response.

## Launch checklist
- [ ] Confirm production auth redirect URLs and session/security settings.
- [ ] Review authorization for every member/admin page, route, action and table.
- [ ] Test RLS policies as anonymous, member A, member B and admin.
- [ ] Verify admin roles cannot be self-assigned.
- [ ] Verify provider webhook signature, amount/currency/order match, idempotency and membership activation rules.
- [ ] Confirm sandbox/live environments and secret storage separation.
- [ ] Review headers, CSP, CORS, CSRF applicability and endpoint abuse limits.
- [ ] Run dependency audit and authorized security tests; record findings and residual risk.
- [ ] Scan repository and frontend bundle for exposed secrets.
- [ ] Confirm privacy notice, retention/deletion approach, refund/cancellation terms and support contact.
- [ ] Ensure backups, monitoring and an incident/payment reconciliation owner are assigned.
