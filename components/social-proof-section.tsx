"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedNumber from "./animated-number"
import { TrendingUp, Users, DollarSign, Target } from "lucide-react"

const stats = [
  {
    icon: DollarSign,
    value: 2.1,
    suffix: "M+",
    label: "Revenue Generated",
    color: "text-green-400",
    description: "For our clients in 2024",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Clients",
    color: "text-blue-400",
    description: "Across 15+ industries",
  },
  {
    icon: TrendingUp,
    value: 5.2,
    suffix: "x",
    label: "Average ROI",
    color: "text-purple-400",
    description: "Return on ad spend",
  },
  {
    icon: Target,
    value: 92,
    suffix: "%",
    label: "Success Rate",
    color: "text-orange-400",
    description: "Campaigns that profit",
  },
]

const clientLogos = [
  "ADL Auto",
  "Gutter Gurus SA",
  "Bondoc Detailing",
  "Client",
  "Window Masters",
  "Clean Pro",
  "Detail Kings",
  "Forecast Pro",
]

export default function SocialProofSection() {
  return (
    <section className="relative py-16 md:py-24 trust-bg overflow-hidden">
      <div className="absolute inset-0 mesh-2"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gray-400 text-lg mb-8">Trusted by industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {clientLogos.map((logo, index) => (
              <div key={index} className="social-proof rounded-xl p-4 text-center">
                <p className="text-gray-300 font-semibold">{logo}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="results-card rounded-3xl p-8 text-center h-full">
                <CardContent className="p-0">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 mb-6`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      <AnimatedNumber value={stat.value} />
                      {stat.suffix}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                  <p className="text-gray-400 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
