import type { CaseStudy } from '@/types'

export const soundradar: CaseStudy = {
  slug: 'soundradar',
  title: 'SoundRadar',
  tagline: 'A release radar that only tells you what it has verified.',
  summary:
    'SoundRadar tells listeners about new music before it drops: a personal radar for the artists, genres and regions they follow, with a drop calendar, push alerts and generated playlists, with a focus on African scenes like Afrobeats, Amapiano and Altê. Behind it sits a crawling pipeline that finds releases on the open web and publishes only what has been verified.',
  role: 'Built end to end: Next.js web app (PWA), NestJS API and workers, the crawling pipeline and the server deployment.',
  timeline: '2026, ongoing',
  links: [{ label: 'Live site', url: 'https://soundradar.live/' }],
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Prisma', 'PostgreSQL', 'RabbitMQ', 'Redis', 'Crawlee', 'Docker', 'AWS Lightsail', 'GitHub Actions'],
  heroImage: '/images/case-studies/soundradar/hero.webp',
  heroAlt: 'SoundRadar landing page with the headline "Never miss a drop" and a radar graphic showing upcoming releases',
  outcomes: [
    { value: '2000+', label: 'releases in the production database' },
    { value: '2,200', label: 'genres in the catalog' },
    { value: '550 → 150 ms', label: 'home feed first page (50,000-release benchmark)' },
    { value: '25 min → 0.06 s', label: 'a notification planner on a night with no drops (benchmark)' },
  ],
  problem: `New music is announced everywhere at once: label sites, blogs, social posts, streaming pages. Following the artists you care about by hand is impossible, and the scenes I wanted to cover (Afrobeats, Amapiano, Altê) are spread across many small sources.

I wanted a radar: tell it who and what you follow, and it tells you when something is confirmed, with the date and a link to listen.`,
  constraints: `- **Trust.** An alert for a release that does not exist is worse than no alert, so extracted data cannot go straight to users.
- **Polite crawling.** The web is not mine to hammer: robots rules, rate limits and no scraping of platforms that forbid it.
- **One small server and a search-API budget.** Discovery of new sources had to fit inside a monthly search quota.
- **Many users, same moment.** Fridays are release day, so notification planning has to stay fast.`,
  approach: `Three moving parts. A **crawling pipeline** discovers sources, fetches them three times a day on a schedule tied to Lagos time, and extracts candidate releases with an AI step. A **verification and publishing step** turns candidates into releases or sends them to an admin review inbox. A **Next.js PWA** shows each listener a home feed, a drop calendar (with an iCal subscription), countdowns and catch-up.

The API and workers run as Docker containers on a single AWS Lightsail server behind Caddy, deployed over SSH by a GitHub Actions workflow on every push to the main branch.`,
  decisions: [
    {
      title: 'The crawler never publishes',
      context: 'Extraction by a model will sometimes be wrong, and a wrong release shows up in someone\'s alerts.',
      choice:
        'Crawlers and extraction only create candidates. A single publish function is the only code that makes a release visible, and it is called from exactly two places: automatic verification and an admin approving a candidate.',
      alternatives: 'Let the extraction worker write releases directly. Faster, and it needs no review queue.',
      tradeoff: 'Some real releases wait for an admin. I accepted that: a missing alert is recoverable, a false one costs trust.',
    },
    {
      title: 'Crawls are idempotent',
      context: 'Schedulers retry, workers restart and queues redeliver, so the same job can arrive twice.',
      choice:
        'Each crawl is keyed by source and scheduled window with a unique constraint, and the queue message id repeats that key. Sources are claimed with a Redis lock plus a database claim, and three windows a day (00:20, 10:00 and 18:30, Lagos time) decide when a source is due.',
      alternatives: 'A plain cron that enqueues everything each run.',
      tradeoff: 'A little extra bookkeeping per crawl, in return for never crawling a source twice for the same window.',
    },
    {
      title: 'Polite and safe by default',
      context: 'A crawler that annoys sites gets blocked, and one that follows any URL is a security risk.',
      choice:
        'robots.txt is cached for 24 hours, each domain has a Redis lease so only one request runs at a time, and a circuit breaker backs off from 6 hours up to 7 days after repeated failures. Outbound requests pass an SSRF guard, and a headless browser is used only for sources marked as needing one. I deliberately did not build Instagram scraping.',
      alternatives: 'Scrape everything with a browser. It reaches more sources and breaks more rules.',
      tradeoff: 'Fewer sources, and a slower registry growth, in return for a crawler that can keep running.',
    },
    {
      title: 'Push-first notifications with deduplication',
      context: 'A release can match many listeners and many triggers, and nobody wants five alerts for one album.',
      choice:
        'Notification events carry a unique dedupe key and are claimed by a worker that polls every 15 seconds. Pushes are spaced out per person, and email is limited to account messages, sent through an encrypted outbox row so the queue only carries an id, never the recipient or content.',
      alternatives: 'Email every alert and reminder. Simpler, but noisy and costly.',
      tradeoff: 'Polling Postgres adds up to 15 seconds of latency, which is fine for release alerts.',
    },
    {
      title: 'Measure, then make it fast',
      context: 'The home feed and the planners were slow once I loaded a 50,000-release, 100,000-listener benchmark database.',
      choice:
        'I profiled before changing anything. Postgres JIT was adding about 350 ms per request, so I turned it off for the app role. Prisma includes caused extra queries, so I switched to relation joins. The planners looped over every listener, so they now start from the releases that are actually due.',
      alternatives: 'Add caching first. It would have hidden the real causes.',
      tradeoff: 'Planners are less general, since they start from due releases, but they stay fast as listeners grow.',
    },
  ],
  diagrams: [
    {
      title: 'From the open web to a listener\'s phone',
      mermaid: `flowchart TD
  D["Discovery<br/>search API and admin imports"] --> R[("Source registry")]
  R --> S["Scheduler<br/>3 windows a day, Lagos time"]
  S --> Q[["RabbitMQ<br/>crawl queues with retry and dead-letter"]]
  Q --> C["Crawler<br/>robots, RSS, sitemap, pages<br/>browser only when needed"]
  C --> X["AI extraction<br/>page text to JSON"]
  X --> V{"Verified?"}
  V -->|"yes"| P["Publish function<br/>the only way a release goes live"]
  V -->|"no"| A["Admin review inbox"]
  A --> P
  P --> E[("Notification events<br/>unique dedupe key")]
  E --> W["Worker<br/>polls every 15 s"]
  W --> N["Push to followers"]`,
      caption: 'Nothing reaches a listener without passing the single publish step.',
    },
    {
      title: 'What the performance work fixed',
      mermaid: `flowchart LR
  B["Benchmark database<br/>50,000 releases, 100,000 listeners"] --> M["Measure each slow path"]
  M --> J["Postgres JIT off<br/>about 350 ms per request"]
  M --> N["Prisma relation joins<br/>fewer queries per request"]
  M --> L["Planners start from due releases<br/>not from every listener"]
  J --> R1["Home feed 550 ms to 130-180 ms"]
  N --> R1
  L --> R2["Planner 25+ min to 0.06 s on a quiet night"]`,
      caption: 'Figures come from the benchmark database described in the project\'s speed audit.',
    },
  ],
  gallery: [{ src: '/images/case-studies/soundradar/app-mobile.webp', alt: 'SoundRadar landing page on a phone', caption: 'The landing page on a phone.', kind: 'mobile' }],
  challenges: `- **Hosting moves.** The project went from free tiers to a single paid server (Render and Railway, then Oracle, then Lightsail) as cold starts made scheduled work unreliable.
- **Cold starts.** One fix was letting the API wake a sleeping worker when it queues an email, with a short database connect timeout.
- **Search budget.** Source discovery is limited by the search API quota, so the registry grows gradually rather than all at once.
- **Notification etiquette.** Spacing pushes, limiting email, and only alerting on Friday morning in the time zones where it is Friday morning took several passes.`,
  results: `SoundRadar is live at soundradar.live with **2000+ releases** in the production database and a **2,200-genre** catalog. Over 27 database migrations in October 2026 shaped listeners, sources, crawl runs and notifications.

The performance work is measured on a benchmark database: the home feed's first page dropped from about 550 ms and 42 queries to 130-180 ms and 11 queries, and a planner that ran for 25+ minutes on a night with no drops now finishes in 0.06 s.`,
  next: `- Keep growing the source registry toward the long-term goal of 10,000 sources.
- Add streaming-service links beyond the current providers (Apple Music is not ingested yet).
- Replace the stale backend README, which still says release behavior is out of scope.`,
}
