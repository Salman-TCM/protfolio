'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm ARIA (Automated Retro Intelligence Assistant). I can help you learn more about Salman's work, skills, and projects. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isThinking) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Simulate typing effect
        setIsThinking(false)
        setIsTyping(true)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: data.timestamp
        }

        setMessages(prev => [...prev, assistantMessage])
        setIsTyping(false)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Chat error:', error)
      setIsThinking(false)
      setIsTyping(false)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm experiencing some technical difficulties. Please try again or use the contact form to reach Salman directly.",
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Chat cleared! I'm still here to help. What would you like to know about Salman's work?",
        timestamp: new Date().toISOString()
      }
    ])
  }

  const quickQuestions = [
    "Tell me about the skills",
    "What projects are featured?",
    "How can I contact Salman?",
    "What technologies are used here?"
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-retro-bg border-2 border-neon-magenta rounded-full flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-retro-bg transition-all duration-300 z-40 shadow-lg shadow-neon-magenta/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(255, 0, 200, 0.3)",
            "0 0 20px rgba(255, 0, 200, 0.5)",
            "0 0 10px rgba(255, 0, 200, 0.3)"
          ]
        }}
        transition={{
          boxShadow: { repeat: Infinity, duration: 2 }
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '✕' : '🤖'}
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] terminal-window z-30 flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    color: ['#00FFF7', '#FF00C8', '#00FFF7']
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-2xl"
                >
                  🤖
                </motion.div>
                <div>
                  <div className="text-sm font-mono text-neon-cyan">ARIA.EXE</div>
                  <div className="text-xs font-mono text-neon-purple/70">AI Assistant v2.0.1</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={clearChat}
                  className="text-xs px-2 py-1 border border-neon-amber/30 text-neon-amber bg-neon-amber/5 hover:bg-neon-amber/10 transition-all rounded font-mono"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  CLEAR
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-neon-magenta hover:text-red-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-0">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg font-mono text-sm ${
                      message.role === 'user'
                        ? 'bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan'
                        : 'bg-neon-magenta/10 border border-neon-magenta/30 text-neon-magenta'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-50 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-neon-purple/10 border border-neon-purple/30 text-neon-purple p-3 rounded-lg font-mono text-sm">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      🧠 Thinking...
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-neon-green/10 border border-neon-green/30 text-neon-green p-3 rounded-lg font-mono text-sm">
                    <motion.div className="flex space-x-1">
                      <span>ARIA is typing</span>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            delay: i * 0.2
                          }}
                        >
                          .
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="mb-3">
                <div className="text-xs font-mono text-neon-purple/70 mb-2">Quick questions:</div>
                <div className="grid grid-cols-2 gap-1">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInput(question)}
                      className="text-xs p-2 border border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-all rounded font-mono text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border border-neon-cyan/30 rounded px-3 py-2 text-sm font-mono text-neon-cyan placeholder-neon-cyan/50 focus:border-neon-cyan focus:outline-none"
                disabled={isThinking}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || isThinking}
                className="px-4 py-2 border border-neon-magenta text-neon-magenta bg-neon-magenta/5 hover:bg-neon-magenta hover:text-retro-bg transition-all rounded font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                whileTap={{ scale: input.trim() ? 0.95 : 1 }}
              >
                →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChatbot