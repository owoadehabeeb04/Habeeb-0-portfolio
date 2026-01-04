import { ReactNode } from 'react'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  action?: 'SHOW_PROJECTS' | 'SHOW_SKILLS'
  filter?: 'fullstack' | 'frontend' | 'all'
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

