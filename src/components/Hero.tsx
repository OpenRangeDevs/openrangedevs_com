import { useEffect, useRef } from 'react'
import { CALENDAR_URL } from '../content'
import Navbar from './Navbar'
import PillButton from './PillButton'
import RulerTicks from './RulerTicks'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0
    const update = () => {
      // 0 → 1 over the first 240px of scroll: full-bleed hero tucks into the inset rounded card
      const p = Math.min(Math.max(window.scrollY / 240, 0), 1)
      if (sectionRef.current) {
        const pad = 16 * p
        sectionRef.current.style.padding = `${pad}px ${pad}px 0`
      }
      if (cardRef.current) {
        cardRef.current.style.borderRadius = `${37 * p}px`
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <Navbar />
      <div ref={cardRef} className="relative h-[864px] overflow-hidden lg:h-[716px]">
        <img
          src="/assets/hero-clouds.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 from-[14%] to-white/0 to-[115%]" />

        {/* ruler ticks */}
        <RulerTicks side="left" className="absolute left-[56px] top-[190px] hidden lg:flex" />
        <RulerTicks side="right" className="absolute right-[56px] top-[190px] hidden lg:flex" />

        {/* headline block */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[13px] font-semibold uppercase leading-[1.5] tracking-[-0.56px] text-white lg:text-[14px]">
            backed by 30 years of building companies of our own
          </p>
          <h1 className="mt-[19px] max-w-[1040px] text-[64px] font-bold leading-none text-white sm:text-[76px] lg:text-[88px]">
            We build like founders. <br className="hidden sm:block" />
            Because we are.
          </h1>
          <p className="mt-8 max-w-[720px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] text-white lg:text-[20px]">
            OpenRangeDevs brings strategy, product design, and engineering together to turn important business opportunities
            into focused products, faster releases, and operational systems that keep paying back.
          </p>
          <PillButton href={CALENDAR_URL} className="mt-6">
            Book a call
          </PillButton>
        </div>
      </div>
    </section>
  )
}
