import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '../hooks/useInView'
import Reveal from './Reveal'

type CaseStudy = {
  name: string
  description: string
  bg: string
  stats: { value: string; label: string }[]
}

const caseStudies: CaseStudy[] = [
  {
    name: 'Aspire',
    description: "Inherited a Rails app that's stalling? We stabilize it, clear the debt.",
    bg: 'bg-[#155b75]',
    stats: [
      { value: '+240%', label: 'Growth over lead’s' },
      { value: '+240%', label: 'Growth over lead’s' },
    ],
  },
  {
    name: 'Aspire',
    description: "Inherited a Rails app that's stalling? We stabilize it, clear the debt.",
    bg: 'bg-[#1849a9]',
    stats: [
      { value: '+240%', label: 'Growth over lead’s' },
      { value: '+240%', label: 'Growth over lead’s' },
    ],
  },
  {
    name: 'Aspire',
    description: "Inherited a Rails app that's stalling? We stabilize it, clear the debt.",
    bg: 'bg-[#4a1fb8]',
    stats: [
      { value: '+240%', label: 'Growth over lead’s' },
      { value: '+240%', label: 'Growth over lead’s' },
    ],
  },
  {
    name: 'Aspire',
    description: "Inherited a Rails app that's stalling? We stabilize it, clear the debt.",
    bg: 'bg-[#000309]',
    stats: [
      { value: '+240%', label: 'Growth over lead’s' },
      { value: '+240%', label: 'Growth over lead’s' },
    ],
  },
]

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

const NUM_RE = /^(\D*)(\d[\d,]*)(.*)$/
const DURATION = 1.9 // seconds — slow enough to read as a smooth climb
// ease-in-out so the count eases in gently and settles softly, instead of the
// front-loaded easeOut that blasted most of the way in the first few frames
const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

// counts the numeric part of a value (e.g. "+240%") up from zero when `run` flips true
function CountUp({ value, run, delay = 0 }: { value: string; run: boolean; delay?: number }) {
  const match = value.match(NUM_RE)
  const prefix = match?.[1] ?? ''
  const target = match ? Number(match[2].replace(/,/g, '')) : 0
  const suffix = match?.[3] ?? ''
  const [reduced] = useState(() => prefersReducedMotion())
  const [n, setN] = useState(reduced ? target : 0)

  // deps are primitives only — including the fresh `match` array would restart
  // (and stall) the animation on every setN re-render
  useEffect(() => {
    if (!run || reduced || target === 0) return
    let raf = 0
    let start = 0
    const tick = (t: number) => {
      if (!start) start = t
      const p = (t - start) / 1000 - delay
      if (p >= 0) {
        const e = easeInOutCubic(Math.min(p / DURATION, 1))
        setN(Math.round(target * e))
        if (p >= DURATION) return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, reduced, target, delay])

  if (!match) return <>{value}</>
  return (
    <>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </>
  )
}

// slight overshoot so the mockup "pops" as it settles at the bottom of the card
const POP_EASE = 'cubic-bezier(0.34, 1.28, 0.64, 1)'

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25)
  const [reduced] = useState(() => prefersReducedMotion())
  const on = inView || reduced
  // the two cards in a row lead in one after the other, so a row doesn't burst at once
  const base = (index % 2) * 0.18

  // staggered entrance driven by a single observer per card
  const anim = (keyframe: string, delay: number, duration = 0.55, ease = EASE_OUT): React.CSSProperties => {
    if (reduced) return {}
    return inView
      ? { animation: `${keyframe} ${duration}s ${ease} ${base + delay}s both` }
      : { opacity: 0 }
  }

  return (
    <article
      ref={ref}
      className={`flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-[20px] border border-[#d5d7da] px-6 pt-6 text-white ${study.bg} lg:h-[480px]`}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-[40px] font-bold leading-none lg:text-[56px]" style={anim('rise', 0.05)}>
          {study.name}
        </h3>
        <p
          className="text-[17px] font-medium leading-[1.5] tracking-[-0.4px] opacity-80 lg:text-[20px]"
          style={anim('rise', 0.18)}
        >
          {study.description}
        </p>
      </div>
      <div className="flex items-center gap-5 lg:gap-10">
        {study.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-5 lg:gap-10">
            {i > 0 && <div className="h-[66px] w-[3px] bg-white" style={anim('rise', 0.32 + i * 0.12)} />}
            <div className="flex w-[130px] flex-col gap-0.5 leading-[1.5] lg:w-[156px]" style={anim('rise', 0.34 + i * 0.12)}>
              <p className="text-[32px] font-medium tracking-[-0.8px] tabular-nums lg:text-[40px]">
                <CountUp value={stat.value} run={on} delay={base + 0.5 + i * 0.12} />
              </p>
              <p className="text-[16px] font-medium tracking-[-0.36px] opacity-80 lg:text-[18px]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="h-[240px] w-full shrink-0 rounded-[15px] bg-white lg:h-[323px] lg:w-[610px] lg:max-w-none"
        style={anim('pop-up', 0.62, 0.7, POP_EASE)}
      />
    </article>
  )
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-[1440px] px-6 pt-[120px] lg:px-14">
      <Reveal variant="rise">
        <h2 className="text-center text-[40px] font-bold leading-none sm:text-[52px] lg:text-[64px]">Case Studies</h2>
      </Reveal>
      <div className="mt-14 flex flex-col gap-10">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CaseStudyCard study={caseStudies[0]} index={0} />
          <CaseStudyCard study={caseStudies[1]} index={1} />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <CaseStudyCard study={caseStudies[2]} index={2} />
          <CaseStudyCard study={caseStudies[3]} index={3} />
        </div>
      </div>
    </section>
  )
}
