"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "See How Local AUSSIE Businesses Have DOUBLED Their Revenue Through Meta Marketing"

  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, video will play on user interaction
        console.log("Autoplay blocked, waiting for user interaction")
      })
    }
  }, [])

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  const scrollToTestimonials = () => {
    const element = document.querySelector("#testimonials")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4 md:px-6 z-10 relative max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Typed Headline and Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-1 max-w-6xl px-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="block sm:inline">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
            
            {/* Book A Free Consultation Button - Right after title */}
            <div className="flex justify-center w-full">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/VTZMJcf2k9axPsM9Edc8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="btn-primary group w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                  <MessageCircle className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:animate-bounce" />
                  <span className="whitespace-nowrap">Book A Free Consultation</span>
                  <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="w-full max-w-4xl"
          >
            {/* Custom Video Player - Clean and Integrated */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoaded}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <div className="flex items-center justify-center h-full text-white">
                  Your browser does not support the video tag.
                </div>
              </video>
              
              {/* Loading state */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-lg bg-black/50 px-4 py-2 rounded-lg">
                    Loading video...
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* We've generated text - Now after video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="space-y-6 md:space-y-8 max-w-6xl px-2"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
              We've generated our clients <span className="text-green-400 font-bold">100k+ in revenue</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Stop wasting money on ads that don't convert.</span>
            </p>
          </motion.div>

          {/* Watch Success Stories Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex justify-center w-full px-4"
          >
            <Button
              onClick={scrollToTestimonials}
              className="btn-secondary group w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              <Play className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
              <span className="whitespace-nowrap">Watch Success Stories</span>
            </Button>
          </motion.div>

          {/* Platform Integration Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col items-center justify-center space-y-4 text-gray-400 px-4"
          >
            <span className="text-sm font-medium text-center">We dominate on:</span>
            <div className="flex space-x-4 sm:space-x-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/instagram-logo.png"
                  alt="Instagram Logo"
                  width={40}
                  height={40}
                  className="object-cover w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/facebook-logo.png"
                  alt="Facebook Logo"
                  width={40}
                  height={40}
                  className="object-cover w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  width={40}
                  height={40}
                  className="object-cover w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
