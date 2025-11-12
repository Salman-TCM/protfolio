'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface TerminalCLIProps {
  onClose: () => void
  onNavigate: (section: string) => void
  onMatrixRain?: () => void
}

const TerminalCLI = ({ onClose, onNavigate, onMatrixRain }: TerminalCLIProps) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([
    '🚀 RETRO PORTFOLIO TERMINAL v2.0.1',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'Welcome to the interactive command interface!',
    'Type "help" for available commands.',
    ''
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => `AVAILABLE COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Navigation:
  home, hero     - Go to hero section
  about          - Go to about section  
  projects       - Go to projects section
  blog           - Go to blog section
  contact        - Go to contact section

System:
  clear          - Clear terminal
  help           - Show this help message
  whoami         - Display user info
  date           - Show current date/time
  status         - Show system status
  theme          - Toggle color theme
  exit, close    - Close terminal

Fun:
  matrix         - Enable matrix effect
  hack           - Initiate hacking sequence
  coffee         - Check coffee levels
  joke           - Random developer joke
  quote          - Random quote
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    home: {
      description: 'Navigate to home section',
      execute: () => {
        onNavigate('hero')
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
        return '🏠 Navigating to home section...'
      }
    },
    
    hero: {
      description: 'Navigate to hero section',
      execute: () => {
        onNavigate('hero')
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
        return '🚀 Navigating to hero section...'
      }
    },
    
    about: {
      description: 'Navigate to about section',
      execute: () => {
        onNavigate('about')
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        return '👨‍💻 Navigating to about section...'
      }
    },
    
    projects: {
      description: 'Navigate to projects section',
      execute: () => {
        onNavigate('projects')
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        return '💼 Navigating to projects section...'
      }
    },
    
    blog: {
      description: 'Navigate to blog section',
      execute: () => {
        onNavigate('blog')
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })
        return '📝 Navigating to blog section...'
      }
    },
    
    contact: {
      description: 'Navigate to contact section',
      execute: () => {
        onNavigate('contact')
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        return '📧 Navigating to contact section...'
      }
    },
    
    clear: {
      description: 'Clear terminal history',
      execute: () => {
        setHistory(['Terminal cleared.', ''])
        return null
      }
    },
    
    whoami: {
      description: 'Display user information',
      execute: () => `USER PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Salman Hossain
Role: Full-Stack Developer
Specialization: React, Node.js, Python, AI/ML
Location: Digital Realm
Status: Always Learning
Favorite Editor: VS Code
Tabs vs Spaces: Spaces (obviously)
Coffee Consumption: Dangerous levels ☕
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    date: {
      description: 'Show current date and time',
      execute: () => `📅 ${new Date().toLocaleString()}`
    },
    
    status: {
      description: 'Show system status',
      execute: () => `SYSTEM STATUS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 Portfolio: Online
🟢 API: Responsive  
🟢 Database: Connected
🟢 Coffee Machine: Operational
🟢 Motivation: Maximum
🟢 Debug Mode: Always On
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    theme: {
      description: 'Toggle color theme',
      execute: () => {
        // This could toggle themes in a real implementation
        return '🎨 Color theme toggled! (Feature coming soon...)'
      }
    },
    
    matrix: {
      description: 'Enable matrix effect',
      execute: () => {
        const chars = '01'.split('')
        let result = ''
        for (let i = 0; i < 10; i++) {
          let line = ''
          for (let j = 0; j < 50; j++) {
            line += chars[Math.floor(Math.random() * chars.length)]
          }
          result += line + '\n'
        }
        return `🔴 MATRIX MODE ACTIVATED:\n${result}Wake up, Neo... 🕶️`
      }
    },
    
    hack: {
      description: 'Initiate hacking sequence',
      execute: () => {
        if (onMatrixRain) {
          onMatrixRain()
          return `🔴 INITIATING MATRIX HACK SEQUENCE...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Entering the Matrix... 🕶️
Wake up, Neo...`
        }
        return `🔴 INITIATING HACK SEQUENCE...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[█████████████████████████] 100%
Accessing mainframe...        ✅
Bypassing security...         ✅
Downloading files...          ✅
Covering tracks...            ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 HACK COMPLETE! You now have admin access to... my portfolio! 
(This is just for fun, no real hacking here 😄)`
      }
    },
    
    coffee: {
      description: 'Check coffee levels',
      execute: () => `☕ COFFEE STATUS REPORT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Level: ████████░░ 80%
Quality: Premium Arabica
Temperature: Perfect
Cups Today: 7
Warning: Approaching dangerous levels!
Recommendation: Continue consumption 😄
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    },
    
    joke: {
      description: 'Get a random developer joke',
      execute: () => {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
          "Why don't programmers like nature? It has too many bugs! 🌿",
          "What's a programmer's favorite hangout place? The Foo Bar! 🍻",
          "Why did the programmer quit his job? He didn't get arrays! 📊",
          "What do you call a programmer from Finland? Nerdic! 🇫🇮",
          "Why do Java developers wear glasses? Because they can't C#! 👓"
        ]
        return `😄 ${jokes[Math.floor(Math.random() * jokes.length)]}`
      }
    },
    
    quote: {
      description: 'Get a random inspirational quote',
      execute: () => {
        const quotes = [
          '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
          '"The best error message is the one that never shows up." - Thomas Fuchs',
          '"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
          '"Talk is cheap. Show me the code." - Linus Torvalds',
          '"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie'
        ]
        return `💭 ${quotes[Math.floor(Math.random() * quotes.length)]}`
      }
    },
    
    exit: {
      description: 'Close terminal',
      execute: () => {
        onClose()
        return 'Goodbye! 👋'
      }
    },
    
    close: {
      description: 'Close terminal',
      execute: () => {
        onClose()
        return 'Terminal closed. 👋'
      }
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    const fullCommand = `user@portfolio:~$ ${cmd}`
    
    if (command === '') {
      setHistory(prev => [...prev, fullCommand, ''])
      return
    }

    setHistory(prev => [...prev, fullCommand])
    
    if (commands[command as keyof typeof commands]) {
      const result = commands[command as keyof typeof commands].execute()
      if (result) {
        setHistory(prev => [...prev, result, ''])
      }
    } else {
      setHistory(prev => [
        ...prev,
        `❌ Command not found: "${command}"`,
        'Type "help" for available commands.',
        ''
      ])
    }
    
    setCommandHistory(prev => [cmd, ...prev.slice(0, 49)]) // Keep last 50 commands
    setHistoryIndex(-1)
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
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matchingCommands = Object.keys(commands).filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      )
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      } else if (matchingCommands.length > 1) {
        setHistory(prev => [
          ...prev,
          `user@portfolio:~$ ${input}`,
          `Possible completions: ${matchingCommands.join(', ')}`,
          ''
        ])
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 z-50 flex items-center justify-center"
    >
      <div className="terminal-window w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-mono text-neon-cyan">retro_terminal.exe</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-neon-purple">Press Ctrl+` to toggle</span>
            <motion.button
              onClick={onClose}
              className="text-neon-magenta hover:text-red-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Terminal Output */}
        <div 
          ref={historyRef}
          className="flex-1 overflow-y-auto mb-4 p-3 bg-black/30 rounded font-mono text-sm leading-relaxed"
        >
          {history.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className={
                line.startsWith('user@portfolio:~$') 
                  ? 'text-neon-green' 
                  : line.startsWith('❌') 
                    ? 'text-red-400'
                    : line.startsWith('🟢') || line.startsWith('✅')
                      ? 'text-neon-green'
                      : line.startsWith('🔴')
                        ? 'text-neon-magenta'
                        : 'text-neon-cyan'
              }
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
        </div>

        {/* Terminal Input */}
        <div className="flex items-center space-x-2 p-3 border-t border-neon-cyan/30 bg-black/30 rounded">
          <span className="text-neon-green font-mono text-sm whitespace-nowrap">
            user@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-neon-cyan font-mono text-sm placeholder-neon-cyan/50"
            placeholder="Type a command..."
            spellCheck={false}
          />
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-5 bg-neon-cyan"
          ></motion.div>
        </div>

        {/* Command Suggestions */}
        <div className="mt-2 text-xs font-mono text-neon-cyan/50">
          💡 Try: <span className="text-neon-cyan">help</span>, <span className="text-neon-cyan">about</span>, <span className="text-neon-cyan">projects</span>, <span className="text-neon-cyan">matrix</span>, <span className="text-neon-cyan">joke</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TerminalCLI