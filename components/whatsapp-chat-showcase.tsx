"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Clock, CheckCheck, Phone } from "lucide-react"

const chatExamples = [
  {
    business: "Gutter Gurus SA",
    messages: [
      {
        sender: "customer",
        text: "Hi, I saw your ad about gutter cleaning. Can you give me a quote?",
        time: "2:14 PM",
      },
      {
        sender: "business",
        text: "Hi! Thanks for reaching out. I'd be happy to help. What's your address?",
        time: "2:15 PM",
      },
      { sender: "customer", text: "123 Main Street, Adelaide", time: "2:16 PM" },
      {
        sender: "business",
        text: "For a standard home that size, it's $280. When would work best for you?",
        time: "2:17 PM",
      },
      { sender: "customer", text: "That sounds great! How about this Saturday?", time: "2:18 PM" },
    ],
    result: "Booked - $280 job",
    responseTime: "1 min",
  },
  {
    business: "Bondoc Detailing",
    messages: [
      {
        sender: "customer",
        text: "Your car detailing work looks amazing! What do you charge for a full detail?",
        time: "10:32 AM",
      },
      {
        sender: "business",
        text: "Thank you! Full detail packages start at $350. What type of vehicle?",
        time: "10:33 AM",
      },
      { sender: "customer", text: "2019 BMW X5", time: "10:34 AM" },
      {
        sender: "business",
        text: "For an X5, our premium package is $450. Includes paint correction and ceramic coating.",
        time: "10:35 AM",
      },
      { sender: "customer", text: "Perfect! Can I book for next week?", time: "10:36 AM" },
    ],
    result: "Booked - $450 job",
    responseTime: "1 min",
  },
  {
    business: "ADL Auto",
    messages: [
      {
        sender: "customer",
        text: "Hi, I need my car detailed before I sell it. What's included in your service?",
        time: "4:22 PM",
      },
      {
        sender: "business",
        text: "Hi! Our pre-sale detail includes full wash, wax, interior deep clean, and engine bay. $220 total.",
        time: "4:23 PM",
      },
      { sender: "customer", text: "How long does it take?", time: "4:24 PM" },
      { sender: "business", text: "About 3-4 hours. We can do it tomorrow if you'd like!", time: "4:24 PM" },
      { sender: "customer", text: "Yes please! I'll bring it by at 9am", time: "4:25 PM" },
    ],
    result: "Booked - $220 job",
    responseTime: "1 min",
  },
]

export default function WhatsAppChatShowcase() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-emerald-900/10 to-teal-900/10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-8 text-lg px-6 py-3">
            <MessageCircle className="w-5 h-5 mr-2" />
            Real Conversations
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">See How Our Ads</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Start Conversations
            </span>
          </h2>
          <p className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
            These are real WhatsApp conversations from our clients' campaigns. Notice how quickly prospects engage and
            how naturally they convert into paying customers.
          </p>
        </motion.div>

        {/* Chat Examples */}
        <div className="grid lg:grid-cols-3 gap-8 justify-center items-stretch">
          {chatExamples.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex justify-center"
            >
              <Card className="glass-card rounded-3xl overflow-hidden w-full max-w-sm">
                <CardHeader className="bg-green-600/20 border-b border-green-500/30">
                  <CardTitle className="text-white text-lg flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-green-400" />
                    {chat.business}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-200">
                    <Clock className="w-4 h-4 mr-1" />
                    Avg response: {chat.responseTime}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Chat Messages */}
                  <div className="bg-gray-800/50 p-4 max-h-80 overflow-y-auto">
                    {chat.messages.map((message, msgIndex) => (
                      <motion.div
                        key={msgIndex}
                        initial={{ opacity: 0, x: message.sender === "customer" ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: msgIndex * 0.1 }}
                        className={`mb-3 flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            message.sender === "customer" ? "bg-gray-700 text-white" : "bg-green-600 text-white"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-xs opacity-70 mr-1">{message.time}</span>
                            {message.sender === "business" && <CheckCheck className="w-3 h-3 text-blue-400" />}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Result */}
                  <div className="p-4 bg-green-500/10 border-t border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-green-300 font-semibold">Result:</span>
                      </div>
                      <span className="text-green-400 font-bold">{chat.result}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start These Conversations for Your Business?
            </h3>
            <p className="text-gray-100 mb-6">
              These results aren't luck - they're the result of proven strategies, compelling creative, and precise
              targeting. Your business could be having these conversations tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <MessageCircle className="w-4 h-4 mr-2" />
                Average Response Time: Under 2 minutes
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <CheckCheck className="w-4 h-4 mr-2" />
                Conversion Rate: 85%+
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
