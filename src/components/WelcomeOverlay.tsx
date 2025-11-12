'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WelcomeOverlay = () => {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Show welcome overlay only on first visit
    const hasVisited = localStorage.getItem('retro-portfolio-visited')
    if (!hasVisited) {
      setTimeout(() => setShowWelcome(true), 2000)
      localStorage.setItem('retro-portfolio-visited', 'true')
    }
  }, [])

  if (!showWelcome) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowWelcome(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="terminal-window max-w-lg text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-neon-cyan/30">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-mono text-neon-cyan">welcome.exe</span>
            </div>
          </div>

          {/* Welcome Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl mb-2">🚀</div>
              <h2 className="text-xl font-retro text-neon-cyan mb-2 neon-glow">
                WELCOME TO THE MATRIX
              </h2>
              <p className="text-neon-cyan/80 font-mono text-sm">
                A cyberpunk portfolio experience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-left space-y-3 font-mono text-sm"
            >
              <div className="text-neon-amber font-bold mb-2">QUICK START GUIDE:</div>
              
              <div className="flex items-center space-x-2">
                <span className="text-neon-green">⌘</span>
                <span className="text-neon-cyan">Press <kbd className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded">Ctrl + `</kbd> for terminal</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-neon-magenta">🤖</span>
                <span className="text-neon-cyan">Click the robot for AI assistant</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-neon-purple">🔊</span>
                <span className="text-neon-cyan">Toggle audio controls (top right)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-neon-amber">📊</span>
                <span className="text-neon-cyan">Press <kbd className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded">Ctrl + S</kbd> for live stats</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-red-400">🎮</span>
                <span className="text-neon-cyan">Try the Konami code: ↑↑↓↓←→←→BA</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4 border-t border-neon-cyan/30"
            >
              <motion.button
                onClick={() => setShowWelcome(false)}
                className="retro-button w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ENTER THE MATRIX
              </motion.button>
              
              <p className="text-xs font-mono text-neon-cyan/50 mt-3">
                Click anywhere outside to close
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomeOverlay