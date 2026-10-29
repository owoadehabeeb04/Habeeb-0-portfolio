import type { CaseStudy } from '@/types'

export const recipia: CaseStudy = {
  slug: 'recipia',
  title: 'Recipia',
  tagline: 'A cooking assistant you can talk to, show a photo, and plan a week with.',
  summary:
    'Recipia is a recipe platform with an AI assistant called ARIA. You can ask it in text, by voice or with a photo, then plan meals for the week, build a shopping list and push the plan to Google Calendar. It also has reviews, favorites, a personal dashboard and an admin side.',
  role: 'Built end to end: Next.js frontend and Express/MongoDB backend.',
  timeline: 'Mar 2025 - Feb 2026',
  links: [{ label: 'Live app', url: 'https://recipe-app-kappa-cyan.vercel.app/' }],
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Express', 'MongoDB', 'LangChain', 'Groq', 'Google Calendar API', 'Web Speech API'],
  heroImage: '/images/case-studies/recipia/hero.webp',
  heroAlt: 'Recipia landing page with the headline "AI-Powered Recipe Discovery and Creation" and a photo of a loaded plate',
  outcomes: [
    { value: '3', label: 'ways to ask ARIA: text, voice and photo' },
    { value: '2', label: 'model tiers, with fail-fast handling of rate limits' },
    { value: '3', label: 'roles: user, admin and super admin' },
    { value: '80', label: 'commits across the two repositories' },
  ],
  problem: `Recipe sites are static pages. They do not know what is in your kitchen, they do not plan your week, and the shopping list is a separate chore.

I wanted to see how far one assistant could go when it sits across all of it: finding a recipe, recognising a dish from a photo, planning meals, and putting them on a calendar.`,
  constraints: `- **Free-tier AI limits.** Daily token budgets shaped which model does which job.
- **Voice and camera on the web.** Input has to work in a browser without native apps.
- **Several kinds of user.** Cooks, admins who curate, and a super admin who manages admins.
- **Solo build, over many months,** alongside coursework.`,
  approach: `The frontend is a Next.js dashboard with sections for ARIA, the meal planner, all recipes, my recipes, favorites, users, profile and security. The backend is an Express and Mongoose API with controllers for chat, recipes, meal plans, reviews and favorites.

ARIA is a LangChain agent. An AI-based intent detector decides what the user wants, a food-focus guard keeps it on cooking topics, and tools handle recipes and plans. Replies stream to the client as they are generated.`,
  decisions: [
    {
      title: 'Two model tiers, and fail fast on rate limits',
      context: 'I started on Gemini in 2025. Free-tier rate limits and daily token budgets became the main constraint.',
      choice:
        'The assistant now runs on Groq with two tiers: a primary model (llama-3.3-70b-versatile, about 100,000 tokens a day) for hard questions and a small fast one (llama-3.1-8b-instant, about 500,000 a day, five times the budget) for simple work. Retries are off, so a rate-limit error fails immediately and can be handled.',
      alternatives: 'Stay on one model and retry on errors. That burns the same budget slowly and makes users wait.',
      tradeoff: 'Two models to tune, and the small one is weaker on nuanced questions.',
    },
    {
      title: 'Voice runs in the browser, not on my server',
      context: 'Speech-to-text on the server costs money and adds an upload step.',
      choice:
        'The frontend uses the browser\'s Web Speech API with interim results, and the backend receives plain text marked as a voice message so it can reuse the normal chat pipeline.',
      alternatives: 'Server-side transcription. A Google speech client is installed, but I did not use it for the live path.',
      tradeoff: 'Voice only works in browsers that support speech recognition.',
    },
    {
      title: 'Photos become structured data',
      context: 'A model describing a dish in free text is hard to use in the rest of the app.',
      choice:
        'The image analyzer prompt asks for JSON (is it a dish, its name, ingredients and an estimated calorie count) and a culinary-focus guard rejects non-food images and off-topic requests.',
      alternatives: 'Pass the photo straight into the chat and let the model improvise.',
      tradeoff: 'Less conversational, much easier to build features on.',
    },
    {
      title: 'Meal plans keep snapshots of recipes',
      context: 'A plan should not change if a recipe is edited or deleted later.',
      choice:
        'Each planned meal stores a copy of the recipe details alongside its reference, and Google Calendar event ids are kept on the plan so events can be updated. The shopping list is computed by aggregating ingredients across the planned recipes.',
      alternatives: 'Store only references and populate them on read. No duplication, but plans drift.',
      tradeoff: 'Duplicated data, accepted for stable plans.',
    },
    {
      title: 'Three roles, enforced on the server',
      context: 'Admins curate recipes and users; a super admin manages the admins.',
      choice:
        'Middleware separates verified users, admins and super admins. The frontend also checks the auth cookie in a Next.js proxy before rendering protected routes, so unauthenticated users never see them.',
      alternatives: 'Hide admin buttons in the UI only.',
      tradeoff: 'Every sensitive route needs the right middleware, which is easy to forget in a growing codebase.',
    },
  ],
  diagrams: [
    {
      title: 'How an ARIA message is handled',
      mermaid: `flowchart TD
  U["User input"] --> T["Text"]
  U --> V["Voice<br/>browser Web Speech API to text"]
  U --> I["Photo<br/>analyzer returns JSON"]
  T --> API["Chat API"]
  V --> API
  I --> API
  API --> G{"Cooking topic?"}
  G -->|"no"| X["Polite redirect"]
  G -->|"yes"| N["Intent detection"]
  N --> A["LangChain agent<br/>recipe and meal-plan tools"]
  A --> M{"Hard question?"}
  M -->|"yes"| P["Primary model<br/>70B tier"]
  M -->|"no"| S["Small fast model<br/>8B tier"]
  P --> R["Streamed reply"]
  S --> R`,
      caption: 'Input type changes how a message arrives; everything after that shares one pipeline.',
    },
    {
      title: 'From a weekly plan to your calendar',
      mermaid: `flowchart LR
  P["Meal plan<br/>days and meals"] --> L["Shopping list<br/>ingredients aggregated across recipes"]
  P --> G["Google sign-in<br/>access token from the client"]
  G --> E["Calendar events<br/>defaults 08:00, 12:30, 19:00"]
  E --> K["Event ids saved on the plan"]
  K --> U["Updates change events, not duplicates"]`,
      caption: 'The browser\'s time zone decides when events land.',
    },
  ],
  gallery: [{ src: '/images/case-studies/recipia/home-mobile.webp', alt: 'Recipia landing page on a phone', caption: 'The landing page on a phone.', kind: 'mobile' }],
  challenges: `- **Rate limits.** Moving from Gemini to tiered Groq models was the biggest change, and the error handling had to be rewritten around fast failure.
- **Mobile layout.** Modals and the calendar needed several rounds to feel right on a phone.
- **CORS.** It started open to every origin and was later pinned to the production and local frontends.
- **A build failure** from reading search parameters without a Suspense boundary, fixed late in the project.`,
  results: `Recipia runs end to end: sign-up with roles, recipes with reviews and a rating distribution, favorites, a meal planner with a stats page, a shopping list, Google Calendar sync and ARIA with text, voice and photo input.

I do not have usage numbers for it, so I will not quote any. It is a project I used to learn how AI features, calendars and role-based access fit together.`,
  next: `- Add real tests; there is one auth test file today.
- Consolidate the older generations of meal-planner controllers.
- Fix the typo in the fallback model name so the fallback path actually works.
- Move calendar sync to a server-side refresh token so it does not depend on the client.`,
}
