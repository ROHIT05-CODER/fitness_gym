# Test Plan

## Goal
Confirm that the public site, authentication, member dashboard, admin operations and payment flow are functionally correct, responsive, accessible and reasonably hardened. Passing this plan does not prove that the application has no vulnerabilities.

## Public UI and accessibility
- [ ] Navigation and CTA destinations work with mouse, touch and keyboard.
- [ ] Mobile menu works accessibly and focus is managed correctly.
- [ ] Owner-approved membership prices/benefits and business details are displayed accurately.
- [ ] Contact form labels, validation, pending, success and error states are clear.
- [ ] 3D has a useful static fallback; primary content remains accessible without WebGL.
- [ ] `prefers-reduced-motion` is respected.
- [ ] Images have appropriate alt text; decorative images are ignored by assistive technology.
- [ ] Test 375px, 768px, 1024px and 1440px viewports; inspect console/network failures.

## Authentication
- [ ] Sign-up, sign-in, sign-out and account recovery work for the selected auth method.
- [ ] Unauthenticated visitors cannot access member-only data or actions.
- [ ] Expired/invalid session is handled safely without showing private data.
- [ ] Public signup and profile update cannot assign/change role fields.
- [ ] Public errors do not disclose unnecessary account-existence or internal service details.

## Member data isolation and authorization
- [ ] Member A can access their own profile, membership and purchase history.
- [ ] Member A cannot access Member B records via changed URL, UUID, query parameter, request body or client state.
- [ ] Anonymous and ordinary member users cannot call admin APIs/actions directly.
- [ ] Unauthorized admin operations are denied by server checks and database policies.
- [ ] RLS tests cover select/insert/update/delete for each private table and each role.
- [ ] Admin role cannot be self-assigned from signup, browser tools or ordinary profile update.
- [ ] Privileged changes have appropriate audit attribution without excess personal data in logs.

## Admin workflows
- [ ] Authorized admin can manage only the approved fields and records.
- [ ] Invalid plan price/currency/validity values are rejected on the server.
- [ ] Consequential actions require confirmation where appropriate.
- [ ] Member/payment views show real persisted data and permission-denied states work.
- [ ] Admin sessions expiring or roles being revoked stop privileged access.

## Payment verification
- [ ] Sandbox success activates one membership only after server-side verification.
- [ ] Browser return URL alone cannot mark a payment successful.
- [ ] Invalid webhook signature is rejected.
- [ ] Amount, currency, internal order and provider IDs are matched.
- [ ] Failed/cancelled/pending/unverified payment never activates a membership.
- [ ] Duplicate webhook/event processing is idempotent.
- [ ] Out-of-order/retried webhook delivery does not corrupt terminal status.
- [ ] Provider timeout or missed webhook leaves truthful pending/unknown state and has a documented reconciliation path.
- [ ] Member A cannot inspect or change another member's order.
- [ ] No raw card data, CVV, secrets or webhook signatures are stored/logged.

## Automated checks
- [ ] Linting, TypeScript typecheck and production build pass.
- [ ] Unit/integration tests cover schemas, permission helpers and payment state transitions.
- [ ] Playwright covers primary public navigation and contact submission.
- [ ] Playwright covers auth and member dashboard access restrictions.
- [ ] Playwright covers admin denial for non-admin users.
- [ ] Payment adapter/webhook tests cover success, failure, duplicates and signature rejection.
- [ ] Test server-side validation independently of client-side controls.
- [ ] Test safe error handling and 3D fallback.

## Security checks
- [ ] No real secrets in repository, Git history or browser bundle.
- [ ] Secret values are configured in the correct environment secret store.
- [ ] Contact/auth/checkout endpoints have suitable rate/request limits and safe errors.
- [ ] Security headers/CSP/CORS and CSRF needs are reviewed.
- [ ] RLS and server-side authorization are tested as anonymous, two different members and admin.
- [ ] Dependency audit is run and findings are triaged/documented.
- [ ] Authorized security tests cover privilege escalation, IDOR/BOLA, injection, XSS and payment/webhook validation as applicable.

## Release gate
Do not describe the project as production-ready until critical tests pass, preview QA is complete, provider sandbox verification works, owner-provided content/terms are approved, and unresolved security risks are documented and explicitly accepted or fixed.
