"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Mike Johnson",
    company: "ADL Auto",
    role: "Owner",
    logo: "/images/adl-auto-logo.jpg",
    quote:
      "Boost'd Marketing completely transformed our lead generation. In just 30 days, we went from struggling to get quality leads to having 79 genuine conversations with potential customers. The $6.80 cost per conversation is incredible - we were paying 3x that before!",
    results: "79 conversations in 30 days",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sarah Williams",
    company: "Gutter Gurus SA",
    role: "Marketing Director",
    logo: "/images/gutter-gurus-logo.jpg",
    quote:
      "The ROI speaks for itself. With just $1,110 in ad spend, we generated nearly $20,000 in revenue. These guys don't just create pretty ads - they create ads that actually make money. Our phone hasn't stopped ringing!",
    results: "$20K revenue from $1.1K spend",
    rating: 5,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Carlos Bondoc",
    company: "Bondoc Detailing",
    role: "Founder",
    logo: "/images/bondoc-logo.jpg",
    quote:
      "I was skeptical about Facebook ads, but Boost'd proved me wrong. In just 11 days, we had 84 new conversations and booked out for the next month. The quality of leads is outstanding - these are people who actually want our services.",
    results: "84 conversations in 11 days",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 trust-bg overflow-hidden">
      <div className="absolute inset-0 mesh-2"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mb-6 text-lg px-6 py-2">
            Client Success Stories
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="headline">Don't Take Our Word For It</span>
            <br />
            <span className="subheadline">Listen to Our Clients</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real businesses, real results, real testimonials. See what happens when you work with a team that actually
            cares about your success.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 lg:grid-cols-3 justify-center items-stretch">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex justify-center"
            >
              <Card className="testimonial-card rounded-3xl h-full p-8 w-full max-w-md">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="flex-grow mb-6">
                    <Quote className="w-8 h-8 text-gray-400 mb-4 mx-auto" />
                    <blockquote className="text-gray-300 text-lg leading-relaxed italic text-center">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  {/* Results Highlight */}
                  <div className="glass-strong rounded-xl p-4 mb-6 text-center">
                    <p className="text-sm text-gray-400 mb-1">Key Result</p>
                    <p className="text-green-400 font-bold text-lg">{testimonial.results}</p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src={testimonial.logo || "/placeholder.svg"}
                          alt={`${testimonial.company} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
