import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../content'
import PillButton from './PillButton'
import { prefersReducedMotion } from '../hooks/useInView'

// hero pill width → full section-container width; the extra internal padding when
// wide slides the logo/links/button out to line up with the section content edges
const NARROW = 1080
const WIDE = 1440
const START = 60 // scroll where the widen begins
const END = 560 // scroll where it reaches full width (2nd section in view)
const SMOOTHING = 0.02 // exponential catch-up rate per ms, so width glides to target

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smoothstep = (x: number) => {
  const c = clamp01(x)
  return c * c * (3 - 2 * c)
}

type NavbarProps = {
  elevated?: boolean
}

export default function Navbar({ elevated = false }: NavbarProps) {
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let rafId = 0
    let pAnim = 0
    let last = performance.now()
    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop)
      const dt = Math.min(now - last, 64)
      last = now
      const header = headerRef.current
      const nav = navRef.current
      if (!header || !nav) return

      const pTarget = smoothstep((window.scrollY - START) / (END - START))
      if (reduced) pAnim = pTarget
      else {
        pAnim += (pTarget - pAnim) * (1 - Math.exp(-dt * SMOOTHING))
        if (Math.abs(pTarget - pAnim) < 0.001) pAnim = pTarget
      }

      header.style.maxWidth = `${lerp(NARROW, WIDE, pAnim)}px`
      header.style.top = `${lerp(49, 12, pAnim)}px`
      const shadowAlpha = elevated ? lerp(0.11, 0.16, pAnim) : 0.12 * pAnim
      nav.style.boxShadow = `0 12px 38px rgba(5,16,35,${shadowAlpha.toFixed(3)})`
      // grow the pill's inner padding on desktop so the logo/button ride out to the
      // section content edges (56px) as it widens; leave the class padding on mobile
      if (window.innerWidth >= 1024) {
        const pad = `${lerp(24, 32, pAnim)}px`
        nav.style.paddingLeft = pad
        nav.style.paddingRight = pad
      } else {
        nav.style.paddingLeft = ''
        nav.style.paddingRight = ''
      }
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [elevated])

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 top-[49px] z-50 w-[calc(100%-48px)] max-w-[1080px] -translate-x-1/2"
    >
      <nav
        ref={navRef}
        className={`flex h-[64px] items-center justify-between rounded-[20px] bg-white px-4 lg:px-6 ${
          elevated ? 'border border-ink/10 ring-1 ring-white/80' : ''
        }`}
      >
        <a href="#" className="flex min-w-0 items-center gap-[6.5px]">
          <img src="/assets/logo-mark.svg" alt="" className="h-[32px] w-[39.8px] shrink-0 lg:h-[40px] lg:w-[49.8px]" />
          <span className="truncate font-logo text-[18px] font-bold tracking-[-0.86px] text-ink lg:text-[21.5px]">
            OpenRangeDevs
          </span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[18px] font-medium leading-[1.5] text-ink transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <PillButton size="md" href="#contact">
            Contact Us
          </PillButton>
        </div>

        {/* mobile / tablet menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="relative flex size-10 shrink-0 items-center justify-center lg:hidden"
        >
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-ink transition-transform duration-300 ${
              menuOpen ? 'rotate-45' : '-translate-y-[6px]'
            }`}
          />
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-ink transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-ink transition-transform duration-300 ${
              menuOpen ? '-rotate-45' : 'translate-y-[6px]'
            }`}
          />
        </button>
      </nav>

      {/* mobile / tablet dropdown menu */}
      <div
        className={`absolute inset-x-0 top-[72px] origin-top rounded-[20px] bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-300 ease-out lg:hidden ${
          menuOpen ? 'scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-[12px] px-4 py-3 text-[20px] font-medium text-ink transition-colors hover:bg-ink/5"
            >
              {link.label}
            </a>
          ))}
        </div>
        <PillButton size="md" href="#contact" className="mt-2 w-full" onClick={() => setMenuOpen(false)}>
          Contact Us
        </PillButton>
      </div>
    </header>
  )
}
