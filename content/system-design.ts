// Single source of truth for the System Design section, so the page and the AI chat never disagree.
// To add a project: append one object to `systemDesigns` below. The section, the AI knowledge and
// the tests pick it up automatically. Estimates come from the design, not from measurement.

export interface SystemDesignProject {
  id: string // used for the section anchor and AI chunk id
  title: string
  tagline: string
  summary: string
  stack: string[]
  built: string[]
  designOnly: string[]
  estimates: { value: string; label: string }[]
  estimatesNote?: string
  links: {
    detail?: string // internal path to the design page, e.g. /system-design/pastebin
    caseStudy?: string // internal path, e.g. /projects/pastebin
    repo?: string
    writeUp?: string
  }
  keywords?: string[] // extra words that should bring this project up in the AI chat (4+ letters each)
  detail?: SystemDesignDetail // the full design, shown on /system-design/<id>
}

// 'built' = exists in the local build, 'design' = on paper only
export type DesignStatus = 'built' | 'design'

export interface SystemDesignDetail {
  requirements: { functional: string[]; nonFunctional: string[] }
  estimateWorkings: string[]
  api: { method: string; path: string; description: string; responses: string[] }[]
  shortCodes: string[]
  dataModel: { table: string; note: string; fields: { name: string; description: string }[] }[]
  components: { name: string; description: string; status: DesignStatus }[]
  writePath: { step: string; status: DesignStatus }[]
  readPath: { step: string; status: DesignStatus }[]
  expiry: { text: string; status: DesignStatus }[]
  rateLimiting: { text: string; status: DesignStatus }[]
  security: string[] // all design only
}

export const pastebinLinks = {
  repo: 'https://github.com/owoadehabeeb04/Pastebin-system-design',
  writeUp:
    'https://docs.google.com/document/d/e/2PACX-1vQLf7IHhu419KNU4yamitgtsO-lD5qYSvlxYunjD0AIquTuAhWB8W3D8qJa2ccb3SPmrChlkrag2In0/pub',
  caseStudy: '/projects/pastebin',
}

export const systemDesignHeadline =
  'Designing for scale on paper, then building one local copy to test the ideas. Each entry says what is built and what is design only.'


