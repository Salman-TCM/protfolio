'use client'

import { motion } from 'framer-motion'

interface StatusIndicatorProps {
  status: 'online' | 'loading' | 'error' | 'success'
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const StatusIndicator = ({ status, text, size = 'md' }: StatusIndicatorProps) => {
  const statusConfig = {
    online: { color: 'bg-neon-green', text: text || 'ONLINE', icon: '🟢' },
    loading: { color: 'bg-neon-amber', text: text || 'LOADING', icon: '🟡' },
    error: { color: 'bg-red-500', text: text || 'ERROR', icon: '🔴' },
    success: { color: 'bg-neon-cyan', text: text || 'SUCCESS', icon: '✅' }
  }

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center space-x-2">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`${sizeClasses[size]} ${config.color} rounded-full`}
      />
      {text && (
        <span className="text-xs font-mono text-neon-cyan/70 uppercase">
          {config.text}
        </span>
      )}
    </div>
  )
}

export default StatusIndicator