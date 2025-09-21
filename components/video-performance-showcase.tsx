"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedNumber from "./animated-number"
import { PlayCircle, Clock, TrendingUp, Eye, Video } from "lucide-react"

const videoData = [
  {
    title: "Window Cleaning Campaign",
    subtitle: "Your windows shouldn't look like this",
    videoLength: "00:34",
    plays: 10505,
    avgPlayTime: "00:07",
    hookRate: 41,
    holdRate: 13.19,
    gradient: "from-blue-500 to-cyan-500",
    description:
      "Analyse your video performance by time watched to uncover creative optimisation opportunities. Though a decrease in video play time is normal as the video elapses, significant drops may indicate a lack of engagement.",
  },
  {
    title: "Gutter Cleaning Campaign",
    subtitle: "Professional gutter maintenance",
    videoLength: "00:20",
    plays: 43178,
    avgPlayTime: "00:05",
    hookRate: 38,
    holdRate: 13.53,
    gradient: "from-green-500 to-emerald-500",
    description:
      "Analyse your video performance by time watched to uncover creative optimisation opportunities. Though a decrease in video play time is normal as the video elapses, significant drops may indicate a lack of engagement.",
  },
]

export default function VideoPerformanceShowcase() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-orange-900/10"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-8 text-lg px-6 py-3">
            <Video className="w-5 h-5 mr-2" />
            Video Performance Analytics
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">See How Audiences Are</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Engaging With Your Creative
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our video content captures attention and holds it with compelling storytelling and strategic design. Here's
            the proof in the performance data.
          </p>
        </motion.div>

        {/* Video Performance Cards */}
        <div className="grid lg:grid-cols-2 gap-12">
          {videoData.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="video-performance-card rounded-3xl overflow-hidden h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold mb-2">{video.title}</CardTitle>
                      <p className="text-gray-400">{video.subtitle}</p>
                    </div>
                    <div className="text-right glass-premium rounded-xl p-3">
                      <p className="text-sm text-gray-400 mb-1">Video length</p>
                      <p className="text-lg font-bold text-white">{video.videoLength}</p>
                    </div>
                  </div>
                  <div className={`h-2 w-full bg-gradient-to-r ${video.gradient} rounded-full`} />
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Main Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass-premium rounded-xl p-6 text-center glass-card-hover">
                      <PlayCircle className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Video plays</p>
                      <p className="text-4xl font-bold text-white">
                        <AnimatedNumber value={video.plays} />
                      </p>
                    </div>

                    <div className="glass-premium rounded-xl p-6 text-center glass-card-hover">
                      <Clock className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Video average play time</p>
                      <p className="text-4xl font-bold text-white">{video.avgPlayTime}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass-premium rounded-xl p-6 text-center glass-card-hover">
                      <TrendingUp className="h-10 w-10 text-green-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Hook rate</p>
                      <p className="text-4xl font-bold text-white">
                        <AnimatedNumber value={video.hookRate} />%
                      </p>
                    </div>

                    <div className="glass-premium rounded-xl p-6 text-center glass-card-hover">
                      <Eye className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Hold rate</p>
                      <p className="text-4xl font-bold text-white">
                        <AnimatedNumber value={video.holdRate} />%
                      </p>
                    </div>
                  </div>

                  {/* Performance Insight */}
                  <div className="glass-premium rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-3">Time watched</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{video.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
