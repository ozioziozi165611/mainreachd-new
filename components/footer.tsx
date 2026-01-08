import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative glass-premium border-t border-white/10">
      <div className="container px-4 md:px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Image
              src="/images/Boost_d Logo Transparent.png"
              alt="Boost'd Marketing"
              width={300}
              height={120}
              className="h-24 w-auto mb-6 filter drop-shadow-lg"
            />
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Boost your brand. We turn $1 into $5 with ads that actually work. Join 500+ businesses
              that trust us to grow their revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="cta-primary-enhanced text-white px-8 py-4 rounded-full font-semibold border-0 min-h-[56px] text-base">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
                Speak to Expert
              </Button>
              <Button className="whatsapp-chat text-white px-8 py-4 rounded-full font-semibold border-0 min-h-[56px] text-base">
                <MessageCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <nav className="space-y-4">
              <Link href="#strategy" className="block text-gray-300 hover:text-cyan-400 transition-colors">
                Multi-Channel Strategy
              </Link>
              <Link href="#results" className="block text-gray-300 hover:text-cyan-400 transition-colors">
                Facebook Ads
              </Link>
              <Link href="#results" className="block text-gray-300 hover:text-cyan-400 transition-colors">
                Instagram Ads
              </Link>
              <Link href="#results" className="block text-gray-300 hover:text-cyan-400 transition-colors">
                Google Ads
              </Link>
              <Link href="#testimonials" className="block text-gray-300 hover:text-cyan-400 transition-colors">
                Video Creative
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Connect</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>Book a free strategy call</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MessageCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>WhatsApp instant support</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>admin@boostdmarketing.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>0466 369 678</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Image src="/images/instagram-logo.png" alt="Instagram" width={32} height={32} className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Image src="/images/facebook-logo.png" alt="Facebook" width={32} height={32} className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Image src="/images/google-logo.png" alt="Google" width={32} height={32} className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Boost'd Marketing. ABN: 40 437 545 443. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
