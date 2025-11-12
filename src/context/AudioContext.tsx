'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useAudio, AudioConfig } from '@/hooks/useAudio'

interface AudioContextType {
  audioConfig: AudioConfig
  setAudioConfig: (config: AudioConfig) => void
  toggleAudio: () => void
  playKeyPress: () => void
  playCommandExecute: () => void
  playError: () => void
  playSuccess: () => void
  playStartup: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudioContext = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [audioConfig, setAudioConfig] = useState<AudioConfig>({
    enabled: true,
    volume: 0.3
  })

  const audio = useAudio(audioConfig)

  const toggleAudio = () => {
    setAudioConfig(prev => ({ ...prev, enabled: !prev.enabled }))
  }

  const value: AudioContextType = {
    audioConfig,
    setAudioConfig,
    toggleAudio,
    playKeyPress: audio.playKeyPress,
    playCommandExecute: audio.playCommandExecute,
    playError: audio.playError,
    playSuccess: audio.playSuccess,
    playStartup: audio.playStartup
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}