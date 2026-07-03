import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'
import { CALENDAR_URL } from '../content'
import PillButton from './PillButton'
import SectionLabel from './SectionLabel'
import Testimonial from './Testimonial'

const steps = [
  {
    title: 'We map the terrain',
    body: 'A short, paid discovery that returns a real plan: roadmap, architecture, scope, and price. Yours to keep — and credited toward the build if you go ahead.',
  },
  {
    title: 'Senior people, short cycles',
    body: 'We build in short, visible loops. You see working software every week and talk to the people actually making it.',
  },
  {
    title: 'Live, in weeks',
    body: 'We get it deployed, instrumented, and in front of real users — measured in weeks, not quarters.',
  },
  {
    title: 'We stay on the range',
    body: "We stick around to scale, harden, and lead — fractional or full-tilt, for as long as it's genuinely useful.",
  },
]

// focal line as a fraction of viewport height: the card crossing it is fully lit
const FOCAL = 0.42
const SPAN = 240 // px of distance over which a card fades from lit to dim
const DIM = 0.5 // resting opacity of off-focus cards (kept high enough to stay white, not muddy over the green)
const MAX_ROT = 4 // deg of tilt as a card enters/leaves focus

const clamp = (x: number, lo: number, hi: number) => Math.min(Math.max(x, lo), hi)
const clamp01 = (x: number) => clamp(x, 0, 1)
const smoothstep = (x: number) => {
  const c = clamp01(x)
  return c * c * (3 - 2 * c)
}

export default function SurveySection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [reduced] = useState(() => prefersReducedMotion())

  // as the section scrolls, each card lights to full opacity as its center reaches
  // the focal line and dims + tilts away from it — the highlight follows the scroll
  useEffect(() => {
    if (reduced) return
    let rafId = 0
    const update = () => {
      const focal = window.innerHeight * FOCAL
      cardRefs.current.forEach((card) => {
        if (!card) return
        const r = card.getBoundingClientRect()
        const d = r.top + r.height / 2 - focal // signed distance from the focal line
        const e = smoothstep(1 - Math.abs(d) / SPAN)
        card.style.opacity = (DIM + (1 - DIM) * e).toFixed(3)
        const rot = clamp(d / SPAN, -1, 1) * MAX_ROT
        card.style.transform = `perspective(1200px) rotate(${rot.toFixed(2)}deg) scale(${(0.94 + 0.06 * e).toFixed(3)})`
      })
    }
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [reduced])

  return (
    <section id="process" className="relative overflow-hidden bg-[#2b5314]">
      <div className="absolute bottom-0 left-6 top-0 hidden w-px hairline-white lg:block" />
      <div className="absolute bottom-0 right-6 top-0 hidden w-px hairline-white lg:block" />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 py-20 lg:flex-row lg:justify-between lg:px-14">
        <div className="flex max-w-[567px] flex-col items-start">
          <SectionLabel light>What we do</SectionLabel>
          <h2 className="mt-4 max-w-[580px] text-[40px] font-bold leading-none text-white sm:text-[52px] lg:text-[64px]">
            Survey the ground. Then build.
          </h2>
          <p className="mt-8 max-w-[463px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] text-white opacity-80 lg:text-[20px]">
            Senior people who move freely across strategy, product, and code, with nothing
          </p>
          <PillButton href={CALENDAR_URL} className="mt-6">
            Book a call
          </PillButton>
          <Testimonial light boxed className="mt-6 w-full" />
        </div>

        <div className="flex w-full max-w-[546px] shrink-0 flex-col gap-6" style={{ transformStyle: 'preserve-3d' }}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className="flex origin-center flex-col gap-6 rounded-[20px] bg-white p-8 will-change-[opacity,transform]"
              style={{ opacity: reduced ? (i === 0 ? 1 : 0.6) : undefined }}
            >
              <p className="text-[24px] font-bold leading-none">{step.title}</p>
              <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.32px] opacity-80">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
