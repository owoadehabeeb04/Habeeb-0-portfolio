import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Gallery from '@/components/case-study/Gallery'
import { getSystemDesign, systemDesigns, type DesignStatus } from '@/content/system-design'
import { generateBreadcrumbSchema, generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo'

interface PageProps {
  params: { id: string }
}

export function generateStaticParams() {
  return systemDesigns.filter(p => p.detail).map(p => ({ id: p.id }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getSystemDesign(params.id)
  if (!project?.detail) return {}
  return generateSEOMetadata({
    title: `${project.title} system design`,
    description: `${project.summary} Requirements, estimates, API, data model, read and write paths, and what is built versus design only.`,
    url: `/system-design/${project.id}`,
    keywords: [`${project.title} system design`, 'system design', ...project.stack],
  })
}

function Badge({ status }: { status: DesignStatus }) {
  return status === 'built' ? (
    <span className="rounded-full border border-[var(--text-primary)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-primary)]">Built</span>
  ) : (
    <span className="rounded-full border border-dashed border-[var(--border)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">Design only</span>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-[var(--text-secondary)]">
          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-primary)]"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StatusList({ items, ordered = false }: { items: { text: string; status: DesignStatus }[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className="space-y-4">
      {items.map((item, i) => (
        <li key={item.text} className="flex items-start gap-3 text-base leading-relaxed text-[var(--text-secondary)]">
          {ordered ? (
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs text-[var(--text-primary)]">{i + 1}</span>
          ) : (
            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-primary)]"></span>
          )}
          <span className="flex-1">{item.text}</span>
          <Badge status={item.status} />
        </li>
      ))}
    </Tag>
  )
}

export default function SystemDesignDetailPage({ params }: PageProps) {
  const project = getSystemDesign(params.id)
  if (!project?.detail) notFound()
  const d = project.detail

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'System Design', url: '/system-design' },
    { name: project.title, url: `/system-design/${project.id}` },
  ])
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title}: system design`,
    description: project.summary,
    author: { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.author.url },
    keywords: project.stack.join(', '),
    mainEntityOfPage: `${siteConfig.url}/system-design/${project.id}`,
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-12 md:pt-36">
        <Link href="/system-design" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
          <span aria-hidden="true">←</span> All system designs
        </Link>

        <header>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">System design</p>
          <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl">{project.title}</h1>
          <p className="mt-4 text-xl text-[var(--text-secondary)] md:text-2xl">{project.tagline}</p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-primary)]">{project.summary}</p>
        </header>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.caseStudy && (
            <Link href={project.links.caseStudy} className="rounded-lg bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--bg-primary)] hover:opacity-90">
              Read the case study
            </Link>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">
              GitHub ↗
            </a>
          )}
          {project.links.writeUp && (
            <a href={project.links.writeUp} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">
              Design write-up ↗
            </a>
          )}
        </div>

        <p className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-5 text-sm leading-relaxed text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">How to read this page. </strong>
          Each step is marked <Badge status="built" /> if it exists in the local build, or <Badge status="design" /> if it is on paper only. The estimates come from the design, not from measurement.
        </p>

        <Section id="requirements" title="Requirements">
          <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">Functional</h3>
          <Bullets items={d.requirements.functional} />
          <h3 className="mb-3 mt-6 text-lg font-bold text-[var(--text-primary)]">Non-functional</h3>
          <Bullets items={d.requirements.nonFunctional} />
        </Section>

        <Section id="estimates" title="Estimates">
          <ul className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Estimates">
            {project.estimates.map(stat => (
              <li key={stat.label} className="rounded-xl border border-[var(--border)] p-4">
                <div className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">{stat.value}</div>
                <div className="mt-1 text-xs text-[var(--text-secondary)]">{stat.label}</div>
              </li>
            ))}
          </ul>
          <Bullets items={d.estimateWorkings} />
        </Section>

        <Section id="api" title="API">
          <div className="space-y-5">
            {d.api.map(endpoint => (
              <div key={endpoint.method + endpoint.path} className="rounded-xl border border-[var(--border)] p-6 md:p-7">
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  <span className="mr-2 rounded bg-[var(--bg-secondary)] px-2 py-0.5 text-sm">{endpoint.method}</span>
                  {endpoint.path}
                </p>
                <p className="mt-2 text-[var(--text-secondary)]">{endpoint.description}</p>
                <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-[var(--text-secondary)]">
                  {endpoint.responses.map(r => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="short-codes" title="Short codes">
          <Bullets items={d.shortCodes} />
        </Section>

        <Section id="data-model" title="Data model">
          <div className="space-y-6">
            {d.dataModel.map(table => (
              <div key={table.table} className="rounded-xl border border-[var(--border)] p-6 md:p-7">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{table.table}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{table.note}</p>
                <dl className="mt-4 divide-y divide-[var(--border)]">
                  {table.fields.map(field => (
                    <div key={field.name} className="grid grid-cols-1 gap-1 py-2 text-sm md:grid-cols-[10rem_1fr] md:gap-4">
                      <dt className="font-medium text-[var(--text-primary)]">{field.name}</dt>
                      <dd className="text-[var(--text-secondary)]">{field.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Section>

        {d.diagrams && d.diagrams.length > 0 && (
          <Section id="diagrams" title="Diagrams">
            <p className="text-sm text-[var(--text-secondary)]">Tap a diagram to enlarge it.</p>
            <Gallery images={d.diagrams} />
          </Section>
        )}

        <Section id="components" title="Components">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-label="Components">
            {d.components.map(c => (
              <li key={c.name} className="rounded-xl border border-[var(--border)] p-6 md:p-7">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{c.name}</h3>
                  <Badge status={c.status} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{c.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="write-path" title="Write path: create a paste">
          <StatusList ordered items={d.writePath.map(s => ({ text: s.step, status: s.status }))} />
        </Section>

        <Section id="read-path" title="Read path: open a link">
          <StatusList ordered items={d.readPath.map(s => ({ text: s.step, status: s.status }))} />
        </Section>

        <Section id="expiry" title="Expiry">
          <StatusList items={d.expiry} />
        </Section>

        <Section id="rate-limiting" title="Rate limiting">
          <StatusList items={d.rateLimiting} />
        </Section>

        <Section id="security" title="Security (design only)">
          <Bullets items={d.security} />
        </Section>
      </article>

      <Contact />
      <Footer />
    </main>
  )
}
