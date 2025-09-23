"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Play, Pause, Volume2, VolumeX, RotateCcw, FastForward, Rewind } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "See How Local AUSSIE Businesses Have DOUBLED Their Revenue Through Meta Marketing"

  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isUserSeeking, setIsUserSeeking] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null)

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
    // Set up video when it loads - try audio first
    if (videoRef.current && isVideoLoaded) {
      const video = videoRef.current
      
      // Try autoplay with audio first (user's preference)
      video.muted = false
      setIsMuted(false)
      
      video.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        // Browser blocked audio autoplay, fallback to muted
        video.muted = true
        setIsMuted(true)
        
        video.play().then(() => {
          setIsPlaying(true)
        }).catch((err) => {
          setIsPlaying(false)
        })
      })
    }
  }, [isVideoLoaded])

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setCurrentTime(videoRef.current.currentTime)
    }
    setIsVideoLoaded(true)
  }
  
  const handleVideoError = (error: any) => {
    console.error("Video loading error:", error)
    setIsVideoLoaded(true) // Show controls even if there's an error
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          // Silently handle play failures
        })
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
      
      // Ensure video is playing when unmuting
      if (!newMutedState) {
        // Restore previous volume when unmuting
        videoRef.current.volume = volume > 0 ? volume : 0.8
        setVolume(videoRef.current.volume)
        
        if (!isPlaying) {
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch((error) => {
            // Silently handle play failures
          })
        }
      }
    }
  }

  const handleVideoPlay = () => {
    setIsPlaying(true)
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && !isUserSeeking) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (newTime: number) => {
    if (videoRef.current && videoRef.current.duration) {
      const clampedTime = Math.max(0, Math.min(newTime, videoRef.current.duration))
      videoRef.current.currentTime = clampedTime
      setCurrentTime(clampedTime)
    }
  }

  const handleSeekBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration
    setShowControls(true)
    handleSeek(newTime)
  }

  const rewindVideo = () => {
    const newTime = Math.max(0, currentTime - 10)
    handleSeek(newTime)
  }

  const fastForwardVideo = () => {
    const newTime = Math.min(duration, currentTime + 10)
    handleSeek(newTime)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      // Auto-unmute when volume is increased
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  // Auto-hide controls functionality
  const startHideControlsTimer = () => {
    // Only hide controls if video is playing and user is not seeking
    if (!isPlaying || isUserSeeking) {
      return
    }
    
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current)
    }
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false)
    }, 3000) // Hide after 3 seconds of inactivity
  }

  const clearHideControlsTimer = () => {
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current)
      hideControlsTimer.current = null
    }
  }

  const handleMouseEnter = () => {
    setShowControls(true)
    clearHideControlsTimer()
  }

  const handleMouseLeave = () => {
    startHideControlsTimer()
  }

  const handleMouseMove = () => {
    setShowControls(true)
    startHideControlsTimer()
  }

  // Touch/mobile handlers
  const handleTouch = () => {
    setShowControls(true)
    clearHideControlsTimer()
    startHideControlsTimer()
  }

  const handleVideoClick = () => {
    // Toggle play/pause on click/tap and show controls
    setShowControls(true)
    clearHideControlsTimer()
    togglePlayPause()
    // Keep controls visible for 4 seconds after interaction
    setTimeout(() => {
      startHideControlsTimer()
    }, 1000)
  }

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }
    }
  }, [])

  // Control visibility based on play state and seeking
  useEffect(() => {
    if (isPlaying && !isUserSeeking) {
      startHideControlsTimer()
    } else {
      // Keep controls visible when paused or seeking
      clearHideControlsTimer()
      setShowControls(true)
    }
  }, [isPlaying, isUserSeeking])


  const scrollToTestimonials = () => {
    const element = document.querySelector("#testimonials")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-16 sm:pt-28 md:pt-40 lg:pt-48 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-0 sm:space-y-4 md:space-y-6">
          {/* Typed Headline and Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-6xl px-4 sm:px-6"
          >
            <h1 className="text-[1.75rem] leading-[0.95] sm:text-3xl sm:leading-[1.2] md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-0">
              <span className="block sm:inline">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
            
            {/* Book A Free Consultation Button - Right after title */}
            <div className="flex justify-center w-full -mt-4 sm:mt-6 md:mt-8">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/VTZMJcf2k9axPsM9Edc8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="btn-primary group w-full sm:w-auto text-lg sm:text-xl md:text-xl lg:text-2xl px-8 sm:px-12 md:px-12 lg:px-16 py-4 sm:py-5 md:py-7 lg:py-9 shadow-2xl border-2 border-orange-400/40 hover:border-orange-300/60 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-400 hover:via-orange-500 hover:to-red-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-2xl backdrop-blur-sm">
                  <MessageCircle className="mr-3 sm:mr-4 md:mr-4 lg:mr-5 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:animate-bounce" />
                  <span className="whitespace-nowrap font-bold drop-shadow-lg">Book A Free Consultation</span>
                  <ArrowRight className="ml-3 sm:ml-4 md:ml-4 lg:ml-5 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="w-full max-w-5xl px-4 sm:px-6"
          >
            {/* Your Video - ZERO YouTube Overlays */}
            <div 
              className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative cursor-pointer ring-1 ring-white/10 backdrop-blur-sm"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                autoPlay
                loop
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoaded}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onError={handleVideoError}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onCanPlay={() => {}}
                onClick={handleVideoClick}
              >
                <source src="/videos/draft-4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              
              {/* iPhone-Optimized Video Controls - Auto-hide */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 transition-all duration-300 ease-in-out backdrop-blur-md ${
                showControls ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
              }`}>
                
                {/* iPhone-Optimized Seek Bar */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <span className="text-white/90 text-xs font-medium min-w-[35px] tracking-wide">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={duration > 0 ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeekBarChange}
                        onMouseDown={() => setIsUserSeeking(true)}
                        onMouseUp={() => setIsUserSeeking(false)}
                        onTouchStart={() => setIsUserSeeking(true)}
                        onTouchEnd={() => setIsUserSeeking(false)}
                        className="w-full h-2 sm:h-2 bg-white/25 rounded-full appearance-none cursor-pointer slider touch-manipulation"
                        style={{
                          background: `linear-gradient(to right, #f97316 0%, #f97316 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.25) ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.25) 100%)`
                        }}
                      />
                    </div>
                    <span className="text-white/90 text-xs font-medium min-w-[35px] tracking-wide">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* iPhone-Optimized Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Rewind Button */}
                    <button
                      onClick={rewindVideo}
                      className="bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-3 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-md shadow-lg border border-white/30 hover:border-white/40 touch-manipulation"
                      title="Rewind 10 seconds"
                    >
                      <Rewind className="w-4 h-4 sm:w-4 sm:h-4" />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlayPause}
                      className="bg-orange-600/80 hover:bg-orange-600 active:bg-orange-700 text-white p-3.5 sm:p-4 rounded-full transition-all duration-200 backdrop-blur-md shadow-xl border border-orange-400/40 hover:border-orange-300/60 touch-manipulation transform hover:scale-105 active:scale-95"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                      )}
                    </button>

                    {/* Fast Forward Button */}
                    <button
                      onClick={fastForwardVideo}
                      className="bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-3 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-md shadow-lg border border-white/30 hover:border-white/40 touch-manipulation"
                      title="Fast forward 10 seconds"
                    >
                      <FastForward className="w-4 h-4 sm:w-4 sm:h-4" />
                    </button>

                    {/* iPhone-Optimized Volume Controls */}
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-2 sm:ml-3">
                      <button
                        onClick={toggleMute}
                        className={`${
                          isMuted 
                            ? 'bg-red-500/70 hover:bg-red-500/80 active:bg-red-600 border-red-400/40' 
                            : 'bg-green-500/70 hover:bg-green-500/80 active:bg-green-600 border-green-400/40'
                        } text-white p-3 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-md shadow-lg border touch-manipulation transform hover:scale-105 active:scale-95`}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 sm:w-4 sm:h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4 sm:w-4 sm:h-4" />
                        )}
                      </button>
                      
                      {/* Volume Slider - Hidden on mobile */}
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-12 sm:w-16 h-1 sm:h-2 bg-white/30 rounded-lg appearance-none cursor-pointer slider hidden sm:block"
                        title="Volume"
                      />
                    </div>
                  </div>
                  
                  {/* iPhone-Style Audio Status */}
                  {isMuted && (
                    <div className="bg-red-500/90 text-white px-3 py-2 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg border border-red-400/40">
                      🔇 Audio Off
                    </div>
                  )}
                  
                  {!isMuted && (
                    <div className="bg-green-500/90 text-white px-3 py-2 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg border border-green-400/40">
                      🔊 Audio On
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* iPhone-Enhanced Revenue Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="space-y-6 md:space-y-8 max-w-6xl px-4 sm:px-6"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
              We've generated our clients <span className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-lg">100k+ in revenue</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0"> Stop wasting money on ads that don't convert.</span>
            </p>
          </motion.div>

          {/* iPhone-Enhanced Success Stories Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="flex justify-center w-full px-4 sm:px-6"
          >
            <Button
              onClick={scrollToTestimonials}
              className="btn-secondary group w-full sm:w-auto text-base sm:text-lg md:text-lg px-8 sm:px-10 md:px-8 py-4 sm:py-5 md:py-4 bg-white/10 hover:bg-white/15 active:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl"
            >
              <Play className="mr-3 md:mr-3 h-5 w-5 sm:h-6 sm:w-6 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap font-semibold">Watch Success Stories</span>
            </Button>
          </motion.div>

          {/* iPhone-Enhanced Platform Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col items-center justify-center space-y-5 text-gray-300 px-4 sm:px-6"
          >
            <span className="text-sm font-semibold text-center tracking-wide">We dominate on:</span>
            <div className="flex space-x-5 sm:space-x-6">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Image
                  src="/images/instagram-logo.png"
                  alt="Instagram Logo"
                  width={44}
                  height={44}
                  className="object-cover w-7 h-7 sm:w-8 sm:h-8"
                />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Image
                  src="/images/facebook-logo.png"
                  alt="Facebook Logo"
                  width={44}
                  height={44}
                  className="object-cover w-7 h-7 sm:w-8 sm:h-8"
                />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Image
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  width={44}
                  height={44}
                  className="object-cover w-7 h-7 sm:w-8 sm:h-8"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
