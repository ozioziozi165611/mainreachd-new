"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AnimatedNumber from "./animated-number"
import { TrendingUp, Users, Eye, DollarSign, ArrowUpRight } from "lucide-react"

const campaigns = [
  {
    name: "ADL Auto",
    industry: "Automotive",
    duration: "30 Days",
    investment: 537,
    conversations: 79,
    reach: 22006,
    impressions: 37942,
    costPerConvo: 6.8,
    roi: 4.2,
    gradient: "from-blue-500 to-cyan-500",
    highlight: "Best Cost Per Conversation",
  },
  {
    name: "Gutter Gurus SA",
    industry: "Home Services",
    duration: "60 Days",
    investment: 1110,
    conversations: 183,
    reach: 10265,
    impressions: 15969,
    costPerConvo: 6.07,
    roi: 18.0,
    gradient: "from-green-500 to-emerald-500",
    highlight: "Highest ROI Campaign",
  },
  {
    name: "Bondoc Detailing",
    industry: "Auto Detailing",
    duration: "11 Days",
    investment: 222,
    conversations: 84,
    reach: 10265,
    impressions: 15969,
    costPerConvo: 2.64,
    roi: 6.8,
    gradient: "from-purple-500 to-pink-500",
    highlight: "Fastest Results",
  },
]

export default function ResultsShowcase() {
  return (
    <section className="relative py-24 md:py-32 results-bg overflow-hidden">
      <div className="absolute inset-0 mesh-1"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-6 text-lg px-6 py-2">
            Real Results
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="headline">Our Clients Don't Just</span>
            <br />
            <span className="subheadline">Get Leads—They Get Sales</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every campaign is designed with one goal: maximum return on your investment. Here's proof it works.
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="results-card rounded-3xl overflow-hidden h-full group hover:scale-105 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold mb-1">{campaign.name}</CardTitle>
                      <p className="text-gray-400">{campaign.industry}</p>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      {campaign.highlight}
                    </Badge>
                  </div>

                  {/* ROI Highlight */}
                  <div className="glass-strong rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Return on Investment</p>
                        <p className="text-3xl font-bold text-green-400">
                          <AnimatedNumber value={campaign.roi} />x ROI
                        </p>
                      </div>
                      <ArrowUpRight className="h-8 w-8 text-green-400" />
                    </div>
                  </div>

                  <div className={`h-2 w-full bg-gradient-to-r ${campaign.gradient} rounded-full mb-4`} />
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-4 text-center">
                      <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Conversations</p>
                      <p className="text-2xl font-bold text-white">
                        <AnimatedNumber value={campaign.conversations} />
                      </p>
                    </div>

                    <div className="glass rounded-xl p-4 text-center">
                      <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Cost/Conv</p>
                      <p className="text-2xl font-bold text-white">
                        $<AnimatedNumber value={campaign.costPerConvo} />
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-4 text-center">
                      <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Reach</p>
                      <p className="text-lg font-bold text-white">
                        <AnimatedNumber value={campaign.reach} />
                      </p>
                    </div>

                    <div className="glass rounded-xl p-4 text-center">
                      <Eye className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Impressions</p>
                      <p className="text-lg font-bold text-white">
                        <AnimatedNumber value={campaign.impressions} />
                      </p>
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400 mb-1">Campaign Duration</p>
                    <p className="text-lg font-bold text-white">{campaign.duration}</p>
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
