// All client-side behaviour for the marketing pages. Components render plain
// HTML; this wires up motion and interactivity via data-* attributes.
import Lenis from 'lenis'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---- Smooth scrolling -------------------------------------------------------
let lenis: Lenis | null = null
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, anchors: true })
  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

// ---- Scroll reveals ([data-reveal] / [data-anim] / [data-inview-class]) -----
const ownAnims = (root: HTMLElement) =>
  [root, ...root.querySelectorAll<HTMLElement>('[data-anim]')].filter(
    (el) => el.dataset.anim && (el === root || el.closest('[data-reveal]') === root),
  )

const reveal = (root: HTMLElement) => {
  for (const el of ownAnims(root)) {
    if (!reduced) el.style.animation = el.dataset.anim!
    delete el.dataset.hide
  }
}

const observers = new Map<number, IntersectionObserver>()
const observe = (el: HTMLElement, onEnter: (el: HTMLElement) => void) => {
  const threshold = Number(el.dataset.threshold ?? 0.25)
  let io = observers.get(threshold)
  if (!io) {
    io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          obs.unobserve(entry.target)
          handlers.get(entry.target)?.(entry.target as HTMLElement)
        }
      },
      { threshold },
    )
    observers.set(threshold, io)
  }
  handlers.set(el, onEnter)
  io.observe(el)
}
const handlers = new WeakMap<Element, (el: HTMLElement) => void>()

document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
  if (reduced) reveal(el)
  else observe(el, reveal)
})

if (!reduced) {
  document.querySelectorAll<HTMLElement>('[data-inview-class]').forEach((el) =>
    observe(el, (target) => target.classList.add(target.dataset.inviewClass!)),
  )
}

// ---- Navbar: widen on scroll, mobile menu -----------------------------------
const header = document.querySelector<HTMLElement>('[data-nav-header]')
const nav = document.querySelector<HTMLElement>('[data-nav]')
if (header && nav) {
  // hero pill width → full section-container width; the extra internal padding when
  // wide slides the logo/links/button out to line up with the section content edges
  const NARROW = 1080
  const WIDE = 1440
  const START = 60 // scroll where the widen begins
  const END = 560 // scroll where it reaches full width (2nd section in view)
  const SMOOTHING = 0.02 // exponential catch-up rate per ms, so width glides to target
  const elevated = nav.dataset.elevated === 'true'
  const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const smoothstep = (x: number) => {
    const c = clamp01(x)
    return c * c * (3 - 2 * c)
  }

  let pAnim = 0
  let last = performance.now()
  const loop = (now: number) => {
    requestAnimationFrame(loop)
    const dt = Math.min(now - last, 64)
    last = now
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
    if (window.innerWidth >= 1024) {
      const pad = `${lerp(24, 32, pAnim)}px`
      nav.style.paddingLeft = pad
      nav.style.paddingRight = pad
    } else {
      nav.style.paddingLeft = ''
      nav.style.paddingRight = ''
    }
  }
  requestAnimationFrame(loop)

  const toggle = header.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const setOpen = (open: boolean) => {
    header.toggleAttribute('data-open', open)
    toggle?.setAttribute('aria-expanded', String(open))
  }
  toggle?.addEventListener('click', () => setOpen(!header.hasAttribute('data-open')))
  header.querySelectorAll('[data-nav-menu] a').forEach((a) => a.addEventListener('click', () => setOpen(false)))
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false))
}

// ---- Hero: full-bleed image tucks into a rounded inset card -----------------
const hero = document.querySelector<HTMLElement>('[data-hero]')
const heroCard = document.querySelector<HTMLElement>('[data-hero-card]')
if (hero && heroCard) {
  let rafId = 0
  const update = () => {
    // 0 → 1 over the first 240px of scroll
    const p = Math.min(Math.max(window.scrollY / 240, 0), 1)
    const pad = 16 * p
    hero.style.padding = `${pad}px ${pad}px 0`
    heroCard.style.borderRadius = `${37 * p}px`
  }
  window.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    },
    { passive: true },
  )
  update()
}

// ---- FAQ accordion ----------------------------------------------------------
document.querySelectorAll<HTMLElement>('[data-faq-item]').forEach((item, _, all) => {
  item.querySelector('[data-faq-toggle]')?.addEventListener('click', () => {
    const open = item.dataset.open !== 'true'
    all.forEach((other) => {
      other.dataset.open = String(other === item && open)
      other.querySelector('[data-faq-toggle]')?.setAttribute('aria-expanded', String(other === item && open))
    })
  })
})

// ---- Dialogs (team profiles) ------------------------------------------------
document.querySelectorAll<HTMLElement>('[data-dialog-open]').forEach((button) => {
  const dialog = document.getElementById(button.dataset.dialogOpen!) as HTMLDialogElement | null
  if (!dialog) return
  button.addEventListener('click', () => {
    dialog.showModal()
    lenis?.stop()
  })
})
document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => lenis?.start())
  dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close())
  // click on the backdrop (outside the card) closes
  dialog.addEventListener('click', (e) => {
    const r = dialog.getBoundingClientRect()
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
    if (!inside) dialog.close()
  })
})
