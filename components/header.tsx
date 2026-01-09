"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import BoostdLogo from "./boostd-logo"
import Link from "next/link"

const navigation = [
  // No items added here as per the updates
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-24 md:h-28 lg:h-32">
          {/* Logo - Responsive sizing */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <Link href="/">
              <BoostdLogo className="h-20 md:h-24 lg:h-28 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* No navigation items added here as per the updates */}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://api.leadconnectorhq.com/widget/booking/LJBzpKtGPBFoJmDVND4t"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="btn-primary text-base lg:text-lg px-4 lg:px-6 py-2 lg:py-3">
                <MessageCircle className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Get Started
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 rounded-b-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* No navigation items added here as per the updates */}
              <div className="pt-4 border-t border-slate-800/50">
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/LJBzpKtGPBFoJmDVND4t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full btn-primary text-lg py-3">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
