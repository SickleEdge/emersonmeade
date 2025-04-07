"use client"

import { motion, useMotionValue, useTransform, useSpring, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"

interface GestureState {
  startX: number
  startY: number
  isDragging: boolean
  swipeDirection: string | null
  gestureType: string | null
}

export function GestureControls() {
  const [gestureState, setGestureState] = useState<GestureState>({
    startX: 0,
    startY: 0,
    isDragging: false,
    swipeDirection: null,
    gestureType: null,
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 })

  // Reduced rotation range for subtlety
  const rotateX = useTransform(smoothMouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-5, 5])
  const controls = useAnimationControls()

  // Track absolute cursor position
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const handleGestureStart = (e: TouchEvent | MouseEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    setCursorPos({ x, y })
    setGestureState(prev => ({
      ...prev,
      startX: x,
      startY: y,
      isDragging: true,
      swipeDirection: null,
    }))
  }

  const handleGestureMove = (e: TouchEvent | MouseEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY
    setCursorPos({ x, y })

    if (!gestureState.isDragging) return

    const deltaX = x - gestureState.startX
    const deltaY = y - gestureState.startY

    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }

  const handleGestureEnd = () => {
    setGestureState(prev => ({
      ...prev,
      isDragging: false,
      swipeDirection: null,
      gestureType: null,
    }))
  }

  useEffect(() => {
    window.addEventListener('touchstart', handleGestureStart)
    window.addEventListener('touchmove', handleGestureMove)
    window.addEventListener('touchend', handleGestureEnd)
    window.addEventListener('mousedown', handleGestureStart)
    window.addEventListener('mousemove', handleGestureMove)
    window.addEventListener('mouseup', handleGestureEnd)

    // Hide the default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('touchstart', handleGestureStart)
      window.removeEventListener('touchmove', handleGestureMove)
      window.removeEventListener('touchend', handleGestureEnd)
      window.removeEventListener('mousedown', handleGestureStart)
      window.removeEventListener('mousemove', handleGestureMove)
      window.removeEventListener('mouseup', handleGestureEnd)
      
      // Restore the default cursor
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Generate subtle background particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1, // Smaller particles
    speed: Math.random() * 3 + 2,
  }))

  return (
    <>
      {/* Background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full bg-white/10 mix-blend-screen pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gesture effects */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
        }}
        animate={controls}
      >
        {/* Minimal cursor */}
        <motion.div
          className="fixed w-2 h-2 rounded-full bg-white mix-blend-screen pointer-events-none"
          style={{
            left: cursorPos.x - 4,
            top: cursorPos.y - 4,
            opacity: 0.8,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)',
          }}
        />

        {/* Very subtle trail */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="fixed w-2 h-2 rounded-full bg-white/30 mix-blend-screen pointer-events-none"
            style={{
              left: cursorPos.x - 4,
              top: cursorPos.y - 4,
              opacity: 0.2 - i * 0.05,
              scale: 1 - i * 0.2,
              transition: `all ${0.1 + i * 0.1}s ease-out`,
            }}
          />
        ))}
      </motion.div>
    </>
  )
} 