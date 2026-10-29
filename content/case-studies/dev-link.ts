import type { CaseStudy } from '@/types'

export const devLink: CaseStudy = {
  slug: 'dev-link',
  title: 'Dev Link',
  tagline: 'All your developer links on one shareable page.',
  summary:
    'Dev Link lets you sign up, add your links (GitHub, YouTube, LinkedIn and more), watch them appear in a live phone preview and share a public profile URL. It started from a Frontend Mentor challenge and became a small full-stack app on Firebase.',
  role: 'Built end to end from the challenge design: front end, Firebase data layer and deployment.',
  timeline: 'Jul 2024 - Feb 2025',
  links: [{ label: 'Live app', url: 'https://link-sharing-app-gamma-two.vercel.app' }],
  stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Firebase Auth', 'Firestore', 'Cloudinary', 'Framer Motion', 'React Query'],
  heroImage: '/images/case-studies/dev-link/hero.webp',
  heroAlt: 'Dev Link login screen with email and password fields',
  outcomes: [
    { value: '5', label: 'screens: login, sign-up, link editor, profile and public preview' },
    { value: '0', label: 'servers to run: Firebase handles auth and data' },
    { value: '12', label: 'commits' },
  ],
  problem: `Developers keep their links scattered: a GitHub here, a portfolio there, a talk on YouTube. One page that holds them all is a small idea, and it is a good size for learning how accounts, data and public pages fit together.

I used the project to practise Firebase Auth and Firestore, protected routes in the App Router, and building a pixel-faithful UI from a design brief.`,
  constraints: `- **A fixed design.** The Frontend Mentor brief decides layout and states.
- **No backend server.** Firebase had to cover authentication and storage.
- **Solo, small scope,** so the interesting choices are about structure rather than scale.`,
  approach: `A Next.js App Router project with pages for login, sign-up, the link editor, profile details and a public preview. Firebase Auth handles accounts. Links live in a Firestore collection with the platform name, the URL, the owner and a colour. A configuration table maps each platform to its icon and style, and profile pictures go to Cloudinary. An auth context holds the signed-in user for the whole app.`,
  decisions: [
    {
      title: 'Protected routes that remember where you were',
      context: 'Sending everyone to the same page after login is a small annoyance that adds up.',
      choice:
        'A route guard watches Firebase\'s auth state. If you are signed out it saves the page you wanted in session storage and sends you to login; after login it returns you there, or to your link editor if there was nothing saved.',
      alternatives: 'Always redirect to the dashboard.',
      tradeoff: 'A little state in session storage.',
    },
    {
      title: 'A live preview that mirrors the form',
      context: 'People want to see what their page will look like while they edit it.',
      choice:
        'A phone-shaped preview reads the same state as the form, so every change shows instantly, with each platform in its own colour and icon. It reflects the editor\'s state; it is not a live Firestore subscription.',
      alternatives: 'Save first, then show a separate preview page.',
      tradeoff: 'The preview can show something that is not saved yet, so saving stays an explicit step.',
    },
    {
      title: 'A public page with a shareable URL',
      context: 'The whole point is that other people can open it.',
      choice:
        'The preview page is public under a per-user URL with a copy-to-clipboard button, and link validation covers custom platforms so pasted URLs have to look right.',
      alternatives: 'Keep profiles private and export an image.',
      tradeoff: 'Profiles are public by design, which is the feature and also the thing to be careful with.',
    },
  ],
  diagrams: [
    {
      title: 'How the pieces fit',
      mermaid: `flowchart LR
  V["Visitor"] --> P["Public preview page<br/>shareable URL"]
  U["Signed-in user"] --> G["Route guard<br/>remembers the page you wanted"]
  G --> E["Link editor<br/>with live phone preview"]
  E --> F[("Firestore<br/>Links: name, url, owner, colour")]
  E --> C["Cloudinary<br/>profile picture"]
  P --> F
  A["Firebase Auth"] --> G`,
      caption: 'No custom server: the browser talks to Firebase and Cloudinary directly.',
    },
  ],
  gallery: [{ src: '/images/case-studies/dev-link/signup-mobile.webp', alt: 'Dev Link sign-up screen on a phone', caption: 'Sign-up on a phone.', kind: 'mobile' }],
  challenges: `- **Matching the brief** across breakpoints and states took most of the front-end time.
- **Validating URLs per platform.** A GitHub link and a custom link are not the same shape, and a later commit tightened the rule for custom platforms.
- **Learning Firestore's model.** My first public-page query fetches every user's links and filters in the client, which works for a demo and is a privacy and performance problem for a real product.`,
  results: `Dev Link is deployed and works end to end: accounts, a link editor with a live preview, and a public page you can share. There are no usage numbers to report.

It taught me the shape of a Firebase app and showed me exactly what I would do differently, which is the list below.`,
  next: `- Query links by owner on the server side instead of fetching everyone's and filtering in the browser.
- Write Firestore security rules so reads and writes are scoped to the right user.
- Add drag-and-drop reordering, which the original design calls for and I have not built.
- Add tests; there are none.`,
}
