import { Metadata } from 'next'

export const siteConfig = {
  name: 'Habeeb Owoade',
  title: 'Habeeb Owoade - Full Stack Software Engineer | React, Next.js, TypeScript Expert',
  description: 'Full-stack software engineer specializing in React, Next.js, TypeScript, Node.js, and AI integration. Top 1% student at Bowen University (CGPA 4.65/5.00). Building scalable web applications with modern technologies.',
  url: 'https://habeeb-dev-portfolio.vercel.app/',
  ogImage: 'https://habeebowoade.com/images/habeebportfolio.jpg',
  links: {
    twitter: 'https://twitter.com/Drealtemiteee_',
    github: 'https://github.com/owoadehabeeb04',
    linkedin: 'https://linkedin.com/in/owoade-habeeb',
    email: 'owoadehabeeb04@gmail.com',
  },
  keywords: [
    'Habeeb Owoade',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Frontend Developer',
    'Backend Developer',
    'AI Engineer',
    'Web Developer Nigeria',
    'Bowen University',
    'JavaScript Expert',
    'MongoDB',
    'PostgreSQL',
    'LangChain',
    'Three.js',
    'Web3 Developer',
    'API Development',
    'Full Stack Engineer',
    'Software Development',
    'Web Application Development',
  ],
  author: {
    name: 'Habeeb Owoade',
    email: 'owoadehabeeb04@gmail.com',
    url: 'https://habeebowoade.com',
  },
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
  keywords,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
  keywords?: string[]
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const allKeywords = keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@Drealtemiteee_',
      site: '@Drealtemiteee_',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.jpg', sizes: '32x32', type: 'image/jpeg' },
        { url: '/icon.jpg', sizes: '192x192', type: 'image/jpeg' },
      ],
      apple: [
        { url: '/images/habeebportfolio.jpg', sizes: '180x180', type: 'image/jpeg' },
      ],
      shortcut: '/favicon.jpg',
    },
    manifest: '/manifest.json',
  }
}

// Structured Data (JSON-LD) Schemas
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Habeeb Owoade',
  alternateName: 'Owoade Habeeb Temitope',
  url: siteConfig.url,
  image: siteConfig.ogImage,
  email: siteConfig.links.email,
  jobTitle: 'Full Stack Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'Bowen University',
    sameAs: 'https://bowen.edu.ng',
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'AI Development',
    'Web Development',
    'Full Stack Development',
  ],
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
    siteConfig.links.linkedin,
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Nigeria',
  },
  telephone: '+234-913-649-7992',
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  creator: {
    '@type': 'Person',
    name: siteConfig.author.name,
  },
}

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
  url: siteConfig.url,
  description: siteConfig.description,
  name: siteConfig.title,
}

export function generateProjectSchema(project: {
  title: string
  description: string
  image: string
  liveUrl: string
  sourceCode?: string
  techStack?: Array<{ name: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: `${siteConfig.url}${project.image}`,
    url: project.liveUrl,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    creator: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    keywords: project.techStack?.map(tech => tech.name).join(', '),
    ...(project.sourceCode && {
      codeRepository: project.sourceCode,
    }),
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

