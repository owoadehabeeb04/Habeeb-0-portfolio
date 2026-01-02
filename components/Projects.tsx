'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { fullstackProjects, frontendProjects } from '@/constants'

interface ProjectCardProps {
  project: typeof fullstackProjects[0]
  index: number
  isEven: boolean
}

function ProjectCard({ project, index, isEven }: ProjectCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ 
    threshold: 0.2,
    triggerOnce: true 
  })

  const { ref: imageRef, isVisible: imageVisible } = useIntersectionObserver({ 
    threshold: 0.3,
    triggerOnce: true 
  })

  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver({ 
    threshold: 0.3,
    triggerOnce: true 
  })

  // Use project-specific tech stack if available, otherwise fallback to default
  const techStack = project.techStack || [
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', external: true },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', external: true },
    { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', external: true },
  ]

  // Different animation types for variety - more crazy animations
  const animationTypes = [
    'project-image-flip', // Skew flip
    'project-image-slide-left',
    'project-image-slide-right',
    'project-image-zoom-rotate',
    'project-image-fade-scale',
    'project-image-slide-up',
    'project-image-bounce',
    'project-image-spiral',
    'project-image-elastic',
    'project-image-flip', // Skew flip again
    'project-image-zoom-rotate',
    'project-image-spiral',
  ]
  
  const imageAnimation = imageVisible ? animationTypes[index % animationTypes.length] : ''

  return (
    <div
      ref={ref}
      className={`mb-16 md:mb-20 last:mb-0 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="border border-[var(--border)]/40 rounded-xl md:rounded-2xl overflow-hidden bg-[var(--bg-secondary)]/30 hover:border-[var(--text-primary)] transition-all duration-500 group">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${
          isEven ? '' : 'md:grid-flow-dense'
        }`}>
          {/* Image Side */}
          <div className={`relative h-64 md:h-[500px] p-4 md:p-6 ${
            isEven ? 'md:order-1' : 'md:order-2'
          }`}>
            <div 
              ref={imageRef}
              className={`relative w-full h-full rounded-lg md:rounded-xl overflow-hidden ${imageAnimation}`}
              style={{ 
                opacity: imageVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-out'
              }}
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={index < 2}
              />
            </div>
          </div>

          {/* Content Side */}
          <div 
            ref={contentRef}
            className={`flex flex-col justify-center p-8 md:p-12 ${
              isEven ? 'md:order-2' : 'md:order-1'
            }`}
          >
            {/* Project Title */}
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight ${
              contentVisible ? 'project-title-animate' : 'opacity-0'
            }`}>
              {project.title}
            </h3>

            {/* Description */}
            <p className={`text-base md:text-lg text-[var(--text-secondary)] mb-6 leading-relaxed ${
              contentVisible ? 'project-description-animate' : ''
            }`}>
              {project.description || project.tags.slice(1).join(' • ')}
            </p>

            {/* Technology Stack Icons */}
            <div className={`flex flex-wrap items-center gap-3 mb-6 ${
              contentVisible ? 'project-tech-animate' : ''
            }`}>
              {techStack.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className={`w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center ${
                    contentVisible ? 'project-tech-icon-animate' : ''
                  }`}
                  style={{ 
                    animationDelay: `${0.4 + techIndex * 0.1}s` 
                  }}
                  title={tech.name}
                >
                  {tech.external ? (
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      className={`w-full h-full object-contain ${
                        tech.invertDark ? 'tech-icon-invert' : ''
                      }`}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      fill
                      className={`object-contain ${
                        tech.invertDark ? 'tech-icon-invert' : ''
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-wrap gap-4 ${
              contentVisible ? 'project-buttons-animate' : ''
            }`}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg text-sm md:text-base font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                View Project
              </a>
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--border)] text-[var(--text-primary)] rounded-lg text-sm md:text-base font-medium hover:bg-[var(--bg-secondary)] transition-all duration-300 hover:scale-105"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  // Combine all projects and show first 4
  const allProjects = [...fullstackProjects, ...frontendProjects]
  const displayedProjects = allProjects.slice(0, 4)

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-20 md:py-32 px-4 md:px-8 transition-opacity duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-8 md:mb-10">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
            Selected Projects
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-6">
            A collection of projects I&apos;ve built, ranging from AI-powered applications to full-stack web platforms. Each project showcases my expertise in modern web technologies, user experience design, and solving real-world problems through code.
          </p>

          {/* View All Projects Button */}
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg text-sm md:text-base font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            View All Projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>

        {/* Full-Width Stacked Cards */}
        <div>
          {displayedProjects.map((project, index) => {
            const isEven = index % 2 === 0
            return (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isEven={isEven}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
