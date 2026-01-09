import { MetadataRoute } from 'next'
import { fullstackProjects, frontendProjects } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://habeebowoade.com'
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
      url: `${baseUrl}/ask-habeeb`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic routes from projects (if you want individual project pages in the future)
  const allProjects = [...fullstackProjects, ...frontendProjects]
  const projectRoutes = allProjects.map((project) => ({
    url: project.liveUrl,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes]
}

