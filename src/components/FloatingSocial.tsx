'use client'

import { motion } from 'framer-motion'
import { FaGithubAlt } from 'react-icons/fa'

const FloatingSocial = () => {
  const GitHubIcon = () => (
    <FaGithubAlt className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ fill: 'currentColor' }} />
  )

  const LeetCodeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  )

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )

  const socialLinks = [
    { 
      label: 'GitHub', 
      url: 'https://github.com/Salman-TCM', 
      IconComponent: GitHubIcon,
      hoverColor: 'rgba(0, 255, 65, 0.6)',
      shadowColor: 'rgba(0, 255, 65, 0.3)',
      color: '#00ff41'
    },
    { 
      label: 'LeetCode', 
      url: 'https://leetcode.com/SalmanTCM', 
      IconComponent: LeetCodeIcon,
      hoverColor: 'rgba(255, 176, 0, 0.6)',
      shadowColor: 'rgba(255, 176, 0, 0.3)',
      color: '#ffb000'
    },
    { 
      label: 'LinkedIn', 
      url: 'https://linkedin.com/salman', 
      IconComponent: LinkedInIcon,
      hoverColor: 'rgba(255, 0, 200, 0.6)',
      shadowColor: 'rgba(255, 0, 200, 0.3)',
      color: '#ff00c8'
    },
  ]

  return (
    <div className="flex gap-3 social-bottom-right">
      {socialLinks.map((social, index) => {
        const IconComponent = social.IconComponent
        return (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.15, 
              rotate: [0, -5, 5, 0],
              boxShadow: `0 0 30px ${social.hoverColor}, 0 0 60px ${social.shadowColor}` 
            }}
            whileTap={{ scale: 0.85 }}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black/80 rounded-full flex items-center justify-center transition-all backdrop-blur-sm relative overflow-hidden group"
            style={{ 
              border: `2px solid ${social.color}`,
              color: social.color,
              boxShadow: `0 0 10px ${social.shadowColor}`
            }}
            title={social.label}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="z-10 relative group-hover:scale-110 transition-transform flex items-center justify-center">
              <IconComponent />
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}

export default FloatingSocial