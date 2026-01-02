import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'

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
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
