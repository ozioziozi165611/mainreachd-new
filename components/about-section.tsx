"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 mb-8 text-lg px-6 py-3">
            <Sparkles className="w-5 h-5 mr-2" />
            About Us
          </Badge>
          
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Boost'd Marketing helps service-based businesses generate consistent, qualified leads through high-performing Meta ads.
            </p>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              We focus on strategy, creative, even handle your leads, so you get real enquiries. Simple systems, clear results, and campaigns built to scale.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
