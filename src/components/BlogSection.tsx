'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { defaultBlogPosts } from '@/lib/data'

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  tags: string[]
  readTime: number
}

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [displayContent, setDisplayContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data.length > 0) {
            setBlogPosts(data.data)
          }
        }
      } catch (error) {
        console.log('Using default blog posts')
      }
    }

    fetchPosts()
  }, [])


  useEffect(() => {
    if (selectedPost && isTyping) {
      setDisplayContent('')
      let index = 0
      const content = selectedPost.content
      
      const typeInterval = setInterval(() => {
        if (index < content.length) {
          setDisplayContent(prev => prev + content[index])
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
        }
      }, 20)

      return () => clearInterval(typeInterval)
    }
  }, [selectedPost, isTyping])

  const handlePostSelect = (post: BlogPost) => {
    setSelectedPost(post)
    setIsTyping(true)
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-retro text-neon-cyan mb-4 neon-glow">{line.substring(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-mono text-neon-magenta mb-3 mt-6">{line.substring(3)}</h2>
      }
      if (line.startsWith('- **') || line.startsWith('1. **')) {
        const boldMatch = line.match(/\*\*(.*?)\*\*/)
        if (boldMatch) {
          const before = line.substring(0, line.indexOf('**'))
          const bold = boldMatch[1]
          const after = line.substring(line.indexOf('**') + boldMatch[0].length)
          return (
            <p key={index} className="text-neon-cyan/80 mb-2">
              {before}<span className="text-neon-green font-bold">{bold}</span>{after}
            </p>
          )
        }
      }
      if (line.startsWith('- ') || /^\d+\./.test(line)) {
        return <p key={index} className="text-neon-cyan/80 mb-2 ml-4">{line}</p>
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return <p key={index} className="text-neon-cyan/80 mb-2 leading-relaxed">{line}</p>
    })
  }

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-retro text-neon-cyan mb-4 neon-glow">
            BLOG.TXT
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blog List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="terminal-window sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neon-cyan/30">
                <div className="text-sm font-mono text-neon-cyan">POSTS.LIST</div>
                <div className="text-xs font-mono text-neon-purple/70">
                  {blogPosts.length} entries
                </div>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post, index) => (
                  <motion.button
                    key={post.id}
                    onClick={() => handlePostSelect(post)}
                    className={`w-full text-left p-3 border transition-all duration-300 ${
                      selectedPost?.id === post.id
                        ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                        : 'border-neon-cyan/30 text-neon-cyan/70 hover:border-neon-cyan hover:text-neon-cyan'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-neon-purple">#{post.id}</span>
                        <span className="text-xs font-mono text-neon-amber">{post.readTime}min</span>
                      </div>
                      <h3 className="font-mono text-sm font-bold">{post.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono opacity-70">{post.date}</span>
                        <div className="flex space-x-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-1 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Terminal Commands */}
              <div className="mt-6 pt-4 border-t border-neon-cyan/30">
                <div className="text-xs font-mono text-neon-green">
                  <div className="mb-1">$ cat blog_post.md</div>
                  <div className="mb-1">$ grep -r &quot;technology&quot;</div>
                  <div>$ tail -f thoughts.log</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Reader */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="terminal-window min-h-[600px]">
              {selectedPost ? (
                <>
                  {/* Reader Header */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-neon-cyan/30">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-neon-cyan">READER.EXE</span>
                      {isTyping && <div className="w-2 h-2 bg-neon-green animate-pulse rounded-full"></div>}
                    </div>
                    <div className="flex items-center space-x-4 text-xs font-mono">
                      <span className="text-neon-amber">DATE: {selectedPost.date}</span>
                      <span className="text-neon-purple">READ: {selectedPost.readTime}min</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 border border-neon-magenta/30 text-neon-magenta bg-neon-magenta/5 rounded font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="prose prose-invert max-w-none font-mono text-sm leading-relaxed">
                    {formatContent(displayContent)}
                    {isTyping && (
                      <span className="inline-block w-2 h-5 bg-neon-cyan animate-blink ml-1"></span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isTyping && (
                    <div className="mt-6 pt-4 border-t border-neon-cyan/30">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono text-neon-purple">LOADING:</span>
                        <div className="flex-1 bg-neon-cyan/10 rounded-full h-1">
                          <motion.div
                            className="h-1 bg-neon-cyan rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(displayContent.length / selectedPost.content.length) * 100}%` }}
                          ></motion.div>
                        </div>
                        <span className="text-xs font-mono text-neon-cyan">
                          {Math.round((displayContent.length / selectedPost.content.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="space-y-4">
                    <div className="text-4xl font-retro text-neon-cyan/30 neon-glow">
                      SELECT_POST.EXE
                    </div>
                    <p className="text-neon-cyan/50 font-mono">
                      Choose a blog post from the sidebar to start reading
                    </p>
                    <div className="text-xs font-mono text-neon-purple/50">
                      &gt; Tip: Posts load with typewriter effect for authentic terminal feel
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection