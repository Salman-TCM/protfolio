'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
  status: 'production' | 'development' | 'archived'
}

interface ProjectsConfig {
  featured: Project[]
}

interface DynamicProjectsSectionProps {
  config: ProjectsConfig
}

const DynamicProjectsSection = ({ config }: DynamicProjectsSectionProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'production':
        return 'neon-green'
      case 'development':
        return 'neon-amber'
      case 'archived':
        return 'neon-purple'
      default:
        return 'neon-cyan'
    }
  }

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'production':
        return 'LIVE'
      case 'development':
        return 'DEV'
      case 'archived':
        return 'ARCHIVED'
      default:
        return 'UNKNOWN'
    }
  }

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
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
            PROJECT_FILES.DIR
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-8"></div>
          <p className="text-xl text-neon-cyan/80 font-mono">
            Featured projects from my digital workshop
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {config.featured.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className="terminal-window h-full">
                {/* Project Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-mono text-neon-cyan">project_{index + 1}.exe</span>
                  </div>
                  <span className={`text-xs font-mono text-${getStatusColor(project.status)} px-2 py-1 border border-${getStatusColor(project.status)}/30 rounded`}>
                    {getStatusText(project.status)}
                  </span>
                </div>

                {/* Project Image Placeholder */}
                <div className="w-full h-40 mb-4 border-2 border-neon-cyan/30 rounded bg-gradient-to-br from-neon-cyan/10 to-neon-magenta/10 flex items-center justify-center group-hover:border-neon-cyan/60 transition-colors">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2">📁</div>
                      <div className="text-xs font-mono text-neon-cyan/50">PROJECT_PREVIEW</div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-retro text-neon-cyan group-hover:text-neon-magenta transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm font-mono text-neon-cyan/70 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-neon-amber">TECH_STACK:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs font-mono px-2 py-1 border border-neon-purple/30 rounded bg-neon-purple/10 text-neon-purple"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex space-x-3 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 px-4 text-xs font-mono text-center border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 rounded transition-colors"
                      >
                        SOURCE_CODE
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 px-4 text-xs font-mono text-center border border-neon-magenta/50 text-neon-magenta hover:bg-neon-magenta/10 rounded transition-colors"
                      >
                        LIVE_DEMO
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="terminal-window max-w-lg mx-auto">
            <div className="p-6">
              <h3 className="text-xl font-retro text-neon-purple mb-4">
                MORE_PROJECTS.LIST
              </h3>
              <p className="text-sm font-mono text-neon-cyan/70 mb-6">
                Want to see more of my work? Check out my GitHub for additional projects and contributions.
              </p>
              <motion.a
                href="https://github.com/salman"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block py-3 px-6 font-mono text-sm border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 rounded transition-colors"
              >
                VIEW_ALL_PROJECTS.SH
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DynamicProjectsSection