const pastebinDetail: SystemDesignDetail = {
  requirements: {
    functional: [
      'Create a paste: paste plain text or code and get a short link.',
      'Read a paste: anyone who opens the link sees the text. This is the most used feature, so it is where Redis caching goes.',
      'Code formatting: a paste marked as code is shown with syntax highlighting for its language.',
      'Expiry: the user sets an expiry time, and after it the paste can no longer be opened.',
    ],
    nonFunctional: [
      'High availability: the app stays up in every region, with no single point of failure.',
      'Fast reads: most traffic is people opening links, so reads must be quick.',
      'Durability: a saved paste is never lost before it expires.',
      'Limits: a paste is at most 10,000 characters.',
    ],
  },
  estimateWorkings: [
    'Users: 30 million active users, about 1 new paste a day each. That is 30 million writes a day. A day is about 86,400 seconds, so about 350 writes a second.',
    'Reads: each paste is opened about 10 times, so 300 million reads a day, or about 3,500 reads a second. Reads outnumber writes 10 to 1.',
    'Storage: an average paste is about 2 KB, so 30 million pastes is about 60 GB a day, or about 22 TB a year of paste text. Indexes and metadata add roughly 30% to 50%, and replication multiplies the total, so disk across all copies is closer to 90 TB a year. Pastes expire, so what is stored at any time is lower.',
    'Cache: caching the hottest 20% of a day\'s pastes is 30 million x 20% x 2 KB, about 12 GB, which fits on one Redis server. This is a sizing guess, not a hit rate. The real hit rate depends on how skewed traffic is, so it would be measured and the cache resized.',
  ],
  api: [
    {
      method: 'POST',
      path: '/pastes',
      description: 'Create a paste. Body: text, type (code or plain_text), optional language, expiresIn in seconds (default 86400, min 60, max 2,592,000).',
      responses: ['201 with the code, the link and the expiry time', '400 for bad input', '429 when rate limited'],
    },
    {
      method: 'GET',
      path: '/pastes/:code',
      description: 'Read a paste. Returns the code, text, type, language and expiry time.',
      responses: ['200 with the paste', '404 if the code does not exist or has expired'],
    },
  ],
  shortCodes: [
    'A code is 7 characters from 0-9, a-z and A-Z (62 characters). Symbols are left out because characters like / ? # and % have special meanings in URLs. A UUID would be 36 characters, which is too long for a short link.',
    'Local build: all 7 characters are random, about 3.5 trillion combinations.',
    'Multi-region design: the first character names the region that owns the paste, and the other 6 are random. That is 62^6, about 56.8 billion codes per region, about 170 billion in total.',
    'The server inserts the paste with the code as the primary key. If the database rejects the insert as a duplicate, the server makes a new code and tries again, up to 5 times, then returns an error. The database decides uniqueness because two servers could otherwise pick the same code at the same moment and both pass a check made before saving.',
    'Collisions are certain at scale, so the retry is a real part of the design. With 1 billion pastes in a region, about 1 new code in 57 is already taken. Two collisions in a row is about 1 in 3,000, and five in a row about 1 in 600 million, which is why the retries are capped at 5.',
  ],
  dataModel: [
    {
      table: 'pastes',
      note: 'PostgreSQL is the source of truth. Exactly one of text and s3_key is set.',
      fields: [
        { name: 'code', description: 'Primary key, the 7-character short code.' },
        { name: 'user_id', description: 'Optional link to users.id. Empty for anonymous pastes.' },
        { name: 'text', description: 'The paste content. Empty when the paste is stored in S3.' },
        { name: 's3_key', description: 'Where the paste is stored in S3, for pastes over 10 KB.' },
        { name: 'type', description: 'code or plain_text.' },
        { name: 'language', description: 'For example python, used for syntax highlighting.' },
        { name: 'device_info', description: 'Basic information about the device that created the paste.' },
        { name: 'created_at', description: 'When the paste was created.' },
        { name: 'expires_at', description: 'When the paste stops being readable. Indexed for the cleanup job.' },
      ],
    },
    {
      table: 'users',
      note: 'The table exists, but accounts are not in version 1.',
      fields: [
        { name: 'id', description: 'Primary key.' },
        { name: 'created_at', description: 'When the account was created.' },
      ],
    },
  ],
  components: [
    { name: 'Client', description: 'A Next.js web app.', status: 'design' },
    { name: 'API servers', description: 'NestJS servers that hold no state, so more can be added as traffic grows. Locally, three containers.', status: 'built' },
    { name: 'Load balancer', description: 'Nginx sends each request to the server with the fewest open connections. In the design, two Nginx load balancers share one virtual IP so the balancer is not a single point of failure.', status: 'built' },
    { name: 'Redis', description: 'Keeps copies of popular pastes so most reads skip the database, and holds the rate-limit counters. Each entry expires when the paste does.', status: 'built' },
    { name: 'PostgreSQL', description: 'Stores every paste\'s metadata, and its text when it is small. One database locally. In the design it is split into shards, each with a primary and read replicas.', status: 'built' },
    { name: 'S3', description: 'Stores the text of pastes larger than 10 KB. MinIO is the local stand-in.', status: 'built' },
    { name: 'CDN', description: 'Caches responses for popular pastes close to users in US East, US West and Europe, and drops the least recently used when space runs out.', status: 'design' },
    { name: 'Regions and failover', description: 'Three regions. Geo-DNS with health checks sends users away from a failed region after about 30 seconds. Each region\'s shards have an asynchronous replica in a second region that is promoted if the owning region stays down.', status: 'design' },
    { name: 'Sharding', description: 'The shard is chosen by hashing the code, modulo the number of shards, so any server can find it without a lookup table. Locally the choice is made in one place so shards can be added later.', status: 'design' },
  ],
  writePath: [
    { step: 'The user submits the paste.', status: 'built' },
    { step: 'The request goes through the load balancer to an app server.', status: 'built' },
    { step: 'The server checks the size limit and the rate limit.', status: 'built' },
    { step: 'The server makes a short code. In the multi-region design it starts with its own region\'s character.', status: 'built' },
    { step: 'If the text is over 10 KB, the server uploads it to S3.', status: 'built' },
    { step: 'The server inserts the row into PostgreSQL, retrying with a new code if the code is taken.', status: 'built' },
    { step: 'The server returns the short link.', status: 'built' },
  ],
  readPath: [
    { step: 'The user opens the link. If the CDN has the paste cached, it returns it straight away.', status: 'design' },
    { step: 'The first character of the code says which region owns the paste. DNS sends the user to the nearest healthy region, and that region forwards the read to the owning region if needed.', status: 'design' },
    { step: 'Otherwise the request goes through the load balancer to an app server.', status: 'built' },
    { step: 'The server looks up the code in Redis. On a hit it returns the paste.', status: 'built' },
    { step: 'On a miss it reads the row from PostgreSQL (a replica in the design), and the text from S3 if needed, then saves a copy in Redis.', status: 'built' },
    { step: 'If the expiry time has passed, the server returns 404 instead of the text.', status: 'built' },
  ],
  expiry: [
    { text: 'Each paste stores an expiry timestamp instead of an "expired" flag. A flag needs something to flip it, but a timestamp can be checked on every read.', status: 'built' },
    { text: 'Redis: each entry\'s TTL is the time left until expiry, so Redis never serves an expired paste. Missing codes are cached for 30 seconds so repeated bad links do not hammer the database.', status: 'built' },
    { text: 'A cleanup job runs every hour and deletes expired rows from PostgreSQL and their files from S3.', status: 'built' },
    { text: 'CDN: each read response carries a Cache-Control header whose lifetime is the paste\'s remaining life, capped at 1 hour, so the CDN can never serve a paste after it expires. Missing or expired pastes return 404 with a 30-second max-age.', status: 'design' },
    { text: 'To remove a paste early, for example for abuse, it is purged from the CDN with a purge call, because a TTL alone cannot do that.', status: 'design' },
  ],
  rateLimiting: [
    { text: 'Each client can create at most 10 pastes a minute, counted per IP address. The limit is set by an environment variable.', status: 'built' },
    { text: 'Counts live in Redis under a key that expires after one minute, so every app server sees the same count. A request over the limit gets 429.', status: 'built' },
    { text: 'Counting has to be atomic. If two requests arrive together they must not both read 9 and both write 10. One Redis transaction increments the key and sets the 60-second expiry only if none exists yet, then checks the number it got back.', status: 'built' },
    { text: 'IP addresses are shared by offices and mobile networks, so signed-in users would be limited by user id with a higher limit.', status: 'design' },
  ],
  security: [
    'Paste text is treated as data, never as code. The API returns it as plain text, and the client shows it as text, which escapes any HTML. Syntax highlighting runs on the escaped text.',
    'Responses use a safe content type, a Content-Security-Policy that blocks inline scripts, and X-Content-Type-Options: nosniff, so a paste cannot run as a script even if someone opens it directly.',
    'Every paste page has a Report link that saves the code and a reason. A moderator can delete the paste, which also removes it from Redis and purges it from the CDN.',
    'Pastes are limited to 10,000 characters of text, binary data is rejected, creation is rate limited, and new pastes can be scanned for known bad patterns such as malware links and leaked keys.',
    'The server never fetches links found in a paste, and device_info is never shown to other users.',
  ],
}

