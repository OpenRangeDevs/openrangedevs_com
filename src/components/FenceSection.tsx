import { useState } from 'react'
import { prefersReducedMotion, useInView } from '../hooks/useInView'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

const fencedWords = ['Most', 'studios', 'fence', 'you', 'in.']

const fencedIn = [
  'Junior developers learning on your budget',
  'An account manager between you and the builders',
  'Hand-offs, tickets, and weeks of ramp-up',
  'Scope that quietly balloons',
]

const openRange = [
  'Senior engineers and founders only — no training wheels',
  'You talk directly to the people writing the code',
  'One small outfit that ranges across the whole problem',
  'A fixed plan, shipped in weeks',
]

export default function FenceSection() {
  const { ref: headingRef, inView } = useInView<HTMLHeadingElement>(0.5)
  const [reduced] = useState(() => prefersReducedMotion())

  // beat 1: words rise out of a clip while fence posts drop in between them;
  // beat 2: posts slide away and "We don't." lands free of any clipping
  const wordStyle = (i: number): React.CSSProperties =>
    inView ? { animation: `word-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s both` } : { transform: 'translateY(120%)' }
  const postOuterStyle: React.CSSProperties = inView ? { animation: 'post-out 0.35s ease-in 1.15s both' } : {}
  const postInnerStyle = (i: number): React.CSSProperties =>
    inView ? { animation: `post-in 0.35s ease-out ${0.4 + i * 0.06}s both` } : { transform: 'scaleY(0)' }
  const freeStyle: React.CSSProperties = inView ? { animation: 'free-in 0.6s ease-out 1.35s both' } : { opacity: 0 }

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-[120px] pt-[120px] lg:px-14">
      <Reveal variant="rise">
        <SectionLabel>Why OpenRangeDevs</SectionLabel>
      </Reveal>
      <h2
        ref={headingRef}
        aria-label="Most studios fence you in. We don't."
        className="mt-4 flex max-w-[756px] flex-wrap gap-x-[0.3em] gap-y-[0.1em] text-[40px] font-bold leading-none sm:text-[52px] lg:text-[64px]"
      >
        {reduced ? (
          <span>Most studios fence you in. We don't.</span>
        ) : (
          <>
            {fencedWords.map((word, i) => (
              <span key={word} aria-hidden className="relative">
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em]">
                  <span className="inline-block" style={wordStyle(i)}>
                    {word}
                  </span>
                </span>
                {/* post is centered in the word gap without taking layout space,
                    so spacing stays uniform after the posts exit */}
                {i < fencedWords.length - 1 && (
                  <span className="absolute -right-[0.15em] top-1/2 inline-block -translate-y-1/2 translate-x-1/2">
                    <span className="block" style={postOuterStyle}>
                      <span className="block h-[0.55em] w-[3px] origin-top bg-ink/30" style={postInnerStyle(i)} />
                    </span>
                  </span>
                )}
              </span>
            ))}
            <span aria-hidden className="inline-block" style={freeStyle}>
              We&nbsp;don't.
            </span>
          </>
        )}
      </h2>
      <Reveal variant="rise-clip" delay={0.5} className="mt-6">
        <p className="max-w-[720px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] opacity-80 lg:text-[20px]">
          Open range means no fences — senior people who move freely across strategy, product, and code, with nothing
          standing between you and the work.
        </p>
      </Reveal>

      <div className="mt-[70px] flex flex-col gap-9 lg:h-[506px] lg:flex-row">
        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[461px]">
          {/* fenced-in card: stiff, mechanical entrance */}
          <Reveal variant="scale-in" className="flex flex-1 flex-col gap-5 overflow-clip rounded-[12px] bg-[#f5f5f5] p-6">
            <p className="text-[14px] font-semibold uppercase leading-[1.5] tracking-[0.7px] opacity-80">
              The fenced-in way
            </p>
            <ul className="flex flex-col gap-4">
              {fencedIn.map((item, i) => (
                <li key={item}>
                  <Reveal variant="rise" delay={0.2 + i * 0.06} className="flex items-center gap-1">
                    <img src="/assets/icon-x-dark.svg" alt="" className="size-6 shrink-0" />
                    <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.32px] opacity-80">{item}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Reveal>
          {/* open range card: later but freer, with overshoot */}
          <Reveal variant="free" delay={0.15} className="brand-gradient flex flex-1 flex-col gap-5 overflow-clip rounded-[12px] p-6">
            <p className="text-[14px] font-semibold uppercase leading-[1.5] tracking-[0.7px] text-white opacity-80">
              The open range
            </p>
            <ul className="flex flex-col gap-4">
              {openRange.map((item, i) => (
                <li key={item}>
                  <Reveal variant="rise" delay={0.35 + i * 0.07} className="flex items-center gap-1">
                    <img src="/assets/icon-check-white.svg" alt="" className="size-6 shrink-0" />
                    <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-white opacity-80">
                      {item}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal
          variant="wipe"
          delay={0.2}
          className="min-h-[300px] flex-1 overflow-hidden rounded-[14px] bg-[#d9d9d9] lg:h-[503px]"
        >
          <img src="/assets/studio.jpg" alt="The Open Range studio at work" className="h-full w-full object-cover" />
        </Reveal>
      </div>
    </section>
  )
}
