"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, DollarSign, Users, Heart, BarChart3, CheckCircle } from "lucide-react"
import Image from "next/image"

const advantages = [
  {
    icon: Target,
    title: "Improved audience reach & targeting",
    description: "Reach your ideal customers across multiple touchpoints with precision targeting",
  },
  {
    icon: TrendingUp,
    title: "Increase sales & revenue",
    description: "Drive more conversions through strategic multi-channel campaigns",
  },
  {
    icon: DollarSign,
    title: "Lower CPM costs",
    description: "Reduce advertising costs through optimized channel distribution",
  },
  {
    icon: BarChart3,
    title: "Reduced marketing costs",
    description: "Maximize ROI by leveraging the most effective channels for your business",
  },
  {
    icon: Users,
    title: "Improved audience engagement",
    description: "Create meaningful connections across all customer touchpoints",
  },
  {
    icon: Heart,
    title: "Improved customer trust & loyalty",
    description: "Build stronger relationships through consistent multi-channel presence",
  },
]

const platforms = [
  {
    name: "Facebook Ads",
    logo: "/images/facebook-logo.png",
    description: "Reach 2.9B+ users with precision targeting",
  },
  {
    name: "Instagram Ads",
    logo: "/images/instagram-logo.png",
    description: "Engage visual audiences with compelling content",
  },
  {
    name: "Google Ads",
    logo: "/images/google-logo.png",
    description: "Capture high-intent searches and drive conversions",
  },
]

export default function MultiChannelStrategy() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-300 border-blue-500/30 text-lg px-6 py-2">
            The road to a successful partnership
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Makes us{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              really different
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="mb-20">
              <Image
                src="/images/Boost_d Logo Transparent.png"
                alt="Boost'd Marketing Logo"
                width={800}
                height={320}
                className="w-full max-w-xl md:max-w-2xl h-auto object-contain"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Multi-channel digital marketing strategy
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Whether it's organic search, SEM, social media advertising or email, the benefits of utilising
                multi-channel marketing provides effective and powerful targeting of your audience at each stage of the
                customer journey.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Combining multi-channel marketing in your digital strategy provides significant advantages. This is one
                of the many strategies we use to get below a{" "}
                <span className="text-green-400 font-semibold">$5 CPM</span>
              </p>
            </div>

            {/* Platform Logos */}
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-white mb-4">Our Primary Platforms:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={platform.logo || "/placeholder.svg"}
                          alt={platform.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <h5 className="font-semibold text-white">{platform.name}</h5>
                      <p className="text-sm text-gray-400">{platform.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                The advantages of Multi-channel include:
              </h4>
            </div>

            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <advantage.icon className="w-6 h-6 text-cyan-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <h5 className="font-semibold text-white text-lg">{advantage.title}</h5>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{advantage.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <h5 className="text-2xl font-bold text-white mb-4">
                    Ready to implement a winning multi-channel strategy?
                  </h5>
                  <p className="text-gray-300 mb-6 text-lg">
                    Let's discuss how we can help you achieve below $5 CPM across all channels
                  </p>
                  <a
                    href="https://api.leadconnectorhq.com/widget/booking/LJBzpKtGPBFoJmDVND4t"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-lg"
                    >
                      <span>Get Your Strategy</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
