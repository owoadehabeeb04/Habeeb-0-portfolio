'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver({ threshold: 0.3 })
  const { ref: emailRef, isVisible: emailVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-12 md:py-20 px-4 md:px-8 transition-opacity duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
            Contact
          </h2>
          <div className="w-32 h-0.5 bg-[var(--text-primary)] mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 md:space-y-12 relative">
          {/* Memoji - Top Right */}
        

          {/* Intro Text */}
          <div 
            ref={textRef}
            className={`transition-opacity duration-500 ${
              textVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Exploring a new product idea? Looking for ways to improve your product? Send a mail to:
            </p>
          </div>

          {/* Big Email Address with Rush In Animation */}
          <div 
            ref={emailRef}
            className={`overflow-hidden ${
              emailVisible ? 'email-rush-in' : 'opacity-0'
            }`}
          >
            <a
              href="mailto:owoadehabeeb04@gmail.com"
              className="inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity duration-300 break-all sm:break-normal"
            >
              OWOADEHABEEB04@GMAIL.COM
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-8">
            <a
              href="https://x.com/Drealtemiteee_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              Twitter
            </a>
            <span className="text-[var(--text-secondary)]/30">•</span>
            <a
              href="https://www.linkedin.com/in/owoade-habeeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              LinkedIn
            </a>
            <span className="text-[var(--text-secondary)]/30">•</span>
            <a
              href="https://github.com/owoadehabeeb04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
