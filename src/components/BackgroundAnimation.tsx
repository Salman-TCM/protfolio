'use client'

import { useEffect, useRef } from 'react'

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const gridSize = 50
    const points: Array<{
      x: number
      y: number
      targetX: number
      targetY: number
      alpha: number
    }> = []

    // Create grid points
    for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
      for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
        points.push({
          x,
          y,
          targetX: x,
          targetY: y,
          alpha: Math.random() * 0.5 + 0.1
        })
      }
    }

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 255, 247, 0.1)'
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw glowing points
      points.forEach((point, index) => {
        const dx = mouseX - point.x
        const dy = mouseY - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const influence = (maxDistance - distance) / maxDistance
          point.x += (point.targetX + dx * influence * 0.1 - point.x) * 0.1
          point.y += (point.targetY + dy * influence * 0.1 - point.y) * 0.1
          point.alpha = Math.min(1, point.alpha + influence * 0.02)
        } else {
          point.x += (point.targetX - point.x) * 0.05
          point.y += (point.targetY - point.y) * 0.05
          point.alpha = Math.max(0.1, point.alpha - 0.01)
        }

        // Draw glowing dot
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, 10
        )
        gradient.addColorStop(0, `rgba(0, 255, 247, ${point.alpha})`)
        gradient.addColorStop(1, 'rgba(0, 255, 247, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
        ctx.fill()

        // Add scanning effect
        if (index % 10 === Math.floor(Date.now() / 200) % 10) {
          ctx.strokeStyle = `rgba(255, 0, 200, ${point.alpha * 0.5})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(point.x, point.y, 15, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0A0A0A' }}
    />
  )
}

export default BackgroundAnimation