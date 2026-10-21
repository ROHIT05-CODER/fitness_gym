# Project Memory

## Current state
- Phase A (Project Foundation), Phase B (Design Foundation), and Phase C (Public Website) have been implemented and verified.
- Production build (`npm run build`) and ESLint (`npm run lint`) pass with 0 errors and 0 warnings.
- Clean git history with distinct commits for each phase.
- Gym name is **Unisex Fitness**. Logo confirmed: `public/brand/logo.jpg` (bold black & white dumbbell illustration, circular badge style).
- Public website fully operational: Home, Programmes (6 detailed disciplines), Memberships (comparison + FAQs), About (philosophy + specs), Contact (validated API + form), Privacy Policy, and Terms of Service.

## Current proposed stack
- Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and optional Three.js / React Three Fiber.
- Supabase Auth + PostgreSQL with explicit/tested RLS policies.
- Git/GitHub, Playwright and Vercel or another reviewed host.
- Payment provider not selected yet; use provider-hosted checkout and server-side payment verification once the owner/provider details are confirmed.

## Important constraints
- Enforce authorization server-side for every private operation; never trust client-supplied roles, user IDs, amounts or payment status.
- Public signup must never grant admin role.
- Initial payment scope is one-time membership purchases; recurring billing is not included unless separately approved.
- Never store raw card details/CVV or expose provider secrets/service-role keys in browser code.
- Do not claim 100% security or vulnerability-free status; document tests, findings and residual risk.

## Owner inputs still needed
- ~~Final gym name, logo, domain and brand assets.~~ ✅ Name: **Unisex Fitness**, Logo: `public/brand/logo.jpg`
- Domain (still needed from owner).
- Address, phone, email, opening hours, social links and privacy/terms content.
- Approved membership names, prices, currency, benefits, validity, tax handling and refund/cancellation rules.
- Preferred/eligible payment provider and merchant account; sandbox/live setup.
- Admin account identities and approval process for initial role provisioning.
- Authentication method preferences (email/password, magic link or other supported option).
- Contact enquiry destination and retention/deletion requirements.
- Approved trainer profiles, photographs, credentials and genuine testimonials.

## Next step
Review the planning files, confirm the gym name and business/payment requirements, then implement Phase A from `TASKS.md`. Before any payment integration, choose and verify a provider using current official documentation and merchant requirements.

## Known issues / verification status
- No source-code build, runtime tests, payment transaction, security scan or penetration test has been run; this is a planning pack only.
