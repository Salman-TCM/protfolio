// SINGLE SOURCE OF TRUTH - EDIT THIS FILE TO CUSTOMIZE YOUR ENTIRE PORTFOLIO
// ============================================================================

export const siteConfig = {
  // ===== PERSONAL INFORMATION =====
  personal: {
    name: 'Md. Salman Hossain',
    title: 'Software Engineer',
    subtitle: 'Software Engineer & Social Media Automation Specialist',
    email: 'salmann.hossain@gmail.com',
    phone: '+880 1521102041',
    location: 'Dhaka, Bangladesh',
    avatar: '/avatar.jpg', // Add your photo to public folder
    resume: '/Salman_Hossain_CV.pdf', // Add your resume to public folder
  },

  // ===== SOCIAL LINKS =====
  social: {
    github: 'https://github.com/Salman-TCM',
    linkedin: 'https://linkedin.com/in/salman',
    leetcode: 'https://leetcode.com/SalmanTCM',
    telegram: '@salman_dev',
    youtube: '',
    instagram: '',
  },

  // ===== ABOUT SECTION =====
  about: {
    bio: `Software Engineer at Technometrics Ltd with expertise in social media automation, web scraping, and full-stack development. 
          BSc in Computer Science from East West University. Specialized in Python, Django, FastAPI, React, and scalable system architecture. 
          ITEE certified professional with extensive experience in enterprise AV systems and IoT integration.`,
    
    highlights: [
      '[▶] Software Engineer at Technometrics Ltd',
      '[■] BSc Computer Science - East West University',
      '[★] ITEE Certified Professional (Japan)',
      '[◊] Social Media Automation Specialist',
      '[•] Enterprise AV Systems Expert',
      '[◆] Cloud & DevOps Enthusiast',
    ],

    stats: [
      { label: 'Years Experience', value: '2+' },
      { label: 'Major Projects', value: '10+' },
      { label: 'Technologies', value: '25+' },
      { label: 'Certifications', value: '8+' },
    ],
  },

  // ===== SKILLS SECTION =====
  skills: {
    technical: [
      { name: 'Python', level: 95, category: 'Backend' },
      { name: 'Django', level: 92, category: 'Backend' },
      { name: 'FastAPI', level: 90, category: 'Backend' },
      { name: 'JavaScript', level: 85, category: 'Frontend' },
      { name: 'React.js', level: 85, category: 'Frontend' },
      { name: 'React Native', level: 80, category: 'Mobile' },
      { name: 'Laravel', level: 78, category: 'Backend' },
      { name: 'MongoDB', level: 90, category: 'Database' },
      { name: 'MySQL', level: 85, category: 'Database' },
      { name: 'PostgreSQL', level: 82, category: 'Database' },
      { name: 'Docker', level: 88, category: 'DevOps' },
      { name: 'AWS', level: 75, category: 'Cloud' },
      { name: 'Selenium', level: 95, category: 'Automation' },
      { name: 'Web Scraping', level: 98, category: 'Automation' },
      { name: 'TensorFlow', level: 70, category: 'AI/ML' },
      { name: 'NLP', level: 75, category: 'AI/ML' },
      { name: 'Git', level: 90, category: 'Tools' },
      { name: 'Elasticsearch', level: 78, category: 'Search' },
    ],

    soft: [
      'System Architecture',
      'Problem Solving', 
      'Team Collaboration',
      'Project Management',
      'Agile Development',
      'Technical Documentation',
    ],

    languages: [
      { name: 'Bengali', level: 'Native' },
      { name: 'English', level: 'Fluent' },
      { name: 'Hindi', level: 'Conversational' },
    ],
  },

  // ===== EXPERIENCE TIMELINE =====
  experience: [
    {
      title: 'Software Engineer',
      company: 'Technometrics Ltd',
      location: 'Dhaka, Bangladesh',
      period: 'Feb 2023 - Present',
      description: 'Architecting scalable web scraping solutions and building high-performance APIs for social media automation',
      achievements: [
        'Built multi-platform social media scraping systems (Facebook, YouTube, Instagram, Telegram)',
        'Developed comprehensive e-recruitment system for Border Guard Bangladesh',
        'Implemented JWT authentication and role-based access control',
        'Containerized applications using Docker and Kubernetes with CI/CD pipelines',
      ],
    },
    {
      title: 'AV Systems Engineer',
      company: 'Technometrics Ltd',
      location: 'Dhaka, Bangladesh',
      period: '2022 - 2023',
      description: 'Designed enterprise-grade Audio-Visual systems and IoT security solutions',
      achievements: [
        'Programmed Crestron automation systems using SIMPL for AV control',
        'Implemented Dante-based digital audio solutions and Xilica DSP configurations',
        'Deployed IoT security systems for Jamuna Bank Bangladesh',
        'Led AV system deployment at Unilever Bangladesh',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: '10xtrucks.com',
      location: 'Remote',
      period: 'Jan 2021 - Jan 2022',
      description: 'Developed cross-platform mobile applications and admin dashboards for logistics platform',
      achievements: [
        'Built React Native apps for both user and driver interfaces',
        'Created Laravel-based admin dashboard for trip and user management',
        'Integrated real-time location tracking and push notifications',
        'Collaborated with product teams to deliver features within aggressive timelines',
      ],
    },
  ],

  // ===== PROJECTS SECTION =====
  projects: [
    {
      id: 1,
      title: 'CTTC Social Media Scraping & Monitoring System',
      description: 'Comprehensive social media management system with multi-platform support and real-time monitoring',
      longDescription: 'Architected and developed a comprehensive social media management system supporting Facebook, YouTube, Instagram, and Telegram with real-time monitoring, automated scraping, and intelligent content analysis.',
      image: '/projects/social-scraping.jpg',
      technologies: ['Python', 'Django', 'MongoDB', 'Docker', 'NLP', 'Selenium', 'FastAPI'],
      features: [
        'Multi-platform social media scraping',
        'Real-time content monitoring',
        'JWT authentication with RBAC',
        'Analytics dashboard with engagement metrics',
        'Automated reporting with MinIO storage',
      ],
      liveUrl: 'https://cttc-social.com',
      githubUrl: 'https://github.com/Salman-TCM/cttc-social-scraping',
      category: 'Automation',
      featured: true,
      year: 2024,
    },
    {
      id: 2,
      title: 'BGB E-Recruitment Platform',
      description: 'Secure and scalable recruitment system for Border Guard Bangladesh with 2FA and automated processing',
      longDescription: 'Developed a secure recruitment system for Border Guard Bangladesh featuring 2FA authentication, QR-based attendance, automated admit card generation, and role-based access control.',
      image: '/projects/bgb-recruitment.jpg',
      technologies: ['Django', 'ReactJS', 'MySQL', 'Docker', 'REST API', '2FA'],
      features: [
        'Secure 2FA authentication',
        'QR-based attendance system',
        'Automated admit card generation',
        'Result processing automation',
        'Role-based access control',
      ],
      liveUrl: 'https://bgb-recruitment.gov.bd',
      githubUrl: 'https://github.com/Salman-TCM/bgb-recruitment',
      category: 'Government',
      featured: true,
      year: 2023,
    },
    {
      id: 3,
      title: 'Enterprise AV System - Unilever Bangladesh',
      description: 'Robust Dante-based digital audio network for multiple conference and training rooms',
      longDescription: 'Deployed enterprise-grade AV automation system for Unilever Bangladesh using Crestron SIMPL, Dante digital audio, and IoT integration across multiple conference rooms.',
      image: '/projects/unilever-av.jpg',
      technologies: ['Crestron SIMPL', 'Xilica DSP', 'Dante', 'IoT', 'Network Engineering'],
      features: [
        'Latency-free AV switching',
        'High-fidelity audio transmission',
        'Automated control systems',
        'IoT-enabled monitoring',
        'Comprehensive documentation',
      ],
      liveUrl: 'https://unilever.com.bd',
      githubUrl: 'https://github.com/Salman-TCM/enterprise-av-system',
      category: 'AV/IoT',
      featured: true,
      year: 2023,
    },
    {
      id: 4,
      title: '10xtrucks Logistics Platform',
      description: 'Cross-platform mobile applications and admin dashboard for logistics management',
      longDescription: 'Developed comprehensive logistics platform with React Native mobile apps for users and drivers, plus Laravel-based admin dashboard for managing trips, users, and business analytics.',
      image: '/projects/10xtrucks.jpg',
      technologies: ['React Native', 'Laravel', 'MySQL', 'APIs', 'Push Notifications'],
      features: [
        'Cross-platform mobile apps',
        'Real-time location tracking',
        'Trip management system',
        'Payment processing integration',
        'Business analytics dashboard',
      ],
      liveUrl: 'https://10xtrucks.com',
      githubUrl: 'https://github.com/Salman-TCM/10xtrucks-platform',
      category: 'Mobile',
      featured: false,
      year: 2022,
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
      icon: '[▓]',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      features: ['React/Next.js', 'Node.js', 'Database Design', 'API Development'],
    },
    {
      icon: '[□]',
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps for iOS and Android',
      features: ['React Native', 'Flutter', 'Native Features', 'App Store Deployment'],
    },
    {
      icon: '[░]',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces',
      features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
    },
    {
      icon: '[◆]',
      title: 'Performance Optimization',
      description: 'Make your applications blazing fast',
      features: ['Code Splitting', 'Lazy Loading', 'Caching', 'SEO Optimization'],
    },
  ],

  // ===== EDUCATION SECTION =====
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'East West University',
      period: '2019 - Feb 2023',
      description: 'Comprehensive computer science education covering algorithms, data structures, software engineering, and system design',
      achievements: ['Software Engineering Focus', 'System Design Projects', 'Programming Excellence'],
    },
  ],

  // ===== CERTIFICATIONS =====
  certifications: [
    {
      name: 'Fundamental Information Technology Engineer Examination (ITEE)',
      issuer: 'Government of Japan',
      date: '2024',
      credentialId: 'ITEE-JAPAN-2024',
    },
    {
      name: 'Python for Data Science, AI Development',
      issuer: 'IBM',
      date: '2023',
      credentialId: 'IBM-DS-2023',
    },
    {
      name: 'Data Science and Machine Learning from Basic to Advanced',
      issuer: 'Udemy',
      date: '2023',
      credentialId: 'UDEMY-ML-2023',
    },
    {
      name: 'Mastering Selenium: Web Automation Essentials',
      issuer: 'Udemy',
      date: '2023',
      credentialId: 'UDEMY-SELENIUM-2023',
    },
    {
      name: 'Docker and Kubernetes: From Beginner to Advanced',
      issuer: 'Udemy',
      date: '2023',
      credentialId: 'UDEMY-DOCKER-2023',
    },
    {
      name: 'Python Django REST API Bootcamp',
      issuer: 'Udemy',
      date: '2022',
      credentialId: 'UDEMY-DJANGO-2022',
    },
    {
      name: 'Amazon Elastic Container Service (ECS)',
      issuer: 'AWS Digital Training',
      date: '2022',
      credentialId: 'AWS-ECS-2022',
    },
    {
      name: 'Google IT Support Certificate',
      issuer: 'Coursera (Google)',
      date: '2022',
      credentialId: 'GOOGLE-IT-2022',
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
      title: 'Salman Hossain - Software Engineer',
      description: 'Experienced Software Engineer specializing in React, Node.js, and modern web technologies',
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