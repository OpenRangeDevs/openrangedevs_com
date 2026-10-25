import { navLinks, sectionHref } from '../data/site'
import PillButton from './PillButton'

// The scroll-driven widen (pill → full container width) and the mobile menu
// run in src/scripts/site.ts, keyed off data-nav-* attributes.
type NavbarProps = {
  elevated?: boolean
  onHome?: boolean
}

export default function Navbar({ elevated = false, onHome = false }: NavbarProps) {
  return (
    <header
      data-nav-header
      className="fixed left-1/2 top-[49px] z-50 w-[calc(100%-48px)] max-w-[1080px] -translate-x-1/2"
    >
      <nav
        data-nav
        data-elevated={elevated ? "true" : undefined}
        className={`flex h-[64px] items-center justify-between rounded-[20px] bg-white px-4 lg:px-6 ${
          elevated ? 'border border-ink/10 ring-1 ring-white/80' : ''
        }`}
      >
        <a href="/" aria-label="OpenRangeDevs home" className="flex min-w-0 items-center gap-[6.5px]">
          <img src="/assets/logo-mark.svg" alt="" className="h-[32px] w-[39.8px] shrink-0 lg:h-[40px] lg:w-[49.8px]" />
          <span className="truncate font-logo text-[18px] font-bold tracking-[-0.86px] text-ink lg:text-[21.5px]">
            OpenRangeDevs
          </span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={sectionHref(link.href, onHome)}
              className="text-[18px] font-medium leading-[1.5] text-ink transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <PillButton size="md" href="/contact/">
            Contact Us
          </PillButton>
        </div>

        {/* mobile / tablet menu toggle */}
        <button
          type="button"
          data-nav-toggle
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          className="relative flex size-10 shrink-0 items-center justify-center lg:hidden"
        >
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-ink transition-transform duration-300 nav-bar-top`}
          />
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-ink transition-opacity duration-200 nav-bar-mid`}
          />
          <span
            className={`absolute h-[2px] w-5 rounded-full bg-ink transition-transform duration-300 nav-bar-bottom`}
          />
        </button>
      </nav>

      {/* mobile / tablet dropdown menu */}
      <div
        id="mobile-menu"
        data-nav-menu
        className="nav-menu absolute inset-x-0 top-[72px] origin-top rounded-[20px] bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-300 ease-out lg:hidden"
      >
        <div className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={sectionHref(link.href, onHome)}
              className="rounded-[12px] px-4 py-3 text-[20px] font-medium text-ink transition-colors hover:bg-ink/5"
            >
              {link.label}
            </a>
          ))}
        </div>
        <PillButton size="md" href="/contact/" className="mt-2 w-full">
          Contact Us
        </PillButton>
      </div>
    </header>
  )
}
