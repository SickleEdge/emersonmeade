"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface PortfolioItem {
  title: string
  description: string
  image: string
  link: string
  target?: string
}

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -150])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])
  const y3 = useTransform(scrollY, [0, 1000], [0, -250])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: "spring" } },
  }

  // Assign different y transforms to each item
  const getYTransform = (index: number) => {
    if (index % 3 === 0) return y1
    if (index % 3 === 1) return y2
    return y3
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/80 to-black/80 backdrop-blur-sm border border-blue-800"
          variants={itemVariants}
          style={{ y: getYTransform(index) }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={item.image ? `/emersonmeade${item.image}` : "/emersonmeade/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

            {/* Halftone overlay */}
            <div className="absolute inset-0 bg-[url('/emersonmeade/images/halftone-pattern.png')] bg-repeat opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-white/70 mb-4">{item.description}</p>

            <Link 
              href={item.link} 
              target={item.target}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
            >
              View Project <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>

          {hoveredIndex === index && (
            <motion.div
              className="absolute inset-0 border-2 border-pink-400 rounded-xl pointer-events-none"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

