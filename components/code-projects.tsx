"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "Emerson Meade Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
    image: "/emersonmeadesite.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/yourusername/personal-website"
  },
  {
    title: "Drop Dudes",
    description: "A web application for tracking soccer statistics and player performance.",
    image: "/dropdudes.webp",
    tags: ["React", "Firebase", "Chart.js"],
    link: "https://github.com/yourusername/soccer-stats"
  },
  {
    title: "Cumberland Island Website",
    description: "A dashboard for managing social media content and analytics.",
    image: "/cumberlandIslandWebsite.png",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    link: "https://github.com/yourusername/content-dashboard"
  }
]

export function CodeProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/30 to-pink-900/30 backdrop-blur-sm border border-pink-800/30 hover:border-pink-500/50 transition-colors"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-white/70 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-pink-900/30 text-pink-300 border border-pink-800/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
            >
              View Project
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 