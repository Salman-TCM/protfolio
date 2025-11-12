'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingSpinner = ({ text = 'Loading...', size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className={`${sizeClasses[size]} border-2 border-neon-cyan border-t-transparent rounded-full`}
      />
      <span className="font-mono text-neon-cyan text-sm">{text}</span>
    </div>
  )
}

export default LoadingSpinner