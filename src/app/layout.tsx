import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Salman Hossain - Retro Portfolio',
  description: 'Full-Stack Developer | Automation & AI Enthusiast | Cyberpunk Portfolio',
  keywords: 'developer, portfolio, retro, cyberpunk, full-stack, automation, AI',
  authors: [{ name: 'Salman Hossain' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-retro-bg text-neon-cyan font-mono">
        <div className="scanlines crt-effect">
          {children}
        </div>
      </body>
    </html>
  )
}