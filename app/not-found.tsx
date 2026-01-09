import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to the homepage to explore Habeeb Owoade\'s portfolio.',
  noIndex: true,
})

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-[var(--bg-primary)]">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-[var(--text-primary)] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/portfolio"
            className="inline-block px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            View Portfolio
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-4 border-2 border-[var(--border)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-all duration-300 hover:scale-105"
          >
            Ask Habeeb AI
          </Link>
        </div>
      </div>
    </main>
  )
}

