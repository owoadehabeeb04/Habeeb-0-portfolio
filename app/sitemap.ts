import { MetadataRoute } from 'next'
import { caseStudies } from '@/content/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://habeeb-dev-portfolio.vercel.app'
  const currentDate = new Date()

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ask-habeeb`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // One page per case study
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/projects/${study.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...caseStudyRoutes]
}

