"use client"

import { SprayText } from "@/components/spray-text"
import { Navigation } from "@/components/navigation"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { ContentShowcase } from "@/components/content-showcase"
import { SoccerSection } from "@/components/soccer-section"
import { ContactSection } from "@/components/contact-section"
import { ParallaxSection } from "@/components/parallax-section"
import { FloatingElements } from "@/components/floating-elements"
import { GestureControls } from "@/components/gesture-controls"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { SpiderVerseEffects } from "@/components/spiderverse-effects"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  // For scroll-triggered animations
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const currentScroll = window.scrollY
        const progress = Math.min(currentScroll / (scrollHeight / 2), 1)
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <GestureControls />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-pink-900/30" />
        <div 
          className="absolute inset-0"
          style={{
            opacity: 1 - scrollProgress,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.5, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.55, 0.4],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-full blur-2xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl"
            animate={{
              x: [-50, 50, -50],
              y: [0, 100, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-blue-900/5" />
          
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px'
          }} />
        </div>
      </div>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/80 z-10"
          style={{ y: backgroundY }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-[url('/images/brick-wall-bg.png')] bg-cover bg-center opacity-40 z-0"
          style={{ y: backgroundY }}
        ></motion.div>

        {/* Halftone overlay */}
        <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-15 mix-blend-overlay z-5"></div>

        {/* Floating elements */}
        <FloatingElements />

        <motion.div className="relative z-20 container mx-auto px-4 text-center" style={{ y: textY }}>
          <SprayText text="EMERSON MEADE" />
          <motion.p
            className="mt-6 text-xl md:text-2xl font-medium text-pink-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Soccer Player • Programmer • Audio Engineer • Content Creator
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-pink-300 mb-2">Scroll to Explore</span>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="#EC4899"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation */}
      <Navigation />

      {/* Programming Section */}
      <ParallaxSection
        id="programming"
        className="py-20 bg-gradient-to-b from-black to-blue-950 relative"
        overlayImage="/images/graffiti-overlay.png"
        scrollFactor={0.2}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-400">Code</span> Projects
          </motion.h2>
          <PortfolioGrid
            items={[
              {
                title: "Cumberland Island Website",
                description: "Interactive guide and information site for Cumberland Island",
                image: "/cumberland-island-app.png",
                link: "https://sickleedge.github.io/cumberland-island-app",
                target: "_blank"
              },
              {
                title: "Drop Dudes",
                description: "Popular Roblox game with over 3K visits",
                image: "/drop-dudes.png",
                link: "https://www.roblox.com/games/10107382971/DROP-DUDES-ICY-HEIGHTS",
                target: "_blank"
              },
              {
                title: "Emerson Meade Website",
                description: "Personal portfolio and showcase website",
                image: "/emersonmeade.png",
                link: "#home"
              },
              {
                title: "Wheeler Soccer Site",
                description: "Dedicated website for Wheeler soccer team and events",
                image: "/wheeler-soccer-site.png",
                link: "https://sickleedge.github.io/wheelersoccer/",
                target: "_blank"
              },
              {
                title: "Photographer Drops",
                description: "Link sharing system for photographers to share with Wheeler soccer players",
                image: "/photographer-drops.png",
                link: "https://sickleedge.github.io/wheelersoccer/drops",
                target: "_blank"
              },
              {
                title: "Ride The Bus",
                description: "Interactive card game website based on a gambling game",
                image: "/ride-the-bus.png",
                link: "https://sickleedge.github.io/ridethebus/",
                target: "_blank"
              },
            ]}
          />
        </div>
      </ParallaxSection>

      {/* Content Creation Section */}
      <ParallaxSection
        id="content"
        className="py-20 bg-gradient-to-b from-pink-950 to-black relative"
        overlayImage="/images/graffiti-overlay.png"
        scrollFactor={0.2}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-400">Content</span> Creation
          </motion.h2>
          <ContentShowcase />
        </div>
        <SpiderVerseEffects />
      </ParallaxSection>

      {/* Soccer Section */}
      <ParallaxSection
        id="soccer"
        className="py-20 bg-gradient-to-b from-black to-blue-950 relative"
        overlayImage="/images/graffiti-overlay.png"
        scrollFactor={0.2}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-400">Soccer</span> Career
          </motion.h2>
          <SoccerSection />
        </div>
        <SpiderVerseEffects />
      </ParallaxSection>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-pink-400">Get In</span> Touch
          </motion.h2>
          <ContactSection />
        </div>
        <SpiderVerseEffects />
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">© {new Date().getFullYear()} Emerson Meade. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating cursor effect */}
      <AnimatePresence>
        {scrollPosition > 100 && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <radialGradient id="cursor-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </radialGradient>
              </defs>
              <motion.circle
                cx="50%"
                cy="50%"
                r="100"
                fill="url(#cursor-gradient)"
                animate={{
                  cx: [
                    `${Math.random() * 80 + 10}%`,
                    `${Math.random() * 80 + 10}%`,
                    `${Math.random() * 80 + 10}%`,
                    `${Math.random() * 80 + 10}%`,
                  ],
                  cy: [
                    `${Math.random() * 80 + 10}%`,
                    `${Math.random() * 80 + 10}%`,
                    `${Math.random() * 80 + 10}%`,
                    `${Math.random() * 80 + 10}%`,
                  ],
                  r: [100, 150, 120, 100],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

