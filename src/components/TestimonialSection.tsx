import { useEffect, useState } from 'react'
import { clientLogos, testimonials } from '../content'
import { prefersReducedMotion } from '../hooks/useInView'
import SectionLabel from './SectionLabel'

const ROTATE_MS = 6000

export default function TestimonialSection() {
  const [active, setActive] = useState(0)
  const [reduced] = useState(() => prefersReducedMotion())
  const [paused, setPaused] = useState(false)

  // auto-rotate through the testimonials; pause on hover, skip under reduced motion
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % testimonials.length), ROTATE_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused])

  const t = testimonials[active]

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-[120px] pt-[120px] lg:px-14">
      <SectionLabel>In their words</SectionLabel>
      <h2 className="mt-4 max-w-[756px] text-[40px] font-bold leading-none sm:text-[52px] lg:text-[64px]">
        Founders who've ridden with us.
      </h2>

      <div className="mt-8 flex min-h-[200px] max-w-[1021px] flex-col">
        {/* re-keyed on change so each testimonial fades + rises in */}
        <div
          key={active}
          className="flex flex-col gap-4"
          style={reduced ? undefined : { animation: 'rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          <p className="text-[22px] italic leading-[1.5] tracking-[-0.59px] lg:text-[29.6px]">{t.quote}</p>
          <div className="flex items-center gap-2">
            <div className="size-16 shrink-0 rounded-[12px] bg-[#d9d9d9]" />
            <div className="flex flex-col justify-center">
              <p className="text-[20px] font-medium leading-[1.5] tracking-[-0.48px] lg:text-[24px]">{t.name}</p>
              <p className="text-[16px] leading-[1.5] tracking-[-0.36px] opacity-60 lg:text-[18.2px]">{t.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-24 flex flex-wrap items-center justify-center gap-x-[100px] gap-y-10 lg:gap-x-[156px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {clientLogos.map((logo, i) => {
          const isActive = i === active
          return (
            <button
              key={logo.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial from ${testimonials[i].name}`}
              aria-pressed={isActive}
              className={`cursor-pointer transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={isActive && logo.colorSrc ? logo.colorSrc : logo.src}
                alt={logo.alt}
                style={{ width: logo.w * 1.16, height: logo.h * 1.16 }}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
