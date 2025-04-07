"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

interface Track {
  title: string
  description: string
  audioSrc: string
}

interface AudioPlayerProps {
  tracks: Track[]
}

export function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)

  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number>()

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const updateProgress = () => {
      setProgress(audio.currentTime)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", updateProgress)

    // Cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", updateProgress)
      cancelAnimationFrame(animationRef.current as number)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      cancelAnimationFrame(animationRef.current as number)
    } else {
      audio.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    setIsPlaying(!isPlaying)
  }

  const whilePlaying = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const changeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Number(e.target.value)
    setProgress(audio.currentTime)
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
    setIsPlaying(false)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <motion.div
      className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-800 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/halftone-pattern.png')] bg-repeat opacity-10 mix-blend-overlay pointer-events-none"></div>

      <audio ref={audioRef} src={currentTrack.audioSrc} onEnded={nextTrack} />

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-pink-400">{currentTrack.title}</h3>
        <p className="text-white/70">{currentTrack.description}</p>
      </div>

      <div className="space-y-4">
        {/* Progress bar */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/70 w-10">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={changeProgress}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400"
          />
          <span className="text-xs text-white/70 w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={prevTrack}
              className="text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack size={20} />
            </motion.button>

            <motion.button
              onClick={togglePlayPause}
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </motion.button>

            <motion.button
              onClick={nextTrack}
              className="text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward size={20} />
            </motion.button>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

