import { motion } from "framer-motion"

export function SpiderVerseEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Smooth gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.05) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle floating gradients */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Subtle color shift */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(236, 72, 153, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%)",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.02) 0%, rgba(236, 72, 153, 0.02) 100%)",
            "linear-gradient(45deg, rgba(236, 72, 153, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        backgroundSize: '200px 200px'
      }} />
    </div>
  )
} 