'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface MatrixRainProps {
  isActive: boolean
  onComplete: () => void
}

const MatrixRain = ({ isActive, onComplete }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)

    let frameCount = 0
    const maxFrames = 300 // Run for 5 seconds at 60fps

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      frameCount++
      
      if (frameCount < maxFrames) {
        animationRef.current = requestAnimationFrame(draw)
      } else {
        onComplete()
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* Matrix overlay text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="text-4xl font-retro text-neon-green mb-4 neon-glow">
            HACK MODE ACTIVATED
          </div>
          <div className="text-lg font-mono text-neon-green/80">
            Welcome to the Matrix, Neo...
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-4 text-sm font-mono text-neon-green/60"
          >
            Initializing hacker protocols...
          </motion.div>
        </motion.div>
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-xs font-mono text-neon-green/70 hover:text-neon-green border border-neon-green/30 px-3 py-1 rounded"
      >
        EXIT MATRIX [ESC]
      </motion.button>
    </motion.div>
  )
}

export default MatrixRain