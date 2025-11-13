'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import InteractiveTerminal from '@/components/InteractiveTerminal'
import FloatingNavigation from '@/components/FloatingNavigation'
import StatusWidget from '@/components/StatusWidget'

export default function Home() {
  const [navigationCommand, setNavigationCommand] = useState<string | null>(null)

  // Function to execute commands from floating navigation
  const handleNavigationCommand = (command: string) => {
    setNavigationCommand(command)
    // Reset after a moment to allow re-triggering
    setTimeout(() => setNavigationCommand(null), 100)
  }

  return (
    <div className="min-h-screen h-screen bg-retro-bg text-white overflow-hidden scanlines crt-effect">
      <main className="h-full flex flex-col relative">
        {/* Full Screen Terminal */}
        <div className="flex-1 bg-retro-bg text-neon-cyan p-2 sm:p-3 md:p-4 flex flex-col overflow-hidden">
          {/* ASCII Art Name - Responsive - Scrolls with content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-center mb-2 flex-shrink-0"
          >
            {/* Mobile - Show compact info */}
            <div className="block sm:hidden">
              <div className="text-center px-2">
                <h1 className="text-neon-cyan text-base sm:text-lg font-bold neon-glow mb-1">SALMAN HOSSAIN</h1>
                <p className="text-neon-green text-xs sm:text-sm">Software Engineer</p>
              </div>
            </div>
            
            {/* Tablet and Desktop - Welcome Message */}
            <div className="hidden sm:block">
              <div className="text-center px-4">
                {/* <h1 className="text-neon-cyan text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold neon-glow mb-2">
                  SALMAN HOSSAIN
                </h1> */}
                <div className="text-neon-green text-sm sm:text-base md:text-lg font-mono mb-1">
                  [SYSTEM: ONLINE] [USER: AUTHENTICATED] [ACCESS: GRANTED]
                </div>
                <p className="text-neon-amber text-xs sm:text-sm md:text-base font-mono">
                  Software Engineer • Tech Innovator
                </p>
                <div className="mt-2 text-gray-400 text-xs sm:text-sm font-mono">
                  Type &quot;help&quot; to explore my portfolio or use the navigation menu
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Terminal - Responsive and flexible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex-1 w-full overflow-hidden"
          >
            <InteractiveTerminal 
              onNavigate={() => {}}
              externalCommand={navigationCommand}
            />
          </motion.div>
        </div>

        {/* Floating Navigation - Responsive positioning */}
        <FloatingNavigation onNavigate={handleNavigationCommand} />
      </main>

      {/* Status Widget - Outside main container for absolute positioning */}
      <StatusWidget />
    </div>
  )
}