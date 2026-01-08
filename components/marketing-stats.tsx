"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedNumber from "./animated-number"
import { Users, Search, Camera, Globe } from "lucide-react"

const stats = [
  {
    platform: "Facebook",
    users: 3.07,
    unit: "Billion",
    description: "People Are on Facebook",
    icon: Users,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    platform: "Instagram",
    users: 1.1,
    unit: "Billion",
    description: "Users per year",
    icon: Camera,
    gradient: "from-pink-500 to-purple-600",
  },
  {
    platform: "Google",
    users: 8,
    unit: "Billion",
    description: "Searches per year",
    icon: Search,
    gradient: "from-green-500 to-blue-500",
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export default function MarketingStats() {
  return (
    <section className="relative py-24 md:py-32 section-gradient-2 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8">
            <Globe className="w-5 h-5 text-orange-400 mr-2" />
            <span className="text-orange-300 font-medium">Market Insights</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white text-glow">Marketing Stats</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              You Need to Know
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            Your audience is online. The question is—are you? We place your brand where your customers spend their time.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid gap-8 md:grid-cols-3 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.platform} variants={itemVariants}>
              <Card className="glass-card rounded-3xl overflow-hidden h-full group">
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{stat.platform}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">
                      <AnimatedNumber value={stat.users} />
                    </span>
                    <span className="text-3xl font-bold text-gray-300 ml-2">{stat.unit}</span>
                  </div>
                  <p className="text-gray-400 text-lg">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center"
        >
          <div className="inline-flex items-center px-8 py-4 rounded-full glass-card">
            <p className="text-2xl text-cyan-300 font-bold">Scroll. Click. Convert.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
