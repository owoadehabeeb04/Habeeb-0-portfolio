'use client'

import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'

const roles = ['A Software Engineer', 'Owoade Habeeb']

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000) // Switch every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-8 md:py-32 pb-32 md:pb-32 overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Glowing Effect Underneath */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-48 md:h-64 hero-glow"></div>

      {/* Floating Background Elements - Visible on all screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Boxes - Hidden on mobile, visible on desktop */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`box-${i}`}
            className="hidden md:block absolute border border-[var(--border)]/40 rounded-lg floating-element animate-float-fade-in"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animation: `float${i % 3} ${8 + i * 2}s ease-in-out infinite, float-fade-in 0.8s ease-out ${i * 0.1}s both`,
            }}
          />
        ))}
        
        {/* Geometric Shapes - Hidden on mobile, visible on desktop */}
        <div
          className="hidden md:block absolute bottom-20 left-10 w-32 h-32 border-2 border-[var(--border)]/50 floating-element"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            animation: 'float1 12s ease-in-out infinite',
          }}
        />
        <div
          className="hidden md:block absolute top-32 right-20 w-24 h-24 border-2 border-[var(--border)]/50 floating-element rotate-45"
          style={{
            animation: 'float2 10s ease-in-out infinite',
          }}
        />
        <div
          className="hidden md:block absolute bottom-40 right-10 w-40 h-40 border-2 border-[var(--border)]/50 floating-element rounded-full"
          style={{
            animation: 'float3 15s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-6 md:gap-12 pt-4 md:pt-0">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <div className="mb-4 md:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-3 md:mb-4 leading-tight">
              Hi, I'm{' '}
              <span className="inline-block animate-wave">👋</span>
            </h1>
            <div className="h-12 sm:h-16 md:h-20 flex items-center justify-center md:justify-start overflow-hidden">
              <div className="relative inline-block">
                <span
                  key={currentRoleIndex}
                  className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] animate-text-switch"
                >
                  {roles[currentRoleIndex]}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            I'm a full-stack developer who builds scalable web applications and robust backend systems. From crafting intuitive frontends with React and Next.js to designing efficient server architectures, I focus on clean code and practical solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
            <a
              href="https://www.dropbox.com/scl/fi/8pwzxju1g5a7z6k6iskgd/OWOADE_HABEEB_RESUME-4.pdf?rlkey=kqagoji9fa7yafe4v0tj5l4oe&st=iptearno&dl=0"
              download="habeebdev resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg font-medium hover:opacity-90 transition-all duration-300 text-center active:scale-95"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-block px-6 py-3 border-2 border-[var(--border)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-all duration-300 text-center active:scale-95"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        {/* Profile Picture */}
        <div className="flex-shrink-0 relative z-10 order-1 md:order-2 mb-6 md:mb-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80">
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-full profile-glow"></div>
            <div className="absolute inset-0 border-4 border-[var(--border)] rounded-full animate-pulse-slow"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--border)] shadow-2xl">
              <Image
                src="/images/habeebportfolio.jpg"
                alt="Habeeb Owoade"
                fill
                className="object-cover object-[center_0%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
