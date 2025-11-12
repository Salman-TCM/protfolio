'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioConfig, getEnabledSections } from '@/config/portfolio'

interface DynamicNavigationProps {
  currentSection: string
  onSectionChange: (section: string) => void
}

const DynamicNavigation = ({ currentSection, onSectionChange }: DynamicNavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const enabledSections = getEnabledSections()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = enabledSections.map(section => section.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        onSectionChange(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabledSections, onSectionChange])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero':
        return '🚀'
      case 'about':
        return '👨‍💻'
      case 'skills':
        return '⚡'
      case 'projects':
        return '💼'
      case 'blog':
        return '📝'
      case 'contact':
        return '📧'
      default:
        return '📄'
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-retro-bg/90 backdrop-blur-md border-b border-neon-cyan/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <div className="w-8 h-8 border-2 border-neon-cyan rounded bg-neon-cyan/20 flex items-center justify-center">
                <span className="text-sm font-retro text-neon-cyan">SH</span>
              </div>
              <span className="font-retro text-lg text-neon-cyan hidden sm:block">
                {portfolioConfig.personal.name.split(' ')[0].toUpperCase()}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {enabledSections.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 font-mono text-sm transition-all duration-300 rounded ${
                    currentSection === section.id
                      ? 'text-neon-magenta border border-neon-magenta/50 bg-neon-magenta/10'
                      : 'text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/5'
                  }`}
                >
                  <span className="mr-2">{getSectionIcon(section.type)}</span>
                  {section.title.toUpperCase()}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neon-cyan hover:text-neon-magenta transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.div
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="w-full h-0.5 bg-current"
                />
                <motion.div
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  className="w-full h-0.5 bg-current"
                />
                <motion.div
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="w-full h-0.5 bg-current"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 md:hidden"
          >
            <div className="terminal-window mx-4 mt-2">
              <div className="p-4">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                  <span className="text-sm font-mono text-neon-cyan">navigation_menu.exe</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-mono text-neon-magenta hover:text-red-400 transition-colors"
                  >
                    [CLOSE]
                  </button>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                  {enabledSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left p-3 rounded transition-all duration-300 ${
                        currentSection === section.id
                          ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/50'
                          : 'text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getSectionIcon(section.type)}</span>
                        <span className="font-mono text-sm">{section.title.toUpperCase()}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-neon-cyan/30 text-center">
                  <div className="text-xs font-mono text-neon-cyan/50">
                    Press Ctrl + ` for terminal mode
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="space-y-3">
          {enabledSections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.2 }}
              onClick={() => scrollToSection(section.id)}
              className={`block w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentSection === section.id
                  ? 'border-neon-magenta bg-neon-magenta shadow-lg shadow-neon-magenta/50'
                  : 'border-neon-cyan/50 hover:border-neon-cyan'
              }`}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta z-50"
        style={{
          scaleX: useScroll().scrollYProgress,
          transformOrigin: '0%',
        }}
      />
    </>
  )
}

// Custom hook for scroll progress
function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollYProgress, setScrollYProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0

      setScrollY(scrollTop)
      setScrollYProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return { scrollY, scrollYProgress }
}

export default DynamicNavigation