'use client'

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site-config'
import { useAudio } from '@/hooks/useAudio'

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
  timestamp?: string
}

interface InteractiveTerminalProps {
  onNavigate: (section: string) => void
}

const InteractiveTerminal = forwardRef<any, InteractiveTerminalProps>(({ onNavigate }, ref) => {
  const [audioConfig, setAudioConfig] = useState({ enabled: true, volume: 0.3 })
  const { playKeyPress, playCommandExecute, playError, playSuccess, playStartup } = useAudio(audioConfig)
  
  const toggleAudio = () => {
    setAudioConfig(prev => ({ ...prev, enabled: !prev.enabled }))
  }
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentMode, setCurrentMode] = useState<'terminal' | 'ai'>('terminal')
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Initialize terminal with concise boot sequence
  useEffect(() => {
    const bootSequence = [
      { content: '┌─────── PORTFOLIO OS v2.0.1 ───────┐', delay: 0 },
      { content: '│ Loading profile: SALMAN HOSSAIN   │', delay: 500 },
      { content: '│ Connection: Earth.Planet ✓        │', delay: 1000 },
      { content: '│ GitHub API authenticated ✓        │', delay: 1500 },
      { content: '└───────────────────────────────────┘', delay: 2000 },
      { content: '', delay: 2500 },
      { content: '🚀 Welcome! Type "help" for commands.', delay: 3000 },
      { content: '', delay: 3500 },
      { content: '⚡ Ready for input...', delay: 4000 }
    ]

    // Play startup sound
    setTimeout(() => playStartup(), 500)

    bootSequence.forEach((line) => {
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', content: line.content }])
      }, line.delay)
    })
  }, [])

  const commands = {
    help: () => {
      // Check if we're on mobile (approximate, since we can't check screen size in server render)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      
      if (isMobile) {
        return [
          '┌─ AVAILABLE COMMANDS ─┐',
          '',
          '📊 INFO: about | whoami | skills',
          '💼 WORK: projects | blog | services', 
          '📞 CONTACT: contact | social',
          '🤖 AI: ai',
          '⚙️ SYS: clear | sound | ls | date',
          '',
          'TIP: Use floating menu button →'
        ];
      }
      
      return [
        '╔══════════════════════════════════════════════════════╗',
        '║                 AVAILABLE COMMANDS                   ║',
        '╚══════════════════════════════════════════════════════╝',
        '',
        '📊 INFORMATION COMMANDS:',
        '  about        : View bio and experience',
        '  whoami       : Display user information', 
        '  skills       : Show tech stack with progress bars',
        '  status       : Show real-time system status',
        '',
        '💼 PROJECT COMMANDS:',
        '  projects     : View featured projects',
        '  blog         : Show recent articles',
        '  services     : Available services',
        '',
        '📞 COMMUNICATION:',
        '  contact      : Get contact information',
        '  social       : Show social media links',
        '',
        '🤖 AI ASSISTANT:',
        '  ai           : Chat with AIVA retro assistant',
        '  ai help      : AI assistant commands',
        '',
        '⚙️ SYSTEM COMMANDS:',
        '  clear        : Clear terminal screen',
        '  theme        : Toggle theme mode',
        '  sound        : Toggle sound effects',
        '  ls           : List available sections',
        '  pwd          : Print working directory',
        '  date         : Show current date and time',
        '  uptime       : Show system uptime',
        '',
        '💡 TIP: Use Tab for autocomplete, ↑↓ for command history'
      ];
    },

    whoami: () => [
      `→ ${siteConfig.personal.name}`,
      `→ ${siteConfig.personal.title}`,
      `→ ${siteConfig.personal.subtitle}`
    ],

    status: () => [
      `→ Status: ${siteConfig.contact.availability}`,
      '→ System: Online',
      '→ Uptime: 14:32',
      '→ Memory: 4.2GB/16GB',
      '→ CPU: 12%'
    ],

    about: () => [
      siteConfig.about.bio,
      '',
      'Highlights:',
      ...siteConfig.about.highlights.map(h => `  ${h}`)
    ],

    skills: () => [
      'Technical Skills:',
      ...siteConfig.skills.technical.map(skill => 
        `  ${skill.name.padEnd(15)} ${skill.level}% [${'█'.repeat(Math.floor(skill.level/10))}${' '.repeat(10-Math.floor(skill.level/10))}]`
      )
    ],

    projects: () => [
      'Portfolio Projects:',
      '',
      ...siteConfig.projects.map((project, i) => [
        `${i + 1}. ${project.title}`,
        `   ${project.description}`,
        `   Technologies: ${project.technologies.slice(0, 3).join(', ')}`,
        `   ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}`,
        `   ${project.liveUrl ? `Live: ${project.liveUrl}` : ''}`,
        ''
      ]).flat()
    ],

    blog: () => [
      'Recent Articles:',
      '',
      ...siteConfig.blog.map((post, i) => [
        `${i + 1}. ${post.title}`,
        `   ${post.excerpt}`,
        `   Published: ${post.date} • ${post.readTime}`,
        `   Tags: ${post.tags.join(', ')}`,
        ''
      ]).flat()
    ],

    services: () => [
      'Available Services:',
      '',
      ...siteConfig.services.map((service, i) => [
        `${i + 1}. ${service.title} ${service.icon}`,
        `   ${service.description}`,
        `   Features: ${service.features.join(', ')}`,
        ''
      ]).flat()
    ],

    contact: () => [
      'Contact Information:',
      `  Email: ${siteConfig.personal.email}`,
      `  Location: ${siteConfig.personal.location}`,
      '',
      'Social Links:',
      ...Object.entries(siteConfig.social)
        .filter(([_, url]) => url)
        .map(([platform, url]) => `  ${platform}: ${url}`)
    ],

    social: () => [
      'Social Media Links:',
      ...Object.entries(siteConfig.social)
        .filter(([_, url]) => url)
        .map(([platform, url]) => `  ${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`)
    ],

    experience: () => [
      'Work Experience:',
      '',
      ...siteConfig.experience.map((exp, i) => [
        `${i + 1}. ${exp.title} at ${exp.company}`,
        `   Period: ${exp.period}`,
        `   Location: ${exp.location}`,
        `   ${exp.description}`,
        ''
      ]).flat()
    ],

    ls: () => [
      'Available sections:',
      '  about      skills     projects   blog',
      '  services   contact    experience'
    ],

    pwd: () => ['/home/user/portfolio'],

    date: () => ['Tue Nov 12 2025 10:18:00 GMT-0500 (EST)'],

    uptime: () => [
      'System uptime: 241 days, 14 hours',
      'Portfolio version: v2.0.1',
      'Last update: Tue Nov 12 2025'
    ],

    theme: () => [
      '🎨 Theme toggle feature coming soon!',
      'Available themes: retro-green, cyberpunk-blue, matrix-red'
    ],

    sound: () => [
      `🔊 Sound effects: ${audioConfig.enabled ? 'ON' : 'OFF'}`,
      `Volume: ${Math.round(audioConfig.volume * 100)}%`,
      'Audio includes: key presses, commands, success/error tones'
    ],

    ai: () => [
      '🤖 AIVA.EXE v1.0 loading...',
      '',
      '████████╗ ██╗ ██╗   ██╗ █████╗ ',
      '██╔══██║ ██║ ██║   ██║██╔══██╗',
      '███████║ ██║ ██║   ██║███████║',
      '██╔══██║ ██║ ╚██╗ ██╔╝██╔══██║',
      '██║  ██║ ██║  ╚████╔╝ ██║  ██║',
      '╚═╝  ╚═╝ ╚═╝   ╚═══╝  ╚═╝  ╚═╝',
      '',
      'AIVA (Artificial Intelligence Virtual Assistant) initialized.',
      'How can I assist you, Commander?',
      '',
      'Try asking:',
      '• "What technologies do you use?"',
      '• "Show me recent projects"',
      '• "What is your experience?"',
      '• Type "ai help" for more commands'
    ],

    clear: () => 'CLEAR'
  }

  // Auto-suggestion logic
  useEffect(() => {
    if (input.length > 0) {
      const availableCommands = Object.keys(commands)
      const matches = availableCommands.filter(cmd => 
        cmd.toLowerCase().startsWith(input.toLowerCase())
      )
      setSuggestions(matches)
      setShowSuggestions(matches.length > 0 && input !== matches[0])
    } else {
      setShowSuggestions(false)
    }
  }, [input])

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    if (trimmedCmd === '') return

    // Hide suggestions
    setShowSuggestions(false)

    // Add input to history
    setHistory(prev => [...prev, { type: 'input', content: `user@portfolio:~$ ${cmd}` }])
    
    // Add to command history
    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    // Show loading for certain commands
    const loadingCommands = ['projects', 'skills', 'about', 'ai', 'blog']
    if (loadingCommands.includes(trimmedCmd)) {
      setIsLoading(true)
      setHistory(prev => [...prev, { type: 'output', content: 'Loading...' }])
      await new Promise(resolve => setTimeout(resolve, 800))
      setIsLoading(false)
      // Remove loading message
      setHistory(prev => prev.slice(0, -1))
    }

    // Execute command
    if (trimmedCmd in commands) {
      const result = commands[trimmedCmd as keyof typeof commands]()
      
      if (result === 'CLEAR') {
        setHistory([])
        setInput('')
        playSuccess()
        return
      }

      // Handle special commands
      if (trimmedCmd === 'sound') {
        toggleAudio()
        playCommandExecute()
      } else {
        // Play command execution sound
        playCommandExecute()
      }

      // Navigate to section if it's a navigation command
      if (['about', 'skills', 'projects', 'blog', 'services', 'contact'].includes(trimmedCmd)) {
        onNavigate(trimmedCmd)
        playSuccess()
      }

      // Add output to terminal with animation
      if (Array.isArray(result)) {
        result.forEach((line, index) => {
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'output', content: line }])
          }, index * 50)
        })
      }
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `❌ Command not found: ${trimmedCmd}. Type 'help' for available commands.` 
      }])
      playError()
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setInput(suggestions[0])
        setShowSuggestions(false)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setInput('')
    }
  }

  // Expose executeCommand to parent component
  useImperativeHandle(ref, () => ({
    executeCommand
  }))

  // Auto-focus and controlled scroll
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      // Always scroll to top when new command is executed (when history changes significantly)
      if (history.length > 0) {
        const lastEntry = history[history.length - 1];
        // Reset to top when a new command is run (input type indicates new command)
        if (lastEntry.type === 'input') {
          terminalRef.current.scrollTop = 0;
        }
      }
      
      // Update scroll button visibility
      const { scrollTop } = terminalRef.current;
      setShowScrollTop(scrollTop > 50);
    }
  }, [history])

  // Handle scroll events
  const handleScroll = () => {
    if (terminalRef.current) {
      const { scrollTop } = terminalRef.current
      setShowScrollTop(scrollTop > 50)
    }
  }

  const scrollToTop = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <div className="font-mono text-xs sm:text-sm leading-relaxed h-full flex flex-col bg-black/20 rounded-lg border border-neon-cyan/20 p-2 sm:p-3 overflow-hidden">
      {/* Terminal Header - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs mb-2 text-gray-400 border-b border-neon-cyan/30 pb-1 space-y-1 sm:space-y-0 flex-shrink-0">
        <span className="font-bold text-neon-cyan">TERMINAL.EXE v2.0.1</span>
        <span className="hidden md:block">CPU: 12% | RAM: 4.2GB | NET: ↑↓</span>
        <span className="text-xs text-neon-amber">11/12/2025, 10:18:00 AM</span>
      </div>

      {/* Terminal Content - Responsive with fixed height and visible scrollbar */}
      <div 
        ref={terminalRef}
        onScroll={handleScroll}
        className="terminal-content flex-1 overflow-y-scroll space-y-1 mb-2 bg-black/10 rounded p-2 min-h-0 relative border border-neon-cyan/10"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 255, 247, 0.6) rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Scroll Controls */}
        {showScrollTop && (
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
            <button
              onClick={scrollToTop}
              className="w-6 h-6 bg-neon-cyan/20 border border-neon-cyan/50 rounded text-neon-cyan hover:bg-neon-cyan/30 transition-colors flex items-center justify-center text-xs"
              title="Scroll to top"
            >
              ↑
            </button>
            <button
              onClick={scrollToBottom}
              className="w-6 h-6 bg-neon-cyan/20 border border-neon-cyan/50 rounded text-neon-cyan hover:bg-neon-cyan/30 transition-colors flex items-center justify-center text-xs"
              title="Scroll to bottom"
            >
              ↓
            </button>
          </div>
        )}
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${
              line.type === 'input' 
                ? 'text-neon-green' 
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-neon-cyan'
            }`}
          >
            {line.content}
          </motion.div>
        ))}
      </div>

      {/* Suggestions - Responsive */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="mb-2 p-2 border border-neon-cyan/30 rounded bg-black/50">
          <div className="text-xs text-neon-amber mb-1">Suggestions:</div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(suggestion)
                  setShowSuggestions(false)
                  if (inputRef.current) inputRef.current.focus()
                }}
                className="px-1 sm:px-2 py-1 text-xs border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 rounded transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Commands - Responsive */}
      <div className="mb-2 p-2 border border-neon-cyan/30 rounded bg-black/20 backdrop-blur-sm flex-shrink-0">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs text-neon-amber font-bold">⚡ Commands:</div>
          <button
            onClick={() => executeCommand('clear')}
            className="px-2 py-1 text-xs border border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 rounded transition-all duration-200"
            title="Clear terminal"
          >
            CLEAR
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1">
          {['help', 'about', 'projects', 'skills', 'contact', 'ai'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-1 py-1 text-xs border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-lg rounded transition-all duration-200 font-medium uppercase tracking-wide"
              style={{ textShadow: '0 0 5px currentColor' }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Input Line - Responsive */}
      <div className="flex items-center space-x-2 bg-black/30 border border-neon-cyan/40 rounded px-3 py-2 backdrop-blur-sm">
        <span className="text-neon-amber font-bold text-sm flex-shrink-0 neon-glow">user@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            // Play key press sound for typing
            if (audioConfig.enabled && e.target.value.length > input.length) {
              playKeyPress()
            }
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-neon-cyan caret-neon-cyan text-sm min-w-0 placeholder-gray-500"
          placeholder="Type a command..."
          autoComplete="off"
          spellCheck="false"
          disabled={isLoading}
          style={{ textShadow: '0 0 5px currentColor' }}
        />
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full flex-shrink-0"
          />
        ) : (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-4 bg-neon-cyan flex-shrink-0 neon-glow"
          />
        )}
      </div>

      {/* Status Bar - Responsive */}
      <div className="flex justify-between items-center text-xs text-gray-400 mt-1 pt-1 border-t border-neon-cyan/20 flex-shrink-0">
        <div className="hidden md:block text-neon-cyan/70 text-xs">
          Tab: autocomplete | ↑↓: history
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center space-x-1">
            <span className="text-neon-green">●</span>
            <span className="text-neon-cyan">ONLINE</span>
          </span>
          <span className="text-neon-magenta">CMDS: {commandHistory.length}</span>
        </div>
      </div>
    </div>
  )
})

InteractiveTerminal.displayName = 'InteractiveTerminal'

export default InteractiveTerminal