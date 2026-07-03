import { useEffect, useRef } from 'react'
import { CALENDAR_URL, clientLogos } from '../content'
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

        {/* broad glow behind the logo strip */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[160%] -translate-x-1/2">
          <img src="/assets/glow-effect.svg" alt="" className="absolute inset-0 h-full w-full" />
        </div>

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
            Open Range is a senior studio of engineers and operators. We design and ship products, drop in fractional
            technical leadership, and stand up a full team in days
          </p>
          <PillButton href={CALENDAR_URL} className="mt-6">
            Book a call
          </PillButton>
        </div>

        {/* client logo carousel */}
        {/* two stacked copies of the same marquee: a greyed base layer, and a full-opacity
            layer masked to the center band so logos light up as they pass the middle */}
        <div className="absolute inset-x-0 bottom-[56px] flex justify-center px-6 lg:bottom-[90px]">
          <div className="relative w-full max-w-[880px]">
            {[
              {
                mask: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 14%, black 40%, black 60%, rgba(0,0,0,0.6) 86%, transparent 100%)',
                logoOpacity: 'opacity-60',
                spotlight: false,
              },
              {
                mask: 'linear-gradient(to right, transparent 34%, black 46%, black 54%, transparent 66%)',
                logoOpacity: 'opacity-100',
                spotlight: true,
              },
            ].map((layer) => (
              <div
                key={layer.mask}
                aria-hidden={layer.spotlight}
                className={`overflow-hidden ${layer.spotlight ? 'absolute inset-0' : ''}`}
                style={{ maskImage: layer.mask, WebkitMaskImage: layer.mask }}
              >
                <div className="flex w-max" style={{ animation: 'marquee 28s linear infinite' }}>
                  {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-[62px] pr-[62px]">
                      {clientLogos.map((logo) => (
                        <img
                          key={logo.src}
                          src={logo.src}
                          alt={!layer.spotlight && copy === 0 ? logo.alt : ''}
                          className={`shrink-0 ${layer.logoOpacity}`}
                          style={{ width: logo.w, height: logo.h }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* side glows centered on the carousel fade edges: carousel is 880px centered, so its edges sit at 50% ± 440px; each 400px-wide glow core is centered on that mark (440 + 200 = 640) */}
        <img src="/assets/glow-ellipse.svg" alt="" className="pointer-events-none absolute bottom-[-86px] left-[calc(50%-640px)] hidden h-[383px] w-[400px] lg:block" />
        <img src="/assets/glow-ellipse.svg" alt="" className="pointer-events-none absolute bottom-[-86px] right-[calc(50%-640px)] hidden h-[383px] w-[400px] lg:block" />

        {/* bottom meta labels */}
        <div className="absolute inset-x-0 bottom-8 hidden items-center justify-between px-[68px] lg:flex">
          <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-black opacity-40">
            EST. ON THE OPEN RANGE
          </p>
          <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-black opacity-40">
            51.0447° N · 114.0719° W
          </p>
          <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-black opacity-40">NO FENCES.</p>
        </div>
      </div>
    </section>
  )
}
