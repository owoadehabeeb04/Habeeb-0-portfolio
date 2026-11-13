import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import SystemDesign from '@/components/SystemDesign'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { generateMetadata as generateSEOMetadata, profilePageSchema, generateScholarlyArticleSchema } from '@/lib/seo'
import { publications } from '@/content/research'



export const metadata: Metadata = generateSEOMetadata({
  title: 'Portfolio',
  description: 'Explore my portfolio of full-stack projects including AI-powered applications, e-commerce platforms, and enterprise solutions built with React, Next.js, TypeScript, Node.js, and modern web technologies.',
  url: '/portfolio',
  keywords: [
    'portfolio',
    'projects',
    'web development portfolio',
    'full stack projects',
    'React projects',
    'Next.js portfolio',
    'AI projects',
    'software engineering portfolio',
  ],
})

export default function PortfolioPage() {
  return (
    <>
      {/* Structured Data - Profile Page Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      {/* Structured Data - the two preprints */}
      {publications.map(pub => (
        <script
          key={pub.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateScholarlyArticleSchema(pub)) }}
        />
      ))}
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Projects />
        <Research />
        <SystemDesign />
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
