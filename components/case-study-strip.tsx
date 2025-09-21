"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import Image from "next/image"

const caseStudies = [
  { company: "SaaSCo", metric: "3.8× ROAS", logo: "SC" },
  { company: "ADL Auto", metric: "$6.80 CPL", logo: "/images/adl-auto-logo.jpg", hasImage: true },
  { company: "Gutter Gurus", metric: "18× ROI", logo: "/images/gutter-gurus-logo.jpg", hasImage: true },
  { company: "Bondoc Detail", metric: "$2.64 CPL", logo: "/images/bondoc-logo.jpg", hasImage: true },
]

export default function CaseStudyStrip() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="case-study-strip absolute inset-0"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="trust-badge text-cyan-300 px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Recent Results
          </Badge>
        </motion.div>

        <div className="flex items-center justify-center space-x-12 overflow-x-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center space-x-4 min-w-max"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                {study.hasImage ? (
                  <Image
                    src={study.logo || "/placeholder.svg"}
                    alt={`${study.company} logo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{study.logo}</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-white font-semibold">{study.company}</p>
                <p className="text-cyan-400 font-bold">{study.metric}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
