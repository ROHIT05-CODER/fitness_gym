# AI Coding Rules

1. Read `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/SECURITY.md`, `docs/PAYMENTS.md`, `docs/TEST_PLAN.md`, `docs/DECISIONS.md`, `docs/MEMORY.md` and `TASKS.md` before substantial changes.
2. Work in small, testable changes. Do not build the entire application in one unreviewable pass.
3. Use TypeScript strict mode; avoid `any` and explain exceptional use.
4. Reuse design tokens and components; keep UI code separate from privileged data access.
5. Do not modify unrelated files or add dependencies without explaining the need and checking compatibility.
6. Use official framework, auth and payment-provider documentation for integration details. If a provider-specific requirement is unknown, stop and list the decision rather than guessing.
7. Validate and normalize all untrusted input on the server. Client validation is for UX only, never a security boundary.
8. Authenticate every protected server operation. Authorize the specific action and resource on the server. Never trust client-supplied user IDs, role values, amounts, membership statuses or payment statuses.
9. Never permit public signup/profile update to grant or modify administrative roles. Document the owner-controlled first-admin process.
10. Keep all secret keys and service-role credentials server-only. Never put private secrets in `NEXT_PUBLIC_*` values, source code, logs or Git.
11. For payments, calculate amount/currency from trusted server-side plan data, verify provider responses/webhooks, process events idempotently, and activate membership only after verified payment. Never store raw card data/CVV.
12. Create/test database RLS policies for every table; test denied access as well as allowed access. UI route guards do not replace backend/database authorization.
13. Treat user input, uploaded content, external links and provider responses as untrusted.
14. Never claim “100% secure” or “vulnerability-free.” State checks actually run, findings, mitigations and remaining risks.
15. Every visible control must work or be clearly disabled. Do not fake success for auth, admin actions, forms or payment.
16. Follow accessibility requirements: semantic elements, labels, keyboard operation, visible focus, suitable contrast and reduced motion.
17. Make 3D optional and progressively enhanced, with a fallback and performance checks.
18. Run relevant lint, typecheck, tests and production build after changes. Do not claim a command passed unless it ran successfully.
19. Add/update tests for auth, member data isolation, admin authorization, payment verification/idempotency and public form validation.
20. Make small descriptive Git commits after checks pass; never commit `.env.local` or real secrets.
21. Update `TASKS.md` and `docs/MEMORY.md` after each phase and keep architecture/security/decision docs aligned with implementation.
22. If a requirement depends on missing owner information, ask one focused question or mark it as pending; do not fabricate details.
