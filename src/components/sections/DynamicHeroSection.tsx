'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

interface HeroConfig {
  terminalLines: string[]
  stats: Array<{
    label: string
    value: string
    color: string
  }>
  buttons: Array<{
    text: string
    action: string
    style: 'primary' | 'secondary'
  }>
}

interface DynamicHeroSectionProps {
  config: HeroConfig
}

const DynamicHeroSection = ({ config }: DynamicHeroSectionProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [currentDateTime, setCurrentDateTime] = useState('')

  const terminalLines = useMemo(() => config.terminalLines, [config.terminalLines])

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine]
      let index = 0
      
      const typeInterval = setInterval(() => {
        if (index < line.length) {
          setDisplayText(prev => prev + line[index])
          index++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setDisplayText(prev => prev + '\n')
            setCurrentLine(prev => prev + 1)
          }, 500)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [currentLine, terminalLines])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString())
    
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'download-cv':
        window.open('#', '_blank')
        break
      case 'navigate-projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        console.log(`Action: ${action}`)
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="terminal-window"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-mono text-neon-cyan/70">terminal.exe</span>
            </div>
            <div className="text-xs font-mono text-neon-purple">
              {currentDateTime || 'Loading...'}
            </div>
          </div>

          {/* Terminal Content */}
          <div className="font-mono text-sm leading-relaxed">
            <pre className="whitespace-pre-wrap text-neon-cyan">
              {displayText}
              {showCursor && <span className="bg-neon-cyan text-retro-bg">|</span>}
            </pre>
          </div>

          {/* Command Suggestions */}
          {currentLine >= terminalLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 p-3 border border-neon-purple/30 rounded bg-neon-purple/5"
            >
              <div className="text-xs font-mono text-neon-purple mb-2">Available commands:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors">
                  → about
                </div>
                <div className="text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors">
                  → projects
                </div>
                <div className="text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors">
                  → skills
                </div>
                <div className="text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors">
                  → contact
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Avatar */}
          <div className="flex justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-48 h-48 border-2 border-neon-cyan rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center retro-border">
                <div className="text-6xl font-retro text-neon-cyan neon-glow">
                  S.H
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-green rounded-full animate-pulse shadow-lg shadow-neon-green/50"></div>
            </motion.div>
          </div>

          {/* Status Display */}
          <div className="space-y-4 font-mono">
            <div className="flex items-center space-x-3">
              <span className="text-neon-amber">STATUS:</span>
              <span className="text-neon-green">AVAILABLE FOR OPPORTUNITIES</span>
              <div className="w-2 h-2 bg-neon-green rounded-full animate-blink"></div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-neon-amber">LOCATION:</span>
              <span className="text-neon-cyan">EARTH.PLANET</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-neon-amber">UPTIME:</span>
              <span className="text-neon-cyan">∞ YEARS</span>
            </div>
          </div>

          {/* Dynamic Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            {config.stats.map((stat, index) => (
              <div
                key={index}
                className={`p-3 border border-${stat.color}/30 rounded bg-${stat.color}/5`}
              >
                <div className={`text-2xl font-retro text-${stat.color}`}>
                  {stat.value}
                </div>
                <div className={`text-xs font-mono text-${stat.color}/70`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dynamic Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {config.buttons.map((button, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleButtonClick(button.action)}
                className={
                  button.style === 'primary'
                    ? 'retro-button flex-1 group relative overflow-hidden'
                    : 'retro-button border-neon-magenta text-neon-magenta hover:bg-neon-magenta flex-1 group relative overflow-hidden'
                }
              >
                <span className="relative z-10">{button.text}</span>
                <motion.div
                  className={`absolute inset-0 ${
                    button.style === 'primary' ? 'bg-neon-cyan/20' : 'bg-neon-magenta/20'
                  }`}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex flex-col items-center space-y-2 text-neon-cyan/50 group-hover:text-neon-cyan transition-colors">
          <span className="text-xs font-mono">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-neon-cyan/50 group-hover:border-neon-cyan rounded-full flex justify-center transition-colors"
          >
            <div className="w-1 h-3 bg-neon-cyan/50 group-hover:bg-neon-cyan rounded-full mt-2 transition-colors"></div>
          </motion.div>
        </div>
      </motion.button>
    </section>
  )
}

export default DynamicHeroSection