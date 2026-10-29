# Habeeb Owoade

**Full-Stack Software Engineer & AI Systems Researcher**

+234 913 649 7992 | owoadehabeeb04@gmail.com | LinkedIn | GitHub | Portfolio | Lagos, Nigeria

PDF version: /Habeeb-Owoade-CV.pdf

---

## Summary

Full-stack engineer and AI systems researcher shipping AI-powered SaaS, fintech, insurtech and e-commerce products for real users, remotely with Nigerian and US-based teams. I build the parts that make software trustworthy: signed and idempotent webhooks, role-based access control, background job queues, read-only bank connections and AI agents with a human in the loop. Author of two published preprints on LLM agent reliability and review-gated AI architecture. Software Engineering graduate with a 4.71/5.00 CGPA (top 1%), currently going deep on system design and distributed-systems fundamentals.

## Education

**Bowen University**, Iwo, Nigeria
B.Sc. Software Engineering, CGPA 4.71/5.00 (Top 1%), graduated July 2026

- First runner-up, TechHub Frontend Hackathon (20+ students)
- Relevant coursework: Data Structures, Web Technologies, Algorithms, Computer Architecture

## Research Publications & Preprints

1. Owoade, H. T. (2026). Automatic Action-Dependency Inference for Selective Revalidation of Tool-Using LLM Agents. Preprint, Version 1. Zenodo. doi:10.5281/zenodo.23363804
2. Owoade, H. T. (2026). SEFA: A Review-Gated Architecture for AI-Assisted Financial Budgeting and Expense Intelligence. Preprint, Version 2. Zenodo. doi:10.5281/zenodo.22881415

## Experience

### Quicklyster, Software Engineer (Remote), Jan 2026 – Jul 2026

- Built a configurable QA scoring and rules engine in Next.js, TypeScript, Node.js, Express.js and PostgreSQL with org-specific rubrics, weighted criteria and thresholds
- Orchestrated the AI review flow as a LangGraph agent with structured outputs, critical-failure logic and deterministic calculations
- Built human-in-the-loop validation, benchmarking and calibration workflows, raising exact-match scorer agreement by 27%
- Shipped performance dashboards, reviewer workflows, audit history and reporting in Next.js
- Set up CI/CD with GitHub Actions deploying to AWS

### NSIA Insurance, Enterprise Software Engineer Intern (Lagos, Nigeria), Mar 2025 – Aug 2025

- Architected and built a customer portal on Node.js, Express.js and PostgreSQL for policy purchase and management
- Moved long-running work (including policy document processing) to Redis and BullMQ background job queues
- Built bulk-upload tools in Next.js and React.js with React Query mutations, cutting manual entry time by 75%
- Designed and deployed a corporate blog platform in React.js and Tailwind CSS; rolled out a standard email signature system for 300+ employees

### Solar Survey AI, Software Engineer (Remote, Illinois, USA), Sep 2024 – Dec 2025

- Launched an offline-capable PWA in React and TypeScript that improved field usability by 40%
- Integrated WebSockets and the Google Maps API for real-time upload feedback and location workflows
- Built a React admin dashboard with bulk uploads, granular user controls and automated exports of 400+ images
- Engineered an interactive 3D globe explorer in React, Three.js and TypeScript

### Omo AI, Software Engineer (Contract, Remote), Jul 2025 – Dec 2025

- Built full-stack features for an AI-powered marketing analytics platform using Next.js, TypeScript, GSAP, Zustand, Prisma, PostgreSQL, Docker, LangChain and Google Cloud Platform
- Developed a role-based admin dashboard (users, roles, permissions, module access) and the supporting database structures
- Built authentication (OAuth via Google Cloud), onboarding, protected route flows and server-side service logic in Next.js
- Implemented a dynamic settings module for business configuration, user management and analytics visibility
- Collaborated with a small engineering team to refine chatbot workflows, automate feedback loops and improve analytics accuracy

### Chef4Me, Frontend Engineer (Remote, Lagos, Nigeria), Sep 2023 – Oct 2024

- Built a scalable LMS platform for 1,000+ users: real-time notifications, course creation, progress tracking, dashboards
- Boosted system responsiveness by 70% through optimized REST API integrations
- Increased website performance and user experience by 80% through frontend optimization, lazy loading and reusable components
- Developed admin dashboard features for user management, cart tracking and order management

### HNG Technologies, Frontend Engineer Intern (Finalist), Jun 2024 – Aug 2024

