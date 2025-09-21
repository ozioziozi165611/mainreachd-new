"use client"

import { motion } from "framer-motion"
import { Shield, Award, CheckCircle } from "lucide-react"

const badges = [
  { icon: Shield, text: "Meta Business Partner", verified: true },
  { icon: Award, text: "Google Ads Partner", verified: true },
  { icon: CheckCircle, text: "Certified Specialists", verified: true },
]

export default function TrustBadges() {
  return (
    <section className="py-12 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center space-x-12"
        >
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-3 opacity-60 hover:opacity-100 transition-opacity">
              <badge.icon className="w-6 h-6 text-gray-400" />
              <span className="text-gray-400 text-sm font-medium">{badge.text}</span>
              {badge.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
