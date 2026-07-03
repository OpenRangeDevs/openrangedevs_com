import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import FenceSection from './components/FenceSection'
import ServicesSection from './components/ServicesSection'
import SurveySection from './components/SurveySection'
import CaseStudies from './components/CaseStudies'
import CtaBanner from './components/CtaBanner'
import TeamSection from './components/TeamSection'
import TestimonialSection from './components/TestimonialSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Hero />
      <main className="relative">
        {/* page-length vertical hairlines */}
        <div className="pointer-events-none absolute bottom-0 left-6 top-0 z-10 hidden w-px hairline lg:block" />
        <div className="pointer-events-none absolute bottom-0 right-6 top-0 z-10 hidden w-px hairline lg:block" />

        <FenceSection />
        <ServicesSection />
        <SurveySection />
        <CaseStudies />
        <div className="pt-20">
          <CtaBanner
            title="Start with a Survey."
            body="Not ready to commit to a full build? Start with a fixed-scope Survey. In two weeks you walk away with a roadmap, a technical architecture, and a real plan and price — whether or not you build it with us. If you do, the fee comes straight off the build."
            buttonLabel="Book a Survey"
          />
        </div>
        <div className="pt-[120px]">
          <TeamSection />
        </div>
        <TestimonialSection />
        <FaqSection />
        <div className="py-[120px]">
          <CtaBanner
            title="Let's map your build."
            body="Tell us what you're trying to ship. We'll tell you, honestly, whether we're the right outfit for it."
            buttonLabel="Book a Call"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
