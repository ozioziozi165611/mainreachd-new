"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Play, Pause, Volume2, VolumeX, RotateCcw, FastForward, Rewind, Maximize, Minimize } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isUserSeeking, setIsUserSeeking] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentText, setCurrentText] = useState("We'll Get Your Business 100+ Qualified Leads... AND Book Them In For You.")
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const mobileText = "We'll Get Your Business 100+ Qualified Leads... AND Book Them In For You."
  const desktopText = "We'll Get Your Business 100+ Qualified Leads... AND Book Them In For You."
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < currentText.length) {
        setTypedText(currentText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [currentText])

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Update text based on mobile detection
  useEffect(() => {
    const newText = isMobile ? mobileText : desktopText
    setCurrentText(newText)
    setTypedText("") // Reset typed text to restart animation
  }, [isMobile, mobileText, desktopText])

  useEffect(() => {
    // Set up video when it loads - mobile-aware autoplay
    if (videoRef.current && isVideoLoaded) {
      const video = videoRef.current
      
      if (isMobile) {
        // Mobile: Keep audio on by default, only mute if explicitly needed
        video.muted = false
        setIsMuted(false)
        video.volume = 0.8
        setVolume(0.8)
        
        video.play().then(() => {
          setIsPlaying(true)
          // Try to ensure audio stays on for mobile
          setTimeout(() => {
            if (video.muted) {
              video.muted = false
              setIsMuted(false)
            }
          }, 1000)
        }).catch((error) => {
          console.log('Mobile autoplay with audio failed, keeping audio on but paused:', error)
          // Don't mute on mobile, just pause if needed
          setIsPlaying(false)
        })
      } else {
        // Desktop: Try autoplay with audio first
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
    }
  }, [isVideoLoaded, isMobile])
  
  // Fix dependency warning by ensuring stable dependencies
  const mobileDetected = isMobile
  const videoLoaded = isVideoLoaded
  
  useEffect(() => {
    // Apply mobile-specific video settings when mobile detection changes
    if (videoRef.current && videoLoaded && mobileDetected) {
      const video = videoRef.current
      // Allow mobile videos to play with audio (will fallback to muted if blocked)
      // No longer forcing muted state
    }
  }, [mobileDetected, videoLoaded])

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
        
        // On mobile, show controls briefly when enabling audio
        if (isMobile) {
          setShowControls(true)
          setTimeout(() => setShowControls(false), 2000)
        }
        
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

  // Auto-hide controls functionality - Mobile optimized
  const startHideControlsTimer = () => {
    // Only hide controls if video is playing and user is not seeking
    if (!isPlaying || isUserSeeking) {
      return
    }
    
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current)
    }
    
    // Longer timer for mobile devices to allow easier interaction with controls
    const hideDelay = isMobile ? 3000 : 3000
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false)
    }, hideDelay)
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

  // Touch/mobile handlers - Enhanced for mobile experience
  const handleTouch = () => {
    if (isMobile) {
      // On mobile, show controls and start hide timer
      setShowControls(true)
      clearHideControlsTimer()
      startHideControlsTimer()
    } else {
      setShowControls(true)
      clearHideControlsTimer()
      startHideControlsTimer()
    }
  }

  const handleVideoClick = () => {
    // Toggle play/pause and show controls
    togglePlayPause()
    setShowControls(true)
    clearHideControlsTimer()
    // Start hide timer - will auto-hide after 3 seconds if playing
    startHideControlsTimer()
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

  const toggleFullscreen = () => {
    if (!videoRef.current) return

    if (!isFullscreen) {
      // iOS Safari requires webkitEnterFullscreen for video elements
      if ((videoRef.current as any).webkitEnterFullscreen) {
        ;(videoRef.current as any).webkitEnterFullscreen()
      } else if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        // Safari desktop
        ;(videoRef.current as any).webkitRequestFullscreen()
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        // Firefox
        ;(videoRef.current as any).mozRequestFullScreen()
      } else if ((videoRef.current as any).msRequestFullscreen) {
        // IE/Edge
        ;(videoRef.current as any).msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        ;(document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        ;(document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        ;(document as any).msExitFullscreen()
      }
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

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
            
            {/* Book A Free Consultation Button - Mobile Optimized Positioning */}
            <div className="flex justify-center w-full mt-4 sm:mt-2 md:mt-4">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/LJBzpKtGPBFoJmDVND4t"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-0"
              >
                <Button className="btn-primary group w-full sm:w-auto text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-8 shadow-2xl border-2 border-orange-400/40 hover:border-orange-300/60 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-400 hover:via-orange-500 hover:to-red-500 transform hover:scale-[1.02] active:scale-[0.95] transition-all duration-300 rounded-2xl backdrop-blur-sm touch-manipulation select-none min-h-[56px]">
                  <MessageCircle className="mr-2 sm:mr-3 md:mr-4 lg:mr-5 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:animate-bounce flex-shrink-0" />
                  <span className="font-bold drop-shadow-lg">Book A Free Consultation</span>
                  <ArrowRight className="ml-2 sm:ml-3 md:ml-4 lg:ml-5 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* iPhone-Enhanced Revenue Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="space-y-6 md:space-y-8 max-w-6xl px-4 sm:px-6"
          >
            <p className="text-sm sm:text-xl md:text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-medium text-center px-1 sm:px-2">
              We handle the strategy, testing, and creation, as well as assigning you a <span className="text-green-400 font-bold bg-green-400/10 px-1 sm:px-2 py-1 rounded-lg whitespace-nowrap">personal appointment setter</span> so you only speak with real enquiries. Click above to find out how it works.
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
