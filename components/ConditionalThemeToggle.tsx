'use client'

import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function ConditionalThemeToggle() {
  const pathname = usePathname()
  
  // Hide theme toggle on chatbot pages (it's in the header there)
  const isChatbotPage = pathname === '/' || pathname === '/ask-habeeb'
  
  if (isChatbotPage) {
    return null
  }
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="p-2 rounded-full border-2 border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-all duration-300 shadow-lg">
        <ThemeToggle />
      </div>
    </div>
  )
}
