'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import {
  academicCv,
  evidenceBoundaries,
  publications,
  researchHeadline,
  researchInterests,
  researchRoles,
  selectedProjects,
} from '@/content/research'

function Fade({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}

export default function Research() {
  return (
    <section id="research" className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl lg:text-6xl">Research &amp; Publications</h2>
          <div className="mx-auto mb-6 h-0.5 w-32 bg-[var(--text-primary)]"></div>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{researchHeadline}</p>
        </div>

        <Fade>
          <ul className="mb-12 flex flex-wrap justify-center gap-2" aria-label="Research interests">
            {researchInterests.map(interest => (
              <li key={interest} className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/40 px-3 py-1 text-xs text-[var(--text-secondary)] md:text-sm">
                {interest}
              </li>
            ))}
          </ul>
        </Fade>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {publications.map(pub => (
            <Fade key={pub.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-6 md:p-8" aria-labelledby={`pub-${pub.slug}`}>
                <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  {pub.venue} · {pub.year}
                </p>
                <h3 id={`pub-${pub.slug}`} className="mt-2 text-xl font-bold leading-snug text-[var(--text-primary)] md:text-2xl">
                  {pub.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{pub.summary}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3">
                  {pub.findings.map(stat => (
                    <div key={stat.label} className="rounded-xl border border-[var(--border)] p-3">
                      <dt className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">{stat.value}</dt>
                      <dd className="mt-1 text-xs text-[var(--text-secondary)]">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-primary)] transition-opacity hover:opacity-90"
                  >
                    Read the preprint ↗
                  </a>
                  <span className="text-xs text-[var(--text-secondary)]">doi:{pub.doi}</span>
                </div>
              </article>
            </Fade>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-center text-2xl font-bold text-[var(--text-primary)] md:text-3xl">Research experience</h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {researchRoles.map(role => (
              <Fade key={role.title}>
                <article className="h-full rounded-2xl border border-[var(--border)] p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-xl font-bold text-[var(--text-primary)]">{role.title}</h4>
                    <span className="text-sm text-[var(--text-secondary)]">{role.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">{role.focus}</p>
                  <details className="group mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-[var(--text-primary)] underline-offset-4 hover:underline">
                      Methods and results
                    </summary>
                    <ul className="mt-4 space-y-3">
                      {role.bullets.map(bullet => (
                        <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-primary)]"></span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </article>
              </Fade>
            ))}
          </div>
        </div>

        <Fade className="mt-8">
          <aside className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-5 text-sm leading-relaxed text-[var(--text-secondary)] md:p-6" aria-label="Evidence boundaries">
            <strong className="text-[var(--text-primary)]">Evidence boundaries. </strong>
            {evidenceBoundaries}
          </aside>
        </Fade>

        <div className="mt-14">
          <h3 className="mb-6 text-center text-2xl font-bold text-[var(--text-primary)] md:text-3xl">Selected AI systems project</h3>
          {selectedProjects.map(project => (
            <Fade key={project.title}>
              <article className="rounded-2xl border border-[var(--border)] p-6 md:p-8">
                <h4 className="text-xl font-bold text-[var(--text-primary)]">
                  {project.title} <span className="font-normal text-[var(--text-secondary)]">· {project.tagline}</span>
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.title} stack`}>
                  {project.stack.map(tech => (
                    <li key={tech} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]">
                      {tech}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 space-y-3">
                  {project.bullets.map(bullet => (
                    <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-primary)]"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Fade>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={academicCv.url}
            download="Habeeb-Owoade-Academic-CV.pdf"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--border)] px-6 py-3 font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
          >
            {academicCv.label}
          </a>
        </div>
      </div>
    </section>
  )
}
