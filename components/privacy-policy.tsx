"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Mail, MapPin } from "lucide-react"

export default function PrivacyPolicy() {
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
          className="text-center mb-16"
        >
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-8 text-lg px-6 py-3">
            <Shield className="w-5 h-5 mr-2" />
            Privacy Policy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Your Privacy</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Matters to Us
            </span>
          </h2>
        </motion.div>

        {/* Privacy Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
            <CardContent className="p-0 space-y-8">
              <div className="text-gray-300 leading-relaxed space-y-6">
                <p className="text-lg">
                  Boost'd Marketing ABN: 40 437 545 443 ("we", "our", "us") respects your privacy and is committed to protecting your
                  personal information.
                </p>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Information We Collect</h3>
                  <p className="mb-4">We may collect basic information when you interact with us, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your name</li>
                    <li>Phone number</li>
                    <li>Business information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h3>
                  <p className="mb-4">We use the information you provide solely to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Understand your business needs</li>
                    <li>Determine if our services are a good fit for you</li>
                    <li>Contact you regarding your enquiry</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Sharing Your Information</h3>
                  <p>
                    We do not sell, rent, or share your information with third parties without your consent, unless
                    required by law.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Data Storage & Security</h3>
                  <p>
                    We take reasonable steps to keep your personal information secure. Your data is stored in secure
                    systems and only accessed for legitimate business purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Your Rights</h3>
                  <p>
                    You may request access to, correction of, or deletion of your personal information at any time by
                    contacting us.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
                  <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>admin@boostdmarketing.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
