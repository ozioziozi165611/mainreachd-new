"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Eye,
  Clock,
  Target,
  TrendingUp,
  MessageCircle,
  DollarSign,
  Users,
  ArrowUpRight,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import AnimatedNumber from "./animated-number" // Keep this import for ROI and Revenue
import Image from "next/image"
import { useState, useRef, useEffect, useCallback } from "react"
import { loadYouTubeAPI, isYouTubeAPIReady } from "@/lib/youtube"

const overallStats = [
  {
    icon: Eye,
    title: "Total Views",
    value: 125000,
    suffix: "+",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    title: "Engagement Rate",
    value: 8.5,
    suffix: "%",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Target,
    title: "Conversion Rate",
    value: 12.3,
    suffix: "%",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Clock,
    title: "Avg Watch Time",
    value: 15,
    suffix: "s",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
]

const gutterGurusData = {
  company: "Gutter Gurus SA",
  logo: "/images/gutter-gurus-logo.jpg",
  industry: "Home Services",
  conversations: 199,
  costPerConvo: 6.07,
  reach: 10265,
  adSpend: 1110,
  revenue: 27000,
  roi: 1800,
  timeframe: "30 days",
  videoTitle: "GUTTER CLEANING AD 11",
  plays: 43178,
  avgPlayTime: "00:05",
  hookRate: 38,
  holdRate: 13.53,
  videoLength: "00:20",
  views: 22800,
  engagement: 7.2,
  description: "Home services campaign showcasing before/after transformations that generated $27,000 in revenue",
  youtubeId: "6HnU7D4kSj8",
}

export default function VideoPerformanceInteractive() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false) // Changed to false for auto audio
  const [showControls, setShowControls] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(20)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)

  const [player, setPlayer] = useState<any>(null)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [controlsTimeout])

  useEffect(() => {
    const initializeVideo = async () => {
      try {
        setIsLoading(true)
        setHasError(false)
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('YouTube API timeout')), 10000)
        )
        
        await Promise.race([loadYouTubeAPI(), timeoutPromise])
        
        if (!isYouTubeAPIReady()) {
          console.error("[VideoPerformance] YouTube API not ready after loading")
          setHasError(true)
          setIsLoading(false)
          return
        }

        const newPlayer = new window.YT.Player("performance-youtube-player", {
          height: "100%",
          width: "100%",
          videoId: gutterGurusData.youtubeId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
            loop: 1,
            playlist: gutterGurusData.youtubeId,
          },
          events: {
            onReady: (event: any) => {
              console.log("[v0] YouTube player ready")
              setPlayer(event.target)
              setIsVideoReady(true)
              setIsLoading(false)
              setDuration(event.target.getDuration() || 20)
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
                setIsLoading(false)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
                setIsLoading(false)
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false)
                setCurrentTime(0)
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                setIsLoading(true)
              }
            },
            onError: (event: any) => {
              console.error("[VideoPerformance] YouTube player error:", event.data)
              setHasError(true)
              setIsLoading(false)
            },
          },
        })
        setPlayer(newPlayer)
      } catch (error) {
        console.log("[v0] Error creating YouTube player:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    // Actually call the initialization function
    initializeVideo()

    return () => {
      if (player && typeof player.destroy === "function") {
        player.destroy()
      }
    }
  }, [])

  // Update current time
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && player) {
      interval = setInterval(() => {
        if (player.getCurrentTime) {
          setCurrentTime(player.getCurrentTime())
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, player])

  const handlePlayPause = useCallback(() => {
    if (!player || !isVideoReady) return

    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }, [player, isPlaying, isVideoReady])

  const handleMuteToggle = useCallback(() => {
    if (!player || !isVideoReady) return

    if (isMuted) {
      player.unMute()
      setIsMuted(false)
    } else {
      player.mute()
      setIsMuted(true)
    }
  }, [player, isMuted, isVideoReady])

  const handleRestart = useCallback(() => {
    if (!player || !isVideoReady) return
    player.seekTo(0)
    setCurrentTime(0)
  }, [player, isVideoReady])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatNumber = (value: number) => {
    return Intl.NumberFormat("en-US", {
      minimumFractionDigits: value % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: value % 1 !== 0 ? 2 : 0,
    }).format(value)
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section
      id="video-performance"
      className="relative py-20 md:py-28 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-purple-900/10 to-blue-900/10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 mb-8 text-lg px-6 py-3">
            <Play className="w-5 h-5 mr-2" />
            Video Performance & Results
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Videos That</span>
            <br />
            <span className="text-pink-400 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">
              Convert Like Crazy
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our video content doesn't just get views - it gets results. See how our creative approach turns viewers into
            customers and generates real revenue.
          </p>
        </motion.div>

        {/* Overall Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {overallStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:border-pink-500/30 transition-all duration-300"
            >
              <CardContent className="p-0 space-y-4">
                <div className={`w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto`}>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {formatNumber(stat.value)}
                    {stat.suffix}
                  </p>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Campaign Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Clean Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Clean Video Player Card */}
            <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              {/* Video Container - Clean with no overlays */}
              <div
                ref={containerRef}
                className="relative bg-black group cursor-pointer overflow-hidden"
                style={{ aspectRatio: "9/16", height: "500px" }}
                onMouseEnter={() => !isMobile && setShowControls(true)}
                onMouseLeave={() => !isMobile && setShowControls(false)}
                onTouchStart={() => {
                  if (isMobile) {
                    setShowControls(true)
                    // Clear existing timeout and reset hide timer
                    if (controlsTimeout) {
                      clearTimeout(controlsTimeout)
                    }
                    const newTimeout = setTimeout(() => {
                      setShowControls(false)
                    }, 4000)
                    setControlsTimeout(newTimeout)
                  }
                }}
                onClick={(e) => {
                  handlePlayPause()
                }}
              >
                {!hasError ? (
                  <div
                    id="performance-youtube-player"
                    className="absolute inset-0 w-full h-full"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-white text-lg font-semibold mb-2">Video Unavailable</p>
                      <p className="text-gray-400 text-sm">This video is currently unavailable or private.</p>
                    </div>
                  </div>
                )}

                {/* Minimal Controls - Show on hover (desktop) or always on mobile */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isMobile 
                      ? (showControls ? "opacity-100" : "opacity-0")
                      : (showControls ? "opacity-100" : "opacity-0")
                  } pointer-events-none`}
                >
                  {/* Center Play Button Only */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayPause()
                        // On mobile, reset the hide timer
                        if (isMobile) {
                          if (controlsTimeout) {
                            clearTimeout(controlsTimeout)
                          }
                          const newTimeout = setTimeout(() => {
                            setShowControls(false)
                          }, 4000)
                          setControlsTimeout(newTimeout)
                        }
                      }}
                      disabled={!isVideoReady}
                      className="video-control-button video-play-large bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed active:bg-white/40"
                    >
                      {isLoading ? (
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="w-10 h-10 text-white" />
                      ) : (
                        <Play className="w-10 h-10 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Minimal Side Controls */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMuteToggle()
                        // On mobile, reset the hide timer
                        if (isMobile) {
                          if (controlsTimeout) {
                            clearTimeout(controlsTimeout)
                          }
                          const newTimeout = setTimeout(() => {
                            setShowControls(false)
                          }, 4000)
                          setControlsTimeout(newTimeout)
                        }
                      }}
                      className="video-control-button bg-black/40 backdrop-blur-sm hover:bg-black/60 active:bg-black/70"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {(isLoading || !isVideoReady) && !hasError && (
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white">Loading video...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">High-Converting Shorts Campaign</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{gutterGurusData.description}</p>

                {/* Video Performance Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-slate-700/30 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-400">{formatNumber(gutterGurusData.hookRate)}%</p>
                    <p className="text-xs text-gray-400">Hook Rate</p>
                  </div>
                  <div className="text-center bg-slate-700/30 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">{formatNumber(gutterGurusData.holdRate)}%</p>
                    <p className="text-xs text-gray-400">Hold Rate</p>
                  </div>
                  <div className="text-center bg-slate-700/30 rounded-lg p-3">
                    <p className="text-2xl font-bold text-purple-400">{formatNumber(gutterGurusData.engagement)}%</p>
                    <p className="text-xs text-gray-400">Engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Results and Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Company Header Card */}
            <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-slate-600/50">
                    <Image
                      src={gutterGurusData.logo || "/placeholder.svg"}
                      alt={`${gutterGurusData.company} logo`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{gutterGurusData.company}</h3>
                    <p className="text-gray-400 text-sm">{gutterGurusData.industry}</p>
                    <p className="text-cyan-400 text-xs font-medium">{gutterGurusData.timeframe}</p>
                  </div>
                </div>

                <Badge className="bg-orange-500/20 text-orange-200 border-orange-500/30 px-3 py-1 mb-4">
                  Record ROI Achievement
                </Badge>
              </CardContent>
            </Card>

            {/* ROI Showcase */}
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
              <CardContent className="p-0 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 mb-2 font-medium">Return on Investment</p>
                    <p className="text-5xl font-bold text-green-400 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                      <AnimatedNumber value={gutterGurusData.roi} />%
                    </p>
                  </div>
                  <ArrowUpRight className="w-16 h-16 text-green-400" />
                </div>
              </CardContent>
            </Card>

            {/* Revenue Display */}
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
              <CardContent className="p-0 relative text-center">
                <p className="text-sm text-gray-300 mb-2 font-medium">Revenue Generated</p>
                <p className="text-4xl font-bold text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                  $<AnimatedNumber value={gutterGurusData.revenue} />
                </p>
              </CardContent>
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 text-center">
                <CardContent className="p-0">
                  <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-1 font-medium">Conversations</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(gutterGurusData.conversations)}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 text-center">
                <CardContent className="p-0">
                  <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-1 font-medium">Cost/Conversation</p>
                  <p className="text-2xl font-bold text-white">${formatNumber(gutterGurusData.costPerConvo)}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 text-center">
                <CardContent className="p-0">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-1 font-medium">People Reached</p>
                  <p className="text-lg font-bold text-white">{formatNumber(gutterGurusData.reach)}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 text-center">
                <CardContent className="p-0">
                  <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-1 font-medium">Ad Spend</p>
                  <p className="text-lg font-bold text-white">${formatNumber(gutterGurusData.adSpend)}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        ></motion.div>
      </div>
    </section>
  )
}
