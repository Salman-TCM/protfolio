'use client'

import { motion } from 'framer-motion'
import { PortfolioSection } from '@/config/portfolio'
import DynamicHeroSection from './sections/DynamicHeroSection'
import DynamicAboutSection from './sections/DynamicAboutSection'
import DynamicSkillsSection from './sections/DynamicSkillsSection'
import DynamicProjectsSection from './sections/DynamicProjectsSection'
import DynamicBlogSection from './sections/DynamicBlogSection'
import DynamicContactSection from './sections/DynamicContactSection'

interface DynamicSectionProps {
  section: PortfolioSection
  isActive?: boolean
}

const DynamicSection = ({ section, isActive = false }: DynamicSectionProps) => {
  const renderSection = () => {
    switch (section.type) {
      case 'hero':
        return <DynamicHeroSection config={section.config} />
      case 'about':
        return <DynamicAboutSection config={section.config} />
      case 'skills':
        return <DynamicSkillsSection config={section.config} />
      case 'projects':
        return <DynamicProjectsSection config={section.config} />
      case 'blog':
        return <DynamicBlogSection config={section.config} />
      case 'contact':
        return <DynamicContactSection config={section.config} />
      case 'custom':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-retro text-neon-cyan mb-4">
                Custom Section: {section.title}
              </h2>
              <p className="text-neon-cyan/70">Configure your custom content here</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!section.enabled) return null

  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="relative"
      data-section-type={section.type}
      data-section-title={section.title}
    >
      {renderSection()}
    </motion.section>
  )
}

export default DynamicSection