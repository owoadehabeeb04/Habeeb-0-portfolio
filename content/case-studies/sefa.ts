import type { CaseStudy } from '@/types'

export const sefa: CaseStudy = {
  slug: 'sefa',
  title: 'SEFA',
  tagline: 'An AI budgeting app that proposes, and never acts without your say-so.',
  summary:
    'SEFA is a mobile-first personal finance app for Nigerian users: budgets, read-only bank sync, bank-statement import and an AI assistant. Every AI write and every imported row waits for the user to confirm. It was my final-year project at Bowen University and is the subject of a published preprint.',
  role: 'Designed and built end to end: React Native app, Node/Express API and marketing website.',
  timeline: 'Feb - Sep 2026',
  links: [
    { label: 'Live website', url: 'https://sefa-nine.vercel.app/' },
    { label: 'Preprint (Zenodo)', url: 'https://doi.org/10.5281/zenodo.22881415' },
  ],
  stack: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Bull', 'Azure OpenAI', 'LangGraph', 'Mono API', 'WebSockets'],
  heroImage: '/images/case-studies/sefa/hero.webp',
  heroAlt: 'Three SEFA app screens: the read-only bank connection prompt, the assistant home and an assistant answer about monthly spending',
  outcomes: [
    { value: '99.49%', label: 'parser field agreement (300-transaction synthetic benchmark, preprint)' },
    { value: '78.40%', label: 'clear-category accuracy on the same benchmark' },
    { value: '1.000', label: 'duplicate-detection F1' },
    { value: '29', label: 'backend test files' },
  ],
  problem: `Tracking money in Nigeria usually means scrolling bank statements and typing expenses by hand. Existing tools either ask for too much trust (full banking access) or put an AI chatbot in front of your finances with no guard rails.

I wanted to know whether an AI assistant could be genuinely useful for budgeting while staying **trustworthy**: it never moves money, never writes data you did not approve, and is never a black box about what it did.`,
  constraints: `- **Money is high-stakes.** A wrong category is an annoyance; a wrong write is a breach of trust.
- **Messy input.** Statements arrive as PDFs, scans, CSV and Excel, with different layouts.
- **Low-cost hosting and one developer.** The API runs on Render, which sleeps when idle, and the scope had to fit a semester.`,
  approach: `SEFA is three pieces: a React Native app (Expo, TanStack Query, Zustand), an Express/MongoDB API with Bull queues on Redis, and a Next.js marketing site. The slow work (statement extraction, bank sync, notifications, assistant replies) runs in background workers, and Azure OpenAI powers extraction and a LangGraph tool-calling assistant.

One idea runs through all of it, a **review gate**: the system prepares work and a person approves it.`,
  decisions: [
    {
      title: 'The AI proposes, the user confirms',
      context: 'A model that writes straight to the database can be wrong with no way back.',
      choice:
        'Write tools only prepare an action. It moves through pending_fields, pending_confirmation, confirmed, then executed (or cancelled / failed), and the user confirms, edits or cancels it in the app. Stale actions expire after 24 hours.',
      alternatives: 'Let the model write and offer an undo. Faster to build, but every mistake becomes a data-repair problem.',
      tradeoff: 'One extra tap per write. Read-only questions run without confirmation, so everyday use stays quick.',
    },
    {
      title: 'Read-only banking, enforced in layers',
      context: 'Linking a bank is where users are most nervous. "We promise not to move money" is not a design.',
      choice:
        'Through Mono the app can read accounts and transactions, and disconnect. Nothing else, enforced four ways: a frozen allow-list of operations, a router guard that returns 403 for anything that looks like a transfer, withdrawal or payment, a connection model whose access mode can only be "read_only", and an append-only audit log. Tokens are encrypted at rest.',
      alternatives: 'One check in the service layer, where a single forgotten route could bypass it.',
      tradeoff: 'Plumbing the user never sees, accepted because getting it wrong would cost the whole product.',
    },
    {
      title: 'Statement import: extract, score, de-duplicate, then ask',
      context: 'Statements range from clean PDFs to blurry scans, and they overlap with transactions already synced from the bank.',
      choice:
        'Text extraction is quality-scored (accepted at 0.7 or above) with OCR fallbacks, and a separate vision path sends page images to an Azure OpenAI vision model that returns strict JSON. Rows start as "needs review" and become "ready" only at category confidence 0.6 or above. Duplicates are caught in three layers: external transaction id, a SHA-256 hash of the row, and a same-day fuzzy match against existing records.',
      alternatives: 'Hand-written parsers per bank, which are precise for one bank and brittle for the next. They still exist and are tested, but the pipeline moved to model-based extraction.',
      tradeoff: 'Vision calls are slow and cost money, so they run in a queue with a 40-page cap. The fuzzy layer can flag a genuine repeat purchase, so it marks rows for review instead of deleting them.',
    },
    {
      title: 'Queues for slow work, a WebSocket for the chat',
      context: 'Extraction, sync and AI replies take seconds to minutes, which is too long for a request on a host that sleeps.',
      choice:
        'Four Bull queues (bank sync, notifications, statement imports, assistant) with three attempts and exponential backoff; cron syncs accounts every two hours and retries failures every thirty minutes. Assistant replies stream over a token-authenticated WebSocket, replacing the earlier SSE route.',
      alternatives: 'Doing the work inline, or keeping SSE only.',
      tradeoff: 'More moving parts (Redis, workers) to run, and two streaming transports until SSE is retired.',
    },
  ],
  diagrams: [
    {
      title: 'System overview',
      mermaid: `flowchart LR
  App["Mobile app<br/>React Native + Expo"] -->|"REST"| API["API<br/>Express"]
  App <-->|"WebSocket<br/>assistant stream"| API
  Site["Marketing site<br/>Next.js"]
  API --> DB[("MongoDB")]
  API --> Q[["Bull queues<br/>Redis"]]
  Q --> W["Workers<br/>import, sync, assistant, notifications"]
  W --> AI["Azure OpenAI<br/>text and vision"]
  W --> Mono["Mono API<br/>read-only"]
  W --> Push["Expo push"]
  W --> DB`,
      caption: 'The app never talks to Mono or the model directly; the API and its workers sit in between.',
    },
    {
      title: 'Statement import: nothing is saved until you approve it',
      mermaid: `flowchart TD
  F["Statement file<br/>PDF, CSV or Excel"] --> T["Text extraction<br/>quality score, accept at 0.7 or above"]
  F --> V["Vision extraction<br/>page images to Azure OpenAI, strict JSON, audit pass"]
  T --> R["Rows staged"]
  V --> R
  R --> D{"Duplicate?"}
  D -->|"yes"| Dup["Marked duplicate"]
  D -->|"no"| C{"Confidence 0.6 or above?"}
  C -->|"no"| NR["Needs review"]
  C -->|"yes"| Ready["Ready"]
  NR --> U["User reviews, edits or ignores rows"]
  Ready --> U
  Dup --> U
  U --> OK["Confirm import"]`,
      caption: 'Every route ends at the user. Rows the system is unsure about are flagged instead of guessed.',
    },
    {
      title: 'Lifecycle of an assistant action',
      mermaid: `stateDiagram-v2
  [*] --> pending_fields
  pending_fields --> pending_confirmation: all details collected
  pending_confirmation --> confirmed: user confirms
  pending_confirmation --> cancelled: user cancels
  pending_fields --> cancelled: user cancels
  confirmed --> executed: write succeeds
  confirmed --> failed: write fails
  executed --> [*]
  cancelled --> [*]
  failed --> [*]`,
      caption: 'A write only happens in the transition from confirmed to executed. A TTL index removes stale actions after 24 hours.',
    },
  ],
  gallery: [
    { src: '/images/case-studies/sefa/read-only-bank.webp', alt: 'SEFA bank connection screen explaining that the connection is read-only', caption: 'Read-only is stated before the user links a bank.', kind: 'mobile' },
    { src: '/images/case-studies/sefa/assistant-home.webp', alt: 'SEFA assistant home with suggested questions', caption: 'Assistant home with suggested questions.', kind: 'mobile' },
    { src: '/images/case-studies/sefa/assistant-answer.webp', alt: 'SEFA assistant answering how the user is spending this month', caption: 'A spending summary that flags a late-night transfer worth double-checking.', kind: 'mobile' },
  ],
  challenges: `- **Latency and crashes.** Early assistant replies were slow and one bug failed every response; both were fixed in the backend history.
- **Slow vision calls.** They are far slower than a 30-second client default, so they get a longer single attempt with no automatic retry that would double the wait.
- **Messy data.** Amount validation went through several commits before real statements stopped producing odd rows.`,
  results: `On a 300-transaction synthetic benchmark, reported in the preprint: **99.49%** parser field agreement, **78.40%** clear-category accuracy and **1.000** duplicate-detection F1.

The product runs end to end: Android builds ship through Expo's build service, the website is live, and 29 Jest test files cover the assistant, bank security, insights and the statement pipeline. The part I am proudest of is the review gate: in every flow, the worst a model mistake can do is appear as a row waiting for approval.`,
  next: `- Run the benchmark in CI as accuracy regression tests; today the evaluation lives in the paper, not the build.
- Retire the SSE route and add queue monitoring and alerts.
- A Telegram-first rewrite is planned around the same review-first idea, on a Node monorepo with **PostgreSQL** and Prisma instead of MongoDB.`,
}
