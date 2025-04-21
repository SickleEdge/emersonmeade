"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const elements = [
    { color: "#FF6B6B", size: 120, x: "10%", y: "20%", shape: "circle" },
    { color: "#4ECDC4", size: 80, x: "80%", y: "30%", shape: "square" },
    { color: "#FFE66D", size: 100, x: "40%", y: "60%", shape: "triangle" },
    { color: "#FF9F1C", size: 90, x: "70%", y: "80%", shape: "circle" },
    { color: "#6B66FF", size: 110, x: "20%", y: "70%", shape: "square" },
    { color: "#FF6B6B", size: 60, x: "50%", y: "40%", shape: "triangle" },
    { color: "#4ECDC4", size: 70, x: "30%", y: "50%", shape: "circle" },
    { color: "#FFE66D", size: 85, x: "60%", y: "25%", shape: "square" },
    { color: "#FF9F1C", size: 95, x: "45%", y: "75%", shape: "triangle" },
    { color: "#6B66FF", size: 75, x: "15%", y: "45%", shape: "circle" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute mix-blend-overlay ${
            element.shape === "circle" ? "rounded-full" : 
            element.shape === "triangle" ? "clip-triangle" : ""
          }`}
          style={{
            width: element.size,
            height: element.size,
            left: element.x,
            top: element.y,
            background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.4, 0.5, 0.4],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

