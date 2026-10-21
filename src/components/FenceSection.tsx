import Reveal from './Reveal'
import { testimonial } from '../content'
import SectionLabel from './SectionLabel'

const principles = [
  {
    title: 'Right problem. Right scope.',
    detail: 'Business before code.',
  },
  {
    title: 'A process clients can trust.',
    detail: 'We make scope, tradeoffs, and next steps visible from discovery through launch.',
  },
  {
    title: 'A business asset, not another rebuild.',
    detail: 'Build a foundation that grows revenue and adapts as the business does.',
  },
]

export default function FenceSection() {
  return (
    <section>
      <div className="mx-auto max-w-[1440px] px-6 py-[110px] lg:px-14 lg:py-[140px]">
        <Reveal variant="rise">
          <SectionLabel>Why OpenRangeDevs</SectionLabel>
        </Reveal>

        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal variant="rise" delay={0.04} className="lg:col-span-8">
            <h2 className="max-w-[860px] text-[48px] font-bold leading-[0.92] tracking-[-0.055em] sm:text-[64px] lg:text-[76px]">
              Build what grows the business.
            </h2>
          </Reveal>
          <Reveal variant="rise" delay={0.08} className="lg:col-span-4 lg:pb-1">
            <p className="max-w-[430px] text-[18px] font-semibold leading-[1.45] tracking-[-0.025em] lg:text-[21px]">
              We turn the right opportunities into products and operations that create revenue, unlock capacity, and compound value.
            </p>
          </Reveal>
        </div>

        <Reveal variant="wipe" className="relative mt-14 aspect-[16/9] min-h-[430px] overflow-hidden rounded-[20px] lg:mt-20 lg:aspect-[16/7]">
          <img
            src="/assets/studio.jpg"
            alt="A collaborative product working session"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </Reveal>

        <div className="relative grid lg:grid-cols-3">
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-ink/20" />
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              variant="rise"
              delay={0.04 + index * 0.05}
              className={`py-8 lg:px-8 lg:py-10 ${
                index < principles.length - 1 ? 'border-b border-ink/20 lg:border-b-0 lg:border-r' : ''
              }`}
            >
              <h3 className="text-[27px] font-bold leading-none tracking-[-0.04em]">{principle.title}</h3>
              <p className="mt-3 text-[15px] font-medium opacity-55">{principle.detail}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid border-b border-ink/20 lg:grid-cols-12">
          <Reveal variant="rise" delay={0.08} className="py-8 lg:col-span-3 lg:py-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">Client perspective</p>
            <p className="mt-4 max-w-[220px] text-[22px] font-bold leading-[1.05] tracking-[-0.04em]">
              The way we work is part of the value.
            </p>
          </Reveal>
          <Reveal variant="rise" delay={0.12} className="border-t border-ink/20 py-8 lg:col-span-9 lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
            <blockquote className="max-w-[850px] border-l-2 border-brand-600 pl-6">
              <p className="text-[21px] font-medium leading-[1.42] tracking-[-0.035em] lg:text-[28px]">{testimonial.quote}</p>
              <footer className="mt-5 text-[14px] font-semibold text-ink/55">
                {testimonial.name} · {testimonial.role}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
