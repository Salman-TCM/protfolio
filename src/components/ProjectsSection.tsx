'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { defaultProjects } from '@/lib/data'

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  status: 'active' | 'completed' | 'archived'
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured' | 'active'>('all')
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data.length > 0) {
            setProjects(data.data)
          }
        }
      } catch (error) {
        console.log('Using default projects data')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    if (filter === 'active') return project.status === 'active'
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'neon-green'
      case 'completed': return 'neon-cyan'
      case 'archived': return 'neon-purple'
      default: return 'neon-cyan'
    }
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-retro text-neon-cyan mb-4 neon-glow">
            PROJECTS.DIR
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent mx-auto mb-8"></div>
          
          {/* Filter Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            {['all', 'featured', 'active'].map((filterType) => (
              <motion.button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={`px-4 py-2 font-mono text-xs uppercase border transition-all duration-300 ${
                  filter === filterType
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10'
                    : 'border-neon-cyan/30 text-neon-cyan/70 hover:border-neon-cyan hover:text-neon-cyan'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateX: 2 }}
              className="terminal-window cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-neon-cyan">PROJECT_{project.id}</span>
                  {project.featured && (
                    <span className="text-xs px-1 bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30 rounded">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className={`w-2 h-2 rounded-full bg-${getStatusColor(project.status)} animate-pulse`}></div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-mono text-neon-cyan group-hover:text-neon-magenta transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-neon-cyan/80 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 border border-neon-purple/30 text-neon-purple bg-neon-purple/5 rounded font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 text-neon-cyan/50 font-mono">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-neon-amber">STATUS:</span>
                  <span className={`text-xs font-mono text-${getStatusColor(project.status)} uppercase`}>
                    {project.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {project.demoUrl && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1 border border-neon-green/30 text-neon-green bg-neon-green/5 hover:bg-neon-green/10 transition-all rounded font-mono"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.demoUrl, '_blank')
                      }}
                    >
                      DEMO
                    </motion.button>
                  )}
                  {project.githubUrl && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1 border border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-all rounded font-mono"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.githubUrl, '_blank')
                      }}
                    >
                      CODE
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="terminal-window max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-neon-cyan/30">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-neon-cyan">PROJECT_DETAILS.JSON</span>
                  <div className={`w-2 h-2 rounded-full bg-${getStatusColor(selectedProject.status)} animate-pulse`}></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="text-neon-magenta hover:text-red-400 transition-colors"
                >
                  ✕
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-retro text-neon-cyan mb-2 neon-glow">
                    {selectedProject.title}
                  </h3>
                  <p className="text-neon-cyan/80 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-mono text-neon-amber mb-3">TECH_STACK:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm px-3 py-2 border border-neon-purple/30 text-neon-purple bg-neon-purple/5 rounded font-mono text-center"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {selectedProject.demoUrl && (
                    <motion.a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-button border-neon-green text-neon-green hover:bg-neon-green flex-1 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LAUNCH DEMO
                    </motion.a>
                  )}
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-button flex-1 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      VIEW CODE
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection