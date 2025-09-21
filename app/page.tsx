import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import WhatsAppChatShowcase from "@/components/whatsapp-chat-showcase"
import VideoPerformanceInteractive from "@/components/video-performance-interactive"
import EnhancedTestimonials from "@/components/enhanced-testimonials"
import MultiChannelStrategy from "@/components/multi-channel-strategy"
import PrivacyPolicy from "@/components/privacy-policy"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhatsAppChatShowcase />
        <VideoPerformanceInteractive />
        <EnhancedTestimonials />
        <MultiChannelStrategy />
        <PrivacyPolicy />
      </main>
    </div>
  )
}
