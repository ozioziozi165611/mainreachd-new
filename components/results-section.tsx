"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedNumber from "./animated-number"
import { TrendingUp, Users, Eye, DollarSign, BarChart3 } from "lucide-react"

const campaigns = [
  {
    name: "ADL Auto",
    duration: "30 days",
    conversations: 79,
    reach: 22006,
    impressions: 37942,
    costPerConvo: 6.8,
    totalSpent: 537,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Gutter Gurus SA",
    duration: "Campaign Period",
    conversations: 183,
    reach: 10265,
    impressions: 15969,
    costPerConvo: 6.07,
    totalSpent: 1110,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Bondoc Detailing",
    duration: "11 days",
    conversations: 84,
    reach: 10265,
    impressions: 15969,
    costPerConvo: 2.64,
    totalSpent: 222,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Client",
    duration: "Campaign Period",
    conversations: 154,
    reach: 12000,
    impressions: 18500,
    costPerConvo: 4.03,
    totalSpent: 621,
    color: "from-orange-500 to-red-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function ResultsSection() {
  return (
    <section id="results" className="relative py-24 md:py-32 section-gradient-1 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8">
            <BarChart3 className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-cyan-300 font-medium">Real Results</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white text-glow">Our Work, Our Results</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Our Community
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            Real campaigns, real results. See how we've transformed our clients' advertising performance with
            data-driven strategies and creative excellence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {campaigns.map((campaign, index) => (
            <motion.div key={campaign.name} variants={itemVariants}>
              <Card className="glass-card rounded-3xl overflow-hidden h-full group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl text-white font-bold">{campaign.name}</CardTitle>
                    <span className="text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {campaign.duration}
                    </span>
                  </div>
                  <div className={`h-1 w-full bg-gradient-to-r ${campaign.color} rounded-full`} />
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-xl p-4 text-center group-hover:scale-105 transition-transform">
                    <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 mb-1">Conversations</p>
                    <p className="text-2xl font-bold text-white">
                      <AnimatedNumber value={campaign.conversations} />
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-4 text-center group-hover:scale-105 transition-transform">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 mb-1">Reach</p>
                    <p className="text-2xl font-bold text-white">
                      <AnimatedNumber value={campaign.reach} />
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-4 text-center group-hover:scale-105 transition-transform">
                    <Eye className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 mb-1">Impressions</p>
                    <p className="text-2xl font-bold text-white">
                      <AnimatedNumber value={campaign.impressions} />
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-4 text-center group-hover:scale-105 transition-transform">
                    <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 mb-1">Cost/Convo</p>
                    <p className="text-2xl font-bold text-white">
                      $<AnimatedNumber value={campaign.costPerConvo} />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
