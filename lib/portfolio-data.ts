// Portfolio knowledge base - chunked for RAG retrieval
export const portfolioChunks = [
  {
    id: 'bio',
    keywords: ['who', 'habeeb', 'about', 'graduate', 'education', 'university', 'contact', 'email', 'phone', 'social', 'links', 'summary', 'location', 'lagos'],
    content: `Habeeb Owoade (Owoade Habeeb Temitope) is a Full-Stack Software Engineer & AI Systems Researcher based in Lagos, Nigeria. He graduated from Bowen University in July 2026 with a B.Sc. in Software Engineering (CGPA 4.71/5.00, Top 1% of his cohort).

    He ships AI-powered SaaS, fintech, insurtech and e-commerce products for real users, working remotely with Nigerian and US-based teams. He builds the parts that make software trustworthy: signed and idempotent webhooks, role-based access control, background job queues, read-only bank connections and AI agents with a human in the loop. He is the author of two published preprints on LLM agent reliability and review-gated AI architecture, and is currently going deep on system design and distributed-systems fundamentals.
    
    CONTACT:
    - Email: owoadehabeeb04@gmail.com
    - Phone: +234-913-649-7992
    - Location: Lagos, Nigeria
    - GitHub: github.com/owoadehabeeb04
    - LinkedIn: linkedin.com/in/owoade-habeeb (also: linkedin.com/in/owoade-habeeb-temitope-a747601b0)
    - Twitter: twitter.com/Drealtemiteee_
    - Portfolio: [Full Portfolio](/portfolio)
    - CV: [Download CV](/Habeeb-Owoade-CV.pdf)`
  },
  {
    id: 'quicklyster',
    keywords: ['quicklyster', 'qa', 'scoring', 'rules', 'engine', 'langgraph', 'agent', 'review', 'calibration', 'human', 'loop', 'audit', 'dashboard', 'ci', 'cd', 'aws', 'github', 'actions', 'experience', 'work', 'job', 'career', 'employment', 'current', 'latest'],
    content: `Software Engineer at Quicklyster (Jan 2026 - Jul 2026, Remote):
    - Built a configurable QA scoring and rules engine in Next.js, TypeScript, Node.js, Express.js and PostgreSQL with org-specific rubrics, weighted criteria and thresholds, so every client organization got scores matching its own standards
    - Orchestrated the AI review flow as a LangGraph agent with structured outputs, critical-failure logic and deterministic calculations, so the same input always produced the same, explainable result
    - Built human-in-the-loop validation, benchmarking and calibration workflows that keep criterion-level decisions, raising exact-match scorer agreement by 27% (AI and human reviewers often disagreed)
    - Shipped performance dashboards, reviewer workflows, audit history and reporting in Next.js, giving managers a traceable record of every review decision
    - Set up CI/CD with GitHub Actions deploying to AWS so every merge ships automatically`
  },
  {
    id: 'research',
    keywords: ['research', 'researcher', 'preprint', 'preprints', 'publication', 'publications', 'paper', 'papers', 'zenodo', 'llm', 'agent', 'reliability', 'revalidation', 'benchmark', 'sefa', 'doi', 'published', 'academic'],
    content: `RESEARCH & PUBLICATIONS (Habeeb is a published AI systems researcher):
    
    PREPRINTS:
    1. Owoade, H. T. (2026). Automatic Action-Dependency Inference for Selective Revalidation of Tool-Using LLM Agents. Preprint, Version 1. Zenodo. doi:10.5281/zenodo.23363804 - [Read it](https://doi.org/10.5281/zenodo.23363804)
    2. Owoade, H. T. (2026). SEFA: A Review-Gated Architecture for AI-Assisted Financial Budgeting and Expense Intelligence. Preprint, Version 2. Zenodo. doi:10.5281/zenodo.22881415 - [Read it](https://doi.org/10.5281/zenodo.22881415)
    
    INDEPENDENT RESEARCHER (2026) - LLM Agent Reliability and Selective Revalidation:
    - Studied whether tool-using LLM agents can infer the state dependencies behind consequential actions and revalidate only those under environment drift, using a deterministic refund benchmark (36 action-bearing captures, 144 matched replay branches)
    - Achieved 0.9385 F1 (1.0000 recall) for action-dependency inference; LLM-selective revalidation prevented 22/22 observed unsafe actions and cut revalidation reads by 36.9% versus the full-state baseline
    - Built the pipeline with TypeScript, LangGraph, MCP, PostgreSQL and RabbitMQ, with deterministic replay and automated evaluation`
  },
  {
    id: 'sefa',
    keywords: ['sefa', 'budget', 'budgeting', 'finance', 'fintech', 'mono', 'bank', 'statement', 'pdf', 'react', 'native', 'mobile', 'sse', 'azure', 'openai', 'expense', 'spending', 'transactions'],
    content: `SEFA - AI Budgeting App (2026) | React Native, TypeScript, Node.js, SSE, Mono API:
    - Mobile-first AI personal finance app with budgets, bank sync, statement import and spending insights
    - Read-only bank connection (Mono API) that can sync transactions but never transfer, withdraw or modify an account
    - PDF statement import pipeline (Node.js, PDF.js, Azure OpenAI) that extracts up to 137 transactions, detects duplicates and stages records for review before saving
    - AI finance assistant with confirmation-based actions and streaming over Server-Sent Events
    - Evaluated on a 300-transaction synthetic benchmark: 99.49% parser field agreement, 78.40% clear-category accuracy and 1.000 duplicate-detection F1; published as a preprint (see research)`
  },
  {
    id: 'lumes',
    keywords: ['lumes', 'e-commerce', 'ecommerce', 'store', 'storefront', 'stripe', 'webhook', 'webhooks', 'idempotent', 'nextauth', 'mongodb', 'inventory', 'orders', 'refund', 'brevo', 'tiptap', 'admin', 'coupons', 'payment'],
    content: `LUMES - E-commerce Platform (2026) | Next.js, TypeScript, MongoDB, Stripe:
    - Production-ready storefront and custom admin dashboard on the Next.js App Router with NextAuth authentication and role-based access control
    - Inventory and order lifecycle logic: stock pre-checks before checkout, idempotent Stripe webhook handling, signed webhook verification, refund processing and transactional email through Brevo
    - Reusable admin product suite with TipTap, Zustand and TanStack Query: rich text, multi-image uploads, coupons, low-stock alerts, multilingual support and currency conversion`
  },
  {
    id: 'education',
    keywords: ['education', 'university', 'bowen', 'cgpa', 'gpa', 'degree', 'graduate', 'graduated', 'grade', 'hackathon', 'coursework', 'courses', 'interests', 'hobbies', 'games'],
    content: `EDUCATION: B.Sc. Software Engineering, Bowen University, Iwo, Nigeria. CGPA 4.71/5.00 (Top 1%). Graduated July 2026.
    - First runner-up, TechHub Frontend Hackathon (20+ students)
    - Relevant coursework: Data Structures, Web Technologies, Algorithms, Computer Architecture
    
    INTERESTS: Story-driven video games, building AI-powered products, clean UI and editorial-style web design.
    
    CV: [Download CV](/Habeeb-Owoade-CV.pdf)`
  },
  {
    id: 'solar_survey',
    keywords: ['solar', 'survey', 'three.js', '3d', 'globe', 'pwa', 'offline', 'maps', 'websocket', 'experience', 'work', 'job', 'career', 'employment'],
    content: `Software Engineer at Solar Survey AI (Sep 2024 - Dec 2025, Remote, Illinois, USA):
    - Field technicians lost work in areas with poor connectivity, so he launched an offline-capable PWA in React and TypeScript that improved field usability by 40%
    - Integrated WebSockets and the Google Maps API for real-time upload feedback and precise location workflows
    - Built a React admin dashboard with bulk uploads, granular user controls and automated exports of 400+ images
    - Engineered an interactive 3D globe explorer in React, Three.js and TypeScript with real-time visualization of solar projects across multiple geographies`
  },
  {
    id: 'omo_ai',
    keywords: ['omo', 'ai', 'chatbot', 'ads', 'analytics', 'prisma', 'postgresql', 'docker', 'langchain', 'experience', 'work', 'job', 'career', 'employment', 'contract', 'rbac', 'roles', 'permissions'],
    content: `Software Engineer (Contract) at Omo AI (Jul 2025 - Dec 2025, Remote):
    - Built full-stack product features for an AI-powered marketing analytics platform (businesses track ad performance and engagement) using Next.js, TypeScript, GSAP, Zustand, Prisma, PostgreSQL, Docker, LangChain and Google Cloud Platform
    - Developed a role-based admin dashboard to manage users, assign roles, configure permissions and control access to platform modules
    - Designed database structures for users, businesses, roles, permissions and settings for secure multi-role access control
    - Built authentication (including OAuth via Google Cloud), onboarding, protected route flows and server-side service logic in Next.js
    - Implemented a dynamic settings module for business configuration, user management, analytics visibility and access control
    - Collaborated closely with a small engineering team to refine chatbot workflows, automate feedback loops and improve analytics accuracy`
  },
  {
    id: 'nsia',
    keywords: ['nsia', 'insurance', 'intern', 'node', 'express', 'redis', 'bullmq', 'portal', 'experience', 'work', 'job', 'career', 'employment', 'internship'],
    content: `Enterprise Software Engineer Intern at NSIA Insurance (Mar 2025 - Aug 2025, Lagos):
    - Customers had no self-service way to buy or manage policies, so he architected and built a customer portal on Node.js, Express.js and PostgreSQL covering policy purchase and management end to end
    - Moved long-running work (including background policy document processing) to Redis and BullMQ job queues to keep the portal responsive under load
    - Built bulk-upload tools for the internal GIT portal in Next.js and React.js with React Query mutations, cutting manual entry time by 75%
    - Designed and deployed a corporate blog platform in React.js and Tailwind CSS
    - Partnered with IT and design teams to roll out a standard email signature system for 300+ employees`
  },
  {
    id: 'chef4me',
    keywords: ['chef', 'lms', 'learning', 'course', 'notifications', 'experience', 'work', 'job', 'career', 'employment'],
    content: `Frontend Engineer at Chef4Me (Sep 2023 - Oct 2024, Remote, Lagos):
    - Built a scalable LMS platform for 1,000+ users with real-time notifications, course creation, progress tracking and user dashboards
    - Boosted system responsiveness by 70% through optimized REST API integrations, frontend query improvements and cleaner data rendering
    - Increased website performance and user experience by 80% through frontend optimization, lazy loading and reusable component architecture
    - Developed admin dashboard features for user management, cart tracking, order management and internal operations`
  },
  {
    id: 'hng',
    keywords: ['hng', 'hackathon', 'timbu', 'delvefun', 'e-commerce', 'experience', 'work', 'job', 'career', 'employment', 'internship'],
    content: `Frontend Engineer Intern (Finalist) at HNG Technologies (Jun 2024 - Aug 2024, Lagos):
    - Ranked in the Top 500 out of 30,000+ participants in a competitive software engineering internship program
    - Built an e-commerce application integrating the Timbu API with React, Vite, TypeScript and Tailwind CSS
    - Developed DelveFun, a full-stack language learning platform with authentication, progress tracking and admin course management`
  },

  {
    id: 'recipia',
    keywords: ['recipia', 'recipe', 'cooking', 'voice', 'image', 'calendar', 'meal', 'shopping'],
    content: `Recipia - AI Recipe App (2025) | Next.js, MongoDB, Gemini API:
    - AI chatbot with multimodal input (voice and image) and personalized recipe discovery, plus verified cooking reviews
    - Voice input via the browser Web Speech API (speech-to-text) so users can talk to the chatbot instead of typing
    - Google Calendar API integration for real-time meal scheduling and planning; shopping list features alongside meal planning
    - MongoDB workflows for users, recipe data, personalized dashboards, RBAC and collaborative features; responsive dashboards for recipe management, meal planning and reviews`
  },
  {
    id: 'link_sharing',
    keywords: ['link', 'sharing', 'profile', 'firebase', 'verified'],
    content: `Link Sharing Web App (2024) | Next.js, Firebase:
    - Public profiles with verified links and shareable URLs
    - Link management system for verified resource sharing`
  },
  {
    id: 'ace_stores',
    keywords: ['ace', 'stores', 'e-commerce', 'shop', 'paystack', 'payment', 'cart'],
    content: `Ace Stores - E-commerce Platform (2023) | React, TypeScript, Firebase:
    - Secure authentication, cart/order management, Paystack checkout
    - Converted Figma to pixel-perfect responsive UI`
  },
  {
    id: 'skills',
    keywords: ['skills', 'tech', 'stack', 'technologies', 'tools', 'languages', 'learning', 'what', 'know', 'familiar'],
    content: `Technical Skills:
    
    LANGUAGES: TypeScript, JavaScript, Python, SQL, HTML5/CSS3
    
    FRONTEND: React, Next.js, React Native, Electron, Vite, Tailwind CSS, shadcn/ui, TanStack Query (React Query), Zustand, PWA, Bootstrap, Framer Motion, GSAP, Three.js
    
    BACKEND: Node.js, NestJS, Express.js, REST APIs, Webhooks, PostgreSQL, MongoDB, Prisma ORM, Firebase, Redis, BullMQ, RabbitMQ
    
    SYSTEMS: Authentication, RBAC, Background Jobs, WebSockets, SSE, API Design, Database Design, Payment Workflows
    
    AI & RESEARCH: LLM APIs, LangChain.js, LangGraph, MCP, AI Agents, Structured Outputs, Benchmark Design, Evaluation and Calibration, Human-in-the-Loop Systems, Gemini API, Azure OpenAI
    
    DEVOPS & TOOLS: Git, GitHub Actions (CI/CD), AWS, Docker, Google Cloud Platform, Stripe, Paystack, NextAuth, Postman, Figma, Vercel, Firebase Auth
    
    PREVIOUSLY LISTED AS LEARNING: Remix, Flask, LangChain.js
    
    Full list of technologies: [see his full list of technologies](/portfolio#skills)`
  },
  {
    id: 'teaching',
    keywords: ['teach', 'instructor', 'mentor', 'bowen', 'tech', 'hub', 'workshop', 'experience', 'work', 'job', 'career', 'employment', 'leadership', 'honors', 'awards'],
    content: `Frontend Dev Instructor at Bowen Tech Hub (Feb 2024 - Present, Osun, Nigeria):
    - Taught HTML, CSS, JavaScript and React to 30+ students and mentored beginners through code reviews and debugging support
    
    HONORS: Top 1% of graduating cohort (Bowen University, 2026); Top 500 of 30,000+ participants in the HNG Software Engineering Internship Programme (2024); First runner-up, TechHub Frontend Hackathon (20+ students).`
  },
  {
    id: 'all_projects',
    keywords: ['projects', 'built', 'created', 'developed', 'portfolio', 'work', 'show', 'showcase', 'list'],
    content: `## FULLSTACK PROJECTS

### 0. Latest (2026): SEFA and LUMES
- **SEFA - AI Budgeting App** (React Native, TypeScript, Node.js, SSE, Mono API): read-only bank sync, PDF statement import with duplicate detection, AI finance assistant; published as a preprint.
- **LUMES - E-commerce Platform** (Next.js, TypeScript, MongoDB, Stripe): storefront plus admin dashboard, NextAuth RBAC, idempotent signed Stripe webhooks, refunds, Brevo email.

### 1. Recipia - AI-Powered Recipe App
**Category:** Fullstack | AI Recipe Discovery  
**Live:** [View Project](https://recipe-app-kappa-cyan.vercel.app/)  
**Description:** Built an AI-powered chatbot with multimodal input (voice/image) for interactive recipe discovery and verified cooking reviews. Integrated Google Calendar API for real-time meal planning and scheduling. Developed a full-stack AI recipe platform with RBAC, personalized dashboards, and collaborative features.  
**Tech Stack:** Next.js, MongoDB, TypeScript, LangChain

---

### 2. OMO AI - Marketing Intelligence
**Category:** Fullstack | AI Marketing Platform  
**Live:** [View Project](https://omo-ai-web-xi.vercel.app/)  
**Description:** Co-developed an intensive AI-powered chatbot platform for businesses to track and manage ad performance and engagement in real time. Built a comprehensive authentication and onboarding system with secure sessions, OAuth via Google Cloud, and role-based access control. Implemented a dynamic settings module and an admin dashboard for robust user and data management.  
**Tech Stack:** Next.js, TypeScript, Prisma, PostgreSQL, Docker, Google Cloud

---

### 3. NSIA Insurance Customer Portal
**Category:** Fullstack | Insurance Portal  
**Live:** [View Project](https://dev.nsiainsurance.com.ng/)  
**Description:** Architected and building a customer portal for seamless purchase and management of insurance policies, leveraging Node.js, Express.js, PostgreSQL, Redis, BullMQ for background policy document processing and scalability. Automated internal GIT portal processes with bulk-upload tools, reducing manual entry time by 75%.  
**Tech Stack:** Next.js, TypeScript, Node.js, PostgreSQL, Redis

---

### 4. Dev Link - Link Sharing App
**Category:** Fullstack | Link Management  
**Description:** Built public profiles with verified links, authentication, and shareable URLs to boost user visibility. Designed a link management system enabling users to verify and publicly share key resources with drag-and-drop functionality and real-time previews.  
**Tech Stack:** Next.js, TypeScript, Firebase

---

### 5. Ace Stores - E-commerce Platform
**Category:** Fullstack | Ecommerce Web App  
**Live:** [View Project](https://ace-stores.vercel.app/) | [GitHub](https://github.com/owoadehabeeb04/ace-store)  
**Description:** Implemented secure user authentication, cart/order management, and Paystack checkout, supporting real transactions. Converted Figma wireframes into a responsive, pixel-perfect user interface.  
**Tech Stack:** React, TypeScript, Firebase

---

## FRONTEND PROJECTS

### 6. Solar Survey AI
**Category:** Frontend | AI-Driven Drone Surveys  
**Live:** [View Project](https://www.solarsurvey.ai/)  
**Description:** Engineered an interactive 3D globe explorer using React, Three.js, TypeScript, enabling real-time visualization of solar projects across geographies. Launched a scalable PWA supporting offline mode for technicians, improving field usability by 40%. Integrated Google Maps API and WebSockets to deliver precise mapping and real-time upload feedback.  
**Tech Stack:** React, TypeScript, Tailwind CSS

---

### 7. CrewLink - Field Team Management
**Category:** Frontend | Team Management Platform  
**Live:** [View Project](https://www.crewlink.ai/)  
**Description:** Developed a comprehensive field team management platform with real-time tracking, task assignment, and communication features. Built responsive interfaces for mobile and desktop to streamline field operations and improve team coordination.  
**Tech Stack:** React, TypeScript, Tailwind CSS

---

### 8. Tobi Owoade Portfolio
**Category:** Frontend | Portfolio Website  
**Live:** [View Project](https://www.tobiowoade.com/)  
**Description:** Designed and developed a modern, responsive portfolio website showcasing creative work and professional experience. Implemented smooth animations, interactive elements, and a clean, editorial design aesthetic.`
  },
  {
    id: 'recipia_details',
    keywords: ['recipia', 'recipe', 'cooking', 'voice', 'image', 'calendar', 'meal', 'food', 'ai recipe'],
    content: `Recipia - AI Recipe App (2025) | Next.js, MongoDB, Gemini API:
    
    LIVE: https://recipe-app-kappa-cyan.vercel.app/
    
    KEY FEATURES:
    - AI chatbot with multimodal input (voice/image) for interactive recipe discovery
    - Verified cooking reviews system
    - Google Calendar API integration for real-time meal planning and scheduling
    - Full-stack AI recipe platform with RBAC (Role-Based Access Control)
    - Personalized dashboards
    - Collaborative features for sharing recipes
    
    TECH STACK: Next.js, MongoDB, Gemini API, Google Calendar API, TypeScript, LangChain`
  },
  {
    id: 'vyna_details',
    keywords: ['vyna', 'music', 'playlist', 'spotify', 'gemini', 'ai', 'mood', 'redis', 'songs', 'weekly'],
    content: `Vyna - AI Music Playlist App (2025) | Next.js, MongoDB, Node.js, Gemini API:
    
    **STATUS:** 🚧 In Development - Coming Soon!
    
    PLANNED FEATURES:
    - AI chatbot generates personalized playlists based on user mood using Gemini API and Spotify API
    - "New Music Friday" feature: curated weekly recommendations delivered via email
    - Seamless Spotify playlist export
    - Seeding engine to generate playlists from seed tracks for enhanced personalization and discovery
    - Background processing with Redis and BullMQ for playlist generation and email scheduling
    
    TECH STACK: Next.js, MongoDB, Node.js, Gemini API, Spotify API, Redis, BullMQ`
  },
  {
    id: 'solar_details',
    keywords: ['solar', 'survey', 'three.js', '3d', 'globe', 'pwa', 'offline', 'maps', 'websocket', 'drone', 'visualization'],
    content: `Solar Survey AI - AI-Driven Drone Surveys (Sept 2024 - Dec 2025):
    
    LIVE: https://www.solarsurvey.ai/
    
    ACHIEVEMENTS:
    - Engineered interactive 3D globe explorer using React, Three.js, TypeScript
    - Real-time visualization of solar projects across geographies
    - Launched scalable PWA with offline mode for field technicians (40% usability improvement)
    - Admin dashboard with bulk uploads (400+ images), automated image exports
    - Granular user controls for content management
    - Google Maps API integration for precise mapping
    - WebSockets for real-time upload feedback
    
    TECH STACK: React, Three.js, TypeScript, PWA, Google Maps API, WebSockets, Tailwind CSS`
  },
  {
    id: 'crewlink_details',
    keywords: ['crewlink', 'crew', 'team', 'management', 'field', 'tracking'],
    content: `CrewLink - Field Team Management Platform:
    
    LIVE: https://www.crewlink.ai/
    
    FEATURES:
    - Comprehensive field team management platform
    - Real-time tracking of field workers
    - Task assignment and delegation
    - Team communication features
    - Responsive interfaces for mobile and desktop
    - Streamlined field operations
    - Improved team coordination
    
    TECH STACK: React, TypeScript, Tailwind CSS`
  },
  {
    id: 'ace_stores_details',
    keywords: ['ace', 'stores', 'e-commerce', 'shop', 'paystack', 'payment', 'cart', 'shopping'],
    content: `Ace Stores - E-commerce Platform (2023):
    
    LIVE: https://ace-stores.vercel.app/
    GITHUB: github.com/owoadehabeeb04/ace-store
    
    FEATURES:
    - Secure user authentication system
    - Cart and order management
    - Paystack checkout integration supporting real transactions
    - Converted Figma wireframes into pixel-perfect responsive UI
    - Real-time inventory management
    
    TECH STACK: React, TypeScript, Firebase, Paystack API`
  },
  {
    id: 'devlink_details',
    keywords: ['link', 'sharing', 'profile', 'firebase', 'verified', 'devlink', 'dev link', 'url'],
    content: `Dev Link - Link Sharing App (2024) | Next.js, Firebase:
    
    FEATURES:
    - Public profiles with verified links
    - Authentication system
    - Shareable URLs to boost user visibility
    - Link management system for verified resource sharing
    - Drag-and-drop functionality
    - Real-time link previews
    
    TECH STACK: Next.js, TypeScript, Firebase`
  }
]

