"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Trophy, Calendar, ArrowRight } from "lucide-react"

export function SoccerSection() {
  const [activeTab, setActiveTab] = useState("stats")
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const stats = [
    { label: "Position", value: "Midfielder/Striker" },
    { label: "Goals", value: "3" },
    { label: "Assists", value: "2" },
    { label: "Team", value: "NASA Tophat" },
  ]

  const achievements = [
    "Starting Midfielder/Striker",
    "3 Goals This Season",
    "2 Assists This Season",
    "Dynamic Attacking Player",
    "Strong Team Contributor",
  ]

  const upcomingMatches = [
    { opponent: "Next Match", date: "Coming Soon", location: "TBA" },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div
        className="relative h-[400px] rounded-xl overflow-hidden border border-blue-800"
        style={{ scale }}
        whileHover={{ scale: 1.02 }}
      >
        <Image src="/images/soccer-action.png" alt="Emerson playing soccer" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

        {/* Halftone overlay */}
        <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-20 mix-blend-overlay"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">On The Field</h3>
          <p className="text-white/80">Passionate midfielder with creative playmaking abilities</p>
        </div>
      </motion.div>

      <motion.div
        className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-800 relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Halftone overlay */}
        <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-10 mix-blend-overlay pointer-events-none"></div>

        <div className="flex space-x-4 mb-6">
          <motion.button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "stats"
                ? "bg-gradient-to-r from-blue-500 to-pink-500 text-white"
                : "bg-blue-900/50 text-white/70 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Stats
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "achievements"
                ? "bg-gradient-to-r from-blue-500 to-pink-500 text-white"
                : "bg-blue-900/50 text-white/70 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Achievements
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("matches")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "matches"
                ? "bg-gradient-to-r from-blue-500 to-pink-500 text-white"
                : "bg-blue-900/50 text-white/70 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Matches
          </motion.button>
        </div>

        <div className="min-h-[250px]">
          {activeTab === "stats" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-900/50 rounded-lg p-4 border border-blue-700/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  <p className="text-white/60 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center mb-4">
                <Trophy className="text-pink-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Achievements & Awards</h3>
              </div>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="h-2 w-2 bg-pink-400 rounded-full mr-2"></span>
                    <span className="text-white/80">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === "matches" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center mb-4">
                <Calendar className="text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Upcoming Matches</h3>
              </div>
              <div className="space-y-3">
                {upcomingMatches.map((match, index) => (
                  <motion.div
                    key={index}
                    className="bg-blue-900/50 rounded-lg p-3 border border-blue-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">vs. {match.opponent}</p>
                        <p className="text-sm text-white/60">
                          {match.date} • {match.location}
                        </p>
                      </div>
                      <ArrowRight className="text-pink-400 h-4 w-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

