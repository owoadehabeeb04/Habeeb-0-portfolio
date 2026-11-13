import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { systemDesigns, systemDesignHeadline } from '@/content/system-design'
import { generateBreadcrumbSchema, generateMetadata as generateSEOMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'System Design',
  description: 'System design projects: requirements, estimates, data model, read and write paths, and what was built versus design only. Starting with Pastebin.',
  url: '/system-design',
  keywords: ['system design', 'distributed systems', 'caching', 'sharding', 'Pastebin system design'],
})

export default function SystemDesignPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'System Design', url: '/system-design' },
  ])
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: systemDesigns.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${project.title} system design`,
      url: `${siteConfig.url}/system-design/${project.id}`,
    })),
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-28 md:px-8 md:pt-36">
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">System design</p>
          <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl">How it works at scale</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">{systemDesignHeadline}</p>
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2" aria-label="System designs">
          {systemDesigns.map(project => (
            <li key={project.id}>
              <Link
                href={`/system-design/${project.id}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/30 p-6 transition-colors hover:border-[var(--text-primary)] md:p-8"
              >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">{project.title}</h2>
                <p className="mt-1 text-[var(--text-secondary)]">{project.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{project.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <li key={tech} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]">{tech}</li>
                  ))}
                </ul>
                <span className="mt-6 text-sm font-medium text-[var(--text-primary)] group-hover:underline">Read the full design →</span>
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
