'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  navClassName?: string
  navStyle?: React.CSSProperties
  showMobileNav?: boolean
  mobilePosition?: 'top' | 'bottom'
}

export default function Navbar({ 
  navClassName = "hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
  navStyle = { transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' },
  showMobileNav = true,
  mobilePosition = 'bottom'
}: NavbarProps) {
  const [activeNav, setActiveNav] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(false)
  const pathname = usePathname()
  const isAIPage = pathname === '/' || pathname === '/ask-habeeb'
  
  // Determine the base path for links
  const getNavLink = (section: string) => {
    return isAIPage ? `/portfolio#${section}` : `#${section}`
  }

  useEffect(() => {
    // Trigger navbar animation on mount
    const timer = setTimeout(() => {
      setIsNavVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'projects', 'aboutme', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveNav(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (section: string) => {
    setActiveNav(section)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`${navClassName} md:flex hidden ${
          isScrolled ? 'top-4' : 'top-8'
        } ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={navStyle}
      >
        <div className="navbar-container flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2.5 md:py-3 
        bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)] 
        backdrop-blur-md border border-[var(--border)]/40 rounded-full shadow-lg shadow-[var(--border)]/10 
        hover:shadow-[var(--border)]/20 transition-all duration-300">
          <a
            href={getNavLink('projects')}
            onClick={() => handleNavClick('projects')}
            className={`nav-link px-2 md:px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-lg nav-item-fade ${
              activeNav === 'projects' 
                ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            Projects
          </a>
          <span className={`text-[var(--text-secondary)]/30 nav-item-fade`} style={{ animationDelay: '0.15s' }}>|</span>
          <a
            href="https://www.dropbox.com/scl/fi/8pwzxju1g5a7z6k6iskgd/OWOADE_HABEEB_RESUME-4.pdf?rlkey=kqagoji9fa7yafe4v0tj5l4oe&st=iptearno&dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105 transition-all duration-300 whitespace-nowrap rounded-lg nav-item-fade"
            style={{ animationDelay: '0.2s' }}
          >
            Resume
          </a>
          <span className={`text-[var(--text-secondary)]/30 nav-item-fade`} style={{ animationDelay: '0.25s' }}>|</span>
          <a
            href={getNavLink('aboutme')}
            onClick={() => handleNavClick('aboutme')}
            className={`nav-link px-2 md:px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-lg nav-item-fade ${
              activeNav === 'aboutme' 
                ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            About
          </a>
          <span className={`text-[var(--text-secondary)]/30 nav-item-fade`} style={{ animationDelay: '0.35s' }}>|</span>
          <a
            href={getNavLink('contact')}
            onClick={() => handleNavClick('contact')}
            className={`nav-link px-2 md:px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-lg nav-item-fade ${
              activeNav === 'contact' 
                ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            Contact
          </a>
          <span className={`text-[var(--text-secondary)]/30 nav-item-fade`} style={{ animationDelay: '0.45s' }}>|</span>
          <Link
            href="/"
            className={`nav-link px-2 md:px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-lg nav-item-fade ${
              activeNav === 'ask-habeeb' 
                ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
            }`}
            style={{ animationDelay: '0.5s' }}
          >
            Ask Habeeb AI
          </Link>
          <span className={`text-[var(--text-secondary)]/30 mx-1 md:mx-2 nav-item-fade`} style={{ animationDelay: '0.55s' }}>|</span>
          <a
            href={getNavLink('contact')}
            className="cta-button px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 whitespace-nowrap shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 nav-item-fade"
            style={{ animationDelay: '0.6s' }}
          >
            Let&apos;s work
            <svg
              width="14"
              height="14"
              className="md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {showMobileNav && (
        <nav className={`md:hidden  ${mobilePosition === 'top' ? 'top-0 flex ' : 'bottom-0 fixed'}
        left-0 right-0 z-50 
           ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 ' + (mobilePosition === 'top' ? '-translate-y-4' : 'translate-y-4')}`} style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
        <div className={`flex items-center justify-center ${mobilePosition === 'bottom' && 'px-4 py-3'}`}>
          <div className="bg-gradient-to-r from-[var(--bg-secondary)] 
          via-[var(--bg-tertiary)] to-[var(--bg-secondary)] backdrop-blur-md
          
          border border-[var(--border)]/40 rounded-full shadow-lg shadow-[var(--border)]/10 px-3 py-2 max-w-full">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <a
              href="/"
              className={`nav-link px-2 py-1 text-xs font-medium transition-all duration-300 whitespace-nowrap rounded-lg flex-shrink-0 nav-item-fade ${
                activeNav === 'ask-habeeb' 
                  ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              Ask Habeeb AI
            </a>
                          <span className={`text-[var(--text-secondary)]/30 flex-shrink-0 nav-item-fade`} style={{ animationDelay: '0.45s' }}>|</span>

            <a
              href={getNavLink('projects')}
              onClick={() => handleNavClick('projects')}
              className={`nav-link px-2 py-1 text-xs font-medium transition-all duration-300 whitespace-nowrap rounded-lg flex-shrink-0 nav-item-fade ${
                activeNav === 'projects' 
                  ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              Projects
            </a>
            <span className={`text-[var(--text-secondary)]/30 flex-shrink-0 nav-item-fade`} style={{ animationDelay: '0.15s' }}>|</span>
            <a
              href="https://www.dropbox.com/scl/fi/8pwzxju1g5a7z6k6iskgd/OWOADE_HABEEB_RESUME-4.pdf?rlkey=kqagoji9fa7yafe4v0tj5l4oe&st=iptearno&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link px-2 py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105 transition-all duration-300 whitespace-nowrap rounded-lg flex-shrink-0 nav-item-fade"
              style={{ animationDelay: '0.2s' }}
            >
              Resume
            </a>
            <span className={`text-[var(--text-secondary)]/30 flex-shrink-0 nav-item-fade`} style={{ animationDelay: '0.25s' }}>|</span>
            <a
              href={getNavLink('aboutme')}
              onClick={() => handleNavClick('aboutme')}
              className={`nav-link px-2 py-1 text-xs font-medium transition-all duration-300 whitespace-nowrap rounded-lg flex-shrink-0 nav-item-fade ${
                activeNav === 'aboutme' 
                  ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              About
            </a>
            <span className={`text-[var(--text-secondary)]/30 flex-shrink-0 nav-item-fade`} style={{ animationDelay: '0.35s' }}>|</span>
            <a
              href={getNavLink('contact')}
              onClick={() => handleNavClick('contact')}
              className={`nav-link px-2 py-1 text-xs font-medium transition-all duration-300 whitespace-nowrap rounded-lg flex-shrink-0 nav-item-fade ${
                activeNav === 'contact' 
                  ? 'text-[var(--text-primary)] bg-[var(--bg-primary)]/30 scale-105' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 hover:scale-105'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              Contact
            </a>
            
            </div>
          </div>
        </div>
      </nav>
      )}
    </>
  )
}