- Ranked in the Top 500 out of 30,000+ participants
- Built an e-commerce application with the Timbu API, React, Vite, TypeScript and Tailwind CSS
- Developed DelveFun, a full-stack language learning platform with authentication, progress tracking and admin course management

## Research Experience

### Independent Researcher, 2026: LLM Agent Reliability and Selective Revalidation

- Studied whether tool-using LLM agents can infer the state dependencies behind consequential actions and revalidate only those under environment drift (deterministic refund benchmark: 36 action-bearing captures, 144 matched replay branches)
- 0.9385 F1 (1.0000 recall) for action-dependency inference; prevented 22/22 observed unsafe actions and cut revalidation reads by 36.9% versus the full-state baseline
- Built with TypeScript, LangGraph, MCP, PostgreSQL and RabbitMQ, with deterministic replay and automated evaluation

## Projects

### SEFA, AI Budgeting App (2026): React Native, TypeScript, Node.js, SSE, Mono API

- Mobile-first AI personal finance app with budgets, bank sync, statement import and spending insights; read-only Mono API bank connection that can never transfer, withdraw or modify an account
- PDF statement import pipeline (Node.js, PDF.js, Azure OpenAI): extracts up to 137 transactions, detects duplicates, stages records for review before saving; AI finance assistant with confirmation-based actions streamed over SSE
- 300-transaction synthetic benchmark: 99.49% parser field agreement, 78.40% clear-category accuracy, 1.000 duplicate-detection F1; published as a preprint

### LUMES, E-commerce Platform (2026): Next.js, TypeScript, MongoDB, Stripe

- Storefront and custom admin dashboard on the Next.js App Router with NextAuth and role-based access control
- Stock pre-checks before checkout, idempotent Stripe webhook handling, signed webhook verification, admin-managed refunds, transactional email through Brevo
- Admin product suite with TipTap, Zustand and TanStack Query: rich text, multi-image uploads, coupons, low-stock warnings on the dashboard, location-based currency conversion

### Recipia, AI Recipe App (2025): Next.js, MongoDB, Gemini API

- AI chatbot with multimodal input (voice and image) and personalized recipe discovery; voice input via the Web Speech API
- Google Calendar API for real-time meal scheduling; shopping lists alongside meal planning
- MongoDB workflows for users and recipes, personalized dashboards, RBAC and collaborative features

### Earlier projects (from previous CV)

- **Vyna, AI Music Playlist App (2025, in development)**: Next.js, MongoDB, Node.js, Gemini API, Spotify API, Redis, BullMQ. AI chatbot generates mood-based playlists; "New Music Friday" weekly email recommendations; seeding engine for playlists from seed tracks; background generation and email scheduling with Redis and BullMQ.
- **Link Sharing Web App (2024)**: Next.js, Firebase. Public profiles with verified links, authentication, shareable URLs.
- **Ace Stores, E-commerce Platform (2023)**: React, TypeScript, Firebase, Paystack. Secure auth, cart and order management, Paystack checkout, pixel-perfect Figma conversion.

## Leadership & Honors

**Bowen Tech Hub**, Frontend Dev Instructor (Osun, Nigeria), Feb 2024 – Present: taught HTML, CSS, JavaScript and React to 30+ students; mentored beginners through code reviews and debugging.

Honors: Top 1% of graduating cohort (Bowen University, 2026); Top 500 of 30,000+ participants, HNG Software Engineering Internship Programme (2024); First runner-up, TechHub Frontend Hackathon.

## Technical Skills

- **Languages**: TypeScript, JavaScript, Python, SQL, HTML5/CSS3
- **Frontend**: React, Next.js, React Native, Electron, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, PWA
- **Backend**: Node.js, NestJS, Express.js, REST APIs, Webhooks, PostgreSQL, MongoDB, Prisma, Redis, BullMQ, RabbitMQ
- **Systems**: Authentication, RBAC, Background Jobs, WebSockets, SSE, API Design, Database Design, Payment Workflows
- **AI & Research**: LLM APIs, LangChain.js, LangGraph, MCP, AI Agents, Structured Outputs, Benchmark Design, Evaluation and Calibration, Human-in-the-Loop Systems
- **DevOps & Tools**: Git, GitHub Actions (CI/CD), AWS, Docker, Google Cloud Platform, Stripe, NextAuth, Postman, Vercel
- **Previously listed**: Bootstrap, Firebase, Figma, Framer Motion; learning Remix, Flask

## Interests

Story-driven video games, building AI-powered products, clean UI and editorial-style web design.
