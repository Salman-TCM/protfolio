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
    <div className="h-screen bg-retro-bg text-white overflow-hidden scanlines crt-effect">
      <main className="h-full flex flex-col">
        {/* Full Screen Terminal */}
        <div className="flex-1 bg-retro-bg text-neon-cyan p-2 sm:p-3 flex flex-col overflow-hidden">
          {/* ASCII Art Name - Responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-center mb-2 flex-shrink-0"
          >
            {/* Mobile - Show compact name */}
            <div className="block sm:hidden">
              <div className="text-center">
                <h1 className="text-neon-cyan text-lg font-bold neon-glow mb-1">SALMAN HOSSAIN</h1>
                <p className="text-neon-green text-xs">Full-Stack Developer</p>
              </div>
            </div>
            
            {/* Tablet and Desktop - ASCII Art */}
            <div className="hidden sm:block">
              <pre className="text-neon-cyan text-sm sm:text-base md:text-lg lg:text-xl leading-tight neon-glow font-mono whitespace-pre">
{`███████  █████  ██      ███    ███  █████  ███    ██ 
██      ██   ██ ██      ████  ████ ██   ██ ████   ██ 
███████ ███████ ██      ██ ████ ██ ███████ ██ ██  ██ 
     ██ ██   ██ ██      ██  ██  ██ ██   ██ ██  ██ ██ 
███████ ██   ██ ███████ ██      ██ ██   ██ ██   ████ 
                                                     
██   ██  ██████  ███████ ███████  █████  ██ ███    ██ 
██   ██ ██    ██ ██      ██      ██   ██ ██ ████   ██ 
███████ ██    ██ ███████ ███████ ███████ ██ ██ ██  ██ 
██   ██ ██    ██      ██      ██ ██   ██ ██ ██  ██ ██ 
██   ██  ██████  ███████ ███████ ██   ██ ██ ██   ████`}
              </pre>
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