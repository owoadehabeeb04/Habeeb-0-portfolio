import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DecisionCard from '@/components/case-study/DecisionCard'
import Gallery from '@/components/case-study/Gallery'
import MermaidDiagram from '@/components/case-study/MermaidDiagram'
import { caseStudies, getCaseStudy, readingMinutes } from '@/content/case-studies'
import { generateBreadcrumbSchema, generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return caseStudies.map(study => ({ slug: study.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = getCaseStudy(params.slug)
  if (!study) return {}
  return generateSEOMetadata({
    title: `${study.title} case study`,
    description: study.summary,
    image: `${siteConfig.url}${study.heroImage}`,
    url: `/projects/${study.slug}`,
    keywords: [`${study.title} case study`, ...study.stack],
  })
}

function Markdown({ children }: { children: string }) {
  return (
    <div className="text-base leading-relaxed text-[var(--text-secondary)] [&_li]:my-1.5 [&_p]:my-3 [&_strong]:text-[var(--text-primary)] [&_ul]:list-disc [&_ul]:pl-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

export default function CaseStudyPage({ params }: PageProps) {
  const study = getCaseStudy(params.slug)
  if (!study) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${study.title}: case study`,
    description: study.summary,
    image: `${siteConfig.url}${study.heroImage}`,
    author: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.author.url },
    keywords: study.stack.join(', '),
    mainEntityOfPage: `${siteConfig.url}/projects/${study.slug}`,
  }
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: study.title, url: `/projects/${study.slug}` },
  ])

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-28 md:px-8 md:pt-36">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        <header>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">
            Case study · {readingMinutes(study)} min read
          </p>
          <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl">{study.title}</h1>
          <p className="mt-4 text-xl text-[var(--text-secondary)] md:text-2xl">{study.tagline}</p>
        </header>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)]">
          <Image
            src={study.heroImage}
            alt={study.heroAlt}
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-6 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-6 text-sm md:grid-cols-3">
          <div>
            <dt className="font-medium text-[var(--text-primary)]">My role</dt>
            <dd className="mt-1 text-[var(--text-secondary)]">{study.role}</dd>
          </div>
          <div>
            <dt className="font-medium text-[var(--text-primary)]">Timeline</dt>
            <dd className="mt-1 text-[var(--text-secondary)]">{study.timeline}</dd>
          </div>
          <div>
            <dt className="font-medium text-[var(--text-primary)]">Stack</dt>
            <dd className="mt-1 text-[var(--text-secondary)]">{study.stack.join(', ')}</dd>
          </div>
          {study.credit && (
            <div className="md:col-span-3">
              <dt className="font-medium text-[var(--text-primary)]">Credit</dt>
              <dd className="mt-1 text-[var(--text-secondary)]">
                {study.credit.text}{' '}
                <a href={study.credit.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text-primary)]">
                  {study.credit.name}
                </a>
              </dd>
            </div>
          )}
        </dl>

        <p className="mt-8 text-lg leading-relaxed text-[var(--text-primary)]">{study.summary}</p>

        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Key outcomes">
          {study.outcomes.map(outcome => (
            <li key={outcome.label} className="rounded-xl border border-[var(--border)] p-4">
              <div className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">{outcome.value}</div>
              <div className="mt-1 text-xs text-[var(--text-secondary)]">{outcome.label}</div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {study.links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
            >
              {link.label} ↗
            </a>
          ))}
        </div>

        <Section id="problem" title="The problem">
          <Markdown>{study.problem}</Markdown>
        </Section>
        <Section id="constraints" title="Constraints">
          <Markdown>{study.constraints}</Markdown>
        </Section>
        <Section id="approach" title="Approach">
          <Markdown>{study.approach}</Markdown>
          {study.diagrams[0] && (
            <MermaidDiagram chart={study.diagrams[0].mermaid} title={study.diagrams[0].title} caption={study.diagrams[0].caption} />
          )}
        </Section>

        {study.gallery.length > 0 && (
          <Section id="screens" title="In the app">
            <Gallery images={study.gallery} />
          </Section>
        )}

        <Section id="decisions" title="Key decisions">
          <div className="space-y-6">
            {study.decisions.map((decision, i) => (
              <DecisionCard key={decision.title} decision={decision} index={i} />
            ))}
          </div>
          {study.diagrams.slice(1).map(diagram => (
            <MermaidDiagram key={diagram.title} chart={diagram.mermaid} title={diagram.title} caption={diagram.caption} />
          ))}
        </Section>

        <Section id="challenges" title="Challenges">
          <Markdown>{study.challenges}</Markdown>
        </Section>
        <Section id="results" title="Results">
          <Markdown>{study.results}</Markdown>
        </Section>
        <Section id="next" title="What I would do next">
          <Markdown>{study.next}</Markdown>
        </Section>
      </article>

      <Contact />
      <Footer />
    </main>
  )
}
