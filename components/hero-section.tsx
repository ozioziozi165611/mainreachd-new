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
  const [currentText, setCurrentText] = useState("See How Local AUSSIE Businesses Have DOUBLED Their Revenue Through Meta Marketing")
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const mobileText = "See How Local AUSSIE Businesses Have DOUBLED Their Revenue Through Meta Marketing"
  const desktopText = "See How Local AUSSIE Businesses Have DOUBLED Their Revenue Through Meta Marketing"
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
        // Mobile: Try autoplay with audio first, fallback to muted
        video.muted = false
        setIsMuted(false)
        
        video.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.log('Mobile autoplay with audio failed, trying muted:', error)
          // Browser blocked audio autoplay, fallback to muted
          video.muted = true
          setIsMuted(true)
          
          video.play().then(() => {
            setIsPlaying(true)
          }).catch((err) => {
            console.log('Mobile autoplay completely failed:', err)
            setIsPlaying(false)
          })
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
    
    // Much shorter timer for mobile devices for cleaner experience
    const hideDelay = isMobile ? 1200 : 3000
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
      // On mobile, toggle controls visibility for cleaner interface
      setShowControls(!showControls)
      if (!showControls) {
        clearHideControlsTimer()
        startHideControlsTimer()
      }
    } else {
      setShowControls(true)
      clearHideControlsTimer()
      startHideControlsTimer()
    }
  }

  const handleVideoClick = () => {
    if (isMobile) {
      // On mobile, just show controls for audio control
      setShowControls(true)
      setTimeout(() => setShowControls(false), 2000)
    } else {
      // Desktop behavior - show controls and toggle play
      setShowControls(true)
      clearHideControlsTimer()
      togglePlayPause()
      startHideControlsTimer()
    }
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
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        // Safari
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
            <div className="flex justify-center w-full -mt-6 sm:mt-2 md:mt-4">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/VTZMJcf2k9axPsM9Edc8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="btn-primary group w-full sm:w-auto text-base sm:text-xl md:text-xl lg:text-2xl px-6 sm:px-12 md:px-12 lg:px-16 py-3 sm:py-5 md:py-7 lg:py-9 shadow-2xl border-2 border-orange-400/40 hover:border-orange-300/60 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-400 hover:via-orange-500 hover:to-red-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-2xl backdrop-blur-sm">
                  <MessageCircle className="mr-2 sm:mr-4 md:mr-4 lg:mr-5 h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:animate-bounce" />
                  <span className="whitespace-nowrap font-bold drop-shadow-lg">Book A Free Consultation</span>
                  <ArrowRight className="ml-2 sm:ml-4 md:ml-4 lg:ml-5 h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl px-2 sm:px-4 md:px-6"
          >
            {/* VSL Player - Professional & Mobile Optimized */}
            <div 
              className="w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black relative ring-1 ring-orange-500/20 hover:ring-orange-500/40 transition-all duration-500 backdrop-blur-sm transform hover:scale-[1.01] active:scale-[0.99] mobile-no-cursor"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover transition-all duration-300 mobile-no-cursor"
                muted={isMuted}
                autoPlay
                playsInline
                preload="auto"
                webkit-playsinline="true"
                x5-playsinline="true"
                onLoadedData={handleVideoLoaded}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onError={handleVideoError}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                  }
                }}
                onCanPlay={() => {}}
                onClick={handleVideoClick}
                style={{
                  WebkitTransform: 'translateZ(0)',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <source src="/videos/draft-4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Audio Control - Only On Hover/Touch */}
              {showControls && isMuted && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 left-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-lg shadow-lg transition-all duration-300"
                  title="Unmute"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
              {showControls && !isMuted && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 left-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-lg shadow-lg transition-all duration-300"
                  title="Mute"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
              
              {/* Fullscreen Button - Shows on Both Mobile and Desktop */}
              {showControls && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-lg shadow-lg transition-all duration-300"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </button>
              )}
              
              {/* VSL Controls - Mobile Simplified & Desktop Professional */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-all duration-500 ease-out backdrop-blur-lg border-t border-white/10 ${
                showControls ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-3 pointer-events-none'
              } ${
                isMobile ? 'p-1.5' : 'p-2 sm:p-3 md:p-4'
              }`}>
                
                {/* Progress Bar - Simplified for Mobile */}
                {!isMobile && (
                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                      <span className="text-white/95 text-xs sm:text-sm font-semibold min-w-[35px] sm:min-w-[40px] tracking-wide">
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
                          className="w-full h-2 sm:h-3 bg-white/30 rounded-full appearance-none cursor-pointer slider touch-manipulation hover:h-3 sm:hover:h-4 transition-all duration-200"
                          style={{
                            background: `linear-gradient(to right, #ea580c 0%, #f97316 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.3) ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.3) 100%)`,
                            WebkitAppearance: 'none',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <span className="text-white/95 text-xs sm:text-sm font-semibold min-w-[35px] sm:min-w-[40px] tracking-wide">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Control Buttons - Desktop Only */}
                <div className="flex items-center justify-center">
                  {!isMobile && (
                    /* Desktop: Full Controls */
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                        {/* Rewind Button - Enhanced */}
                        <button
                          onClick={rewindVideo}
                          className="bg-black/70 hover:bg-black/85 active:bg-black/95 text-white p-2.5 sm:p-3 md:p-3.5 rounded-full transition-all duration-300 backdrop-blur-lg shadow-xl border border-white/40 hover:border-white/60 touch-manipulation transform hover:scale-110 active:scale-95 hover:shadow-2xl"
                          title="Rewind 10 seconds"
                        >
                          <Rewind className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </button>

                        {/* Play/Pause Button - Enhanced VSL Style */}
                        <button
                          onClick={togglePlayPause}
                          className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:via-orange-400 hover:to-red-500 active:from-orange-700 active:via-orange-600 active:to-red-700 text-white p-3 sm:p-4 md:p-5 rounded-full transition-all duration-300 backdrop-blur-lg shadow-2xl border-2 border-orange-400/60 hover:border-orange-300/80 touch-manipulation transform hover:scale-110 active:scale-95 ring-2 ring-orange-500/30 hover:ring-orange-400/50"
                          title={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          ) : (
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-0.5" />
                          )}
                        </button>

                        {/* Fast Forward Button - Enhanced */}
                        <button
                          onClick={fastForwardVideo}
                          className="bg-black/70 hover:bg-black/85 active:bg-black/95 text-white p-2.5 sm:p-3 md:p-3.5 rounded-full transition-all duration-300 backdrop-blur-lg shadow-xl border border-white/40 hover:border-white/60 touch-manipulation transform hover:scale-110 active:scale-95 hover:shadow-2xl"
                          title="Fast forward 10 seconds"
                        >
                          <FastForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </button>

                        {/* VSL Volume Controls - Desktop Only */}
                        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 ml-1 sm:ml-2 md:ml-3">
                          <button
                            onClick={toggleMute}
                            className={`${
                              isMuted 
                                ? 'bg-red-500/80 hover:bg-red-500/90 active:bg-red-600 border-red-400/60 ring-red-500/30' 
                                : 'bg-green-500/80 hover:bg-green-500/90 active:bg-green-600 border-green-400/60 ring-green-500/30'
                            } text-white p-2.5 sm:p-3 md:p-3.5 rounded-full transition-all duration-300 backdrop-blur-lg shadow-xl border-2 touch-manipulation transform hover:scale-110 active:scale-95 ring-2 hover:shadow-2xl`}
                            title={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? (
                              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            )}
                          </button>
                          
                          {/* Volume Slider - Desktop Only */}
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-10 sm:w-12 md:w-16 h-1.5 sm:h-2 bg-white/40 rounded-lg appearance-none cursor-pointer slider hidden md:block hover:bg-white/50 transition-all duration-200"
                            title="Volume"
                            style={{
                              background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.4) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.4) 100%)`
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* VSL Fullscreen Button - Desktop Only (Additional) */}
                      <div className="hidden sm:flex">
                        <button
                          onClick={toggleFullscreen}
                          className="bg-blue-500/80 hover:bg-blue-500/90 active:bg-blue-600 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold backdrop-blur-lg shadow-xl border-2 border-blue-400/60 ring-2 ring-blue-500/30 transition-all duration-300 transform hover:scale-110 active:scale-95"
                          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                          {isFullscreen ? (
                            <><Minimize className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" /> Exit</>
                          ) : (
                            <><Maximize className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" /> Full</>
                          )}
                        </button>
                      </div>
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
            <p className="text-sm sm:text-xl md:text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-medium text-center px-1 sm:px-2">
              We've generated our clients <span className="text-green-400 font-bold bg-green-400/10 px-1 sm:px-2 py-1 rounded-lg whitespace-nowrap">100k+ in revenue</span> Stop wasting money on ads that don't convert.
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
