"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface SprayTextProps {
  text: string
}

export function SprayText({ text }: SprayTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create a spray paint effect with multiple layers
    const createSprayEffect = () => {
      const letters = text.split("")
      container.innerHTML = ""

      // Main text layer
      const mainTextEl = document.createElement("div")
      mainTextEl.className = "relative z-20"
      mainTextEl.innerHTML = `
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white">
          ${letters
            .map(
              (letter) =>
                `<span class="inline-block transform hover:scale-110 hover:text-pink-400 transition-all duration-300">${letter}</span>`,
            )
            .join("")}
        </h1>
      `
      container.appendChild(mainTextEl)

      // Shadow/outline layer
      const shadowEl = document.createElement("div")
      shadowEl.className = "absolute inset-0 z-10 transform translate-x-1 translate-y-1"
      shadowEl.innerHTML = `
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-blue-600 opacity-80">
          ${letters.map((letter) => `<span class="inline-block">${letter}</span>`).join("")}
        </h1>
      `
      container.appendChild(shadowEl)

      // Spray effect layer
      const sprayEl = document.createElement("div")
      sprayEl.className = "absolute inset-0 z-0 transform -translate-x-1 -translate-y-1"
      sprayEl.innerHTML = `
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-pink-500 opacity-60">
          ${letters.map((letter) => `<span class="inline-block">${letter}</span>`).join("")}
        </h1>
      `
      container.appendChild(sprayEl)
    }

    createSprayEffect()
  }, [text])

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {/* Content will be populated by the useEffect */}
    </motion.div>
  )
}

