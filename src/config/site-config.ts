// SINGLE SOURCE OF TRUTH - EDIT THIS FILE TO CUSTOMIZE YOUR ENTIRE PORTFOLIO
// ============================================================================

export const siteConfig = {
  // ===== PERSONAL INFORMATION =====
  personal: {
    name: 'Salman Hossain',
    title: 'Full-Stack Developer',
    subtitle: 'Building the future, one line of code at a time',
    email: 'salman@example.com',
    phone: '+1234567890',
    location: 'Earth, Solar System',
    avatar: '/avatar.jpg', // Add your photo to public folder
    resume: '/resume.pdf', // Add your resume to public folder
  },

  // ===== SOCIAL LINKS =====
  social: {
    github: 'https://github.com/salman',
    linkedin: 'https://linkedin.com/in/salman',
    twitter: 'https://twitter.com/salman',
    telegram: '@salman_dev',
    youtube: '',
    instagram: '',
  },

  // ===== ABOUT SECTION =====
  about: {
    bio: `Passionate full-stack developer with 3+ years of experience building scalable web applications. 
          I love turning complex problems into simple, beautiful solutions. When I'm not coding, 
          you'll find me exploring new technologies or contributing to open-source projects.`,
    
    highlights: [
      '🚀 3+ Years of Professional Experience',
      '💼 50+ Successful Projects Delivered',
      '🌟 Open Source Contributor',
      '📚 Continuous Learner',
      '☕ Coffee Enthusiast',
      '🎮 Tech Explorer',
    ],

    stats: [
      { label: 'Years Experience', value: '3+' },
      { label: 'Projects Completed', value: '50+' },
      { label: 'Happy Clients', value: '30+' },
      { label: 'Code Commits', value: '1000+' },
    ],
  },

  // ===== SKILLS SECTION =====
  skills: {
    technical: [
      { name: 'React/Next.js', level: 90, category: 'Frontend' },
      { name: 'TypeScript', level: 85, category: 'Frontend' },
      { name: 'Tailwind CSS', level: 88, category: 'Frontend' },
      { name: 'Node.js', level: 85, category: 'Backend' },
      { name: 'Python', level: 80, category: 'Backend' },
      { name: 'MongoDB', level: 82, category: 'Database' },
      { name: 'PostgreSQL', level: 75, category: 'Database' },
      { name: 'Docker', level: 70, category: 'DevOps' },
      { name: 'AWS', level: 65, category: 'DevOps' },
      { name: 'Git', level: 90, category: 'Tools' },
    ],

    soft: [
      'Problem Solving',
      'Team Leadership',
      'Communication',
      'Time Management',
      'Critical Thinking',
      'Adaptability',
    ],

    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Spanish', level: 'Intermediate' },
      { name: 'Bengali', level: 'Native' },
    ],
  },

  // ===== EXPERIENCE TIMELINE =====
  experience: [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Leading development of enterprise web applications using React and Node.js',
      achievements: [
        'Led team of 5 developers',
        'Improved app performance by 40%',
        'Implemented CI/CD pipeline',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      period: '2021 - 2023',
      description: 'Developed custom web solutions for various clients',
      achievements: [
        'Built 20+ client websites',
        'Reduced load time by 60%',
        'Mentored junior developers',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      period: '2020 - 2021',
      description: 'Started my professional journey in web development',
      achievements: [
        'Learned React and Node.js',
        'Contributed to 10+ projects',
        'Improved code quality',
      ],
    },
  ],

  // ===== PROJECTS SECTION =====
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management',
      longDescription: 'Built a scalable e-commerce platform handling 10,000+ daily transactions with features including real-time inventory, payment processing, and analytics dashboard.',
      image: '/projects/ecommerce.jpg',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
      features: [
        'Real-time inventory tracking',
        'Secure payment processing',
        'Admin dashboard',
        'Mobile responsive',
      ],
      liveUrl: 'https://example-store.com',
      githubUrl: 'https://github.com/salman/ecommerce',
      category: 'Full-Stack',
      featured: true,
      year: 2024,
    },
    {
      id: 2,
      title: 'AI Chat Assistant',
      description: 'Intelligent chatbot powered by OpenAI GPT-4',
      longDescription: 'Developed an AI-powered chat assistant that helps businesses automate customer support with 95% accuracy.',
      image: '/projects/chatbot.jpg',
      technologies: ['React', 'Python', 'OpenAI API', 'WebSocket', 'PostgreSQL'],
      features: [
        'Natural language processing',
        'Multi-language support',
        'Context awareness',
        'Analytics dashboard',
      ],
      liveUrl: 'https://ai-assistant.demo.com',
      githubUrl: 'https://github.com/salman/ai-chat',
      category: 'AI/ML',
      featured: true,
      year: 2024,
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative project management tool for teams',
      longDescription: 'Created a comprehensive task management application used by 50+ teams for project collaboration.',
      image: '/projects/taskmanager.jpg',
      technologies: ['Vue.js', 'Express', 'MySQL', 'Socket.io', 'Docker'],
      features: [
        'Real-time collaboration',
        'Kanban boards',
        'Time tracking',
        'Team analytics',
      ],
      liveUrl: 'https://taskmaster.app',
      githubUrl: 'https://github.com/salman/taskmaster',
      category: 'Productivity',
      featured: false,
      year: 2023,
    },
  ],

  // ===== BLOG/ARTICLES SECTION =====
  blog: [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for building large-scale React applications that are maintainable and performant.',
      content: 'Full article content here...',
      date: '2024-11-01',
      readTime: '8 min',
      tags: ['React', 'JavaScript', 'Architecture'],
      image: '/blog/react-scaling.jpg',
      slug: 'building-scalable-react-apps',
    },
    {
      id: 2,
      title: 'The Future of AI in Web Development',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build web applications.',
      content: 'Full article content here...',
      date: '2024-10-15',
      readTime: '6 min',
      tags: ['AI', 'Web Dev', 'Future Tech'],
      image: '/blog/ai-webdev.jpg',
      slug: 'ai-in-web-development',
    },
    {
      id: 3,
      title: 'Docker for Frontend Developers',
      excerpt: 'A comprehensive guide to containerizing your frontend applications with Docker.',
      content: 'Full article content here...',
      date: '2024-09-20',
      readTime: '10 min',
      tags: ['Docker', 'DevOps', 'Frontend'],
      image: '/blog/docker-frontend.jpg',
      slug: 'docker-for-frontend',
    },
  ],

  // ===== TESTIMONIALS SECTION =====
  testimonials: [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO at TechCorp',
      content: 'Salman is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.',
      avatar: '/testimonials/john.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager at StartupXYZ',
      content: 'Working with Salman was a great experience. He transformed our ideas into a beautiful, functional application.',
      avatar: '/testimonials/jane.jpg',
      rating: 5,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'CTO at Digital Agency',
      content: 'Salman\'s technical expertise and professional approach made our project a success. Highly recommended!',
      avatar: '/testimonials/mike.jpg',
      rating: 5,
    },
  ],

  // ===== SERVICES SECTION =====
  services: [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      features: ['React/Next.js', 'Node.js', 'Database Design', 'API Development'],
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps for iOS and Android',
      features: ['React Native', 'Flutter', 'Native Features', 'App Store Deployment'],
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces',
      features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Make your applications blazing fast',
      features: ['Code Splitting', 'Lazy Loading', 'Caching', 'SEO Optimization'],
    },
  ],

  // ===== EDUCATION SECTION =====
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      period: '2016 - 2020',
      description: 'Graduated with honors, GPA: 3.8/4.0',
      achievements: ['Dean\'s List', 'Best Project Award', 'Student Leadership'],
    },
    {
      degree: 'Full-Stack Web Development',
      school: 'Coding Bootcamp',
      period: '2020',
      description: 'Intensive 6-month bootcamp focused on modern web technologies',
      achievements: ['Top Graduate', 'Best Portfolio', '100% Project Completion'],
    },
  ],

  // ===== CERTIFICATIONS =====
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-123456',
    },
    {
      name: 'Google Cloud Professional',
      issuer: 'Google',
      date: '2023',
      credentialId: 'GCP-789012',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      credentialId: 'MDB-345678',
    },
  ],

  // ===== CONTACT PREFERENCES =====
  contact: {
    availability: 'Available for freelance projects',
    responseTime: 'Usually responds within 24 hours',
    preferredMethod: 'Email',
    calendlyLink: 'https://calendly.com/salman',
  },

  // ===== SITE SETTINGS =====
  settings: {
    // Theme
    theme: {
      primary: '#00ffff',      // Cyan
      secondary: '#ff00ff',    // Magenta
      accent: '#ffff00',       // Yellow
      background: '#0a0a0a',   // Dark
      text: '#ffffff',         // White
    },

    // Features Toggle
    features: {
      animations: true,
      sounds: true,
      particleBackground: true,
      darkMode: true,
      smoothScroll: true,
    },

    // SEO
    seo: {
      title: 'Salman Hossain - Full-Stack Developer',
      description: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies',
      keywords: 'web developer, full-stack, react, node.js, javascript, portfolio',
      image: '/og-image.jpg',
    },
  },
}

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig
export type Project = typeof siteConfig.projects[0]
export type BlogPost = typeof siteConfig.blog[0]
export type Experience = typeof siteConfig.experience[0]
export type Testimonial = typeof siteConfig.testimonials[0]
export type Service = typeof siteConfig.services[0]