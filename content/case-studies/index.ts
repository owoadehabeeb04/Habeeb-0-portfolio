import type { CaseStudy } from '@/types'
import { sefa } from './sefa'
import { soundradar } from './soundradar'
import { lumes } from './lumes'
import { recipia } from './recipia'
import { omoAi } from './omo-ai'
import { devLink } from './dev-link'
import { tobiPortfolio } from './tobi-portfolio'

export const caseStudies: CaseStudy[] = [sefa, soundradar, lumes, recipia, omoAi, devLink, tobiPortfolio]

export const getCaseStudy = (slug: string) => caseStudies.find(study => study.slug === slug)

// Roughly 200 words per minute
export const readingMinutes = (study: CaseStudy) => {
  const text = [
    study.summary,
    study.problem,
    study.constraints,
    study.approach,
    study.challenges,
    study.results,
    study.next,
    ...study.decisions.flatMap(d => [d.title, d.context, d.choice, d.alternatives, d.tradeoff]),
  ].join(' ')
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
}
