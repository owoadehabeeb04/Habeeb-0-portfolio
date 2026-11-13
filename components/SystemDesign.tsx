'use client'

import Link from 'next/link'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { systemDesigns, systemDesignHeadline } from '@/content/system-design'

function Fade({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-primary)]"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function SystemDesign() {
  return (
    <section id="system-design" className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl lg:text-6xl">System Design</h2>
          <div className="mx-auto mb-6 h-0.5 w-32 bg-[var(--text-primary)]"></div>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{systemDesignHeadline}</p>
        </div>

        <div className="space-y-8">
          {systemDesigns.map(project => (
        <Fade key={project.id}>
          <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-6 md:p-8" aria-labelledby={`sd-${project.id}`}>
            <h3 id={`sd-${project.id}`} className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              {project.title} <span className="text-base font-normal text-[var(--text-secondary)] md:text-lg">· {project.tagline}</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{project.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} stack`}>
              {project.stack.map(tech => (
                <li key={tech} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] p-5">
                <h4 className="text-lg font-bold text-[var(--text-primary)]">Built and run locally</h4>
                <Bullets items={project.built} />
              </div>
              <div className="rounded-xl border border-dashed border-[var(--border)] p-5">
                <h4 className="text-lg font-bold text-[var(--text-primary)]">Design only, not built</h4>
                <Bullets items={project.designOnly} />
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-bold text-[var(--text-primary)]">Back-of-envelope estimates</h4>
              <dl className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {project.estimates.map(stat => (
                  <div key={stat.label} className="rounded-xl border border-[var(--border)] p-3">
                    <dt className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">{stat.value}</dt>
                    <dd className="mt-1 text-xs text-[var(--text-secondary)]">{stat.label}</dd>
                  </div>
                ))}
              </dl>
              {project.estimatesNote && <p className="mt-3 text-xs text-[var(--text-secondary)]">{project.estimatesNote}</p>}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.detail && (
                <Link
                  href={project.links.detail}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-primary)] transition-opacity hover:opacity-90"
                >
                  Read the full design
                </Link>
              )}
              {project.links.caseStudy && (
                <Link
                  href={project.links.caseStudy}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  Read the case study
                </Link>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  GitHub ↗
                </a>
              )}
              {project.links.writeUp && (
                <a
                  href={project.links.writeUp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  Design write-up ↗
                </a>
              )}
            </div>
          </article>
        </Fade>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/system-design" className="text-sm font-medium text-[var(--text-primary)] underline-offset-4 hover:underline">
            All system designs →
          </Link>
        </div>
      </div>
    </section>
  )
}
