# Online Membership Payments

## Status and scope
- **Provider:** Not yet selected. Confirm merchant eligibility, supported geography/currency, current provider docs, fees, settlement, refunds, dispute workflow and required verification before deciding.
- **Initial transaction model:** One-time membership purchase only.
- **Recurring billing:** Out of scope unless the owner explicitly approves it and the provider/legal/product requirements are reviewed.
- **Card data:** The gym application must not collect or store raw card numbers or CVV.

## Required purchase flow
1. The authenticated member selects an active membership plan.
2. Server validates plan ID and member session; it loads the authoritative plan, price, currency and validity from the database.
3. Server creates a pending internal purchase/order with a unique internal ID, member ID, plan ID, integer minor-unit amount, currency and `pending` state.
4. Server creates the provider-side order using server-only credentials and sends the browser only the provider data explicitly intended to be public.
5. Browser completes checkout using the selected provider's supported checkout flow.
6. Redirect/return page displays a pending/verifying state and asks the server for current order status. It must not set paid status itself.
7. Server verifies callback/signature and processes the provider's signed webhook according to the provider's current official documentation.
8. Server matches provider order/payment to the internal order, member, amount, currency and an eligible final status. A transaction or other concurrency-safe mechanism updates the order/payment state and membership record.
9. Member dashboard and admin payment view display the state persisted by the server.

## State handling
At minimum, plan for: `pending`, `succeeded`, `failed`, `cancelled`, `refunded` and, where needed, `partially_refunded` or `requires_review`. Define exact provider-to-internal mappings before implementing. Do not let a client directly write any payment or membership state.

## Webhook requirements
- Verify the signature using the exact raw request body and algorithm/process required by the chosen provider.
- Reject invalid signatures and malformed/oversized payloads.
- Persist or otherwise track provider event IDs so duplicate delivery is idempotent.
- Handle webhook retries and out-of-order events without reverting a terminal state incorrectly.
- Return successful acknowledgements only according to provider guidance once events are durably processed or safely queued.
- Log minimal event/provider IDs and result codes; do not log secrets, signatures, card data or unnecessary personal details.
- Provide a safe reconciliation process for missed webhooks and ambiguous payments.

## Data model requirements
- Store monetary amounts as integer minor units, not floating-point values.
- Store currency explicitly and verify it matches the expected order.
- Store internal order ID, provider order/payment IDs, member ID, plan ID, status timestamps, and minimal event-processing metadata.
- Add unique constraints for provider IDs/event IDs as appropriate.
- Never store full card numbers, CVV, or provider secret credentials.
- Keep membership activation tied to a verified successful payment, with membership creation/activation designed to avoid duplicate webhook side effects.

## Required tests
- Successful sandbox checkout activates exactly one membership.
- Invalid or missing signature cannot change payment or membership status.
- Amount mismatch, currency mismatch or order-ID mismatch is rejected and flagged for review.
- Cancelled, pending, failed and unverified payments do not activate a membership.
- Duplicate webhook event does not duplicate orders or membership periods.
- Out-of-order delivery does not incorrectly downgrade a verified final state.
- A member cannot view or pay for another member's order by changing an ID.
- Client-supplied amount, currency, user ID or success flag is ignored/rejected.
- Provider timeout/network failure leaves a truthful pending/unknown state with a reconciliation path.

## Owner decisions before production
- Payment provider and merchant account.
- Currency, price tax treatment and membership validity.
- Refund/cancellation policy and who handles disputes.
- Receipt/invoice requirements and support process.
- Whether any recurring/auto-renewal functionality is needed later.