export const pastebin: SystemDesignProject = {
  detail: pastebinDetail,
  id: 'pastebin',
  keywords: ['pastebin', 'short link', 'short code', 'read-through', 'rate limit', 'minio'],
  links: { ...pastebinLinks, detail: '/system-design/pastebin' },
  title: 'Pastebin',
  tagline: 'Paste text or code, get a short link, read it until it expires.',
  summary:
    'A system design project. I designed it for 30 million active users across three regions, then built and ran one local copy of the design. Reading a paste by its link is the most used feature, so the design is read-heavy.',
  stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'S3 (MinIO locally)', 'Nginx', 'Docker Compose', 'k6', 'Next.js'],
  built: [
    'API: create a paste (up to 10,000 characters, with an expiry) and read it by a 7-character code',
    'PostgreSQL as the source of truth, with the code as the primary key',
    'Redis read-through cache and a per-IP rate limiter (10 pastes a minute by default)',
    'MinIO (S3 stand-in) for pastes over 10 KB',
    'Hourly cleanup job that deletes expired rows and their files',
    '3 API containers behind Nginx, run with Docker Compose',
    'Automated tests and k6 load-test scripts',
  ],
  designOnly: ['CDN', 'Three regions with geo-DNS failover', 'Real sharding across PostgreSQL databases', 'Replica promotion on failure'],
  estimates: [
    { value: '350', label: 'writes a second (30M new pastes a day)' },
    { value: '3,500', label: 'reads a second (10 reads per paste)' },
    { value: '60 GB', label: 'a day at about 2 KB per paste' },
    { value: '12 GB', label: 'for the hottest 20% of a day, fits on one Redis server' },
  ],
  estimatesNote: 'These numbers come from the design, not from measurement.',
}

export const systemDesigns: SystemDesignProject[] = [pastebin]

export const getSystemDesign = (id: string) => systemDesigns.find(project => project.id === id)
