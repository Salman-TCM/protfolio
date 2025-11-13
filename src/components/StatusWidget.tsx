'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const StatusWidget = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [stats, setStats] = useState({
    commits: 0,
    uptime: '3Y 241D',
    status: 'ONLINE',
    location: 'EARTH',
    loading: true
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
    // Fetch GitHub stats on mount and periodically
    const fetchGitHubStats = async () => {
      try {
        // Use our API route that can access private repos with authentication
        const response = await fetch('/api/github-stats')
        const data = await response.json()
        
        setStats(prev => ({
          ...prev,
          commits: data.totalCommits,
          uptime: data.uptime,
          loading: false
        }))
        
        // Store in localStorage for offline access
        if (!data.error) {
          localStorage.setItem('githubStats', JSON.stringify({
            commits: data.totalCommits,
            uptime: data.uptime,
            timestamp: Date.now()
          }))
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
        
        // Try to use cached values from localStorage
        const cached = localStorage.getItem('githubStats')
        if (cached) {
          const cachedData = JSON.parse(cached)
          setStats(prev => ({
            ...prev,
            commits: cachedData.commits,
            uptime: cachedData.uptime,
            loading: false
          }))
        } else {
          // Use fallback values if no cache
          setStats(prev => ({
            ...prev,
            commits: 149,
            loading: false
          }))
        }
      }
    }

    // Fetch immediately
    fetchGitHubStats()

    // Refresh every 5 minutes
    const statsTimer = setInterval(fetchGitHubStats, 300000)

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
          GITHUB: {stats.loading ? (
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ...
            </motion.span>
          ) : (
            <motion.span
              key={stats.commits}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {stats.commits}
            </motion.span>
          )}
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