'use client'

import { useState, useEffect } from 'react'
import DynamicSection from '@/components/DynamicSection'
import DynamicNavigation from '@/components/DynamicNavigation'
import TerminalCLI from '@/components/TerminalCLI'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import LiveStats from '@/components/LiveStats'
import AIChatbot from '@/components/AIChatbot'
import AudioControls, { AudioProvider } from '@/components/AudioSystem'
import WelcomeOverlay from '@/components/WelcomeOverlay'
import BootSequence from '@/components/BootSequence'
import MatrixRain from '@/components/MatrixRain'
import { portfolioConfig, getEnabledSections } from '@/config/portfolio'

export default function Home() {
  const [showCLI, setShowCLI] = useState(false)
  const [currentSection, setCurrentSection] = useState('hero')
  const [showStats, setShowStats] = useState(false)
  const [showMatrixRain, setShowMatrixRain] = useState(false)
  
  // Get enabled sections from configuration
  const enabledSections = getEnabledSections()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setShowCLI(prev => !prev)
      }
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        setShowStats(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AudioProvider>
      <main className="min-h-screen bg-retro-bg relative overflow-x-hidden">
        <BackgroundAnimation />
        
        {/* Dynamic Navigation */}
        <DynamicNavigation 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        
        {/* Dynamic Sections */}
        <div className="relative z-10">
          {enabledSections.map((section) => (
            <DynamicSection
              key={section.id}
              section={section}
              isActive={currentSection === section.id}
            />
          ))}
        </div>

        {/* Live Stats Sidebar - Only show if enabled in config */}
        {portfolioConfig.features.liveStats && showStats && (
          <div className="fixed top-20 left-4 w-80 z-30 max-h-[calc(100vh-100px)] overflow-y-auto">
            <LiveStats />
          </div>
        )}

        {/* Terminal CLI - Only show if enabled in config */}
        {portfolioConfig.features.cliMode && showCLI && (
          <TerminalCLI 
            onClose={() => setShowCLI(false)}
            onNavigate={setCurrentSection}
            onMatrixRain={() => setShowMatrixRain(true)}
          />
        )}

        {/* AI Chatbot - Only show if enabled in config */}
        {portfolioConfig.features.aiChatbot && <AIChatbot />}

        {/* Audio Controls - Only show if enabled in config */}
        {portfolioConfig.features.audioEffects && <AudioControls />}

        {/* Boot Sequence - Only show if enabled in config */}
        {portfolioConfig.features.bootSequence && <BootSequence />}

        {/* Matrix Rain Easter Egg - Only show if enabled in config */}
        {portfolioConfig.features.matrixRain && (
          <MatrixRain 
            isActive={showMatrixRain} 
            onComplete={() => setShowMatrixRain(false)} 
          />
        )}

        {/* Welcome Overlay */}
        <WelcomeOverlay />

        {/* Help Text - Dynamic based on enabled features */}
        <div className="fixed bottom-4 left-4 text-xs text-neon-cyan/50 font-mono space-y-1">
          {portfolioConfig.features.cliMode && <div>Press Ctrl + ` for terminal</div>}
          {portfolioConfig.features.liveStats && <div>Press Ctrl + S for live stats</div>}
          <div>
            {portfolioConfig.features.aiChatbot && '🤖 AI assistant'}
            {portfolioConfig.features.aiChatbot && portfolioConfig.features.audioEffects && ' | '}
            {portfolioConfig.features.audioEffects && '🔊 Audio controls'}
          </div>
        </div>
      </main>
    </AudioProvider>
  )
}