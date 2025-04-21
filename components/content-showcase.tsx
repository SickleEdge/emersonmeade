"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Youtube, Instagram, ExternalLink } from "lucide-react"

export function ContentShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  const contentItems = [
    {
      title: "TikTok",
      description: "Follow my journey through soccer, tech, and content creation",
      image: "/tiktok-content.png",
      icon: <Image src="/tiktok-icon.webp" alt="TikTok" width={32} height={32} className="text-teal-500" />,
      stats: "15.1K+ Followers",
      link: "https://tiktok.com/@theguyem"
    },
    {
      title: "Instagram",
      description: "Behind the scenes and daily life updates",
      image: "/instagram.png",
      icon: <Image src="/Instagram_icon.png" alt="Instagram" width={32} height={32} className="text-pink-500" />,
      stats: "1.4K+ Followers",
      link: "https://instagram.com/isthatemerson"
    }
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === contentItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? contentItems.length - 1 : prev - 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    nextSlide()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevSlide()
  }

  const activeItem = contentItems[activeIndex]

  return (
    <motion.div className="relative max-w-4xl mx-auto" style={{ scale, rotate }}>
      <div className="relative h-[500px] overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <Image
                src={activeItem.image || "/placeholder.svg"}
                alt={activeItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Halftone overlay */}
              <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-20 mix-blend-overlay"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center mb-4">
                  {activeItem.icon}
                  <h3 className="text-3xl font-bold ml-3 text-white">{activeItem.title}</h3>
                </div>
                <p className="text-white/80 mb-2 max-w-lg">{activeItem.description}</p>
                <div className="inline-block bg-gradient-to-r from-blue-900/70 to-pink-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {activeItem.stats}
                </div>
                <a 
                  href={activeItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Profile <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm z-10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm z-10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {contentItems.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1)
              setActiveIndex(index)
            }}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-pink-500" : "bg-white/30"
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

