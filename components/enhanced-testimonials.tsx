"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Instagram } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    company: "ADL Auto",
    logo: "/images/adl-auto-logo.jpg",
    testimonial:
      "Working with Boost'd Marketing has been a game changer for us. In just 30 days, we had 79 genuine conversations start from their ads, all at an average cost of just $6.80. With only $537 spent, our reach exploded to over 22,000 people and nearly 38,000 impressions.",
    additionalQuote:
      "The quality of leads and the engagement we're getting is far better than anything we've tried before, they returned way more than they promised us & ended up exceeding expectations",
    contact: "Instagram: adl.autodetailing",
    rating: 5,
  },
  {
    company: "Gutter Gurus SA",
    logo: "/images/gutter-gurus-logo.jpg",
    testimonial:
      "Partnering with Boost'd Marketing has been one of the best decisions we've made. In just 30 days, we generated 183 messaging conversations through their campaigns at an average cost of only $6.07.",
    additionalQuote:
      "The ROI speaks for itself—these guys know how to turn ad spend into real results. With a total ad spend of $1,110, we've already returned nearly $20,000 in revenue.",
    contact: "guttergurus_sa",
    rating: 5,
  },
  {
    company: "Bondoc Detailing",
    logo: "/images/bondoc-logo.jpg",
    testimonial:
      "We've only been running ads with Boost'd for 11 days, and results have blown us away. We've started 84 high conversion conversations from prospects at $2.64 each, off a total ad spend of $220.",
    additionalQuote:
      "The reach; 10,000 people. Nearly 16,000 impressions. With one of the lowest CPMs we've ever seen, the cost-efficiency is unmatched, and the campaign is already turning into quality leads. If this is what the first 11 days look like, we can't wait to see what the full month brings.",
    contact: "Bondoc Detailing",
    rating: 5,
  },
]

export default function EnhancedTestimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 via-orange-900/10 to-red-900/10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mb-8 text-lg px-6 py-3">
            <Quote className="w-5 h-5 mr-2" />
            They Spoke. We Delivered.
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Real Results From</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Hear what our clients say—before they even say it all. These testimonials showcase the transformation and
            results they've achieved working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex justify-center"
            >
              <Card className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full hover:border-yellow-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 w-full max-w-md">
                <CardContent className="p-0 flex flex-col h-full space-y-6">
                  {/* Company Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-slate-600/50">
                      <Image
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={`${testimonial.company} logo`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{testimonial.company}</h3>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Testimonial */}
                  <div className="flex-grow space-y-6">
                    <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm">
                      <Quote className="w-8 h-8 text-gray-400 mb-4" />
                      <blockquote className="text-gray-300 text-lg leading-relaxed italic">
                        "{testimonial.testimonial}"
                      </blockquote>
                    </div>

                    {/* Additional Quote */}
                    <div className="bg-slate-700/30 rounded-2xl p-6 border-l-4 border-cyan-400 backdrop-blur-sm">
                      <blockquote className="text-gray-300 leading-relaxed italic">
                        "{testimonial.additionalQuote}"
                      </blockquote>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-6 border-t border-slate-600/50">
                    <div className="flex items-center justify-center text-gray-400 space-x-2">
                      {testimonial.contact.includes("Instagram") ? (
                        <Instagram className="w-5 h-5 text-pink-400" />
                      ) : (
                        <Instagram className="w-5 h-5 text-pink-400" />
                      )}
                      <span className="text-sm font-medium">{testimonial.contact}</span>
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
