import { CALENDAR_URL, navLinks } from '../content'
import Testimonial from './Testimonial'

const contacts = [
  { icon: '/assets/icon-mail.svg', label: 'support@openrangedevs.com' },
  { icon: '/assets/icon-call.svg', label: '995 - 222 - 444' },
  { icon: '/assets/icon-location.svg', label: '3997 Dunning Road, Ontario' },
]

// the peak marks overlap every 364px (the tall right edge of one covers the seam of
// the next) and sit flush on the bottom — their bases are a continuous fill, so the
// range meets the bottom edge with no gap. a2/a3 are the exact x of each mark's
// medium and tall peak apexes (from the SVG paths), so the grid lines can land dead
// on the mountain heads.
const MARKS = [
  { src: '/assets/footer-mark-1.svg', w: 416.751, a2: 246.596, a3: 416.751 },
  { src: '/assets/footer-mark-2.svg', w: 416.751, a2: 246.596, a3: 416.751 },
  { src: '/assets/footer-mark-3.svg', w: 392.21, a2: 232.075, a3: 392.21 },
]
const MARK_STEP = 364
// start one mark off the left edge so the left notch is covered
const markTiles = Array.from({ length: 17 }, (_, i) => {
  const k = i - 1
  const m = MARKS[((k % MARKS.length) + MARKS.length) % MARKS.length]
  return { ...m, left: k * MARK_STEP, key: k }
})
// a vertical line on every tall + medium peak, derived from the marks so they always align
const lineTicks = markTiles.flatMap((m) => [m.left + m.a2, m.left + m.a3])

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/12">
      {/* giant wordmark */}
      <div className="px-6 pt-10 lg:px-10">
        <p className="brand-gradient inline-block max-w-full bg-clip-text text-[10.5vw] font-bold leading-none tracking-[-0.055em] text-transparent lg:text-[112px] lg:tracking-[-8.96px]">
          OpenRangeDevs
        </p>
      </div>

      <div className="mt-8 border-t border-ink/12">
        <div className="flex flex-col lg:flex-row">
          {/* left rail */}
          <div className="flex w-full shrink-0 flex-col lg:w-[24%] lg:min-w-[340px] lg:max-w-[420px] lg:border-r lg:border-ink/12">
            <div className="px-6 pb-10 pt-6 lg:px-10">
              <p className="text-[24px] font-medium leading-none opacity-60">Contact us</p>
              <ul className="mt-4 flex flex-col gap-3">
                {contacts.map((contact) => (
                  <li key={contact.label} className="flex items-center gap-1">
                    <img src={contact.icon} alt="" className="size-5 shrink-0" />
                    <p className="text-[14px] font-medium leading-none">{contact.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 bg-brand-700 px-6 py-5 lg:px-10">
              <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-white">
                Senior people who move freely across strategy, product, and code, with nothing
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-fit cursor-pointer items-center justify-center rounded-[12px] bg-white px-8 text-[14px] font-semibold leading-none text-ink transition-transform hover:scale-[1.03]"
              >
                Book a call
              </a>
            </div>

            <div className="flex-1 border border-white/12 bg-ink px-6 py-4 lg:min-h-[378px] lg:px-10">
              <Testimonial light />
            </div>
          </div>

          {/* right area */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="border-b border-ink/12 px-6 pb-6 pt-6 lg:px-10">
              <p className="text-[24px] font-medium leading-none opacity-60">Navigation</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-12 gap-y-4 lg:flex-nowrap lg:justify-between lg:gap-x-6">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="group flex items-center">
                    <span className="text-[32px] font-medium leading-none transition-opacity group-hover:opacity-60 lg:text-[48px]">
                      {link.label}
                    </span>
                    <img
                      src="/assets/icon-arrow-up-right.svg"
                      alt=""
                      className="size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* decorative mark field — grows to the footer bottom so mountains stay flush */}
            <div className="relative min-h-[300px] flex-1 overflow-hidden bg-[#fafafa] lg:min-h-[554px]">
              {lineTicks.map((x, k) => (
                <div key={k} className="absolute inset-y-0 w-px hairline" style={{ left: `${x}px` }} />
              ))}
              {markTiles.map((m) => (
                <img
                  key={m.key}
                  src={m.src}
                  alt=""
                  className="absolute bottom-0 h-[200px] max-w-none lg:h-[340px]"
                  style={{ left: `${m.left}px`, width: `${m.w}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
