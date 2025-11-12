'use client'

import { motion } from 'framer-motion'

interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

interface BlogConfig {
  featured: BlogPost[]
}

interface DynamicBlogSectionProps {
  config: BlogConfig
}

const DynamicBlogSection = ({ config }: DynamicBlogSectionProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <section id="blog" className="min-h-screen py-20 px-4">
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
            BLOG_ENTRIES.LOG
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto mb-8"></div>
          <p className="text-xl text-neon-cyan/80 font-mono">
            Thoughts, tutorials, and insights from the digital frontier
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {config.featured.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="terminal-window h-full">
                {/* Blog Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-mono text-neon-cyan">blog_post_{index + 1}.md</span>
                  </div>
                  <span className="text-xs font-mono text-neon-purple">
                    {post.readTime}
                  </span>
                </div>

                {/* Blog Content */}
                <div className="space-y-4">
                  {/* Date */}
                  <div className="text-xs font-mono text-neon-amber">
                    DATE_CREATED: {formatDate(post.date)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-retro text-neon-cyan group-hover:text-neon-magenta transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm font-mono text-neon-cyan/70 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-neon-amber">TAGS:</div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-mono px-2 py-1 border border-neon-purple/30 rounded bg-neon-purple/10 text-neon-purple"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <motion.div 
                    className="pt-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <button className="w-full py-2 px-4 text-xs font-mono text-center border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 rounded transition-colors group-hover:border-neon-magenta group-hover:text-neon-magenta">
                      READ_MORE.EXE
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Terminal Blog Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="terminal-window max-w-4xl mx-auto">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neon-cyan/30">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-mono text-neon-cyan">blog_terminal.exe</span>
              </div>
              <span className="text-xs font-mono text-neon-purple">Interactive Mode</span>
            </div>

            {/* Terminal Content */}
            <div className="font-mono text-sm space-y-3">
              <div className="text-neon-green">
                <span className="text-neon-amber">user@blog:~$</span> ls -la posts/
              </div>
              <div className="text-neon-cyan/70">
                total {config.featured.length} posts
              </div>
              {config.featured.map((post, index) => (
                <div key={index} className="text-neon-cyan/70">
                  <span className="text-neon-green">-rw-r--r--</span> 1 salman salman 
                  <span className="ml-4">{formatDate(post.date)}</span>
                  <span className="ml-4 text-neon-cyan hover:text-neon-magenta cursor-pointer">
                    {post.slug}.md
                  </span>
                </div>
              ))}
              <div className="pt-4">
                <span className="text-neon-amber">user@blog:~$</span>
                <span className="bg-neon-cyan text-retro-bg animate-pulse ml-1">|</span>
              </div>
            </div>

            {/* Command Help */}
            <div className="mt-6 p-4 border border-neon-purple/30 rounded bg-neon-purple/5">
              <div className="text-xs font-mono text-neon-purple mb-2">AVAILABLE COMMANDS:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="text-neon-cyan">cat [post].md - Read post</div>
                <div className="text-neon-cyan">grep [tag] - Filter by tag</div>
                <div className="text-neon-cyan">sort -date - Sort by date</div>
                <div className="text-neon-cyan">head -n 5 - Latest posts</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block py-3 px-6 font-mono text-sm border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 rounded transition-colors"
          >
            VIEW_ALL_POSTS.SH
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default DynamicBlogSection