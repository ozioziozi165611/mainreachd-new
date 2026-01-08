"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, X, Volume2 } from "lucide-react"

export default function VideoTestimonialPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50 && !showPopup) {
        setShowPopup(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showPopup])

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
          className="fixed bottom-24 right-6 z-50 max-w-sm"
        >
          <div className="glass-card rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">MJ</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Mike Johnson</p>
                  <p className="text-gray-400 text-xs">ADL Auto Owner</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-3">
              <div className="aspect-video flex items-center justify-center">
                {!isPlaying ? (
                  <Button onClick={() => setIsPlaying(true)} className="cta-primary rounded-full p-4">
                    <Play className="w-6 h-6" />
                  </Button>
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <Volume2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Video playing...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">0:30</div>
            </div>

            <p className="text-gray-300 text-sm mb-3">
              "Boost'd completely transformed our lead generation. 79 conversations in 30 days!"
            </p>

            <Button size="sm" className="cta-primary w-full text-sm">
              Watch Full Story
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
