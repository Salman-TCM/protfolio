'use client'

import { motion } from 'framer-motion'

interface AboutConfig {
  description: string
  details: Array<{
    label: string
    value: string
  }>
  timeline: Array<{
    year: string
    title: string
    company: string
    description: string
  }>
}

interface DynamicAboutSectionProps {
  config: AboutConfig
}

const DynamicAboutSection = ({ config }: DynamicAboutSectionProps) => {
  return (
    <section id="about" className="min-h-screen py-20 px-4">
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
            ABOUT_ME.EXE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-8"></div>
          <p className="text-xl text-neon-cyan/80 font-mono max-w-3xl mx-auto">
            {config.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-retro text-neon-magenta mb-6">
              SYSTEM_INFO:
            </h3>
            
            <div className="terminal-window">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-mono text-neon-cyan">about.exe</span>
                </div>
              </div>

              {/* System Info */}
              <div className="space-y-4 font-mono text-sm">
                {config.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4 p-3 border border-neon-cyan/20 rounded bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-colors"
                  >
                    <span className="text-neon-amber min-w-[120px]">{detail.label}:</span>
                    <span className="text-neon-cyan">{detail.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Extra Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 border border-neon-purple/30 rounded bg-neon-purple/5"
            >
              <h4 className="text-lg font-retro text-neon-purple mb-4">SPECIAL_ABILITIES:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">✓</span>
                  <span className="text-neon-cyan">Problem Solver</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">✓</span>
                  <span className="text-neon-cyan">Fast Learner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">✓</span>
                  <span className="text-neon-cyan">Team Player</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">✓</span>
                  <span className="text-neon-cyan">Coffee Powered</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-retro text-neon-magenta mb-6">
              TIMELINE_LOG:
            </h3>

            <div className="space-y-6">
              {config.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="relative border-l-2 border-neon-cyan/30 pl-8 pb-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-neon-cyan rounded-full shadow-lg shadow-neon-cyan/50"></div>
                  
                  <div className="terminal-window">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-retro text-neon-amber">{item.year}</span>
                        <span className="text-xs font-mono text-neon-purple px-2 py-1 border border-neon-purple/30 rounded">
                          {item.company}
                        </span>
                      </div>
                      <h4 className="text-lg font-retro text-neon-cyan mb-2">{item.title}</h4>
                      <p className="text-sm text-neon-cyan/70 font-mono">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DynamicAboutSection