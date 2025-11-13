'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const StatusWidget = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [stats, setStats] = useState({
    commits: 149,
    uptime: '3Y 241D',
    status: 'ONLINE',
    location: 'EARTH'
  })

  useEffect(() => {
    // Initialize time on client
    setCurrentTime(new Date())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Simulate dynamic stats updates
    const statsTimer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 3)
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(statsTimer)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderTop: '1px solid rgba(0, 255, 247, 0.4)',
        borderLeft: '1px solid rgba(0, 255, 247, 0.4)',
        borderRight: '1px solid rgba(0, 255, 247, 0.4)',
        padding: '8px 16px',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        boxShadow: '0 0 15px rgba(0, 255, 247, 0.2)'
      }}
    >
      <div style={{ 
        fontFamily: 'monospace', 
        fontSize: '12px', 
        color: '#00FFF7',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ color: '#00FF00', fontSize: '8px', display: 'inline-block' }}
        >
          ██
        </motion.span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#00FF00', fontSize: '8px' }}>▪▪▪</span>
          SYSTEM: {stats.status}
        </span>
        <span>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#FF00C8', fontSize: '8px' }}>◆◆</span>
          GITHUB: {stats.commits}
        </span>
        <span>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#00FFF7', fontSize: '8px' }}>▼▲</span>
          UP: {stats.uptime}
        </span>
        <span>|</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#8B5CF6', fontSize: '8px' }}>◈</span>
          {stats.location}
        </span>
        <span>|</span>
        <span style={{ color: '#FFC107' }}>
          {currentTime ? `${currentTime.toLocaleTimeString()}` : '10:18:00 AM'}
        </span>
      </div>
    </div>
  )
}

export default StatusWidget