// Keyword synonyms and related terms for better matching
const keywordSynonyms: Record<string, string[]> = {
  'project': ['projects', 'work', 'built', 'developed', 'created', 'portfolio'],
  'experience': ['work', 'job', 'career', 'employment', 'role', 'position'],
  'skills': ['tech', 'stack', 'technologies', 'tools', 'languages', 'frameworks'],
  'frontend': ['front-end', 'ui', 'react', 'next.js', 'nextjs', 'interface'],
  'backend': ['back-end', 'server', 'api', 'node', 'express', 'database'],
  'ai': ['artificial intelligence', 'machine learning', 'ml', 'chatbot', 'langchain'],
  'database': ['db', 'sql', 'postgresql', 'mongo', 'mongodb', 'redis'],
  'contact': ['email', 'phone', 'reach', 'connect', 'social'],
  'education': ['school', 'university', 'student', 'cgpa', 'academic'],
  'recipia': ['recipe', 'cooking', 'food', 'meal', 'ai recipe'],
  'solar': ['photovoltaic', 'renewable', 'energy', '3d', 'three.js', 'globe'],
  'ecommerce': ['e-commerce', 'shop', 'store', 'cart', 'payment', 'paystack'],
}

// Preprocess query: expand with synonyms and extract intent
function preprocessQuery(query: string): { 
  expandedQuery: string
  intent: 'projects' | 'experience' | 'skills' | 'contact' | 'general'
} {
  const lowerQuery = query.toLowerCase()
  let expandedTerms = lowerQuery.split(/\s+/)
  
  // Expand query with synonyms
  const synonymMatches = new Set<string>()
  for (const [key, synonyms] of Object.entries(keywordSynonyms)) {
    if (lowerQuery.includes(key) || synonyms.some(syn => lowerQuery.includes(syn))) {
      synonymMatches.add(key)
      synonyms.forEach(syn => synonymMatches.add(syn))
    }
  }
  
  expandedTerms = [...expandedTerms, ...Array.from(synonymMatches)]
  
  // Detect intent
  let intent: 'projects' | 'experience' | 'skills' | 'contact' | 'general' = 'general'
  if (/show|display|view|see|list/.test(lowerQuery) && /project/.test(lowerQuery)) {
    intent = 'projects'
  } else if (/experience|work|job|career|role/.test(lowerQuery)) {
    intent = 'experience'
  } else if (/skill|tech|stack|technolog|framework|language/.test(lowerQuery)) {
    intent = 'skills'
  } else if (/contact|email|phone|reach|connect/.test(lowerQuery)) {
    intent = 'contact'
  }
  
  return {
    expandedQuery: expandedTerms.join(' '),
    intent
  }
}

