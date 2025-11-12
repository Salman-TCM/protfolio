'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingNavigationProps {
  onNavigate: (command: string) => void
}

const FloatingNavigation = ({ onNavigate }: FloatingNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', command: 'about', icon: '👨‍💻', color: 'neon-cyan' },
    { label: 'Projects', command: 'projects', icon: '💼', color: 'neon-magenta' },
    { label: 'Skills', command: 'skills', icon: '⚡', color: 'neon-green' },
    { label: 'Contact', command: 'contact', icon: '📧', color: 'neon-amber' },
    { label: 'AI Chat', command: 'ai', icon: '🤖', color: 'neon-purple' },
    { label: 'Help', command: 'help', icon: '❓', color: 'neon-cyan' },
    { label: 'Sound', command: 'sound', icon: '🔊', color: 'neon-amber' },
  ]

  return (
    <div className="fixed bottom-6 sm:bottom-8 left-6 sm:left-8 z-50">
      {/* Main Toggle Button - Enhanced */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 247, 0.6)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-black/80 border-2 border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/10 transition-all backdrop-blur-sm relative overflow-hidden"
        style={{ boxShadow: '0 0 10px rgba(0, 255, 247, 0.3)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent" />
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl sm:text-2xl font-bold z-10"
          style={{ textShadow: '0 0 10px currentColor' }}
        >
          {isOpen ? '✕' : '≡'}
        </motion.div>
      </motion.button>

      {/* Navigation Menu - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-14 sm:bottom-16 left-0 bg-black/90 border border-neon-cyan/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm max-w-[90vw] sm:max-w-none"
          >
            <div className="text-xs text-neon-amber mb-2 sm:mb-3 text-center font-mono">
              QUICK NAVIGATION
            </div>
            
            <div className="space-y-1 sm:space-y-2 min-w-[160px] sm:min-w-[180px]">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.command}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onNavigate(item.command)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded border border-${item.color}/30 text-${item.color} hover:bg-${item.color}/10 transition-all font-mono text-xs sm:text-sm`}
                >
                  <span className="text-sm sm:text-lg">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">⏎</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-neon-cyan/20">
              <div className="text-xs text-gray-500 text-center font-mono">
                Or type commands in terminal
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Hint - Responsive */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-14 sm:bottom-16 left-0 bg-black/80 text-neon-cyan text-xs p-2 rounded border border-neon-cyan/30 backdrop-blur-sm pointer-events-none hidden sm:block"
        >
          Click for navigation
        </motion.div>
      )}
    </div>
  )
}

export default FloatingNavigation