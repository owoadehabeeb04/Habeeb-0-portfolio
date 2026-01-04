// Portfolio knowledge base - chunked for RAG retrieval
export const portfolioChunks = [
  {
    id: 'bio',
    keywords: ['who', 'habeeb', 'about', 'student', 'education', 'university', 'contact', 'email', 'phone', 'social', 'links'],
    content: `Habeeb Owoade (Owoade Habeeb Temitope) is a Software Engineering student at Bowen University (CGPA: 4.65/5.00, Top 1%). 
    First runner-up in TechHub Frontend Hackathon (20+ students).
    
    CONTACT:
    - Email: owoadehabeeb04@gmail.com
    - Phone: +234-913-649-7992
    - GitHub: github.com/owoadehabeeb04
    - LinkedIn: linkedin.com/in/owoade-habeeb (also: linkedin.com/in/owoade-habeeb-temitope-a747601b0)
    - Twitter: twitter.com/Drealtemiteee_
    - Portfolio: [Full Portfolio](/portfolio)
    
    He's a full-stack developer who builds scalable web applications and robust backend systems. From crafting intuitive frontends with React and Next.js to designing efficient server architectures, he focuses on clean code and practical solutions.`
  },
  {
    id: 'solar_survey',
    keywords: ['solar', 'survey', 'three.js', '3d', 'globe', 'pwa', 'offline', 'maps', 'websocket', 'experience', 'work', 'job', 'career', 'employment'],
    content: `Software Engineer at Solar Survey AI (Sept 2024 - Oct 2025, Remote, Illinois):
    - Built interactive 3D globe with React, Three.js, TypeScript for solar project visualization
    - Launched PWA with offline mode, improving field usability by 40%
    - Developed admin dashboard with bulk uploads (400+ images), Google Maps API, WebSockets`
  },
  {
    id: 'omo_ai',
    keywords: ['omo', 'ai', 'chatbot', 'ads', 'analytics', 'prisma', 'postgresql', 'docker', 'langchain', 'experience', 'work', 'job', 'career', 'employment', 'contract'],
    content: `Software Engineer at Omo AI (July 2025 - Oct 2025, Contract):
    - Co-developed AI-powered chatbot for ad performance tracking
    - Built authentication/onboarding with OAuth (Google Cloud), RBAC
    - Tech stack: Prisma ORM, PostgreSQL, Docker, Next.js, LangChain, Google Cloud Platform`
  },
  {
    id: 'nsia',
    keywords: ['nsia', 'insurance', 'intern', 'node', 'express', 'redis', 'bullmq', 'portal', 'experience', 'work', 'job', 'career', 'employment', 'internship'],
    content: `Enterprise Software Engineer Intern at NSIA Insurance (Mar 2025 - Aug 2025, Lagos):
    - Architected customer portal for insurance policies with Node.js, Express.js, PostgreSQL, Redis, BullMQ
    - Automated GIT portal processes, reducing manual entry by 75%
    - Built corporate blog with React.js, Tailwind CSS
    - Deployed email signature system for 300+ employees`
  },
  {
    id: 'chef4me',
    keywords: ['chef', 'lms', 'learning', 'course', 'notifications', 'experience', 'work', 'job', 'career', 'employment'],
    content: `Frontend Engineer at Chef4Me (Sept 2023 - Oct 2024, Remote, Lagos):
    - Built LMS platform for 1,000+ users with real-time notifications, course creation, progress tracking
    - Boosted responsiveness by 70% via optimized REST APIs
    - Increased performance by 80% with lazy loading and frontend optimization
    - Developed admin dashboard for user/cart/order management`
  },
  {
    id: 'hng',
    keywords: ['hng', 'hackathon', 'timbu', 'delvefun', 'e-commerce', 'experience', 'work', 'job', 'career', 'employment', 'internship'],
    content: `Frontend Engineer Intern Finalist at HNG Technologies (June 2024 - Aug 2024):
    - Ranked Top 500 out of 30,000+ participants
    - Built e-commerce app with Timbu API, React (Vite), TypeScript, Tailwind CSS
    - Developed DelveFun: full-stack language learning platform with auth, progress tracking, admin dashboard`
  },

  {
    id: 'recipia',
    keywords: ['recipia', 'recipe', 'cooking', 'voice', 'image', 'calendar', 'meal'],
    content: `Recipia - AI Recipe App (2025) | Next.js, MongoDB, Gemini API:
    - AI chatbot with multimodal input (voice/image) for recipe discovery
    - Google Calendar API integration for meal planning
    - Full-stack platform with RBAC, personalized dashboards, collaborative features`
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
    
    LANGUAGES: JavaScript, TypeScript, HTML5/CSS3, Python, SQL
    
    FRONTEND: React, Next.js, Tailwind CSS, shadcn/ui, Bootstrap, Framer Motion
    
    BACKEND: Node.js, Express.js, MongoDB, Firebase, PostgreSQL, Prisma ORM, Redis
    
    STATE MANAGEMENT: React Query (TanStack Query), Zustand
    
    AI/ML: LangChain, LangGraph, Gemini API, Google Cloud AI
    
    3D/GRAPHICS: Three.js
    
    DEVOPS & TOOLS: Docker, Git, Figma, Vercel, Firebase Auth, Postman, WebSockets, Google Cloud Platform, BullMQ
    
    CURRENTLY LEARNING: Remix, Flask, LangChain.js
    
    Full list of technologies: Python, SQL, HTML5, CSS3, Tailwind CSS, JavaScript, React, Next.js, Node.js, Express.js, MongoDB, Prisma, Firebase, Framer Motion, TypeScript, PostgreSQL, Docker, Google Cloud, Redis, Three.js, LangChain, LangGraph`
  },
  {
    id: 'teaching',
    keywords: ['teach', 'instructor', 'mentor', 'bowen', 'tech', 'hub', 'workshop', 'experience', 'work', 'job', 'career', 'employment'],
    content: `Frontend Dev Instructor at Bowen Tech Hub (Feb 2024 - Present):
    - Taught HTML, CSS, React to 30+ students in workshops
    - Mentored beginner devs in project-based learning and code reviews`
  },
  {
    id: 'all_projects',
    keywords: ['projects', 'built', 'created', 'developed', 'portfolio', 'work', 'show', 'showcase', 'list'],
    content: `## FULLSTACK PROJECTS

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
