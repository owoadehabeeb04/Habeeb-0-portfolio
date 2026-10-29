import type { CaseStudyDecision } from '@/types'

export default function DecisionCard({ decision, index }: { decision: CaseStudyDecision; index: number }) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-5 md:p-6">
      <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
        <span className="mr-2 text-[var(--text-secondary)]">{String(index + 1).padStart(2, '0')}</span>
        {decision.title}
      </h3>
      <dl className="space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="font-medium text-[var(--text-primary)]">Context</dt>
          <dd className="text-[var(--text-secondary)]">{decision.context}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">What I chose</dt>
          <dd className="text-[var(--text-secondary)]">{decision.choice}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">What I passed on</dt>
          <dd className="text-[var(--text-secondary)]">{decision.alternatives}</dd>
        </div>
        <div>
          <dt className="font-medium text-[var(--text-primary)]">Trade-off</dt>
          <dd className="text-[var(--text-secondary)]">{decision.tradeoff}</dd>
        </div>
      </dl>
    </article>
  )
}
