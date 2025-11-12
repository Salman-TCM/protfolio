'use client'

import { useCallback, useRef } from 'react'

export interface AudioConfig {
  enabled: boolean
  volume: number
}

export const useAudio = (config: AudioConfig = { enabled: true, volume: 0.3 }) => {
  const audioContext = useRef<AudioContext | null>(null)

  const initAudioContext = useCallback(() => {
    if (!audioContext.current && typeof window !== 'undefined') {
      try {
        // @ts-ignore - AudioContext might not be available in older browsers
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch (error) {
        console.warn('Audio context not available:', error)
      }
    }
  }, [])

  const playBeep = useCallback((frequency: number = 800, duration: number = 100, type: OscillatorType = 'sine') => {
    if (!config.enabled) return

    initAudioContext()
    
    if (!audioContext.current) return

    try {
      const oscillator = audioContext.current.createOscillator()
      const gainNode = audioContext.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.current.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type
      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(config.volume, audioContext.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration / 1000)

      oscillator.start(audioContext.current.currentTime)
      oscillator.stop(audioContext.current.currentTime + duration / 1000)
    } catch (error) {
      console.warn('Failed to play sound:', error)
    }
  }, [config, initAudioContext])

  const playKeyPress = useCallback(() => {
    playBeep(400, 50, 'square')
  }, [playBeep])

  const playCommandExecute = useCallback(() => {
    // Two-tone beep for command execution
    playBeep(600, 100, 'sine')
    setTimeout(() => playBeep(800, 100, 'sine'), 100)
  }, [playBeep])

  const playError = useCallback(() => {
    // Error sound - lower pitch, longer duration
    playBeep(200, 300, 'sawtooth')
  }, [playBeep])

  const playSuccess = useCallback(() => {
    // Success sound - ascending tones
    playBeep(600, 100, 'sine')
    setTimeout(() => playBeep(800, 100, 'sine'), 100)
    setTimeout(() => playBeep(1000, 100, 'sine'), 200)
  }, [playBeep])

  const playStartup = useCallback(() => {
    // Startup sequence
    const notes = [
      { freq: 523, duration: 150 }, // C5
      { freq: 659, duration: 150 }, // E5
      { freq: 784, duration: 150 }, // G5
      { freq: 1047, duration: 300 } // C6
    ]

    notes.forEach((note, index) => {
      setTimeout(() => {
        playBeep(note.freq, note.duration, 'sine')
      }, index * 200)
    })
  }, [playBeep])

  return {
    playKeyPress,
    playCommandExecute,
    playError,
    playSuccess,
    playStartup,
    playBeep
  }
}