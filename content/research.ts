// Single source of truth for the Research section, the structured data and the AI's knowledge of it.
// Wording and numbers come from the academic CV; nothing here is invented.

export interface ResearchStat {
  value: string
  label: string
}

export interface Publication {
  slug: string
  title: string
  venue: string
  year: number
  doi: string
  url: string
  summary: string
  findings: ResearchStat[]
}

export interface ResearchRole {
  title: string
  period: string
  focus: string
  bullets: string[]
}

export interface SelectedProject {
  title: string
  tagline: string
  stack: string[]
  bullets: string[]
}

export const researchHeadline = 'Research on LLM agent reliability and review-gated AI systems, with two published preprints.'

export const researchInterests = [
  'LLM agents and agentic systems',
  'Agent reliability and validation',
  'Software engineering for AI systems',
  'Tool-using language models',
  'AI evaluation and benchmarking',
  'Human-in-the-loop AI',
  'Long-horizon agent reasoning and recovery',
]

export const publications: Publication[] = [
  {
    slug: 'revalidation',
    title: 'Automatic Action-Dependency Inference for Selective Revalidation of Tool-Using LLM Agents',
    venue: 'Preprint, Version 1. Zenodo',
    year: 2026,
    doi: '10.5281/zenodo.23363804',
    url: 'https://doi.org/10.5281/zenodo.23363804',
    summary:
      'Studies whether a tool-using LLM agent can work out, by itself, which pieces of state a consequential action depends on, and re-check only those when the environment changes.',
    findings: [
      { value: '0.9385', label: 'F1 for action-dependency inference (precision 0.8842, recall 1.0000)' },
      { value: '22/22', label: 'observed unsafe-action opportunities prevented' },
      { value: '36.9%', label: 'fewer revalidation reads than the full-state baseline (285 vs. 452)' },
      { value: '86.1%', label: 'task success (31/36), with 5/14 valid actions falsely blocked' },
    ],
  },
  {
    slug: 'sefa',
    title: 'SEFA: A Review-Gated Architecture for AI-Assisted Financial Budgeting and Expense Intelligence',
    venue: 'Preprint, Version 2. Zenodo',
    year: 2026,
    doi: '10.5281/zenodo.22881415',
    url: 'https://doi.org/10.5281/zenodo.22881415',
    summary:
      'A review-gated architecture for AI-assisted personal finance. Statement-derived transactions are staged before they are saved, and assistant-prepared financial actions need confirmation before they run.',
    findings: [
      { value: '99.49%', label: 'parser field agreement (3,880 of 3,900 independently scored fields)' },
      { value: '78.40%', label: 'clear-category accuracy' },
      { value: '1.000', label: 'duplicate-detection F1' },
      { value: '300', label: 'synthetic transactions across six controlled statement conditions' },
    ],
  },
]

export const researchRoles: ResearchRole[] = [
  {
    title: 'Independent Researcher',
    period: '2026',
    focus: 'LLM Agent Reliability and Selective Revalidation',
    bullets: [
      'Investigated whether tool-using LLM agents can automatically infer the state dependencies required for consequential actions and selectively revalidate them under controlled environment drift.',
      'Designed a deterministic refund benchmark with 36 action-bearing captures from 18 represented tasks and 144 matched replay branches across no-revalidation, full-state, LLM-selective and oracle-selective conditions.',
      'Achieved 0.8842 micro precision, 1.0000 recall and 0.9385 F1 for action-dependency inference, with 0 false negatives and no observed protected-dependency omissions in the evaluated sample.',
      'LLM-selective revalidation prevented 22/22 observed unsafe-action opportunities and achieved 31/36 task success (86.1%), while falsely blocking 5/14 valid actions.',
      'Reduced revalidation reads by 36.9% relative to the full-state baseline (285 vs. 452 reads), while remaining 33 reads above the oracle-selective baseline.',
      'Built the experimental pipeline with TypeScript, LangGraph, MCP, PostgreSQL, RabbitMQ, structured tool interfaces, deterministic replay and automated evaluation.',
    ],
  },
  {
    title: 'Undergraduate Researcher',
    period: '2025 - 2026',
    focus: 'SEFA: AI-Assisted Financial Budgeting and Expense Intelligence (final-year project)',
    bullets: [
      'Designed and implemented a review-gated architecture for AI-assisted personal-finance workflows, integrating budgeting, statement ingestion, transaction categorization, duplicate detection, financial insights and conversational assistance.',
      'Constructed a deterministic synthetic benchmark of 300 transactions across six controlled statement conditions to evaluate the structured transaction-processing layer.',
      'Measured 99.49% parser field agreement (3,880/3,900 independently scored fields), 78.40% clear-category accuracy and 1.000 duplicate-detection F1 under the controlled evaluation.',
      'Designed human-review mechanisms that stage statement-derived transactions before persistence and require confirmation before assistant-prepared financial actions are executed.',
      'Established explicit evidence boundaries separating evaluated deterministic processing from unevaluated PDF/OCR, external LLM, production-security and real-user outcomes.',
    ],
  },
]

export const evidenceBoundaries =
  'Both studies say what they do not show. SEFA\'s figures come from a controlled synthetic benchmark of the structured transaction-processing layer; PDF/OCR extraction, external LLM behaviour, production security and real-user outcomes were not evaluated. The revalidation results come from a deterministic benchmark of 36 captures and 144 replay branches.'

export const selectedProjects: SelectedProject[] = [
  {
    title: 'Expo',
    tagline: 'A context-aware LLM system for live professional conversations',
    stack: ['Electron', 'TypeScript', 'NestJS', 'PostgreSQL', 'Next.js', 'LangGraph', 'Deepgram', 'LLM APIs', 'Docker'],
    bullets: [
      'Designed a LangGraph-based orchestration layer for live conversational AI workflows, coordinating session state, contextual information, multi-step model interactions and response generation.',
      'Implemented bounded conversational memory that keeps recent interactions in full and compacts older context, so long sessions do not grow context without limit.',
      'Developed continuation logic for truncated LLM responses so a follow-up request resumes the incomplete answer instead of restarting generation.',
      'Built persistent pre-session memory, so structured meeting notes and selected prior information reach the model only when relevant.',
      'Integrated real-time speech transcription through Deepgram and a Windows audio-capture pipeline that handles microphone and system-audio streams.',
      'Implemented configurable model routing for multimodal workflows, validated by 330 backend and 244 desktop automated tests.',
    ],
  },
]

export const academicCv = { label: 'Download academic CV', url: '/Habeeb-Owoade-Academic-CV.pdf' }
