import { useEffect, useRef, useState } from 'react'
import { CALENDAR_URL } from '../content'
import { prefersReducedMotion } from '../hooks/useInView'
import PillButton from './PillButton'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import Testimonial from './Testimonial'

type Service = {
  title: React.ReactNode
  description: string
  category: string
  bg: string
}

const services: Service[] = [
  {
    title: 'Product & MVP builds',
    description:
      'Bring an idea or a half-built app. We design it, build it, and ship a real product your users can touch — not a prototype that dies in a deck.',
    category: 'PRODUCT',
    bg: 'bg-[#f8f9fc]',
  },
  {
    title: 'Fractional CTO & technical leadership',
    description:
      'Senior technical direction — architecture, hiring, roadmap — without carrying a full-time executive on payroll.',
    category: 'LEADERSHIP',
    bg: 'bg-[#ecfdf3]',
  },
  {
    title: (
      <>
        Embedded teams
        <br />
        in days
      </>
    ),
    description:
      'A senior squad that plugs into your roadmap and starts shipping this week — not next quarter, after a hiring cycle.',
    category: 'TEAM',
    bg: 'bg-[#fffaeb]',
  },
  {
    title: 'Business automation',
    description:
      'Wire your operations together so the repetitive work runs itself — and your team stops copy-pasting between tools.',
    category: 'AUTOMATION',
    bg: 'bg-[#fef3f2]',
  },
  {
    title: 'Rails rescue & takeover',
    description:
      "Inherited a Rails app that's stalling? We stabilize it, clear the debt, and get it moving again — without a rewrite you can't afford.",
    category: 'RESCUE',
    bg: 'bg-[#ecfdff]',
  },
]

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={`relative w-full overflow-hidden rounded-[20px] border border-[#d5d7da] ${service.bg} lg:h-[458px]`}>
      {/* left spine */}
      <div className="absolute left-[17px] top-[62px] hidden lg:block">
        <p className="text-[12px] font-medium leading-[1.5] tracking-[-0.24px] opacity-80">SVC</p>
      </div>
      <div className="absolute left-[29px] top-[96px] hidden h-[255px] w-px hairline lg:block" />
      <p className="absolute left-[17px] top-[367px] hidden text-[12px] font-medium uppercase leading-[1.5] tracking-[-0.24px] opacity-80 lg:block">
        {service.category}
      </p>

      <div className="flex flex-col gap-10 p-8 lg:h-full lg:flex-row lg:items-stretch lg:gap-0 lg:py-14 lg:pl-14 lg:pr-16">
        <div className="flex flex-col items-start lg:w-[649px] lg:shrink-0">
          <h3 className="text-[32px] font-bold leading-none sm:text-[44px] lg:text-[56px]">{service.title}</h3>
          <p className="mt-6 max-w-[649px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] opacity-80 lg:mt-8 lg:text-[20px]">
            {service.description}
          </p>
          <PillButton href={CALENDAR_URL} className="mt-8">
            Book a call
          </PillButton>
        </div>
        <div className="flex flex-1 items-center lg:pl-8">
          <Testimonial className="max-w-[551px]" />
        </div>
      </div>
    </article>
  )
}

// stack geometry straight from the design: 458px cards parked with a 62px strip
// of each earlier card left showing above the one covering it (5 cards = 706px)
const CARD_H = 458
const PEEK_MAX = 62
const PEEK_MIN = 24 // strips compress before anything else gives on short viewports
const CARD_COUNT = services.length
const SEG = 700 // scroll distance per card transition
const END_HOLD = 260 // pause on the completed stack before the section unpins
const HOLD = 0.15 // fraction of a segment the stack rests before the next card enters
const SMOOTHING = 0.0065 // exponential catch-up rate toward the scroll target, per ms
const NAV_CLEAR = 84 // fixed navbar clearance above the pinned header
const BOTTOM_PAD = 16
const STACK_GAP = 32 // header → stack spacing, mirrors the mt-8 in the JSX

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1)
const smoothstep = (x: number) => {
  const c = clamp01(x)
  return c * c * (3 - 2 * c)
}

