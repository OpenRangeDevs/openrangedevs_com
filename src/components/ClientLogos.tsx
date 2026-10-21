import { clientLogos } from '../content'

export default function ClientLogos() {
  return (
    <section className="border-b border-ink/20 py-10 lg:py-14">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-x-8 gap-y-8 px-6 lg:flex-nowrap lg:justify-between lg:gap-x-0">
        {clientLogos.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
            style={{ width: (logo.w / logo.h) * 40, height: 40 }}
          />
        ))}
      </div>
    </section>
  )
}
