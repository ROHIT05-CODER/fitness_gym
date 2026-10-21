# Design System and UX Direction

## Brand identity
- **Gym name:** Unisex Fitness; logo is available at `public/brand/logo.jpg` (black & white dumbbell illustration).
- **Direction:** Premium, athletic, minimal, bold, black and white.
- **Primary colors:** black `#000000`, white `#FFFFFF`, charcoal `#171717`, muted gray `#BDBDBD`, border `#343434`; optional light section `#F5F5F5` with dark text.
- Do not introduce bright accent colors without approval. Verify contrast for every actual text/control pairing.

## Typography and layout
- Use a bold display face for headlines where licensing and performance permit; pair with a readable sans-serif for body text and forms.
- Use a clear spacing/type scale, generous whitespace, bold headlines and concise body copy.
- Buttons, cards, inputs, alerts and status badges must be reusable and consistent.
- Interactions must show clear keyboard focus and active/disabled/loading states.

## Public pages
1. Navigation / placeholder brand mark.
2. Hero: draft headline “BUILT BY DISCIPLINE. DEFINED BY STRENGTH.”, supportive copy and clear primary/secondary CTAs.
3. About / gym philosophy.
4. Training programme cards.
5. Membership plan comparison with real owner-approved pricing and benefits.
6. Trainer profiles only when approved details exist.
7. Genuine testimonials only when supplied and permission is confirmed.
8. Contact form and actual business details.
9. Minimal footer with privacy policy and terms links.

## Authentication pages
- Provide clear sign-in, sign-up and account recovery states when those methods are enabled.
- Avoid exposing whether an email address has an account when doing so could enable enumeration; follow the selected provider's recommended patterns.
- Make errors understandable without revealing internal service details.
- Show password requirements and accessible show/hide controls if password-based auth is used.
- Provide loading, invalid input, generic failure and success/pending states.

## Member dashboard
- Keep account details, current membership, validity dates, purchase/payment history and available next actions easy to scan.
- Use clear textual status labels such as Pending, Active, Expired, Failed or Refunded; do not rely on color alone.
- Empty states should explain the next action (for example, view membership plans) without implying a purchase succeeded.
- Show only the signed-in member's own data.

## Admin dashboard
- Use a denser but consistent layout with a sidebar/top navigation, clear page titles, searchable tables where needed, and confirmation for consequential actions.
- Separate member management, plan management and payment records.
- Use clear permission-denied and session-expired states.
- Destructive/irreversible actions need confirmation and should be limited to authorized roles.
- Display status based on server data; avoid optimistic UI for privileged or payment-state mutations unless the final server result is handled accurately.

## Online checkout
- Make the plan, price, currency, validity and relevant terms clear before leaving for provider checkout.
- Explain that payment is processed by the selected payment provider.
- On return, show “Verifying payment”/“Payment pending” until the backend has verified the status.
- Include clear failed/cancelled/pending states and a path to retry or contact support.
- Do not collect or render raw card numbers/CVV in gym-owned forms.

## 3D and motion
- One restrained 3D hero visual such as a chrome dumbbell, barbell detail or abstract fitness sculpture.
- Use smooth transitions, subtle lighting and limited scroll-linked motion; no scroll hijacking or excessive movement.
- Respect `prefers-reduced-motion`; lazy-load the scene and provide a static fallback.
- Core page content, authentication, checkout status and CTAs must remain usable if WebGL fails.

## UX states
Every feature defines loading, empty, validation error, server error, permission denied, unauthenticated/session expired, pending and success states where applicable. Never show fake success states.

## Responsive targets
Verify at 375px, 768px, 1024px and 1440px. Mobile tables should reflow or provide an accessible scroll pattern; dialogs must be keyboard accessible and not obscure important information.

## Content integrity
Use concise, clear English by default. Gym address, hours, contact details, prices, plan benefits, trainer credentials, reviews and member statistics must come from the owner or verified records. Never invent public claims.
