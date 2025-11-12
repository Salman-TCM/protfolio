'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BootSequence = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSequence, setShowSequence] = useState(true)

  const bootSteps = [
    { text: 'RETRO OS v2.0.1', delay: 500 },
    { text: 'Copyright (c) 2024 Salman Industries', delay: 300 },
    { text: '', delay: 200 },
    { text: 'Initializing system...', delay: 800 },
    { text: 'Loading drivers...', delay: 600 },
    { text: 'Checking hardware...', delay: 400 },
    { text: 'Starting network services...', delay: 700 },
    { text: 'Loading user profile...', delay: 500 },
    { text: 'Mounting file systems...', delay: 600 },
    { text: 'Starting GUI...', delay: 400 },
    { text: '', delay: 300 },
    { text: 'Welcome to RETRO PORTFOLIO', delay: 800 },
    { text: 'System ready.', delay: 500 }
  ]

  useEffect(() => {
    // Check if boot sequence has been shown before
    const hasBooted = sessionStorage.getItem('retro-portfolio-booted')
    if (hasBooted) {
      setShowSequence(false)
      return
    }

    let timeoutId: NodeJS.Timeout

    const playStep = (stepIndex: number) => {
      if (stepIndex < bootSteps.length) {
        setCurrentStep(stepIndex)
        timeoutId = setTimeout(() => {
          playStep(stepIndex + 1)
        }, bootSteps[stepIndex].delay)
      } else {
        // Boot sequence complete
        setTimeout(() => {
          setShowSequence(false)
          sessionStorage.setItem('retro-portfolio-booted', 'true')
        }, 1000)
      }
    }

    playStep(0)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!showSequence) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        <div className="max-w-2xl w-full p-8">
          <div className="font-mono text-neon-green space-y-2">
            {bootSteps.slice(0, currentStep + 1).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                {step.text && (
                  <>
                    <span className="text-neon-amber">{'>'}</span>
                    <span className="text-sm">
                      {step.text}
                      {index === currentStep && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="ml-1"
                        >
                          _
                        </motion.span>
                      )}
                    </span>
                  </>
                )}
                {!step.text && <br />}
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-xs font-mono text-neon-cyan/70 mb-2">
              <span>Boot Progress</span>
              <span>{Math.round((currentStep / bootSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-neon-cyan/10 rounded-full h-1">
              <motion.div
                className="h-1 bg-neon-cyan rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / bootSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setShowSequence(false)
              sessionStorage.setItem('retro-portfolio-booted', 'true')
            }}
            className="absolute bottom-8 right-8 text-xs font-mono text-neon-cyan/50 hover:text-neon-cyan border border-neon-cyan/30 px-3 py-1 rounded"
          >
            SKIP BOOT [ESC]
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BootSequence