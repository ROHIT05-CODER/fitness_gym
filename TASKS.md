# Build Tasks

Work in order. Implement one small end-to-end behavior at a time. Mark a task complete only after its acceptance checks pass.

## Phase A — Project foundation
- [x] Confirm final gym name/logo and approved brand assets — **Unisex Fitness**, logo at `public/brand/logo.jpg`.
- [x] Verify Node.js LTS, npm, Git and editor versions.
- [x] Create Next.js + TypeScript App Router project; configure Tailwind and strict typing.
- [x] Initialize Git and make a clean initial commit.
- [x] Add lint, typecheck, test and build scripts; verify a clean baseline.
- [x] Add `.gitignore`, `.env.example` and secret-scanning/review checklist.
- [x] Set up separate local/preview/production configuration plan.

**Acceptance:** Clean install; development server starts; lint/typecheck/build pass; no real secrets are tracked.

## Phase B — Design foundation
- [x] Implement monochrome design tokens and typography scale.
- [x] Build shared page container, buttons, fields, cards, alert/status components and section headings.
- [x] Build responsive header, accessible mobile menu and footer.
- [x] Define focus, disabled, loading, error and reduced-motion behaviors.

**Acceptance:** Consistent public UI and accessible navigation at 375px, 768px, 1024px and 1440px.

## Phase C — Public website
- [x] Build homepage, about, programme cards and contact section.
- [x] Add configurable membership plan display with owner-approved prices/benefits only.
- [x] Add trainer profiles/testimonials only when approved content exists (deferred until owner provides approved headshots/credentials).
- [x] Add server-handled contact form with schema validation, length/body limits and abuse protection.
- [x] Add privacy and terms pages using owner/legal-approved content before launch.

**Acceptance:** All links/CTAs work; contact input is rejected on the server when invalid; no invented business claims or fake success states.

## Phase D — 3D enhancement
- [x] Prototype one lightweight 3D gym visual.
- [x] Add loading/error fallback and static alternative.
- [x] Respect reduced-motion preferences and test unsupported WebGL behavior.
- [x] Inspect bundle size, loading and behavior on mobile hardware.

**Acceptance:** All core content and actions work without 3D; motion does not block the primary CTA.

## Phase E — Authentication and member portal
- [x] Configure Supabase Auth using documented server/client patterns.
- [x] Implement sign-up, sign-in, sign-out and account recovery for selected auth method.
- [x] Define profile schema and migration; do not accept role values from user profile input.
- [x] Create and test RLS policies before connecting member-facing pages to private data.
- [x] Build member dashboard for own profile, memberships and verified purchase/payment history.
- [x] Add server-side authorization/ownership checks to every member data operation.
- [x] Test unauthenticated access, expired sessions, and attempts to access another member's records.

**Acceptance:** Authentication works; members can read only their own private records; protected server operations reject unauthenticated callers.

## Phase F — Admin dashboard and role provisioning
- [x] Define role/permission model and migration; document who can grant or revoke admin.
- [x] Implement a secure owner-controlled first-admin provisioning procedure.
- [x] Build admin route layouts and verify admin role on server for every protected operation.
- [x] Implement plan management with server-side validation and safe defaults.
- [x] Implement minimal member lookup/management with least-privilege fields.
- [x] Add payment/order status view backed by verified server data.
- [x] Add audit-relevant attribution for privileged changes without logging excessive personal data.
- [x] Test member, anonymous and unauthorized-admin denial paths across routes, actions and database policies.

**Acceptance:** Non-admin users cannot read admin data or perform admin actions even when bypassing the UI. Admin role cannot be self-assigned through public flows.

## Phase G — Payment integration
- [ ] Select provider after confirming merchant eligibility, current docs, fees, supported regions/currency and refund requirements.
- [ ] Configure sandbox credentials only; keep secrets server-side.
- [ ] Define membership plan and purchase/payment schema with integer minor-unit amounts and database constraints.
- [ ] Implement server-side order creation using trusted plan amount/currency.
- [ ] Implement provider checkout, pending/return UI and server-side payment verification.
- [ ] Implement signed webhook verification using the provider's current official guidance.
- [ ] Make webhook/event processing idempotent and handle retries/out-of-order events safely.
- [ ] Activate a membership only after trusted verification confirms the expected order, amount and currency.
- [ ] Test success, failure, cancellation, pending, duplicate webhook, invalid signature, wrong amount/currency and delayed webhook cases.
- [ ] Confirm receipt, cancellation/refund policy and support path with the owner.

**Acceptance:** No client redirect or client-supplied state can mark a purchase paid; duplicate events do not double-activate memberships; raw card details are never stored.

## Phase H — Security and end-to-end verification
- [ ] Run lint, typecheck, unit/integration tests, Playwright and production build.
- [ ] Test member ownership isolation and admin role boundaries against server routes/actions and RLS.
- [ ] Review auth/session configuration, CSRF protections where applicable, security headers, CSP and CORS.
- [ ] Run dependency audit and review findings; run applicable security tests/scans in an authorized environment.
- [ ] Check repository and built browser bundle for exposed secrets.
- [ ] Verify request-size limits, rate limits and safe error handling on public/auth/payment endpoints.
- [ ] Test all supported breakpoints, keyboard flow, reduced motion and 3D fallback.
- [ ] Document any unresolved vulnerabilities/risks; no “vulnerability-free” claims.

**Acceptance:** Critical user journeys pass, authorization denials are verified, payment states are server-confirmed, and outstanding security risks are documented and accepted or fixed.

## Phase I — Staging and production launch
- [ ] Deploy a preview using sandbox/test credentials and test data.
- [ ] Perform owner QA on public pages, member flows, admin flows and end-to-end sandbox checkout.
- [ ] Configure production secrets and provider webhook URL only after approval.
- [ ] Deploy production after review; confirm HTTPS and security settings.
- [ ] Test the live site logged out, as a member and as an admin; test bad inputs and denied permissions.
- [ ] Configure error monitoring, uptime alerts and database backups/restore practice.
- [ ] Update docs and record final QA/release status.

**Acceptance:** Owner approves launch; no known critical/high issue is silently ignored; recovery/monitoring responsibilities are assigned.

## Not included unless separately approved
- Recurring/auto-renewing payments, stored cards or card vaulting.
- Workout/diet tracking or sensitive health data.
- Native mobile application, community feed, AI chatbot or trainer booking calendar.
- Multi-branch/tenant setup or complex accounting/refund automation.
