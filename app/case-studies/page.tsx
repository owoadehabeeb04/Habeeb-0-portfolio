import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { caseStudies, readingMinutes } from '@/content/case-studies'
import { generateBreadcrumbSchema, generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Case Studies',
  description:
    'In-depth write-ups of projects I have built: the problem, the decisions and trade-offs, architecture diagrams and what I would do next. SEFA, SoundRadar, LUMES, Recipia, OMO AI and more.',
  url: '/case-studies',
  keywords: ['case studies', 'software engineering case study', 'architecture decisions', 'full-stack projects'],
})

export default function CaseStudiesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
  ])
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${study.title} case study`,
      url: `${siteConfig.url}/projects/${study.slug}`,
    })),
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-28 md:px-8 md:pt-36">
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">Case studies</p>
          <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl">How I build, and why</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            Each study covers the problem, the decisions and trade-offs, how the system fits together, and what I would do next. Each takes 3 to 5 minutes to read.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2" aria-label="Case studies">
          {caseStudies.map((study, index) => (
            <li key={study.slug}>
              <Link
                href={`/projects/${study.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 transition-colors hover:border-[var(--text-primary)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={study.heroImage}
                    alt={study.heroAlt}
                    fill
                    quality={90}
                    priority={index < 2}
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">{readingMinutes(study)} min read</p>
                  <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{study.title}</h2>
                  <p className="mt-2 text-[var(--text-secondary)]">{study.tagline}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${study.title} stack`}>
                    {study.stack.slice(0, 5).map(tech => (
                      <li key={tech} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 pt-2 text-sm font-medium text-[var(--text-primary)]">
                    Read the case study <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
