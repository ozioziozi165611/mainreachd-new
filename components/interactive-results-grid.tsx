"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedNumber from "./animated-number"
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, Zap, MessageCircle } from "lucide-react"
import Image from "next/image"

const results = [
  {
    company: "ADL Auto",
    logo: "/images/adl-auto-logo.jpg",
    industry: "Automotive Detailing",
    conversations: 79,
    costPerConvo: 6.8,
    reach: 22000,
    impressions: 38000,
    adSpend: 537,
    roi: 420,
    gradient: "from-blue-500 to-cyan-500",
    icon: TrendingUp,
    highlight: "Best CPL in Industry",
    timeframe: "30 days",
  },
  {
    company: "Gutter Gurus SA",
    logo: "/images/gutter-gurus-logo.jpg",
    industry: "Home Services",
    conversations: 183,
    costPerConvo: 6.07,
    reach: 10265,
    impressions: 15000,
    adSpend: 1110,
    revenue: 20000,
    roi: 1800,
    gradient: "from-green-500 to-emerald-500",
    icon: Users,
    highlight: "Record ROI Achievement",
    timeframe: "30 days",
  },
  {
    company: "Bondoc Detailing",
    logo: "/images/bondoc-logo.jpg",
    industry: "Auto Detailing",
    conversations: 84,
    costPerConvo: 2.64,
    reach: 10000,
    impressions: 16000,
    adSpend: 220,
    roi: 680,
    gradient: "from-purple-500 to-pink-500",
    icon: Target,
    highlight: "Fastest Results",
    timeframe: "11 days",
  },
]

export default function InteractiveResultsGrid() {
  return (
    <section
      id="interactive-results"
      className="relative py-20 md:py-28 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-purple-900/10 to-pink-900/10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 mb-8 text-lg px-6 py-3">
            <Zap className="w-5 h-5 mr-2" />
            Live Results Dashboard
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Real Numbers From</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Real Campaigns
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            These aren't projections or estimates. These are actual results from our current clients' campaigns.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex justify-center"
            >
              <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full group hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 w-full max-w-sm">
                <CardContent className="p-0 flex flex-col h-full space-y-6">
                  {/* Company Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-slate-600/50">
                      <Image
                        src={result.logo || "/placeholder.svg"}
                        alt={`${result.company} logo`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{result.company}</h3>
                      <p className="text-gray-400 text-sm">{result.industry}</p>
                      <p className="text-cyan-400 text-xs font-medium">{result.timeframe}</p>
                    </div>
                  </div>

                  {/* Highlight Badge */}
                  <Badge className="bg-orange-500/20 text-orange-200 border-orange-500/30 self-start px-3 py-1">
                    {result.highlight}
                  </Badge>

                  {/* ROI Showcase */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-300 mb-2 font-medium">Return on Investment</p>
                        <p className="text-4xl font-bold text-green-400 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                          <AnimatedNumber value={result.roi} />%
                        </p>
                      </div>
                      <ArrowUpRight className="w-8 h-8 text-green-400 group-hover:scale-125 transition-transform" />
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-xl p-4 text-center backdrop-blur-sm border border-slate-600/30">
                      <MessageCircle className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1 font-medium">Conversations</p>
                      <p className="text-2xl font-bold text-white">
                        <AnimatedNumber value={result.conversations} />
                      </p>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-4 text-center backdrop-blur-sm border border-slate-600/30">
                      <DollarSign className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1 font-medium">Cost/Conversation</p>
                      <p className="text-2xl font-bold text-white">
                        $<AnimatedNumber value={result.costPerConvo} />
                      </p>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-xl p-4 text-center backdrop-blur-sm border border-slate-600/30">
                      <Users className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1 font-medium">People Reached</p>
                      <p className="text-lg font-bold text-white">
                        <AnimatedNumber value={result.reach} />
                      </p>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-4 text-center backdrop-blur-sm border border-slate-600/30">
                      <Target className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1 font-medium">Ad Spend</p>
                      <p className="text-lg font-bold text-white">
                        $<AnimatedNumber value={result.adSpend} />
                      </p>
                    </div>
                  </div>

                  {/* Revenue Display for Gutter Gurus */}
                  {result.revenue && (
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 text-center border border-yellow-500/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
                      <div className="relative">
                        <p className="text-sm text-gray-300 mb-2 font-medium">Revenue Generated</p>
                        <p className="text-3xl font-bold text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                          $<AnimatedNumber value={result.revenue} />
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-10 border border-cyan-500/20 max-w-4xl mx-auto backdrop-blur-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join Them?</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              These results are typical for our clients. Your success story could be next.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              <Target className="mr-3 h-6 w-6" />
              Get Your Custom Strategy
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
