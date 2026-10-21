# Architecture

## Proposed stack
The proposed foundation follows the supplied Vibe Coding Playbook's Phase 2 recommendations, adapted for the approved project scope.
- **AI-assisted editor:** Cursor or VS Code.
- **Frontend and server routes:** Next.js with TypeScript (App Router).
- **Styling:** Tailwind CSS with shared design tokens.
- **Motion:** Framer Motion, used sparingly.
- **3D:** Three.js / React Three Fiber for a single hero visual, with static fallback.
- **Auth and database:** Supabase Auth + PostgreSQL, with Row Level Security (RLS) policies designed and tested before data is exposed.
- **Version control:** Git and GitHub.
- **Testing:** Playwright for end-to-end flows, plus unit/integration tests for permissions and payment event processing.
- **Deployment:** Vercel or another supported host, with separate preview and production settings.
- **Payments:** Provider TBD; use provider-hosted checkout and server-side order creation/verification. Choose a provider only after confirming merchant eligibility and reviewing current official documentation.

## High-level flows
### Public content and contact
1. Browser requests a Next.js page; public content is rendered server-side where practical.
2. Public forms submit to server route handlers.
3. Server validates/normalizes fields, applies abuse controls, and calls only configured providers.
4. UI shows success only after the server confirms successful processing.

### Authentication and member data
1. User signs up/signs in through the configured Supabase Auth flow.
2. Server-side code validates the user's session using supported Supabase server-client patterns; do not trust a user ID supplied by the browser.
3. Every member data read/write is scoped to the authenticated principal and protected by appropriate RLS policies.
4. Server actions/route handlers re-check authentication and ownership before executing protected operations.
5. Admin-only operations also verify an admin role that cannot be assigned by public signup. Where an elevated server-only key is needed, keep it in server-only code and narrowly scope its use.

### Membership purchase and payment
1. Member selects a plan from the database-backed list of active plans.
2. Server fetches the current plan price/currency from trusted storage and creates an internal pending purchase/order.
3. Server creates a provider order for the exact amount/currency; secrets are never sent to the browser.
4. Browser opens provider checkout using only the provider's documented public/client identifier where required.
5. Return/redirect routes show pending status until trusted server verification is complete.
6. A signed webhook (and provider API verification where required) is validated on the server. Event handling is idempotent and resilient to retries/out-of-order events.
7. Only the server transitions payment/purchase state and grants membership based on verified provider data.
8. Member and admin dashboards read the persisted status, not client-supplied status flags.

## Suggested folder layout
```text
gym-website/
  .cursor/rules/
    general.mdc
    frontend.mdc
    backend.mdc
    testing.mdc
  docs/
    PRD.md
    ARCHITECTURE.md
    DESIGN.md
    SECURITY.md
    PAYMENTS.md
    TEST_PLAN.md
    DECISIONS.md
    MEMORY.md
  app/ or src/app/            # choose one and keep it consistent
    (public)/
    (auth)/
    member/
    admin/
    api/
  components/
  features/
    contact/
    auth/
    members/
    admin/
    memberships/
    payments/
    programmes/
    trainers/
  lib/
    supabase/
    auth/
    payments/                 # server-only provider adapter(s)
    validation/
  types/
  utils/
  tests/
    unit/
    integration/
    e2e/
  public/
  README.md
  TASKS.md
  .env.example
  .gitignore
```

Choose either `app/` or `src/app/` during setup; do not create both. Update this doc to reflect the choice.

## Module boundaries
- **UI components:** Presentation-only where possible; no direct privileged database access.
- **Feature modules:** Own relevant UI, types, schemas and services.
- **Server routes/actions:** Validate payloads, authenticate callers, authorize actions, limit abuse, and call providers.
- **Server-only infrastructure:** Supabase server clients, payment-provider clients and secret-bearing code. Use framework/server-only safeguards as appropriate.
- **Shared types:** Include only fields safe for client/server sharing; never expose secrets or privileged role-management details.
- **Payment adapter:** Isolate provider-specific order creation and webhook verification behind a narrow service boundary to avoid spreading provider logic across UI.

## Initial data model proposal
Create migrations and policies before building data-backed pages. Exact schema needs review before implementation.
- `profiles`: user ID linked to the auth provider, display name and minimal profile fields.
- `user_roles` or equivalent controlled role mapping: user ID, role and audit metadata; role mutation is never available to ordinary users.
- `membership_plans`: name, description, amount in integer minor units, currency, validity duration, benefits, active flag, created/updated metadata.
- `purchases` / `payments`: owner user ID, plan ID, authoritative amount/currency, internal status, provider order/payment IDs, timestamps and idempotency identifiers. Do not store card data.
- `memberships`: owner user ID, plan ID, purchase/payment reference, start/end dates, status and timestamps.
- `payment_webhook_events`: provider event ID, processing status and minimal metadata for idempotency/auditing; avoid unnecessary personal data.
- `contact_enquiries` (optional): only if the owner approves storage and retention/deletion rules.

Use constraints and foreign keys. Store monetary values as integer minor units rather than floating-point numbers. Define RLS policies for every table and test both allowed and denied operations.

## Data and authorization rules
- Public visitors can read only published public information and active membership plans.
- Members can read their own profile, purchases, payments and memberships only.
- Ordinary members cannot read or change roles, change another user's data, publish content or edit plans.
- Admin operations require a server-verified role plus narrowly scoped permissions. Database policies must not assume that hiding a page protects data.
- Never expose a Supabase service-role key in browser code. Prefer user-scoped server clients for user operations; use elevated access only for narrowly defined privileged jobs after explicit authorization checks.

## Error handling and operations
- Return safe public messages without stack traces/provider secret details.
- Log operational identifiers and outcomes while minimizing personal/payment data.
- Do not log payment secrets, webhook signature values, raw auth tokens, full messages or card data.
- Monitor webhook failures and provide a safe reconciliation procedure for pending/uncertain transactions.
- Keep backups and recovery procedures for production data; test restore procedures before relying on them.

## Environment management
- `.env.example` lists variable names only.
- Real secrets belong in `.env.local` for development and in the hosting provider's secret manager for preview/production.
- Public/client variables must contain only values explicitly safe to disclose, such as a provider's documented public checkout key if required.
- Use separate Supabase projects/accounts and payment sandbox/live credentials for development/preview versus production where the providers support this.
