'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { experiences } from '@/constants'

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref: cardRef, isVisible: cardVisible } = useIntersectionObserver({ 
    threshold: 0.2,
    triggerOnce: true 
  })

  return (
    <div
      ref={cardRef}
      className={`transition-opacity duration-500 ${
        cardVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="p-0">
        {/* Header */}
        <div className="mb-4">
          <div className="flex flex-wrap items-baseline gap-2 mb-2">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
              {exp.title}
            </h3>
            <span className="px-3 py-1 text-xs font-medium bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-[var(--text-secondary)]">
              {exp.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-base md:text-lg text-[var(--text-primary)] font-semibold mb-1">
            <span>{exp.company}</span>
            <span className="text-[var(--text-secondary)]">•</span>
            <span className="text-[var(--text-secondary)]">{exp.location}</span>
          </div>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            {exp.startDate} – {exp.endDate}
          </p>
        </div>

        {/* Achievements */}
        <ul className="space-y-3">
          {exp.achievements.map((achievement, achIndex) => (
            <li
              key={achIndex}
              className="flex items-start gap-3 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] mt-2"></span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="experience"
      ref={ref}
      className={`py-12 md:py-20 px-4 md:px-8 transition-opacity duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
            Experience
          </h2>
          <div className="w-32 h-0.5 bg-[var(--text-primary)] mx-auto"></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Timeline Line - Vertical line connecting all items */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-[var(--text-secondary)] z-0" style={{ transform: 'translateX(-50%)' }}></div>
          
          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-20">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-6 top-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--text-secondary)] border-2 md:border-4 border-[var(--bg-primary)] z-10" style={{ transform: 'translateX(-50%)' }}></div>
                
                {/* Content */}
                <ExperienceCard exp={exp} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

