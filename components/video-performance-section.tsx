"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedNumber from "./animated-number"
import { PlayCircle, Percent, Clock, Eye, Video } from "lucide-react"

const videoStats = [
  {
    title: "Window Cleaning Campaign",
    subtitle: "Your windows shouldn't look like this",
    plays: 10505,
    avgPlayTime: 7,
    hookRate: 41,
    holdRate: 13.19,
    length: "00:34",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Gutter Cleaning Campaign",
    subtitle: "Professional gutter maintenance",
    plays: 43178,
    avgPlayTime: 5,
    hookRate: 38,
    holdRate: 13.53,
    length: "00:20",
    gradient: "from-green-500 to-emerald-500",
  },
]

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function VideoPerformanceSection() {
  return (
    <section className="relative py-24 md:py-32 section-gradient-2 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8">
            <Video className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium">Video Analytics</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white text-glow">Video Performance</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              That Converts
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            See how audiences are engaging with your video creative. Our content captures attention and holds it with
            compelling storytelling and strategic design.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {videoStats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
            >
              <Card className="glass-card rounded-3xl overflow-hidden group">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold mb-2">{stat.title}</CardTitle>
                      <p className="text-gray-400">{stat.subtitle}</p>
                    </div>
                    <div className="text-right glass-card rounded-xl p-3">
                      <p className="text-sm text-gray-400 mb-1">Duration</p>
                      <p className="text-lg font-bold text-white">{stat.length}</p>
                    </div>
                  </div>
                  <div className={`h-1 w-full bg-gradient-to-r ${stat.gradient} rounded-full`} />
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="glass-card rounded-xl p-6 text-center group-hover:scale-105 transition-transform">
                      <PlayCircle className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Video Plays</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={stat.plays} />
                      </p>
                    </div>

                    <div className="glass-card rounded-xl p-6 text-center group-hover:scale-105 transition-transform">
                      <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Avg. Play Time</p>
                      <p className="text-3xl font-bold text-white">
                        00:0
                        <AnimatedNumber value={stat.avgPlayTime} />
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass-card rounded-xl p-6 text-center group-hover:scale-105 transition-transform">
                      <Percent className="h-8 w-8 text-green-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Hook Rate</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={stat.hookRate} />%
                      </p>
                    </div>

                    <div className="glass-card rounded-xl p-6 text-center group-hover:scale-105 transition-transform">
                      <Eye className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-400 mb-2">Hold Rate</p>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedNumber value={stat.holdRate} />%
                      </p>
                    </div>
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
