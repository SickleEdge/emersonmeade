"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-8 border border-pink-800"
        >
          <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
          <p className="text-white/70 mb-6">Want to collaborate or just say hi? Here's how to reach me!</p>

          <div className="space-y-4">
            <motion.a
              href="mailto:ejdarkbark17@gmail.com"
              className="flex items-center space-x-3 text-white/80 hover:text-pink-400 transition-colors"
              whileHover={{ x: 5, color: "#ec4899" }}
            >
              <Mail className="h-5 w-5" />
              <span>ejdarkbark17@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://instagram.com/thatisemerson"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/80 hover:text-pink-400 transition-colors"
              whileHover={{ x: 5, color: "#ec4899" }}
            >
              <Instagram className="h-5 w-5" />
              <span>@thatisemerson</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-8 border border-pink-800"
        >
          <h3 className="text-2xl font-bold mb-4">Social Media</h3>
          <p className="text-white/70 mb-6">Follow me on social media for updates and content!</p>

          <div className="space-y-4">
            <motion.a
              href="https://tiktok.com/@theguyem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/80 hover:text-pink-400 transition-colors"
              whileHover={{ x: 5, color: "#ec4899" }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span>@theguyem (15.1K followers)</span>
            </motion.a>

            <motion.a
              href="https://instagram.com/thatisemerson"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/80 hover:text-pink-400 transition-colors"
              whileHover={{ x: 5, color: "#ec4899" }}
            >
              <Instagram className="h-5 w-5" />
              <span>@thatisemerson (1.4K followers)</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

