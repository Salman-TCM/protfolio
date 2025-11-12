'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { portfolioData } from '@/lib/data'

const AboutSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const { personal, skills, quickFacts } = portfolioData

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-retro text-neon-cyan mb-4 neon-glow">
            ABOUT.EXE
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="terminal-window"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neon-cyan/30">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-mono text-neon-cyan">user@salman:~$</div>
                <div className="animate-blink text-neon-cyan">|</div>
              </div>
              <div className="text-xs font-mono text-neon-purple/70">
                cat profile.txt
              </div>
            </div>

            {/* ASCII Art Portrait */}
            <div className="mb-6 font-mono text-xs text-neon-green leading-tight">
              <pre className="text-center">
{`    ██████╗ ███████╗██╗   ██╗
    ██╔══██╗██╔════╝██║   ██║
    ██║  ██║█████╗  ██║   ██║
    ██║  ██║██╔══╝  ╚██╗ ██╔╝
    ██████╔╝███████╗ ╚████╔╝ 
    ╚═════╝ ╚══════╝  ╚═══╝  `}
              </pre>
            </div>

            {/* Profile Info */}
            <div className="space-y-4 font-mono text-sm">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="p-3 border border-neon-cyan/30 rounded bg-neon-cyan/5">
                  <div className="text-lg font-retro text-neon-cyan">AGE</div>
                  <div className="text-xs text-neon-cyan/70">{personal.age}</div>
                </div>
                <div className="p-3 border border-neon-magenta/30 rounded bg-neon-magenta/5">
                  <div className="text-lg font-retro text-neon-magenta">EXP</div>
                  <div className="text-xs text-neon-magenta/70">{personal.experience}</div>
                </div>
                <div className="p-3 border border-neon-purple/30 rounded bg-neon-purple/5">
                  <div className="text-lg font-retro text-neon-purple">MODE</div>
                  <div className="text-xs text-neon-purple/70">CODING</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex">
                  <span className="text-neon-amber w-20">NAME:</span>
                  <span className="text-neon-cyan">{personal.name}</span>
                </div>
                <div className="flex">
                  <span className="text-neon-amber w-20">ROLE:</span>
                  <span className="text-neon-cyan">{personal.title}</span>
                </div>
                <div className="flex">
                  <span className="text-neon-amber w-20">PASSION:</span>
                  <span className="text-neon-cyan">Building Digital Experiences</span>
                </div>
                <div className="flex">
                  <span className="text-neon-amber w-20">MISSION:</span>
                  <span className="text-neon-cyan">Automate Everything</span>
                </div>
              </div>

              <div className="mt-6 p-4 border border-neon-green/30 rounded bg-neon-green/5">
                <div className="text-neon-green text-xs mb-2">CURRENT_STATUS:</div>
                <div className="text-neon-cyan text-sm">
                  &quot;Crafting innovative solutions that bridge the gap between human creativity and artificial intelligence. 
                  Passionate about creating seamless user experiences and robust backend systems.&quot;
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="terminal-window">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="text-sm font-mono text-neon-cyan">SKILLS_MATRIX.JSON</div>
                <div className="text-xs font-mono text-neon-purple/70">
                  {Object.keys(skills).length} categories loaded
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(skills).map(([category, data]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <motion.button
                      onClick={() => setSelectedSkill(selectedSkill === category ? null : category)}
                      className={`w-full text-left p-3 border border-${data.color}/30 rounded bg-${data.color}/5 hover:bg-${data.color}/10 transition-all duration-300`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-${data.color} font-bold`}>
                          {category}.exe
                        </span>
                        <motion.span
                          animate={{ rotate: selectedSkill === category ? 90 : 0 }}
                          className={`text-${data.color}`}
                        >
                          ▶
                        </motion.span>
                      </div>
                    </motion.button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: selectedSkill === category ? 'auto' : 0,
                        opacity: selectedSkill === category ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 mt-2 border-l-2 border-l-gray-600 ml-3">
                        <div className="grid grid-cols-2 gap-2">
                          {data.items.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`text-sm font-mono text-${data.color}/80 hover:text-${data.color} transition-colors cursor-pointer`}
                            >
                              → {skill}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="terminal-window"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="text-sm font-mono text-neon-cyan">FUN_FACTS.LOG</div>
                <div className="text-xs font-mono text-neon-purple/70">
                  Easter eggs enabled
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                {quickFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-2 text-neon-cyan/80 hover:text-neon-cyan transition-colors"
                  >
                    <span className={`text-${fact.color}`}>&gt;</span>
                    <span>{fact.text} {fact.icon}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection