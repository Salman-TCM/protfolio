'use client'

import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { motion } from 'framer-motion'

interface AudioContextType {
  playSound: (soundType: SoundType) => void
  playMusic: (track: MusicTrack) => void
  stopMusic: () => void
  isMuted: boolean
  toggleMute: () => void
  volume: number
  setVolume: (volume: number) => void
}

type SoundType = 'click' | 'hover' | 'type' | 'success' | 'error' | 'notification' | 'boot'
type MusicTrack = 'ambient' | 'synthwave' | 'cyberpunk'

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

// Web Audio API sound generation functions
const createOscillator = (frequency: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = type
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

const playRetroSound = (soundType: SoundType) => {
  if (typeof window === 'undefined') return
  
  try {
    switch (soundType) {
      case 'click':
        createOscillator(800, 'square', 0.1)
        break
      case 'hover':
        createOscillator(1200, 'sine', 0.05)
        break
      case 'type':
        createOscillator(400 + Math.random() * 200, 'square', 0.03)
        break
      case 'success':
        createOscillator(523, 'sine', 0.1)
        setTimeout(() => createOscillator(659, 'sine', 0.1), 100)
        setTimeout(() => createOscillator(783, 'sine', 0.2), 200)
        break
      case 'error':
        createOscillator(200, 'sawtooth', 0.3)
        break
      case 'notification':
        createOscillator(880, 'triangle', 0.1)
        setTimeout(() => createOscillator(1108, 'triangle', 0.1), 150)
        break
      case 'boot':
        createOscillator(220, 'sine', 0.2)
        setTimeout(() => createOscillator(440, 'sine', 0.2), 250)
        setTimeout(() => createOscillator(880, 'sine', 0.3), 500)
        break
    }
  } catch (error) {
    console.log('Audio not available:', error)
  }
}

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        if (audioContext.state === 'suspended') {
          audioContext.resume()
        }
      }
    }
    
    document.addEventListener('click', initAudio, { once: true })
    document.addEventListener('keydown', initAudio, { once: true })
    
    return () => {
      document.removeEventListener('click', initAudio)
      document.removeEventListener('keydown', initAudio)
    }
  }, [])

  const playSound = (soundType: SoundType) => {
    if (isMuted) return
    playRetroSound(soundType)
  }

  const playMusic = (track: MusicTrack) => {
    // In a real implementation, you would load actual audio files
    setCurrentTrack(track)
    console.log(`Playing ${track} music`)
  }

  const stopMusic = () => {
    setCurrentTrack(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const value = {
    playSound,
    playMusic,
    stopMusic,
    isMuted,
    toggleMute,
    volume,
    setVolume
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio ref={audioRef} loop />
    </AudioContext.Provider>
  )
}

const AudioControls = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const { isMuted, toggleMute, volume, setVolume, playSound, playMusic, stopMusic } = useAudio()

  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiCode, e.code].slice(-10)
      setKonamiCode(newSequence)
      
      if (newSequence.join(',') === konamiSequence.join(',')) {
        setShowEasterEgg(true)
        playSound('success')
        playMusic('cyberpunk')
        setTimeout(() => setShowEasterEgg(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiCode, playSound, playMusic])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen)
            playSound('click')
          }}
          onHoverStart={() => playSound('hover')}
          className="w-12 h-12 bg-retro-bg border-2 border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-retro-bg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? '🔇' : '🔊'}
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-16 right-0 w-64 terminal-window"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
              <div className="text-sm font-mono text-neon-cyan">AUDIO.SYS</div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-neon-magenta hover:text-red-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-4">
              {/* Volume Control */}
              <div>
                <div className="text-xs font-mono text-neon-amber mb-2">VOLUME: {Math.round(volume * 100)}%</div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-neon-cyan/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Mute Toggle */}
              <motion.button
                onClick={() => {
                  toggleMute()
                  playSound('click')
                }}
                className={`w-full retro-button text-xs ${isMuted ? 'border-red-500 text-red-500' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isMuted ? 'UNMUTE' : 'MUTE'}
              </motion.button>

              {/* Sound Test */}
              <div>
                <div className="text-xs font-mono text-neon-amber mb-2">SOUND_TEST:</div>
                <div className="grid grid-cols-2 gap-2">
                  {(['click', 'hover', 'type', 'success'] as const).map((soundType) => (
                    <motion.button
                      key={soundType}
                      onClick={() => playSound(soundType)}
                      className="text-xs px-2 py-1 border border-neon-purple/30 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple/10 transition-all rounded font-mono uppercase"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {soundType}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Music Controls */}
              <div>
                <div className="text-xs font-mono text-neon-amber mb-2">BACKGROUND_MUSIC:</div>
                <div className="space-y-2">
                  <motion.button
                    onClick={() => playMusic('ambient')}
                    className="w-full text-xs px-3 py-1 border border-neon-green/30 text-neon-green bg-neon-green/5 hover:bg-neon-green/10 transition-all rounded font-mono"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    AMBIENT
                  </motion.button>
                  <motion.button
                    onClick={() => stopMusic()}
                    className="w-full text-xs px-3 py-1 border border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-all rounded font-mono"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    STOP
                  </motion.button>
                </div>
              </div>

              {/* Easter Egg Hint */}
              <div className="pt-2 border-t border-neon-cyan/30">
                <div className="text-xs font-mono text-neon-purple/50 text-center">
                  Try the Konami code... ↑↑↓↓←→←→BA
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 
            }}
            className="terminal-window max-w-md text-center"
          >
            <div className="text-6xl mb-4">🚀</div>
            <div className="text-2xl font-retro text-neon-magenta mb-4 neon-glow">
              EASTER EGG ACTIVATED!
            </div>
            <div className="font-mono text-neon-cyan mb-4">
              You found the secret! Cyberpunk mode enabled.
            </div>
            <div className="text-xs font-mono text-neon-purple/70">
              This message will self-destruct in 5 seconds...
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default AudioControls