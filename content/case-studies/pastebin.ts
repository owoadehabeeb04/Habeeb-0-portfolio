import type { CaseStudy } from '@/types'
import { pastebinDiagrams, pastebinLinks } from '@/content/system-design'

export const pastebin: CaseStudy = {
  slug: 'pastebin',
  title: 'Pastebin',
  tagline: 'A system design project: paste text or code, get a short link.',
  summary:
    'Pastebin is a service where you paste text or code and get a short link. Anyone with the link can read it until it expires. I designed it for 30 million active users across three regions, then built and ran one local copy of the design.',
  role: 'Designed the system and built the local version: API, data model, cache, rate limiter, cleanup job, Docker setup and tests.',
  timeline: '2026',
  links: [
    { label: 'GitHub repo', url: pastebinLinks.repo },
    { label: 'Design write-up', url: pastebinLinks.writeUp },
  ],
  stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'S3 (MinIO locally)', 'Nginx', 'Docker Compose', 'k6', 'Next.js'],
  heroImage: '/images/case-studies/pastebin/hero.webp',
  heroAlt: 'Diagram of the Pastebin design: clients, Nginx, three API servers, Redis, PostgreSQL and S3',
  outcomes: [
    { value: '7', label: 'characters in a paste link' },
    { value: '10,000', label: 'character limit per paste' },
    { value: '3', label: 'API containers behind Nginx locally' },
    { value: '5', label: 'retries at most when a code is already taken' },
  ],
  problem: `A pastebin looks small: paste text, get a link, open the link later. At 30 million active users it is a good exercise because the work is lopsided. Reading a paste by its link is the most used feature, so the design is read-heavy.

I used it to practise the parts of system design that are easy to say and easy to get wrong: unique short codes, expiry, caching, large objects, rate limiting and failure.`,
  constraints: `- **Read-heavy.** Each paste is opened about 10 times, so reads outnumber writes about 10 to 1.
- **Short links.** A UUID is 36 characters, which is too long for a link people share.
- **Expiry.** After the expiry time a paste must never be served.
- **Limits.** A paste is at most 10,000 characters.
- **One machine.** The design targets three regions. I could only run one local copy, so I kept a clear line between what I built and what is design only.`,
  approach: `The API is NestJS with no state, so more servers can be added behind a load balancer. PostgreSQL is the source of truth. Redis sits in front of it for reads and for rate limiting. Pastes over 10 KB go to S3, and PostgreSQL keeps only the key.

**The API**

- \`POST /pastes\` takes the text, a type (code or plain text), an optional language and an expiry in seconds. It returns 201 with the code, the link and the expiry time, or 400 for bad input, or 429 when rate limited.
- \`GET /pastes/:code\` returns the paste, or 404 if the code does not exist or has expired.

**The data**

One \`pastes\` table with the code as the primary key, an optional user, the text or the S3 key (exactly one of them is set), the type, the language, device info, and the created and expiry times. An index on the expiry time serves the cleanup job. A \`users\` table exists, but accounts are not in version 1.

**Back-of-envelope estimates.** These come from the design, not from measurement. 30 million new pastes a day is about 350 writes a second. Ten reads per paste is about 3,500 reads a second. At about 2 KB each that is about 60 GB a day. The hottest 20% of a day's pastes is about 12 GB, which fits on one Redis server.

**What I built and what is design only.** Built and run locally: the API, PostgreSQL, the Redis cache and rate limiter, MinIO for large pastes, the cleanup job, three API containers behind Nginx, k6 load-test scripts and tests. Design only: a CDN, three regions, real sharding and replica promotion.`,
  decisions: [
    {
      title: 'The database decides if a short code is unique',
      context: 'Two servers can pick the same random code at the same moment.',
      choice:
        'A link is 7 characters from 0-9, a-z and A-Z, about 3.5 trillion combinations in the local build. The server tries to insert the paste with that code as the primary key. If the database rejects the insert as a duplicate, the server makes a new code and tries again, up to 5 times. In the multi-region design the first character names the region that owns the paste and the other six are random.',
      alternatives: 'Check whether the code exists, then save it. Or use a UUID.',
      tradeoff:
        'A retry costs one extra insert, and a duplicate is rare per request but certain over millions of pastes. Check-then-save lets two servers both pass the check, and a UUID is too long for a short link.',
    },
    {
      title: 'Store the expiry time, not an expired flag',
      context: 'A flag has to be flipped by something, and until it is, an expired paste can still be read.',
      choice:
        'Each paste stores an expiry timestamp, and every read compares the current time with it. An hourly cleanup job deletes expired rows and their S3 files to free space.',
      alternatives: 'A boolean "expired" column set by a background job.',
      tradeoff: 'Every read does a small comparison, and expired rows live a little longer until the cleanup job runs.',
    },
    {
      title: 'A read-through cache whose lifetime follows expiry',
      context: 'Most traffic is people opening links, so the database should not see every read.',
      choice:
        'A read checks Redis first, then PostgreSQL on a miss, then saves a copy in Redis. The Redis TTL is the time left until expiry, so an expired paste is never served from the cache. A missing code is cached for 30 seconds so repeated bad links do not hammer the database.',
      alternatives: 'A fixed TTL for every entry, or no cache.',
      tradeoff: 'More moving parts, and a cached 404 can be stale for up to 30 seconds.',
    },
    {
      title: 'Large pastes go to S3',
      context: 'Most pastes are small, but the character limit allows about 10 KB, and multi-byte characters can go past it.',
      choice: 'Text over 10 KB is stored in S3 and PostgreSQL keeps only the key. Exactly one of the text and the key is set on a row.',
      alternatives: 'Keep everything in PostgreSQL.',
      tradeoff: 'A large read needs a second hop to S3, and the cleanup job has to remove the file as well as the row.',
    },
    {
      title: 'Rate limiting counted in Redis',
      context: 'A public write endpoint needs a limit, and there are several API servers.',
      choice:
        '10 pastes a minute per IP by default, counted in Redis so every API server sees the same count. The limit is set by an environment variable, and the cache can be switched off the same way.',
      alternatives: 'A counter in each server\'s memory.',
      tradeoff: 'Redis is now needed on the write path, and one IP behind a shared network can be limited together.',
    },
    {
      title: 'Ready for shards, running on one database',
      context: 'At about 22 TB of paste text a year, one database is too big to back up and restore comfortably.',
      choice:
        'The real design splits PostgreSQL into shards, each with a primary and read replicas, and a replica is promoted if the primary fails. Locally there is one PostgreSQL, but the shard is chosen from the paste code in a single place, so shards can be added later without a rewrite.',
      alternatives: 'One big database, or native table partitioning, which splits a table on one server but does not spread data across machines.',
      tradeoff: 'Resharding later needs a plan, such as many small logical shards that can move between machines.',
    },
    {
      title: 'Stateless servers behind a load balancer',
      context: 'No single machine should be able to take the service down.',
      choice:
        'Several stateless API servers sit behind a load balancer that sends each request to the server with the fewest open connections. Locally this is three API containers behind Nginx. In the design, two Nginx load balancers share one virtual IP, and geo-DNS with health checks moves users away from a failed region.',
      alternatives: 'One larger server.',
      tradeoff: 'More to run and monitor. The multi-region parts are design only.',
    },
  ],
  diagrams: [],
  gallery: pastebinDiagrams,
  galleryTitle: 'Diagrams',
  challenges: `- **Collisions are certain at scale.** With 1 billion pastes in a region, about 1 new code in 57 is already taken. So the retry is a real part of the design, not an edge case.
- **Not claiming too much.** One local copy cannot prove a three-region design. Most of the hard parts (a whole region going down, replica promotion, a CDN) are on paper only, and I label them that way.
- **Cache hit rate is a guess.** Caching the top 20% of pastes does not mean 80% of reads come from the cache. That depends on how skewed real traffic is, so it would need to be measured and the cache resized.`,
  results: `The local version runs from one Docker Compose command and has automated tests for validation, expiry in PostgreSQL and in Redis, the 30-second cache for missing codes, a forced code collision and retry, the rate limit, large pastes in S3 and the cleanup job.

I am not publishing load-test numbers. The k6 scripts are in the repository, and the estimates on this page come from the design, not from measurement.`,
  next: `- Build real sharding and test replica promotion.
- Put a CDN in front and measure the cache hit rate with realistic, skewed traffic.
- Add user accounts, which the data model already allows for.
- Run the three-region setup in a real cloud account, so the failure cases are tested rather than described.

**What I learned.** Let the database decide whether a code is unique, because two servers can both pass a check that happens before the save. Make the cache lifetime follow the expiry time, so an expired paste cannot be served. And one local copy cannot prove claims about three regions, so say what was built and what was only designed.`,
}
