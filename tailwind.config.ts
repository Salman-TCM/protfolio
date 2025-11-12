import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-bg': '#0A0A0A',
        'neon-cyan': '#00FFF7',
        'neon-magenta': '#FF00C8',
        'neon-purple': '#8B5CF6',
        'neon-green': '#00FF41',
        'neon-amber': '#FFB000',
        'retro-green': '#00FF41',
        'retro-amber': '#FFB000',
      },
      fontFamily: {
        'retro': ['"Press Start 2P"', 'cursive'],
        'terminal': ['"VT323"', 'monospace'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'typewriter': 'typewriter 2s steps(20) infinite',
        'blink': 'blink 1s infinite',
        'flicker': 'flicker 2s infinite',
        'scanlines': 'scanlines 0.1s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        scanlines: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(20px)' },
        },
        glow: {
          '0%': { 
            'box-shadow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            'text-shadow': '0 0 5px currentColor'
          },
          '100%': { 
            'box-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            'text-shadow': '0 0 10px currentColor'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'retro-grid': 'linear-gradient(transparent 98%, #00FFF7 100%), linear-gradient(90deg, transparent 98%, #00FFF7 100%)',
        'crt-scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 247, 0.1) 2px, rgba(0, 255, 247, 0.1) 4px)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
        },
        '.scrollbar-track-gray-800': {
          scrollbarColor: 'rgba(31, 41, 55, 1) transparent',
        },
        '.scrollbar-thumb-neon-cyan\\/30': {
          scrollbarColor: 'rgba(0, 255, 247, 0.3) transparent',
        },
      })
    },
  ],
};

export default config;