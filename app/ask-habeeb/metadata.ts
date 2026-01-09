import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Ask Habeeb - AI Assistant',
  description: 'Chat with my AI assistant powered by LLaMA and RAG technology. Ask questions about my experience, skills, projects, and technical expertise. Get instant answers about my software engineering journey.',
  url: '/ask-habeeb',
  keywords: [
    'AI chatbot',
    'portfolio assistant',
    'LLaMA AI',
    'RAG chatbot',
    'technical questions',
    'developer chatbot',
    'interactive portfolio',
    'AI assistant',
  ],
})

