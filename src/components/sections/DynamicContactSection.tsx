'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ContactMethod {
  type: string
  label: string
  value: string
  icon: string
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
}

interface ContactConfig {
  description: string
  methods: ContactMethod[]
  form: {
    enabled: boolean
    fields: FormField[]
  }
}

interface DynamicContactSectionProps {
  config: ContactConfig
}

const DynamicContactSection = ({ config }: DynamicContactSectionProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({})
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧'
      case 'telegram':
        return '💬'
      case 'github':
        return '🐙'
      case 'linkedin':
        return '💼'
      default:
        return '📞'
    }
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-retro text-neon-cyan mb-6 neon-glow">
            CONTACT.INTERFACE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-8"></div>
          <p className="text-xl text-neon-cyan/80 font-mono">
            {config.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-retro text-neon-magenta mb-6">
              CONNECTION_METHODS:
            </h3>

            <div className="terminal-window">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-mono text-neon-cyan">contact_info.exe</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {config.methods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4 p-4 border border-neon-cyan/20 rounded bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-colors cursor-pointer group"
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-mono text-neon-amber">{method.label}:</div>
                      <div className="text-neon-cyan group-hover:text-neon-magenta transition-colors">
                        {method.value}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity">
                      CLICK_TO_CONNECT
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="terminal-window"
            >
              <div className="p-4">
                <h4 className="text-lg font-retro text-neon-purple mb-4">QUICK_ACTIONS:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 text-xs font-mono text-center border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 rounded transition-colors"
                  >
                    SCHEDULE_CALL
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 text-xs font-mono text-center border border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10 rounded transition-colors"
                  >
                    DOWNLOAD_CV
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          {config.form.enabled && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-retro text-neon-magenta mb-6">
                MESSAGE_TERMINAL:
              </h3>

              <div className="terminal-window">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-mono text-neon-cyan">send_message.exe</span>
                  </div>
                  <span className={`text-xs font-mono ${
                    submitStatus === 'success' ? 'text-neon-green' :
                    submitStatus === 'error' ? 'text-red-400' :
                    'text-neon-purple'
                  }`}>
                    {submitStatus === 'success' ? 'MESSAGE_SENT' :
                     submitStatus === 'error' ? 'ERROR_OCCURRED' :
                     'READY'}
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {config.form.fields.map((field, index) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-xs font-mono text-neon-amber">
                        {field.label.toUpperCase()}:
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          rows={4}
                          className="w-full px-3 py-2 bg-black/30 border border-neon-cyan/30 rounded text-neon-cyan font-mono text-sm placeholder-neon-cyan/50 focus:border-neon-cyan focus:outline-none"
                          placeholder={`Enter your ${field.label.toLowerCase()}...`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full px-3 py-2 bg-black/30 border border-neon-cyan/30 rounded text-neon-cyan font-mono text-sm placeholder-neon-cyan/50 focus:border-neon-cyan focus:outline-none"
                          placeholder={`Enter your ${field.label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full py-3 px-6 font-mono text-sm border-2 rounded transition-colors ${
                      isSubmitting
                        ? 'border-neon-amber/50 text-neon-amber/50 cursor-not-allowed'
                        : 'border-neon-green text-neon-green hover:bg-neon-green/10'
                    }`}
                  >
                    {isSubmitting ? 'TRANSMITTING...' : 'SEND_MESSAGE.EXE'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="terminal-window max-w-2xl mx-auto">
            <div className="p-6">
              <h3 className="text-xl font-retro text-neon-purple mb-4">
                CONNECTION_STATUS:
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">●</span>
                  <span className="text-neon-cyan">EMAIL_SERVER: ONLINE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">●</span>
                  <span className="text-neon-cyan">RESPONSE_TIME: &lt; 24H</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">●</span>
                  <span className="text-neon-cyan">AVAILABILITY: HIGH</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">●</span>
                  <span className="text-neon-cyan">COFFEE_LEVEL: OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DynamicContactSection