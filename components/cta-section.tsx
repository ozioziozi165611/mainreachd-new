"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, CheckCircle2, Zap } from "lucide-react"
import Link from "next/link"

const guarantees = [
  "30-day money-back guarantee",
  "Results within first 30 days",
  "Dedicated account manager",
  "Weekly performance reports",
]

export default function CtaSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 cta-bg overflow-hidden">
      <div className="absolute inset-0 mesh-1"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-6 md:mb-8 text-sm md:text-lg px-4 md:px-6 py-2 md:py-3 urgency-glow">
              <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="text-xs md:text-base">Limited Time: Only 5 Spots Left This Month</span>
            </Badge>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8 mb-8 md:mb-12 px-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="headline block">Ready to 5x Your Revenue?</span>
              <span className="subheadline block mt-2">Let's Make It Happen</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Stop wasting money on ads that don't work. Book a free strategy call and discover exactly how we'll
              transform your business in the next 30 days.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 md:mb-12 px-4"
          >
            <Link
              href="https://api.leadconnectorhq.com/widget/booking/z471FbQS1RgtYzzEZoUn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="cta-primary text-white px-6 md:px-10 py-4 md:py-5 rounded-full font-bold border-0 conversion-glow w-full sm:w-auto min-h-[56px]"
              >
                <Calendar className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                <span className="text-base sm:text-base md:text-lg">Book Your Free Strategy Call</span>
                <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
              </Button>
            </Link>

            <Button
              size="lg"
              className="cta-secondary text-white px-6 md:px-10 py-4 md:py-5 rounded-full font-bold border-0 w-full sm:w-auto min-h-[56px]"
            >
              <Zap className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
              <span className="text-base sm:text-base md:text-lg">Get Instant Access to Case Studies</span>
            </Button>
          </motion.div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Our Promise to You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center text-left">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm md:text-base">{guarantee}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final Urgency */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 md:mt-8"
          >
            <p className="text-orange-300 font-bold text-base md:text-lg px-2">
              ⚡ Don't wait - your competitors are already booking their calls
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
