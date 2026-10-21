# Architecture Decision Records

## ADR-001: Use Next.js with TypeScript
**Status:** Proposed  
**Decision:** Use Next.js App Router with TypeScript for public pages and server-side actions/routes.  
**Reason:** Supports a shared application framework, server rendering and protected server flows.  
**Trade-off:** The team must follow server/client component boundaries and keep privileged modules server-only.

## ADR-002: Use Supabase Auth + PostgreSQL for member data
**Status:** Proposed  
**Decision:** Use Supabase Auth and PostgreSQL, with documented/tested RLS policies.  
**Reason:** The requested member portal, admin dashboard and payment records need authentication and persistent data.  
**Trade-off:** Security depends on correct session validation, role management and RLS; the service-role key must never be exposed in the browser.

## ADR-003: Scope member/admin/payment features into version one
**Status:** Approved at planning level; details need owner confirmation  
**Decision:** Plan public website, member authentication/dashboard, role-protected admin dashboard and one-time online membership purchases.  
**Reason:** This is the user's requested scope.  
**Trade-off:** More integration and verification are required than a static enquiry site. Build in incremental phases; do not shortcut authorization or payment verification.

## ADR-004: Payment provider remains undecided
**Status:** Pending owner/provider research  
**Decision:** Keep payment integration behind a narrow server-side adapter and choose provider only after checking current official documentation, merchant eligibility, fees, settlement, supported currency/region and refund/dispute requirements.  
**Reason:** A provider cannot be responsibly selected until the business context is confirmed.  
**Revisit when:** The owner has a merchant account/provider preference and required commercial details.

## ADR-005: One-time membership purchases first
**Status:** Proposed  
**Decision:** Do not implement recurring/auto-renewing billing or stored cards in the initial release.  
**Reason:** The user requested online payments but did not specify recurring billing. A one-time purchase is a narrower scope and easier to verify.  
**Revisit when:** The owner explicitly approves recurring billing and associated terms/workflows.

## ADR-006: Use 3D as progressive enhancement
**Status:** Proposed  
**Decision:** Use a single lightweight 3D hero visual with a static fallback.  
**Reason:** 3D is part of the design request, but the website must remain usable on low-powered devices and where WebGL fails.

## ADR-007: No fabricated business claims
**Status:** Agreed for planning  
**Decision:** Do not publish unverified prices, staff credentials, testimonials, statistics or gym details.  
**Reason:** Public and transactional information must be accurate and owner-approved.

## ADR-008: Server-side authorization is mandatory
**Status:** Agreed for planning  
**Decision:** Check actor identity, role and resource ownership for each protected operation, and apply database RLS as an additional control.  
**Reason:** Client-side route guards and hidden controls are not security boundaries.
