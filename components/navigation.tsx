"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section based on scroll position
      const sections = ["home", "programming", "audio", "content", "soccer", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching section

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Programming", href: "#programming" },
    { name: "Audio", href: "#audio" },
    { name: "Content", href: "#content" },
    { name: "Soccer", href: "#soccer" },
    { name: "Contact", href: "#contact" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div variants={itemVariants}>
            <Link href="#home" className="text-xl font-bold" onClick={(e) => handleNavClick(e, "#home")}>
              EM
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  href={item.href}
                  className={`text-white/80 hover:text-pink-400 font-medium relative group ${
                    activeSection === item.href.replace("#", "") ? "text-pink-400" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                      activeSection === item.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-2xl font-bold hover:text-pink-400 transition-colors ${
                  activeSection === item.href.replace("#", "") ? "text-pink-400" : "text-white"
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

