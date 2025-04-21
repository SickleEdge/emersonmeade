"use client"

import type { ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  id?: string
  overlayImage?: string
  scrollFactor?: number
}

export function ParallaxSection({ children, className, id, overlayImage, scrollFactor = 0.2 }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${scrollFactor * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1])

  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${className}`}>
      {overlayImage && (
        <motion.div
          className="absolute inset-0 bg-repeat opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url(${overlayImage})`,
            y,
            opacity,
          }}
        />
      )}

      {/* Halftone overlay */}
      <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-5 mix-blend-overlay pointer-events-none"></div>

      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", `${scrollFactor * 50}%`]),
          scale,
          rotate,
        }}
      >
        {children}
      </motion.div>

      {/* Animated corner decorations */}
      <motion.div
        className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-pink-500 opacity-50 pointer-events-none"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
        }}
      />

      <motion.div
        className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-blue-500 opacity-50 pointer-events-none"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["50%", "0%"]),
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-blue-500 opacity-50 pointer-events-none"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          y: useTransform(scrollYProgress, [0, 1], ["50%", "0%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500 opacity-50 pointer-events-none"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["50%", "0%"]),
          y: useTransform(scrollYProgress, [0, 1], ["50%", "0%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
        }}
      />
    </section>
  )
}

