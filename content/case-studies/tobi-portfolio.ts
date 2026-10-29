import type { CaseStudy } from '@/types'

export const tobiPortfolio: CaseStudy = {
  slug: 'tobi-portfolio',
  title: 'Tobi Owoade Portfolio',
  tagline: 'A designer\'s portfolio built to keep his Figma work sharp on the web.',
  summary:
    'A portfolio site for UX designer Tobi Owoade: a page per design case study, a looping playlist, and an Ask AI assistant that answers questions about his work. The main engineering problem was making screenshots from Figma look as crisp in the browser as they do in the design file.',
  role: 'Built the site from Tobi\'s Figma designs, including the case-study pages and the AI assistant.',
  timeline: 'Sep 2024 - Oct 2026',
  credit: { text: 'Designed by', name: 'Tobi Owoade', url: 'https://www.tobiowoade.com/' },
  links: [{ label: 'Live site', url: 'https://www.tobiowoade.com/' }],
  stack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Groq', 'react-markdown', 'sharp'],
  heroImage: '/images/case-studies/tobi-portfolio/hero.webp',
  heroAlt: 'Tobi Owoade portfolio projects page showing a case study for a mobile insurance app',
  outcomes: [
    { value: '4', label: 'full design case-study pages' },
    { value: '3x', label: 'lossless image exports to keep detail sharp' },
    { value: '1', label: 'Ask AI assistant, with web lookup for his public profile' },
  ],
  problem: `A designer's portfolio is judged by how it looks. Dropping a Figma frame onto a web page usually makes it softer: the browser rescales it, the image optimizer recompresses it, and small interface text turns to mush.

The brief was to match Tobi's Figma pixel for pixel, keep the work sharp, and give visitors a quicker way to learn about him than reading every page.`,
  constraints: `- **Match the design.** Layout, spacing, type and motion had to follow the Figma file.
- **Heavy, detailed images** of phone interfaces where small text must stay readable.
- **No CMS.** Tobi wanted a fast static-feeling site, so content lives in code.
- **A low-cost AI feature** with predictable behaviour on a free-tier model.`,
  approach: `A Next.js App Router site with a page for each case study, built from section components (hero, personas, flows) and shared pieces such as a project card, a zoomable image, a Figma frame and project navigation. Scroll reveals use Framer Motion with an intersection observer, and the playlist marquee is a CSS keyframe animation.

Content lives in a data file and constants. An Ask AI page sends questions to a Groq-backed API route that answers from that content.`,
  decisions: [
    {
      title: 'Fight blur at the source',
      context: 'The soft look came from two places: Figma\'s SVG exports (which embed a bitmap) and the optimizer recompressing them.',
      choice:
        'Images are exported from Figma at 3x as lossless files, shown with the optimizer bypassed where it would recompress, and a click-to-zoom viewer lets people inspect detail. Commit history shows this as "lossless Figma images", "3x mockups" and "sharper thumbnails".',
      alternatives: 'Trust the default image pipeline and a single 1x export.',
      tradeoff: 'Heavier pages: the public folder is about 58 MB, and the repository is around 85 MB because exports were redone several times.',
    },
    {
      title: 'Match Figma, not the framework\'s defaults',
      context: 'A designer will notice a few pixels of drift in a way most clients will not.',
      choice:
        'Each case study is a page of small section components that follow the Figma frames, and a series of "match Figma" passes cleaned up spacing and type after review.',
      alternatives: 'One generic case-study template for every project.',
      tradeoff: 'More components and more upkeep, because every case study is bespoke.',
    },
    {
      title: 'Content in code, no CMS',
      context: 'A portfolio changes a few times a year, not a few times a day.',
      choice: 'Projects, experience and skills live in a data file and constants, which keeps the site fast and the build simple.',
      alternatives: 'A headless CMS so Tobi can edit without a developer.',
      tradeoff: 'Content changes need a developer. A CMS is the next step if that becomes a burden.',
    },
    {
      title: 'An Ask AI assistant with a budget',
      context: 'Visitors have questions a project page does not answer, and a free-tier model has limits.',
      choice:
        'A Groq route (a gpt-oss model by default, overridable from the environment) answers from the site content, with an adaptive token budget (from about 260 up to 1,400 depending on how detailed the question is), a web lookup for his public profile, and a simple rate limiter. The system prompt asks for Markdown and forbids HTML line breaks.',
      alternatives: 'No assistant, or a fixed FAQ.',
      tradeoff: 'The in-memory rate limiter resets whenever a serverless instance restarts, so it is a guard rail rather than a guarantee.',
    },
  ],
  diagrams: [
    {
      title: 'Keeping Figma detail sharp',
      mermaid: `flowchart LR
  F["Figma frame"] --> S["Default SVG export<br/>embeds a bitmap"]
  F --> L["3x lossless export"]
  S --> B["Soft in the browser<br/>rescaled and recompressed"]
  L --> O["Shown without recompression"]
  O --> Z["Click to zoom for detail"]`,
      caption: 'The fix was upstream of the code: change what gets exported.',
    },
    {
      title: 'How the Ask AI route answers',
      mermaid: `flowchart TD
  Q["Visitor question"] --> RL{"Within rate limit?"}
  RL -->|"no"| W["Ask to wait"]
  RL -->|"yes"| C["Load site content"]
  C --> D{"Needs public profile info?"}
  D -->|"yes"| WS["Web search, 3 results"]
  D -->|"no"| B["Token budget by question detail"]
  WS --> B
  B --> G["Groq model"]
  G --> A["Markdown answer"]`,
      caption: 'The token budget grows only when the question asks for detail.',
    },
  ],
  gallery: [{ src: '/images/case-studies/tobi-portfolio/home-mobile.webp', alt: 'Tobi Owoade portfolio Ask AI page on a phone', caption: 'The Ask AI page on a phone.', kind: 'mobile' }],
  challenges: `- **Weight versus sharpness.** Lossless 3x images are exactly what makes the site crisp and heavy. Re-exporting them several times also bloated the repository history.
- **Pixel-matching** the design across breakpoints took repeated passes.
- **Sharing a lesson.** My own portfolio showed this project with a blurry thumbnail. I re-captured it at 2x and added an automated test that fails when an image is rendered at less than 1.5x its displayed size.`,
  results: `The site is live with four full case-study pages and an Ask AI assistant, and its thumbnails and mockups stay readable at full size. There are no traffic numbers to report.

The takeaway I use everywhere now: sharpness is decided when an image is exported, not when it is displayed.`,
  next: `- Convert the heavy exports to AVIF or WebP at 3x and compare them to the originals visually.
- Move the rate limiter to a shared store so it survives restarts.
- Trim the repository history of old image blobs.
- Add a CMS if Tobi wants to publish new case studies himself.`,
}
