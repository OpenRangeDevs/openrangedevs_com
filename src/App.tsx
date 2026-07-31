import { useEffect, useLayoutEffect, useState } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import ClientLogos from './components/ClientLogos'
import FenceSection from './components/FenceSection'
import ServicesSection from './components/ServicesSection'
import SurveySection from './components/SurveySection'
import CtaBanner from './components/CtaBanner'
import TeamSection from './components/TeamSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import CaseStudyPage from './components/CaseStudyPage'
import ContactPage from './components/ContactPage'

export default function App() {
  const [locationHash, setLocationHash] = useState(() => window.location.hash)

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

  useEffect(() => {
    const handleHashChange = () => setLocationHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const caseStudySlug = locationHash.match(/^#case-studies\/(.+)$/)?.[1] ?? null

  useLayoutEffect(() => {
    if (!locationHash || locationHash === '#contact' || caseStudySlug) return

    document.getElementById(locationHash.slice(1))?.scrollIntoView({ block: 'start' })
  }, [caseStudySlug, locationHash])

  if (locationHash === '#contact') return <ContactPage />
  if (caseStudySlug) return <CaseStudyPage slug={caseStudySlug} />

  return (
    <div className="page-rails relative min-h-screen overflow-x-clip">
      <div className="relative z-30">
        <Hero />
      </div>
      <div className="relative z-10">
        <ClientLogos />
      </div>
      <main className="relative z-10">
        <FenceSection />
        <SurveySection />
        <ServicesSection />
        <div className="pt-20">
          <CtaBanner
            title="Start with discovery."
            body="Map the business problem, define the strongest opportunity, and leave with a clear direction for what to build next."
            buttonLabel="Book discovery"
            backgroundImage="/assets/cta-discovery.png"
            motion="discovery"
          />
        </div>
        <div className="pt-[120px]">
          <TeamSection />
        </div>
        <FaqSection />
        <div className="py-[120px]">
          <CtaBanner
            title="Let's map your build."
            body="Tell us what you're trying to ship. We'll tell you whether we're the right outfit for it."
            buttonLabel="Book a Call"
            backgroundImage="/assets/cta-map-build.png"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
