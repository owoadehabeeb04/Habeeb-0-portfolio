import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'
import QueryProvider from '@/components/QueryProvider'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Habeeb O. - Portfolio',
  description: 'A Software engineer fueled by the joy of building innovative products that shape the world.',
  icons: {
    icon: '/images/habeebportfolio.jpg',
    shortcut: '/images/habeebportfolio.jpg',
    apple: '/images/habeebportfolio.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <div className="fixed bottom-6 right-6 z-50">
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
