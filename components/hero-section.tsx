"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { loadYouTubeAPI, isYouTubeAPIReady } from "@/lib/youtube"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "See How Local AUSSIE Businesses Have DOUBLED Their Revenue Through Meta Marketing"

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted to allow autoplay
  const [showControls, setShowControls] = useState(false)
  const [isReady, setIsReady] = useState(false) // Track if player is ready
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const apiLoadedRef = useRef(false) // Prevent multiple API loads

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const initializeVideo = async () => {
      // Prevent multiple initializations
      if (apiLoadedRef.current) return
      apiLoadedRef.current = true

      try {
        console.log("[v0] Loading YouTube API")
        await loadYouTubeAPI()
        console.log("[v0] YouTube API ready")
        initializePlayer()
      } catch (error) {
        console.error("[v0] Failed to load YouTube API:", error)
      }
    }

    initializeVideo()
  }, [])

  const initializePlayer = () => {
    if (playerRef.current) return // Prevent multiple player instances

    // Double-check API is ready before initializing
    if (!isYouTubeAPIReady()) {
      console.log("[v0] YouTube API not ready yet")
      return
    }

    console.log("[v0] Initializing YouTube player")
    try {
      playerRef.current = new window.YT.Player("hero-youtube-player", {
        height: "100%",
        width: "100%",
        videoId: "XuKrFC3yDgo",
        playerVars: {
          autoplay: 1,
          controls: 1, // Enable built-in controls
          modestbranding: 1,
          rel: 0,
          start: 0,
          playsinline: 1, // Better mobile support
        },
        events: {
          onReady: (event: any) => {
            console.log("[v0] Player ready, starting video")
            setIsReady(true)
            event.target.playVideo()
            setIsPlaying(true)

            const enableAudio = () => {
              try {
                event.target.unMute()
                setIsMuted(false)
                console.log("[v0] Audio enabled")
              } catch (e) {
                console.log("[v0] Audio blocked by browser:", e)
                setIsMuted(true)
              }
            }

            // Try to enable audio immediately
            setTimeout(enableAudio, 500)

            // Also try on first user interaction
            const handleFirstInteraction = () => {
              enableAudio()
              document.removeEventListener("click", handleFirstInteraction)
              document.removeEventListener("touchstart", handleFirstInteraction)
            }

            document.addEventListener("click", handleFirstInteraction)
            document.addEventListener("touchstart", handleFirstInteraction)
          },
          onStateChange: (event: any) => {
            console.log("[v0] Player state changed:", event.data)
            // @ts-ignore
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              // @ts-ignore
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            }
          },
          onError: (event: any) => {
            console.log("[v0] Player error:", event.data)
          },
        },
      })
    } catch (error) {
      console.log("[v0] Error initializing player:", error)
    }
  }

  const togglePlayPause = () => {
    if (playerRef.current && isReady) {
      console.log("[v0] Toggling play/pause, currently playing:", isPlaying)
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
        if (isMuted) {
          try {
            playerRef.current.unMute()
            setIsMuted(false)
          } catch (e) {
            console.log("[v0] Could not unmute:", e)
          }
        }
      }
    }
  }

  const toggleMute = () => {
    if (playerRef.current && isReady) {
      console.log("[v0] Toggling mute, currently muted:", isMuted)
      if (isMuted) {
        playerRef.current.unMute()
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    }
  }

  const scrollToTestimonials = () => {
    const element = document.querySelector("#testimonials")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          {/* Typed Headline and Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-4 md:space-y-6 max-w-6xl px-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="block sm:inline">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
            
            {/* Book A Free Consultation Button - Right after title */}
            <div className="flex justify-center w-full pt-2">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/VTZMJcf2k9axPsM9Edc8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="btn-primary group w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                  <MessageCircle className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:animate-bounce" />
                  <span className="whitespace-nowrap">Book A Free Consultation</span>
                  <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="w-full max-w-4xl"
          >
            {/* Clean YouTube Video - No overlay */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              <div id="hero-youtube-player" className="w-full h-full"></div>
              
              {!isReady && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white text-lg">Loading video...</div>
                </div>
              )}
            </div>
          </motion.div>

          {/* We've generated text - Now after video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="space-y-6 md:space-y-8 max-w-6xl px-2"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
              We've generated our clients <span className="text-green-400 font-bold">100k+ in revenue</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Stop wasting money on ads that don't convert.</span>
            </p>
          </motion.div>

          {/* Watch Success Stories Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex justify-center w-full px-4"
          >
            <Button
              onClick={scrollToTestimonials}
              className="btn-secondary group w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              <Play className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">Watch Success Stories</span>
            </Button>
          </motion.div>

          {/* Platform Integration Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col items-center justify-center space-y-4 text-gray-400 px-4"
          >
            <span className="text-sm font-medium text-center">We dominate on:</span>
            <div className="flex space-x-4 sm:space-x-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/instagram-logo.png"
                  alt="Instagram Logo"
                  width={40}
                  height={40}
                  className="object-cover w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/facebook-logo.png"
                  alt="Facebook Logo"
                  width={40}
                  height={40}
                  className="object-cover w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  width={40}
                  height={40}
                  className="object-cover w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