// Enhanced keyword-based retrieval with synonym matching and weighting
// TODO: Upgrade to semantic embeddings for better relevance
export function retrieveRelevantChunks(query: string, maxChunks: number = 3): string {
  const { expandedQuery, intent } = preprocessQuery(query)
  const lowerQuery = expandedQuery.toLowerCase()
  
  // Score each chunk based on keyword matches with weighting
  const scored = portfolioChunks.map(chunk => {
    let score = 0
    
    // Exact keyword matches (higher weight)
    chunk.keywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        // Boost score for exact matches
        score += 2
        
        // Extra boost for intent-matching chunks
        if (intent === 'experience' && chunk.keywords.includes('experience')) score += 1
        if (intent === 'skills' && chunk.keywords.includes('skills')) score += 1
        if (intent === 'projects' && chunk.id.includes('details')) score += 1
        if (intent === 'contact' && chunk.id === 'bio') score += 2
      }
    })
    
    // Partial matches in content (lower weight)
    const queryTerms = lowerQuery.split(/\s+/)
    queryTerms.forEach(term => {
      if (term.length > 3 && chunk.content.toLowerCase().includes(term)) {
        score += 0.5
      }
    })
    
    return { chunk, score }
  })
  
  // Sort by score and take top N
  const topChunks = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map(item => item.chunk.content)
  
  // Fallback: if no matches, return bio + skills for general queries
  if (topChunks.length === 0) {
    const bio = portfolioChunks.find(c => c.id === 'bio')?.content || ''
    const skills = portfolioChunks.find(c => c.id === 'skills')?.content || ''
    return `${bio}\n\n${skills}`
  }
  
  return topChunks.join('\n\n')
}