export default function ServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [reduced] = useState(() => prefersReducedMotion())

  // pinned stage: the header stays put while scroll drives each card up from
  // below the viewport to its parked slot, one peek-strip below the card before it.
  // The rendered progress chases the scroll target through an exponential lerp
  // (same idea as Lenis), so cards glide and settle softly instead of tracking
  // every scroll jump 1:1.
  // Fit order on short viewports: compress the strips first, then uniformly scale
  // the whole composition — the card itself never changes proportions.
  useEffect(() => {
    if (reduced) return
    let rafId = 0
    let sAnim = 0
    let lastTime = performance.now()
    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop)
      const dt = Math.min(now - lastTime, 64)
      lastTime = now

      const track = trackRef.current
      const inner = innerRef.current
      const headerEl = headerRef.current
      const stack = stackRef.current
      if (!track || !inner || !headerEl || !stack || window.innerWidth < 1024) return

      const trackTop = track.getBoundingClientRect().top
      const vh = window.innerHeight
      if (trackTop > vh || trackTop < -track.offsetHeight) return // section far off-screen

      const headerH = headerEl.offsetHeight
      const room = vh - NAV_CLEAR - BOTTOM_PAD
      const peek = Math.min(
        PEEK_MAX,
        Math.max(PEEK_MIN, (room - headerH - STACK_GAP - CARD_H) / (CARD_COUNT - 1)),
      )
      const stackH = CARD_H + (CARD_COUNT - 1) * peek
      const nextStackH = `${stackH}px`
      if (stack.style.height !== nextStackH) stack.style.height = nextStackH
      const scale = Math.min(1, room / (headerH + STACK_GAP + stackH))
      inner.style.transform = scale < 1 ? `scale(${scale})` : ''

      const sTarget = Math.min(Math.max(-trackTop / SEG, 0), CARD_COUNT - 1)
      sAnim += (sTarget - sAnim) * (1 - Math.exp(-dt * SMOOTHING))
      if (Math.abs(sTarget - sAnim) < 0.0005) sAnim = sTarget

      const stackTop = stack.getBoundingClientRect().top
      cardRefs.current.forEach((card, i) => {
        if (!card || i === 0) return
        const e = smoothstep((clamp01(sAnim - (i - 1)) - HOLD) / (1 - HOLD))
        // travel starts just below the fold instead of a full viewport away,
        // so the entrance reads calm rather than rushed
        const enterDist = Math.max(vh - stackTop - i * peek, 0)
        card.style.transform = `translateY(${i * peek + (1 - e) * enterDist}px)`
      })
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [reduced])

  const header = (
    <>
      <SectionLabel>What we do</SectionLabel>
      <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <h2 className="max-w-[756px] text-[40px] font-bold leading-none sm:text-[52px] lg:text-[64px]">
          Five ways to put a senior outfit to work.
        </h2>
        <div className="flex max-w-[463px] flex-col items-start gap-5">
          <p className="text-[17px] font-medium leading-[1.5] tracking-[-0.4px] opacity-80 lg:text-[20px]">
            Senior people who move freely across strategy, product, and code, with nothing
          </p>
          <PillButton href={CALENDAR_URL}>Book a call</PillButton>
        </div>
      </div>
    </>
  )

  return (
    <section id="services" className="border-t border-ink/12">
      {!reduced && (
        <div
          ref={trackRef}
          className="hidden lg:block"
          style={{ height: `calc(100dvh + ${(CARD_COUNT - 1) * SEG + END_HOLD}px)` }}
        >
          <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pb-4 pt-[84px]">
            <div ref={innerRef} className="mx-auto w-full max-w-[1440px] px-14">
              <div ref={headerRef}>{header}</div>
              <div ref={stackRef} className="relative mt-8">
                {services.map((service, i) => (
                  <div
                    key={service.category}
                    ref={(el) => {
                      cardRefs.current[i] = el
                    }}
                    className="absolute inset-x-0 top-0 will-change-transform"
                    style={{
                      zIndex: i + 1,
                      transform: i > 0 ? 'translateY(100dvh)' : undefined,
                    }}
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`mx-auto max-w-[1440px] px-6 pt-20 lg:px-14 ${reduced ? '' : 'lg:hidden'}`}>
        {header}
        <div className="mt-10 flex flex-col gap-6 pb-[120px]">
          {services.map((service) => (
            <Reveal key={service.category} variant="rise">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
