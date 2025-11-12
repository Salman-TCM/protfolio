'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavigationProps {
  currentSection: string
  onSectionChange: (section: string) => void
}

const Navigation = ({ currentSection, onSectionChange }: NavigationProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navItems = [
    { id: 'hero', label: 'HOME', command: '> cd ~' },
    { id: 'about', label: 'ABOUT', command: '> whoami' },
    { id: 'projects', label: 'PROJECTS', command: '> ls -la' },
    { id: 'blog', label: 'BLOG', command: '> cat blog.txt' },
    { id: 'contact', label: 'CONTACT', command: '> ping salman' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      onSectionChange(sectionId)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-retro-bg/90 backdrop-blur-sm border-b border-neon-cyan/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-neon-magenta font-retro text-sm">SALMAN.EXE</span>
            <div className="w-2 h-2 bg-neon-green animate-blink"></div>
          </motion.div>

          <div className="hidden md:flex items-center justify-end flex-1 ml-8">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 group ${
                    currentSection === item.id
                      ? 'text-neon-cyan border-b-2 border-neon-cyan'
                      : 'text-neon-cyan/70 hover:text-neon-cyan'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-6 left-0 text-[10px] text-neon-purple/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.command}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            className="flex items-center space-x-2 text-xs font-mono"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-neon-amber">SYSTEM:</span>
            <span className="text-neon-green">ONLINE</span>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </div>

      <div className="md:hidden">
        <motion.div
          className="px-4 py-2 space-y-1 border-t border-neon-cyan/30"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                currentSection === item.id
                  ? 'text-neon-cyan bg-neon-cyan/10'
                  : 'text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/5'
              }`}
            >
              {item.command} {item.label}
            </button>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navigation