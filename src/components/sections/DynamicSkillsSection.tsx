'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Skill {
  name: string
  level: number
  icon: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

interface SkillsConfig {
  categories: SkillCategory[]
}

interface DynamicSkillsSectionProps {
  config: SkillsConfig
}

const DynamicSkillsSection = ({ config }: DynamicSkillsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="min-h-screen py-20 px-4">
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
            TECH_ARSENAL.SYS
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-8"></div>
          <p className="text-xl text-neon-cyan/80 font-mono">
            My technological weapons of choice
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {config.categories.map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 font-mono text-sm border-2 rounded transition-all duration-300 ${
                activeCategory === index
                  ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                  : 'border-neon-cyan/30 text-neon-cyan/70 hover:border-neon-cyan/60'
              }`}
            >
              {category.name.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {config.categories[activeCategory]?.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="terminal-window"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="text-lg font-retro text-neon-cyan">{skill.name}</h3>
                  </div>
                  <span className="text-sm font-mono text-neon-amber">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full h-2 bg-neon-cyan/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                  
                  {/* Progress indicators */}
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-mono text-neon-cyan/50">0</span>
                    <span className="text-xs font-mono text-neon-cyan/50">50</span>
                    <span className="text-xs font-mono text-neon-cyan/50">100</span>
                  </div>
                </div>

                {/* Skill Level Description */}
                <div className="mt-4 text-xs font-mono">
                  {skill.level >= 90 && (
                    <span className="text-neon-green">EXPERT_LEVEL</span>
                  )}
                  {skill.level >= 80 && skill.level < 90 && (
                    <span className="text-neon-cyan">ADVANCED</span>
                  )}
                  {skill.level >= 60 && skill.level < 80 && (
                    <span className="text-neon-amber">INTERMEDIATE</span>
                  )}
                  {skill.level < 60 && (
                    <span className="text-neon-magenta">LEARNING</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="terminal-window max-w-2xl mx-auto">
            <div className="p-6">
              <h3 className="text-xl font-retro text-neon-purple mb-4">
                CONTINUOUS_LEARNING.EXE
              </h3>
              <p className="text-sm font-mono text-neon-cyan/70">
                Always exploring new technologies and pushing the boundaries of possibility. 
                The journey of learning never ends in the rapidly evolving world of technology.
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-xs font-mono">
                <span className="text-neon-green">● CURRENTLY_LEARNING: AI/ML</span>
                <span className="text-neon-amber">● NEXT_TARGET: Web3</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DynamicSkillsSection