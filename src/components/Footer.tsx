import { navLinks } from '../content'

const contacts = [
  { icon: '/assets/icon-mail.svg', label: 'hello@openrangedevs.com' },
  { icon: '/assets/icon-call.svg', label: '995 - 222 - 444' },
  { icon: '/assets/icon-location.svg', label: '3997 Dunning Road, Ontario' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/12 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-14 lg:py-20">
        <div className="grid gap-12 border-y border-ink/12 py-10 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.7fr)] lg:gap-16 lg:py-12">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink/45">Contact</p>
            <ul className="mt-6 flex flex-col gap-4">
              {contacts.map((contact) => (
                <li key={contact.label} className="flex items-center gap-3">
                  <img src={contact.icon} alt="" className="size-5 shrink-0" />
                  <p className="text-[15px] font-semibold leading-none">{contact.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-ink/12 pb-4 text-[24px] font-semibold tracking-[-0.04em] transition-colors hover:text-brand-700 lg:text-[28px]"
                >
                  <span>{link.label}</span>
                  <img
                    src="/assets/icon-arrow-up-right.svg"
                    alt=""
                    className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>

            <a
              href="#"
              aria-label="OpenRangeDevs home"
              className="mt-9 inline-flex max-w-full items-center gap-3 lg:mt-11"
            >
              <img
                src="/assets/logo-mark.svg"
                alt=""
                className="h-[46px] w-[57px] shrink-0 sm:h-[58px] sm:w-[72px]"
              />
              <span className="truncate font-logo text-[clamp(34px,5vw,72px)] font-bold leading-none tracking-[-0.05em] text-brand-700">
                OpenRangeDevs
              </span>
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-7 text-[13px] font-medium text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>OpenRangeDevs</p>
          <p>Product, engineering, and ongoing technology support.</p>
        </div>
      </div>
    </footer>
  )
}
