'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { portfolioData } from '@/lib/data'

const ContactSection = () => {
  const [terminalInput, setTerminalInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([
    '> System initialized...',
    '> Communication protocols active',
    '> Type "help" for available commands'
  ])
  const [isProcessing, setIsProcessing] = useState(false)

  const { socialLinks, personal } = portfolioData

  const processCommand = async (command: string) => {
    const cmd = command.toLowerCase().trim()
    setIsProcessing(true)
    
    // Add command to history
    setCommandHistory(prev => [...prev, `> ${command}`])
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let response = ''
    
    switch (cmd) {
      case 'help':
        response = `Available commands:
• help - Show this help message
• contact - Display contact information
• social - List social media links
• message [text] - Send a message
• status - Check system status
• clear - Clear terminal history
• whoami - Display user information`
        break
        
      case 'contact':
        response = `CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━
Name: ${personal.name}
Email: ${personal.email}
Location: ${personal.location}
Timezone: UTC+0 (Flexible)
Status: ${personal.status}
Response Time: < 24 hours
━━━━━━━━━━━━━━━━━━━━━`
        break
        
      case 'social':
        response = `SOCIAL NETWORKS:
━━━━━━━━━━━━━━━━━━━━━
${socialLinks.map(link => `${link.icon} ${link.name}: ${link.url}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━`
        break
        
      case 'status':
        response = `SYSTEM STATUS:
━━━━━━━━━━━━━━━━━━━━━
🟢 Online and responsive
🟢 Coffee levels: Optimal
🟢 Motivation: Maximum
🟢 Availability: Open to opportunities
🟢 Response rate: 99.9%
━━━━━━━━━━━━━━━━━━━━━`
        break
        
      case 'whoami':
        response = `USER PROFILE:
━━━━━━━━━━━━━━━━━━━━━
${personal.name.toLowerCase().replace(' ', '')}@developer:~$ whoami
${personal.title} & Automation Enthusiast
Specializes in: React, Node.js, Python, AI/ML
Passion: Building innovative digital experiences
Mission: Automate all the things!
Fun fact: Prefers tabs over spaces 😄
━━━━━━━━━━━━━━━━━━━━━`
        break
        
      case 'clear':
        setCommandHistory(['> Terminal cleared', '> Ready for new commands'])
        setIsProcessing(false)
        setTerminalInput('')
        return
        
      default:
        if (cmd.startsWith('message ')) {
          const message = command.substring(8).trim()
          if (message) {
            try {
              // Here you would typically send to your API
              response = `MESSAGE QUEUED:
━━━━━━━━━━━━━━━━━━━━━
From: Anonymous User
Message: "${message}"
Status: ✅ Delivered successfully
Response: Thank you for reaching out! I'll get back to you soon.
━━━━━━━━━━━━━━━━━━━━━`
            } catch (error) {
              response = '❌ Error: Failed to send message. Please try again.'
            }
          } else {
            response = '❌ Error: Message cannot be empty. Usage: message [your text]'
          }
        } else {
          response = `❌ Command not recognized: "${command}"
Type "help" for available commands.`
        }
    }
    
    setCommandHistory(prev => [...prev, response])
    setIsProcessing(false)
    setTerminalInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (terminalInput.trim() && !isProcessing) {
      processCommand(terminalInput)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-retro text-neon-cyan mb-4 neon-glow">
            CONTACT.SYS
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="terminal-window"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-mono text-neon-cyan">contact_terminal.exe</span>
              </div>
              <div className="text-xs font-mono text-neon-purple">
                {isProcessing ? 'PROCESSING...' : 'READY'}
              </div>
            </div>

            {/* Terminal Output */}
            <div className="h-96 overflow-y-auto mb-4 p-2 bg-black/30 rounded">
              <div className="font-mono text-sm space-y-2">
                {commandHistory.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={line.startsWith('>') ? 'text-neon-green' : 'text-neon-cyan whitespace-pre-line'}
                  >
                    {line}
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-neon-amber"
                  >
                    ⚡ Processing command...
                  </motion.div>
                )}
              </div>
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <span className="text-neon-green font-mono text-sm">user@contact:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-neon-cyan font-mono text-sm placeholder-neon-cyan/50"
                placeholder="Type a command..."
                disabled={isProcessing}
              />
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-5 bg-neon-cyan"
              ></motion.div>
            </form>

            {/* Quick Commands */}
            <div className="mt-4 pt-4 border-t border-neon-cyan/30">
              <div className="text-xs font-mono text-neon-purple mb-2">Quick commands:</div>
              <div className="flex flex-wrap gap-2">
                {['help', 'contact', 'status', 'social'].map((cmd) => (
                  <motion.button
                    key={cmd}
                    onClick={() => setTerminalInput(cmd)}
                    className="text-xs px-2 py-1 border border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-all rounded font-mono"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cmd}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Direct Contact */}
            <div className="terminal-window">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="text-sm font-mono text-neon-cyan">DIRECT_CONTACT.JSON</div>
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <motion.a
                  href={`mailto:${personal.email}`}
                  className="flex items-center space-x-3 p-3 border border-neon-cyan/30 rounded hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="text-neon-cyan group-hover:text-neon-magenta transition-colors">
                      EMAIL.SEND()
                    </div>
                    <div className="text-xs text-neon-cyan/70">{personal.email}</div>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-center space-x-3 p-3 border border-neon-green/30 rounded bg-neon-green/5"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl">⏰</span>
                  <div>
                    <div className="text-neon-green">RESPONSE_TIME</div>
                    <div className="text-xs text-neon-green/70">Usually within 24 hours</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3 p-3 border border-neon-purple/30 rounded bg-neon-purple/5"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl">🌍</span>
                  <div>
                    <div className="text-neon-purple">TIMEZONE</div>
                    <div className="text-xs text-neon-purple/70">UTC+0 (Flexible schedule)</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Networks */}
            <div className="terminal-window">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="text-sm font-mono text-neon-cyan">SOCIAL_NETWORKS.ARRAY</div>
                <div className="text-xs font-mono text-neon-purple/70">
                  {socialLinks.length} platforms
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-neon-cyan/30 rounded hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{link.icon}</span>
                      <div>
                        <div className="text-neon-cyan group-hover:text-neon-magenta transition-colors font-mono">
                          {link.name}
                        </div>
                        <div className="text-xs text-neon-cyan/50 font-mono">
                          {link.command}
                        </div>
                      </div>
                    </div>
                    <span className="text-neon-cyan group-hover:text-neon-magenta transition-colors">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="terminal-window"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="text-sm font-mono text-neon-cyan">STATUS.LOG</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-neon-green">ONLINE</span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neon-amber">AVAILABILITY:</span>
                  <span className="text-neon-green">OPEN TO OPPORTUNITIES</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neon-amber">CURRENT_MODE:</span>
                  <span className="text-neon-cyan">BUILDING & LEARNING</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neon-amber">COFFEE_LEVEL:</span>
                  <span className="text-neon-magenta">OPTIMAL ☕</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection