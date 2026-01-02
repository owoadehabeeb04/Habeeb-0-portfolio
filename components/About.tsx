'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function About() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const { ref: headingRef, isVisible: headingVisible } = useIntersectionObserver({ threshold: 0.3 })
  const { ref: imageRef, isVisible: imageVisible } = useIntersectionObserver({ threshold: 0.3 })
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver({ threshold: 0.3 })
  const { ref: hobbyRef, isVisible: hobbyVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section
      id="aboutme"
      ref={ref}
      className={`relative py-12 md:py-20 px-4 md:px-8 transition-opacity duration-700 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Floating Background Elements - Throughout the entire section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Bubbles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`about-bubble-${i}`}
            className="absolute rounded-full border border-[var(--border)]/20 floating-element hidden md:block"
            style={{
              width: `${15 + (i % 5) * 8}px`,
              height: `${15 + (i % 5) * 8}px`,
              left: `${(i * 8) % 100}%`,
              top: `${10 + (i % 4) * 20}%`,
              animation: `float${i % 3 + 1} ${6 + i * 1.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        
        {/* Floating Circles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`about-circle-${i}`}
            className="absolute rounded-full border-2 border-[var(--border)]/15 floating-element hidden md:block"
            style={{
              width: `${20 + i * 6}px`,
              height: `${20 + i * 6}px`,
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `float${(i % 3) + 1} ${8 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        
        {/* Small Floating Boxes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`about-box-${i}`}
            className="absolute border border-[var(--border)]/20 rounded-sm floating-element rotate-45 hidden md:block"
            style={{
              width: `${10 + (i % 4) * 5}px`,
              height: `${10 + (i % 4) * 5}px`,
              left: `${(i * 9) % 95}%`,
              top: `${20 + (i % 3) * 30}%`,
              animation: `float${(i % 3) + 1} ${7 + i * 1.1}s ease-in-out infinite`,
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        <div
          className="hidden md:block absolute border-2 border-[var(--border)]/15 floating-element"
          style={{
            width: '24px',
            height: '24px',
            left: '5%',
            top: '25%',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            animation: 'float1 11s ease-in-out infinite',
          }}
        />
        <div
          className="hidden md:block absolute border-2 border-[var(--border)]/15 floating-element"
          style={{
            width: '20px',
            height: '20px',
            left: '85%',
            top: '45%',
            animation: 'float2 13s ease-in-out infinite',
          }}
        />
        <div
          className="hidden md:block absolute border-2 border-[var(--border)]/15 floating-element rounded-full"
          style={{
            width: '28px',
            height: '28px',
            left: '70%',
            top: '70%',
            animation: 'float3 15s ease-in-out infinite',
          }}
        />
        <div
          className="hidden md:block absolute border-2 border-[var(--border)]/15 floating-element rotate-45"
          style={{
            width: '18px',
            height: '18px',
            left: '15%',
            top: '60%',
            animation: 'float1 12s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Large Editorial Heading */}
        <div 
          ref={headingRef}
          className={`text-center mb-8 md:mb-10 ${
            headingVisible ? 'project-image-slide-up' : 'opacity-0'
          }`}
          style={{ 
            opacity: headingVisible ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
            MEET HABEEB
          </h2>
          <div className="w-32 h-0.5 bg-[var(--text-primary)] mx-auto"></div>
        </div>

        {/* Main Content - Asymmetric Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16">
          {/* Image Side - Takes 5 columns */}
          <div 
            ref={imageRef}
            className={`md:col-span-5 ${
              imageVisible ? 'project-image-slide-left' : 'opacity-0'
            }`}
            style={{ 
              opacity: imageVisible ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            <div className="relative w-full">
              {/* Main Image with Glitch Effect */}
              <div className="relative w-full h-[400px] md:h-[600px] rounded-lg md:rounded-xl overflow-hidden border border-[var(--border)]/40 shadow-lg glitch-image pixel-glitch">
                <Image
                  src="/images/habeebportfolioabout2.jpg"
                  alt="Habeeb Owoade"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
            </div>
          </div>

          {/* Text Side - Takes 7 columns */}
          <div 
            ref={textRef}
            className={`md:col-span-7 space-y-8 ${
              textVisible ? 'project-image-slide-right' : 'opacity-0'
            }`}
            style={{ 
              opacity: textVisible ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            <div className="space-y-6">
              <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed">
                I'm Habeeb, a software engineer whose journey into coding began at{' '}
                <span className="text-[var(--text-primary)] font-semibold underline decoration-2 underline-offset-4">
                  17
                </span>
                . What started as curiosity quickly grew into a long-term commitment to building and understanding software. During high school, I spent my time learning through online resources, participating in coding challenges, and learning from mentors who helped shape how I think about problem-solving.
              </p>
              
              {/* <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed">
                Over the years, I've worked on remote projects for agencies, consulted for startups, and collaborated with talented teams to build digital products for both businesses and everyday users. These experiences have exposed me to real-world development workflows, collaboration, and the importance of writing code that is both reliable and maintainable.
              </p> */}

              <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed">
                I completed my SIWES internship at NSIA Insurance Limited Nigeria, where I gained hands-on industry experience and a clearer understanding of how software operates within large organizations. I'm currently in my final year studying Software Engineering, with multiple completed projects and a strong drive to keep learning, building, and refining my craft.
              </p>
            </div>

            {/* Personal Touch Section - Inside Text Column */}
            <div 
              ref={hobbyRef}
              className={`pt-8 mt-8 border-t border-[var(--border)]/40 ${
                hobbyVisible ? 'project-image-fade-scale' : 'opacity-0'
              }`}
              style={{ 
                opacity: hobbyVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-out'
              }}
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--border)] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-primary)]">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    Outside of coding
                  </h3>
                  <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                  When I'm not coding, I'm usually playing story-driven video games. The way those games handle complex narratives and problem-solving always finds its way back into how I think about building software.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
