'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'
import { skills } from '@/constants'

// Helper function to get skill by name
const getSkill = (name: string) => skills.find(s => s.name === name)!

// Categorized skills
const skillCategories = {
  Languages: [
    'JavaScript',
    'TypeScript',
    'Python',
   
  ].map(name => getSkill(name)),
  Frontend: [
    
    'HTML',
    'CSS',    'Tailwind CSS',
    'shadcn/ui',
    'React',
    'Next.js',
    'Framer Motion',
  ].map(name => getSkill(name)),
  'State Management': [
    'React Query',
    'Zustand',
  ].map(name => getSkill(name)),
  Backend: [
    'Node.js',
    'Express',
    'PostgreSQL',
    'MongoDB',
    'Redis',
  ].map(name => getSkill(name)),
  'Tools & Cloud': [
    'Docker',
    'Firebase',
    'Prisma',
    'Google Cloud',
    'LangChain',
    'Vercel',
  ].map(name => getSkill(name)),
}

export default function Skills() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-12 md:py-20 px-4 md:px-8 transition-opacity duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
            Skills
          </h2>
          <div className="w-32 h-0.5 bg-[var(--text-primary)] mx-auto"></div>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12 md:space-y-16">
          {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
            <div key={category} className="space-y-6">
              {/* Category Label */}
              <div className="flex items-center gap-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] whitespace-nowrap">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-[var(--border)]/30"></div>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill, index) => {
                  if (!skill) return null
                  
                  return (
                    <div
                      key={skill.name}
                      className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border)]/40 rounded-full flex items-center gap-2 hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-300"
                      style={{
                        transitionDelay: isVisible ? `${(categoryIndex * 100) + (index * 30)}ms` : '0ms',
                      }}
                    >
                      {skill.external ? (
                        <Image
                          src={skill.src}
                          alt={skill.alt}
                          className={`w-5 h-5 object-contain ${
                            skill.name === 'Express' || skill.name === 'LangChain' ? 'tech-icon-invert' : ''
                          }`}
                          width={20}
                          height={20}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={skill.src}
                          alt={skill.alt}
                          width={20}
                          height={20}
                          className="object-contain"
                          loading="lazy"
                        />
                      )}
                      <span className="text-sm text-[var(--text-primary)]">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
