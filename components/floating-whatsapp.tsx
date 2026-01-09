"use client"

import { MessageCircle, X, Calendar } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="floating-whatsapp"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-32 right-6 w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Boost'd Marketing</h3>
                    <p className="text-sm opacity-90">Typically replies instantly</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                <p className="text-sm text-gray-800">Hi there! 👋 Ready to transform your ad performance?</p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                <p className="text-sm text-gray-800">
                  I can show you exactly how we've helped 500+ businesses increase their ROI by 5x.
                </p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
                <p className="text-sm text-gray-800">What's your biggest challenge with your current ads?</p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t border-gray-100 flex flex-col items-center">
              <div className="space-y-2 w-full">
                <button className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-sm transition-colors min-h-[48px] touch-manipulation">
                  💰 My ads aren't profitable
                </button>
                <button className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-sm transition-colors min-h-[48px] touch-manipulation">
                  📈 I need more leads
                </button>
                <button className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-sm transition-colors min-h-[48px] touch-manipulation">
                  🎯 I want better targeting
                </button>
              </div>

              <div className="w-full mt-3 space-y-2">
                <Link
                  href="https://api.leadconnectorhq.com/widget/booking/LJBzpKtGPBFoJmDVND4t"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 font-semibold transition-colors flex items-center justify-center min-h-[52px] touch-manipulation">
                    <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                    Schedule Free Consultation
                  </button>
                </Link>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 font-semibold transition-colors min-h-[52px] touch-manipulation">
                  Start WhatsApp Conversation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
