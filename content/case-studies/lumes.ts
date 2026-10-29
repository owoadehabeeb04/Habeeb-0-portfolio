import type { CaseStudy } from '@/types'

export const lumes: CaseStudy = {
  slug: 'lumes',
  title: 'LUMES',
  tagline: 'A storefront that takes payment safely and an admin one person can run.',
  summary:
    'LUMES is a modest-fashion store (abayas, dresses, kaftans, hijabs) with a custom admin dashboard. Customers browse, pay with Stripe in the currency of their location and get order updates by email. The owner manages products, orders, customers, coupons and even the storefront copy without touching code.',
  role: 'Designed and built end to end: storefront, admin dashboard, payments and email.',
  timeline: 'Mar 2026',
  links: [{ label: 'Live store', url: 'https://lumes-essence.vercel.app/' }],
  stack: ['Next.js (App Router)', 'TypeScript', 'MongoDB', 'NextAuth', 'Stripe', 'Brevo', 'TipTap', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
  heroImage: '/images/case-studies/lumes/hero.webp',
  heroAlt: 'LUMES storefront home page with the headline "A premium wardrobe shaped by grace, ease, and intention"',
  outcomes: [
    { value: '9', label: 'currencies, defaulted by visitor location' },
    { value: '10', label: 'admin areas, from analytics to a storefront content editor' },
    { value: '2', label: 'ways a payment is confirmed: signed webhook and a reconcile route' },
  ],
  problem: `A small fashion brand needs two things that are usually separate projects: a storefront customers enjoy, and a back office the owner can run alone. Getting money handling wrong is the costly mistake: charging for stock that is gone, or losing track of a paid order.

I built LUMES to see how complete a store I could make on my own while keeping the payment path trustworthy.`,
  constraints: `- **Payments must be right.** Orders and stock have to survive retries, closed tabs and missed webhooks.
- **A non-technical owner.** Everything that changes (products, copy, coupons, shipping fees) has to be editable in the admin.
- **Customers in several countries.** Prices have to be shown in a currency that makes sense for each visitor.
- **One developer, about two weeks.**`,
  approach: `The storefront and the admin live in one Next.js App Router project. Data sits in MongoDB (users, products with variants, categories, orders with a timeline, coupons, notifications and the storefront content). NextAuth handles sign-in, and middleware protects the admin API, checkout and account pages. Stripe Checkout takes payment, a webhook confirms it, and Brevo sends branded order emails.

The money path is deliberately short and checked at each step: quote, pending order, Stripe session, signed webhook, paid order.`,
  decisions: [
    {
      title: 'Trust the webhook, but keep a way back',
      context: 'Payment confirmation can fail in two ways: Stripe retries an event, or the customer closes the tab and the event is never seen.',
      choice:
        'The webhook verifies Stripe\'s signature on the raw body and records each processed event id, so a repeated event is ignored. A separate reconcile route asks Stripe about the session directly and runs the same "mark as paid" logic, so a missed webhook can be recovered.',
      alternatives: 'Mark the order paid when the customer lands on the success page. Easy, and easy to fool or miss.',
      tradeoff: 'Idempotency is check-then-record, not atomic, so two simultaneous deliveries could both pass the check. A unique insert before processing would be stronger, and it is on my list.',
    },
    {
      title: 'Check stock before taking money',
      context: 'Selling an item that is gone is the worst moment for a customer.',
      choice:
        'The quote step rejects a cart if a variant has less stock than requested, before any order or Stripe session exists. Stock is decremented after payment, in the webhook. If an item sold out in between, the order is flagged for admin review instead of failing silently.',
      alternatives: 'Reserve stock at checkout with a timer. Stronger guarantees, and much more machinery for a store this size.',
      tradeoff: 'A rare oversell is possible and is handled by a person, not by the system.',
    },
    {
      title: 'Currency by location, with the rate saved on the order',
      context: 'A visitor in one country should not have to convert prices in their head, and an order must not change value later.',
      choice:
        'Prices are stored in pounds. The default currency comes from the visitor\'s locale and a geo lookup, with nine currencies available. The exchange rate is fetched at checkout and saved on the order, and if the rate service fails the order falls back to pounds.',
      alternatives: 'A fixed daily rate table, or a single currency.',
      tradeoff: 'One extra network call at checkout, in return for correct, reproducible totals.',
    },
    {
      title: 'An admin the owner can run alone',
      context: 'If every change needs a developer, the store is not really the owner\'s.',
      choice:
        'The admin covers a dashboard with low-stock warnings; analytics (revenue, status breakdown, top products, categories and customers, coupon performance); products with duplication, trash and restore, rich text and multi-image upload; categories; orders; customers with presets like top spenders and no orders; coupons with per-user limits; settings for low-stock threshold, shipping fees and currency; and a no-code editor for the home page, About, Contact, FAQ, policies and footer. Admin sign-in needs an emailed one-time code.',
      alternatives: 'Edit content in code and redeploy, or buy an off-the-shelf admin.',
      tradeoff: 'A lot of surface area to build and secure for one store.',
    },
    {
      title: 'Orders have a story, and customers hear it',
      context: 'Order status is only useful if everyone sees the same history.',
      choice:
        'Every order keeps a timeline. When an admin marks an order shipped (with courier and tracking), delivered, cancelled or refunded, the customer gets an in-app notification and an email. Refunds are admin-managed: the admin marks the order refunded and returns the money through the Stripe Dashboard.',
      alternatives: 'Call Stripe\'s refund API from the admin button.',
      tradeoff: 'Two manual steps for a refund today. Automating it is the first item under what I would do next.',
    },
  ],
  diagrams: [
    {
      title: 'The payment path',
      mermaid: `sequenceDiagram
  participant C as Customer
  participant S as Store API
  participant T as Stripe
  participant A as Admin
  C->>S: Request quote for cart
  S-->>C: Reject if a variant is short on stock
  C->>S: Start checkout
  S->>S: Create pending order
  S->>T: Create Checkout session
  C->>T: Pay
  T->>S: Signed webhook
  S->>S: Verify signature, skip if event already processed
  S->>S: Mark paid, decrement stock, record coupon use
  S-->>C: Confirmation email
  Note over S,T: If the webhook is missed, a reconcile route asks Stripe about the session
  S-->>A: Order flagged for review if an item sold out meanwhile`,
      caption: 'Each step checks the one before it; the reconcile route covers a missed webhook.',
    },
    {
      title: 'What the admin covers',
      mermaid: `flowchart LR
  Admin["Admin<br/>one-time-code sign-in"] --> Ops["Store operations"]
  Admin --> Insight["Insight"]
  Admin --> Content["Content and settings"]
  Ops --> Prod["Products<br/>duplicate, trash, restore, rich text"]
  Ops --> Cat["Categories"]
  Ops --> Ord["Orders<br/>courier, tracking, timeline, emails"]
  Ops --> Cust["Customers<br/>presets, history"]
  Ops --> Disc["Coupons<br/>per-user limits, usage"]
  Insight --> Dash["Dashboard<br/>low-stock warnings"]
  Insight --> An["Analytics<br/>revenue, top products, customers"]
  Content --> Cms["Storefront editor<br/>home, About, FAQ, policies, footer"]
  Content --> Set["Settings<br/>shipping fees, currency, stock threshold"]`,
      caption: 'Ten areas, all reachable without a deploy.',
    },
  ],
  gallery: [
    { src: '/images/case-studies/lumes/shop.webp', alt: 'LUMES shop page listing products', caption: 'The shop.', kind: 'desktop' },
    { src: '/images/case-studies/lumes/product.webp', alt: 'LUMES product page for the Noor Classic Abaya with size selection', caption: 'A product page with variant selection.', kind: 'desktop' },
    { src: '/images/case-studies/lumes/home-mobile.webp', alt: 'LUMES home page on a phone', caption: 'The storefront on a phone.', kind: 'mobile' },
  ],
  challenges: `- **Getting the money path right.** The reconcile route exists because a webhook-only design has a failure mode I could not accept. Writing both paths to share the same "mark as paid" function kept them consistent.
- **Stock and payment race.** Stock is checked before payment and decremented after it, so the gap needed an honest answer: admin review.
- **Currency edge cases.** A failing rate service must not block checkout, so it falls back to pounds.`,
  results: `The store works end to end: browse, choose a variant, pay, receive an email and have the order fulfilled from the admin, with nine currencies and a content editor for the owner.

It is a portfolio-scale build, so there are no sales or traffic numbers to report. I would rather say that than invent some.`,
  next: `- Make webhook idempotency atomic with a unique insert before processing.
- Decrement stock atomically, or reserve it with an expiry.
- Call Stripe's refund API from the admin and sync status from refund events.
- Send low-stock alerts by email instead of only showing them on the dashboard.
- Add automated tests; there are none yet.`,
}
