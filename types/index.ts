import { ReactNode } from 'react'

export interface TraceStep {
  step: 'mode' | 'history' | 'retrieve' | 'web' | 'generate'
  label: string
  detail?: string
  items?: string[]
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  action?: 'SHOW_PROJECTS' | 'SHOW_SKILLS'
  filter?: 'fullstack' | 'frontend' | 'all'
  truncated?: boolean
  sources?: { title: string; url: string }[]
}

export interface TechStackItem {
  name: string
  src: string
  external?: boolean
  invertDark?: boolean
}

export interface Project {
  title: string
  image: string
  alt: string
  liveUrl: string
  category: string
  tags: string[]
  description?: string
  techStack?: TechStackItem[]
  sourceCode?: string
  slug?: string
}

export interface CaseStudyDecision {
  title: string
  context: string
  choice: string
  alternatives: string
  tradeoff: string
}

export interface CaseStudyDiagram {
  title: string
  mermaid: string
  caption?: string
}

export interface CaseStudyImage {
  src: string
  alt: string
  caption?: string
  // Phone screenshots are shown narrower than desktop ones
  kind?: 'desktop' | 'mobile'
}

export interface CaseStudyLink {
  label: string
  url: string
}

export interface CaseStudy {
  slug: string
  title: string
  tagline: string
  summary: string
  role: string
  timeline: string
  credit?: { text: string; name: string; url: string }
  links: CaseStudyLink[]
  stack: string[]
  heroImage: string
  heroAlt: string
  outcomes: { value: string; label: string }[]
  // Markdown sections
  problem: string
  constraints: string
  approach: string
  decisions: CaseStudyDecision[]
  diagrams: CaseStudyDiagram[]
  gallery: CaseStudyImage[]
  challenges: string
  results: string
  next: string
}

export interface Skill {
  name: string
  src: string
  alt: string
  external?: boolean
}

export interface ThemeProviderProps {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
}

export interface Experience {
  title: string
  company: string
  location: string
  type: string
  startDate: string
  endDate: string
  achievements: string[]
}

export interface Education {
  institution: string
  degree: string
  location: string
  startDate: string
  endDate: string
  cgpa: string
  highlights: string[]
}

