import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'All Projects',
  description: 'Browse all my full-stack and frontend projects including AI applications, e-commerce platforms, enterprise solutions, and 3D web experiences. Built with React, Next.js, TypeScript, Three.js, and more.',
  url: '/projects',
  keywords: [
    'all projects',
    'web development projects',
    'React applications',
    'Next.js projects',
    'TypeScript projects',
    'AI projects',
    '3D web development',
    'full-stack applications',
    'frontend projects',
    'software portfolio',
  ],
})

