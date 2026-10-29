import type { CaseStudy } from '@/types'

export const omoAi: CaseStudy = {
  slug: 'omo-ai',
  title: 'OMO AI',
  tagline: 'An AI marketing assistant for small businesses, built with a team.',
  summary:
    'OMO AI analyses a business\'s content, ads and audience, then tells its owner what to post, when to post and how to grow. It is a team product. I joined as a contract engineer and worked on accounts and onboarding, settings, billing screens, the role-based admin console, the landing page and analytics screens, and I worked on the AI agent (LangChain and LangGraph) with the project lead.',
  role: 'Contract engineer on a small team: authentication and onboarding, settings, billing and pricing UI, the role-based admin console, the landing page and analytics and integrations screens, and I worked on the AI agent (LangChain and LangGraph) with the lead.',
  timeline: 'Jul 2025 - Dec 2025',
  credit: {
    text: 'Built with',
    name: 'Abdulrasheed Akintola, project lead, and the OMO AI team',
    url: 'https://www.linkedin.com/in/abdulrasheed-akintola-102993214/',
  },
  links: [{ label: 'Live site', url: 'https://omo-ai-web-xi.vercel.app/' }],
  stack: ['Next.js', 'TypeScript', 'NextAuth', 'Prisma', 'PostgreSQL', 'Stripe', 'LangChain', 'LangGraph', 'GSAP', 'Docker', 'Turborepo'],
  heroImage: '/images/case-studies/omo-ai/hero.webp',
  heroAlt: 'OMO AI landing page with the headline "Real insights. Better content. Smarter ads. More sales." and a chat box',
  outcomes: [
    { value: '1', label: 'AI agent with a human approve-or-deny step, which I worked on with the lead' },
    { value: '5', label: 'settings areas: general, profile, notifications, security, billing' },
    { value: '5', label: 'admin modules: home, users, subscriptions, team management, roles' },
  ],
  problem: `Small business owners rarely have time to work out what to post, whether their ads work, or who their audience is. OMO AI puts an assistant in front of that data: ask a question in plain language and get analysis and next steps.

A product like that also needs the unglamorous parts to be solid: accounts, billing, settings, and an internal console for the team running it.`,
  constraints: `- **A shared codebase.** Three engineers on one monorepo, with a shared database schema that changes often.
- **Security.** An admin console that can suspend users and change roles has to be locked down properly.
- **Moving requirements** across a long build, with several rounds of rebasing to keep branches in step.
- **Confidentiality.** This is a company product, so this page stays at a level that is safe to publish.`,
  approach: `The product is a Turborepo and pnpm monorepo with a Next.js web app and a shared UI package, using server actions, NextAuth for sign-in, Prisma on PostgreSQL, Stripe subscriptions and a docs site. The assistant is a LangGraph agent with tools, memory kept in Postgres and a streaming chat.

I worked on the AI agent alongside the lead, and I built the account, settings, billing, admin and landing areas described below.`,
  decisions: [
    {
      title: 'Permissions live in the database and are enforced on the server',
      context: 'An admin console where roles are hard-coded, or only hidden in the UI, is one edited request away from a breach.',
      choice:
        'Roles are stored with a permissions object per module. Every admin server action loads the caller\'s role and checks the permission before doing anything, a super admin gets all permissions, and users without access land on a no-access page. The console also refuses to load on a phone.',
      alternatives: 'Hard-coded roles in the code, or hiding buttons in the interface only.',
      tradeoff: 'A database lookup on each action, in return for roles that admins can change without a deploy.',
    },
    {
      title: 'Sign-in that handles the awkward cases',
      context: 'Accounts are the front door: sign-up, verification, recovery and third-party sign-in all need to be right.',
      choice:
        'Email and phone verification with one-time codes, Google sign-in (added in September 2025), forgot-password and reset flows, and a separate admin sign-in and invited-admin sign-in with their own one-time codes. A location lookup during sign-up fills in country details.',
      alternatives: 'Password-only accounts.',
      tradeoff: 'More flows to build and test, many of which most users never see.',
    },
    {
      title: 'Settings as a module, not a page',
      context: 'Profile, notifications, security and billing grow independently.',
      choice:
        'Settings is split into general, profile, notifications, security and billing sections, each with its own route and actions, with theme preference synced to the account. Billing has a pricing page and a subscription model behind it.',
      alternatives: 'One long settings page.',
      tradeoff: 'More routes, but each one stays small and testable.',
    },
    {
      title: 'A person can approve what the agent wants to do',
      context: 'An assistant connected to business accounts should not act on its own where a mistake would matter.',
      choice:
        'The agent has approve and deny endpoints, so a tool run can wait for a person, and its memory and checkpoints are kept in Postgres so a conversation can resume. I worked on this with the lead.',
      alternatives: 'Let the agent run every tool autonomously.',
      tradeoff: 'More friction for the user in exchange for control over actions that matter.',
    },
  ],
  diagrams: [
    {
      title: 'Architecture at a glance',
      mermaid: `flowchart LR
  B["Browser"] --> W["Next.js web app<br/>server actions"]
  W --> N["NextAuth<br/>email, phone and Google sign-in"]
  W --> D[("PostgreSQL<br/>via Prisma")]
  W --> S["Stripe<br/>subscriptions"]
  W --> A["Agent service<br/>LangGraph with tools"]
  A --> D
  A --> H["Approve or deny<br/>by a person"]
  W --> Adm["Admin console<br/>role checks"]
  Adm --> D`,
      caption: 'A high-level view only; internal details are intentionally left out.',
    },
    {
      title: 'How an admin action is authorised',
      mermaid: `flowchart TD
  X["Admin action"] --> Ses["Read session"]
  Ses --> Role["Load role and module permissions"]
  Role --> Q{"Super admin or permitted?"}
  Q -->|"yes"| Run["Run the action"]
  Q -->|"no"| No["No-access page"]
  Run --> Done["Update data and refresh the view"]`,
      caption: 'The check happens on the server for every action.',
    },
  ],
  gallery: [{ src: '/images/case-studies/omo-ai/home-mobile.webp', alt: 'OMO AI landing page on a phone', caption: 'The landing page on a phone.', kind: 'mobile' }],
  challenges: `- **Keeping branches in step.** A busy three-person repo meant frequent rebases and merge conflicts around a shared Prisma schema.
- **Getting permissions right.** The admin console went through several passes: fixing role access handling, an access modal and suspended-user flows.
- **Scope.** Landing page, analytics, integrations and admin work were all moving at the same time.`,
  results: `OMO AI is live. My part shipped the account and onboarding flows, the settings module, billing and pricing screens, the role-based admin console with roles and team management, the animated landing page, and the analytics and integrations screens.

As a company product there are no business metrics I can share, so I will not quote any.`,
  next: `- Add automated tests around the permission checks, which are the highest-risk code in the console.
- Keep an audit trail of admin actions such as suspensions and role changes.`,
}
