"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, BarChart3, Target, Lightbulb, Shield } from "lucide-react"

const principles = [
  {
    icon: Brain,
    title: "Human-Powered Decisions",
    description: "Our strategy is led by data but we are not slaves to it – key decisions are human-powered.",
  },
  {
    icon: Users,
    title: "Globally Ambitious Clients",
    description:
      "We work with globally ambitious clients in need of greater certainty in a rapidly changing digital landscape.",
  },
  {
    icon: BarChart3,
    title: "Multi-Channel Campaigns",
    description:
      "We drive sustained, measured growth through multi-channel digital marketing campaigns across Facebook, Instagram, & Google.",
  },
  {
    icon: Target,
    title: "Owned, Paid & Earned Media",
    description: "Your owned, paid and earned media strategy designed for maximum impact and sustainable growth.",
  },
  {
    icon: Lightbulb,
    title: "Competitive Advantage",
    description:
      "We consistently outperform the market and our Client results, testimonials, strategy & performance demonstrates this.",
  },
  {
    icon: Shield,
    title: "Unrivalled Results",
    description:
      "Our clients benefit from this unrivalled competitive advantage in their organic and paid search, paid social and content production.",
  },
]

export default function HumanPoweredSection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-purple-900/10"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-lg px-6 py-3">Our Philosophy</Badge>

            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Powered by humans,
              </span>
              <br />
              <span className="text-white">fuelled by data.</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                We work with globally ambitious clients in need of greater certainty in a rapidly changing digital
                landscape. We drive sustained, measured growth through multi-channel digital marketing campaigns across
                Facebook, Instagram, & Google.
              </p>

              <p>Your owned, paid and earned media.</p>

              <p>
                We consistently outperform the market and our Client results, testimonials, strategy & performance
                demonstrates this. Our clients benefit from this unrivalled competitive advantage in their organic and
                paid search, paid social and content production.
              </p>

              <p className="text-cyan-400 font-semibold">
                Our strategy is led by data but we are not slaves to it – key decisions are human-powered.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Principles Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-premium rounded-2xl p-6 h-full glass-card-hover">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                      <principle.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{principle.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
