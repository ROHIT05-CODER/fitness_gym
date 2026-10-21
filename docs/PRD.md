# Product Requirements Document (PRD)

## Product identity
- **Gym name:** Unisex Fitness
- **Product type:** Responsive public gym website + member portal + admin dashboard + online membership purchase flow.
- **Status:** Planning only; no production application code has been implemented.

## Problem and outcome
Prospective members need a clear, premium way to understand the gym, compare programmes and membership options, and pay for a membership. Existing members need a secure account to view their membership and payment status. Authorized staff need an administrative workspace to manage the information required to run the site.

## Target users and roles
1. **Visitor:** Views public pages and can submit a contact enquiry.
2. **Member:** Signs up/signs in, manages basic account details, purchases an available membership plan, and views their own membership and payment status.
3. **Administrator:** Has explicitly granted administrative permissions to manage approved public content, membership plans, member records and payment status. The admin role must never be granted through client-side form input or public signup.

Role names and permissions must be centralized, documented, and enforced on the server for every protected page/action/API operation. A hidden button or client-side route check is not authorization.

## Product goals
1. Present a premium black-and-white fitness brand with restrained, accessible visual design.
2. Keep programme and membership information understandable on mobile and desktop.
3. Support reliable authentication and secure, owner-authorized admin functionality.
4. Allow online membership purchases through a selected payment provider without handling raw card data directly.
5. Show membership/payment states only from verified server-side data.
6. Use 3D and motion as progressive enhancements without harming speed, accessibility or core flows.
7. Verify critical user journeys and document remaining security risks before launch.

## MVP features
### Public website
1. **Home page:** Hero message, primary calls to action, about/benefits summary, programme preview, membership preview and contact CTA.
2. **Training programmes:** Strength training, bodybuilding, functional fitness, HIIT, personal training and weight management. Text and availability must be editable from a clear data source.
3. **Membership plans:** Configurable plan name, price, currency, duration/validity, benefits and availability. All public values must match owner-approved data.
4. **Trainer profiles:** Use only supplied photos, names, specializations and verified qualifications; omit if content is not approved.
5. **Contact/enquiry form:** Name, email, optional phone and message; server validation, length/request limits, abuse protection, and accurate status messaging.
6. **Responsive navigation/footer:** Working links, legal links and actual business contact details.
7. **3D hero:** One lightweight gym-inspired 3D visual, optional static fallback and reduced-motion support.

### Member authentication and portal
1. **Sign up/sign in/sign out:** Use a maintained authentication provider (proposed: Supabase Auth); follow supported secure session patterns.
2. **Account recovery:** Support the provider's verified email/password recovery flow if password-based authentication is enabled.
3. **Member dashboard:** Display the signed-in member's own profile, active/past membership status, purchase/payment history, and links to available plans.
4. **Profile management:** Permit only explicitly supported fields and verify ownership server-side.
5. **Authorization:** A member can never read or update another member's private information by changing a URL, request body, or record ID.

### Admin dashboard
1. **Admin-only access:** Require an authenticated account and a server-verified admin role before serving admin data or performing admin actions.
2. **Overview:** Show useful counts/status summaries derived from real database records; do not fabricate numbers.
3. **Membership plan management:** View/create/update/disable plan metadata and public descriptions, with server-side validation and audit-relevant attribution.
4. **Member management:** Search/view a minimal set of member details and change only approved administrative fields. Avoid collecting unnecessary sensitive fitness/health data.
5. **Payment visibility:** View order/payment status and provider reference needed for support. Admin UI must not claim a payment succeeded until verified by the server/provider webhook.
6. **Safe operations:** Confirm destructive or consequential actions, show accurate success/failure states, and log privileged actions without storing unnecessary personal data.
7. **Initial admin setup:** Use a documented secure owner-controlled process (manual database/provider configuration or a protected bootstrap procedure). Never allow public self-promotion to admin.

### Online membership payments
1. **Checkout:** Member chooses an available plan; server reads the authoritative price/currency from the database and creates a payment order with the selected provider.
2. **Hosted/provider checkout:** Use the provider's supported checkout UI so the application does not handle or store raw card numbers or CVVs.
3. **Verification:** Verify provider callback/signature server-side and confirm payment using the provider's authoritative API or signed webhook as required by its current documentation.
4. **Webhook processing:** Validate signatures, handle duplicate/out-of-order events idempotently, and store the verified event/order state.
5. **Membership activation:** Activate the membership only after trusted server-side verification that the payment completed and matches the expected order, amount and currency.
6. **Member receipt/status:** Show a clear pending, succeeded, failed or refunded status based on verified persisted state. Do not treat redirect-to-success alone as proof of payment.
7. **No card storage:** Never store full card data, CVV, or payment credentials in the gym database or logs.

## Non-functional requirements
- Responsive at 375px, 768px, 1024px and 1440px widths.
- Accessible semantic HTML, keyboard navigation, visible focus, labels, useful image alternatives and reduced-motion support.
- Good Core Web Vitals; lazy-load noncritical media and avoid blocking initial content with 3D.
- TypeScript strict mode, reusable components and maintainable feature boundaries.
- Validate all untrusted input on the server; enforce authorization on every protected operation.
- Use secure session handling, restrictive database policies and secrets management.
- Clear loading, empty, pending, error and success states.
- Automated tests for auth, member isolation, admin access, checkout verification and critical public flows.
- Separate development, payment sandbox, preview and production configurations.

## Success / acceptance criteria
- Public pages and calls to action work across supported viewports.
- Member can sign up/sign in/out and recover their account according to configured auth flow.
- A member cannot access another member's data by altering URLs, IDs, requests or client state.
- Non-admin users are denied admin pages, server actions, API routes and database operations.
- Public signup cannot grant an admin role, and role changes are server-controlled.
- Server-calculated plan price/currency is used for each payment order; client-provided amounts are ignored.
- Payment state is persisted only after provider verification/webhook processing; duplicate webhooks do not create duplicate purchases or membership activations.
- A failed, cancelled, pending or unverified payment never activates a membership.
- No known critical/high security issue is silently ignored before production.
- The site remains usable when WebGL/3D assets fail and when reduced motion is enabled.

## Not included in initial version unless approved
- Native mobile application.
- Recurring/auto-renewing subscriptions, saved cards or card vaulting.
- Workout tracking, diet plans, health-data collection or AI chatbot.
- Trainer booking/calendar and messaging.
- Social feed/community features.
- Automated refunds/chargebacks workflows or complex accounting integrations.
- Multiple gym branches, franchise/tenant support or advanced analytics.

## Owner decisions / assumptions to confirm
- The final gym name/logo/domain are pending.
- Payment provider remains undecided pending merchant eligibility and a review of current provider documentation/fees/terms.
- Initial payments are one-time membership purchases, not recurring billing.
- Currency, taxes, membership validity, refund/cancellation terms, and receipt requirements must be provided by the owner.
- First admin accounts must be provisioned securely by an owner-controlled process.
- Actual prices, business details, trainer information and testimonials must be supplied/approved; do not invent public claims.
