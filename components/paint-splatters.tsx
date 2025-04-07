"use client"

import { motion } from "framer-motion"

export function PaintSplatters() {
  const splatters = [
    { color: "#FF6B6B", size: 120, x: "10%", y: "20%" },
    { color: "#4ECDC4", size: 80, x: "80%", y: "30%" },
    { color: "#FFE66D", size: 100, x: "40%", y: "60%" },
    { color: "#FF9F1C", size: 90, x: "70%", y: "80%" },
    { color: "#6B66FF", size: 110, x: "20%", y: "70%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {splatters.map((splatter, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-20 mix-blend-overlay"
          style={{
            width: splatter.size,
            height: splatter.size,
            left: splatter.x,
            top: splatter.y,
            background: `radial-gradient(circle, ${splatter.color} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.3, 0.2],
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