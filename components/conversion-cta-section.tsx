"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Calendar, Clock, CheckCircle2, Zap, Star } from "lucide-react"
import Link from "next/link"

const guarantees = [
  "30-day money-back guarantee",
  "Results within first 30 days or full refund",
  "Dedicated account manager assigned",
  "Weekly performance reports & insights",
  "24/7 WhatsApp support included",
]

export default function ConversionCtaSection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-blue-900/10 to-purple-900/10"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-8 text-lg px-8 py-4">
              <Clock className="w-6 h-6 mr-3" />
              <span className="font-bold">Limited Time: Only 3 Spots Left This Month</span>
              <Zap className="w-6 h-6 ml-3 animate-pulse" />
            </Badge>
          </motion.div>

          {/* Main CTA Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 mb-12"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-white">Ready to Turn</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                $1 Into $5?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stop wasting money on ads that don't work. Book a free strategy call and discover exactly how we'll
              transform your business with our proven multi-channel system.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">500+ businesses transformed</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link
              href="https://api.leadconnectorhq.com/widget/booking/z471FbQS1RgtYzzEZoUn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="cta-primary-enhanced text-white text-xl px-16 py-8 rounded-full font-bold border-0 text-center"
              >
                <Calendar className="mr-4 h-7 w-7" />
                Speak to an Expert Now
                <ArrowRight className="ml-4 h-7 w-7" />
              </Button>
            </Link>

            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xl px-16 py-8 rounded-full font-bold border-0 transition-all duration-300"
            >
              <MessageCircle className="mr-4 h-7 w-7" />
              WhatsApp Us Instantly
            </Button>
          </motion.div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-premium rounded-3xl p-8 mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Our Iron-Clad Promise to You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center text-left">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{guarantee}</span>
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
            className="space-y-4"
          >
            <p className="text-orange-300 font-bold text-xl animate-pulse">
              ⚡ Don't wait - your competitors are already booking their calls
            </p>
            <p className="text-gray-400">Join the 500+ businesses that chose growth over guesswork</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
