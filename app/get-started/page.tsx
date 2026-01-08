"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Mail, Clock, CheckCircle2, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import BoostdLogo from "@/components/boostd-logo"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Logo and Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Logo - Made Much Bigger */}
            <div className="flex justify-center mb-8">
              <BoostdLogo className="h-32 w-auto md:h-40 lg:h-48" />
            </div>

            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-6 text-base px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              100% FREE Consultation
            </Badge>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Business?
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
              Get in touch with the Boost'd Marketing team and discover how we can 5x your revenue in the next 15 days.
            </p>

            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-base px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time: Only 5 Spots Left This Month
            </Badge>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Schedule Consultation Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 h-full">
                <CardHeader className="text-center pb-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Schedule Free Consultation</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Book your strategy session instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link
                    href="https://api.leadconnectorhq.com/widget/booking/z471FbQS1RgtYzzEZoUn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg py-4 rounded-full font-bold border-0 mb-3">
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Now
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center text-green-400 text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Takes only 15 seconds to book
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 h-full">
                <CardHeader className="text-center pb-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Email Us</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">Send us your business details</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link href="mailto:admin@boostdmarketing.com">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm py-4 rounded-full font-bold border-0 mb-3 min-h-[3rem] flex items-center justify-center">
                      <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">admin@boostdmarketing.com</span>
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center text-green-400 text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Response within 4 hours
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* What You Get Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-2xl p-6 mb-12 border border-slate-600/30"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              What You Get in Your FREE Consultation
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Free 15-minute strategy session",
                "Custom growth plan for your business",
                "ROI projections & timeline",
                "No obligation consultation",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center text-gray-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Urgency Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                ⚠️ Don't Wait - Your Competitors Are Already Booking!
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://api.leadconnectorhq.com/widget/booking/z471FbQS1RgtYzzEZoUn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base px-6 py-3 rounded-full font-bold border-0">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="mailto:admin@boostdmarketing.com">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-base px-6 py-3 rounded-full font-bold border-0">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
