"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, X, BarChart3 } from "lucide-react"
import AnimatedNumber from "./animated-number"

const beforePoints = ["Convo's going nowhere", "Ridiculously high CPM", "Unsustainable Ad-spend"]

const afterPoints = [
  "Under $5 CPM consistently",
  "Higher convo engagement",
  "Over 150+ new convo's",
  "Sustainable Ad-spend",
  "More than a 5x ROI after service fee + Ad Spend",
]

const caseStudyData = {
  client: "BetForecast",
  before: {
    conversations: 9,
    costPerConvo: 16.38,
    totalSpent: 147.39,
    status: "Struggling",
  },
  after: {
    conversations: 154,
    costPerConvo: 4.03,
    totalSpent: 621.29,
    status: "Thriving",
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function CaseStudySection() {
  return (
    <section id="case-study" className="relative py-24 md:py-32 section-gradient-1 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8">
            <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-300 font-medium">Case Study</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white text-glow">Before & After</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Joining Boost'd Marketing
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            A side-by-side comparison showing the transformative power of our data-driven strategies and creative
            excellence.
          </p>
        </motion.div>

        {/* Case Study Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="mb-16"
        >
          <Card className="glass-card rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-white font-bold">{caseStudyData.client} Transformation</CardTitle>
              <p className="text-gray-400 text-lg">Real results from a real client</p>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-300 mb-6 flex items-center justify-center">
                    <X className="mr-2 h-6 w-6" />
                    Before Boost'd
                  </h3>
                  <div className="space-y-6">
                    <div className="glass-card rounded-xl p-6 border-red-500/20">
                      <p className="text-sm text-red-200 mb-2">Conversations</p>
                      <p className="text-4xl font-bold text-red-300">
                        <AnimatedNumber value={caseStudyData.before.conversations} />
                      </p>
                    </div>
                    <div className="glass-card rounded-xl p-6 border-red-500/20">
                      <p className="text-sm text-red-200 mb-2">Cost per Conversation</p>
                      <p className="text-4xl font-bold text-red-300">
                        $<AnimatedNumber value={caseStudyData.before.costPerConvo} />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-300 mb-6 flex items-center justify-center">
                    <CheckCircle2 className="mr-2 h-6 w-6" />
                    After Boost'd
                  </h3>
                  <div className="space-y-6">
                    <div className="glass-card rounded-xl p-6 border-green-500/20">
                      <p className="text-sm text-green-200 mb-2">Conversations</p>
                      <p className="text-4xl font-bold text-green-300">
                        <AnimatedNumber value={caseStudyData.after.conversations} />
                      </p>
                    </div>
                    <div className="glass-card rounded-xl p-6 border-green-500/20">
                      <p className="text-sm text-green-200 mb-2">Cost per Conversation</p>
                      <p className="text-4xl font-bold text-green-300">
                        $<AnimatedNumber value={caseStudyData.after.costPerConvo} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <Card className="glass-card rounded-3xl h-full border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-300 flex items-center text-xl">
                  <X className="mr-3 h-6 w-6" />
                  Before Joining - Running his own ads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-red-200">
                  {beforePoints.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start text-lg"
                    >
                      <X className="h-6 w-6 text-red-400 mr-4 mt-0.5 flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <Card className="glass-card rounded-3xl h-full border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center text-xl">
                  <CheckCircle2 className="mr-3 h-6 w-6" />
                  After Joining - "Boost'd" run Ads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-green-200">
                  {afterPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start text-lg"
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-400 mr-4 mt-0.5 flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
