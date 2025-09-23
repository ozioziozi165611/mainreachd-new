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
  const videoRef = useRef<HTMLVideoElement>(null)

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
        console.log("Video autoplay WITH AUDIO successful! 🔊")
      }).catch((error) => {
        console.log("Autoplay with audio blocked by browser, trying muted:", error)
        // Browser blocked audio autoplay, fallback to muted
        video.muted = true
        setIsMuted(true)
        
        video.play().then(() => {
          setIsPlaying(true)
          console.log("Video autoplay muted successful - click 🔊 for audio")
        }).catch((err) => {
          console.log("All autoplay blocked:", err)
          setIsPlaying(false)
        })
      })
    }
  }, [isVideoLoaded])

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully")
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
        videoRef.current.play()
        setIsPlaying(true)
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
            console.log("Audio enabled and video playing")
          }).catch((error) => {
            console.log("Could not start video with audio:", error)
          })
        }
      } else {
        console.log("Video muted")
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
      console.log("Video duration loaded:", videoRef.current.duration)
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


  const scrollToTestimonials = () => {
    const element = document.querySelector("#testimonials")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-32 md:pt-40 lg:pt-48">
      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Typed Headline and Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-3 sm:space-y-6 md:space-y-8 max-w-6xl px-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="block sm:inline">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
            
            {/* Book A Free Consultation Button - Right after title */}
            <div className="flex justify-center w-full">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/VTZMJcf2k9axPsM9Edc8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="btn-primary group w-full sm:w-auto text-lg md:text-xl lg:text-2xl px-8 md:px-12 lg:px-16 py-5 md:py-7 lg:py-9 shadow-2xl border-2 border-orange-400/30 hover:border-orange-300/50 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-400 hover:via-orange-500 hover:to-red-500 transform hover:scale-105 transition-all duration-300">
                  <MessageCircle className="mr-3 md:mr-4 lg:mr-5 h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:animate-bounce" />
                  <span className="whitespace-nowrap font-bold drop-shadow-lg">Book A Free Consultation</span>
                  <ArrowRight className="ml-3 md:ml-4 lg:ml-5 h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 group-hover:translate-x-1 transition-transform" />
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
            {/* Your Video - ZERO YouTube Overlays */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
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
                onCanPlay={() => console.log("Video can play")}
              >
                <source src="/videos/draft-4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              
              {/* Compact Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-3">
                
                {/* Seek Bar */}
                <div className="mb-2">
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                    <span className="text-white text-xs font-mono min-w-[30px] hidden sm:block">
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
                        className="w-full h-1 sm:h-2 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.3) ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.3) 100%)`
                        }}
                      />
                    </div>
                    <span className="text-white text-xs font-mono min-w-[30px] hidden sm:block">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Rewind Button */}
                    <button
                      onClick={rewindVideo}
                      className="bg-black/70 hover:bg-black text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow border border-white/20"
                      title="Rewind 10 seconds"
                    >
                      <Rewind className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlayPause}
                      className="bg-black/70 hover:bg-black text-white p-2 sm:p-2.5 rounded-full transition-all duration-200 backdrop-blur-sm shadow border border-white/20"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                      )}
                    </button>

                    {/* Fast Forward Button */}
                    <button
                      onClick={fastForwardVideo}
                      className="bg-black/70 hover:bg-black text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow border border-white/20"
                      title="Fast forward 10 seconds"
                    >
                      <FastForward className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    {/* Volume Controls */}
                    <div className="flex items-center space-x-1 sm:space-x-2 ml-1 sm:ml-2">
                      <button
                        onClick={toggleMute}
                        className={`${isMuted ? 'bg-red-600/80 hover:bg-red-700' : 'bg-green-600/80 hover:bg-green-700'} text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 backdrop-blur-sm shadow border border-white/20`}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
                  
                  {/* Compact Audio Status */}
                  {isMuted && (
                    <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm shadow border border-white/20">
                      🔇 Audio Off
                    </div>
                  )}
                  
                  {!isMuted && (
                    <div className="bg-green-600/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm shadow border border-white/20">
                      🔊 On
                    </div>
                  )}
                </div>
              </div>
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
