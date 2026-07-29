import { CALENDAR_URL } from '../content'
import { prefersReducedMotion, useInView } from '../hooks/useInView'
import ArtworkMotion from './ArtworkMotion'
import PillButton from './PillButton'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

type Visual = 'diagnose' | 'change' | 'partner'

type Service = {
  number: string
  label: string
  title: string
  body: string
  result: string
  visual: Visual
}

const services: Service[] = [
  {
    number: '01',
    label: 'Understand the business',
    title: 'Find where time, money, and momentum are getting lost.',
    body: 'We work beside the people closest to the operation, find the friction that costs the business most, and set a clear priority before anything gets built.',
    result: 'A clear priority tied to business value.',
    visual: 'diagnose',
  },
  {
    number: '02',
    label: 'Build business value',
    title: 'Turn the right business problem into measurable growth.',
    body: 'We improve how the business works and build the digital response it needs. The result can be more revenue, lower operating costs, or capacity to serve more clients.',
    result: 'More revenue. Lower costs. Greater capacity.',
    visual: 'change',
  },
  {
    number: '03',
    label: 'Stay and improve',
    title: 'Keep improving what drives the business.',
    body: 'We maintain and improve the systems we build as the company changes. You keep a team that understands the operation and can act without relearning the business.',
    result: 'The same team stays accountable as the business grows.',
    visual: 'partner',
  },
]

function GraphicFrame({ children, visual }: { children: React.ReactNode; visual: Visual }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.42)
  const active = inView && !prefersReducedMotion()

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`service-graphic service-graphic--${visual} ${active ? 'service-graphic--active' : ''}`}
    >
      {children}
    </div>
  )
}

function DiagnoseGraphic() {
  return (
    <GraphicFrame visual="diagnose">
      <div className="service-graphic-meta">
        <span>Business priority</span>
        <span>One clear focus</span>
      </div>

      <div className="service-visual-stage service-visual-stage--diagnose">
        <svg viewBox="0 0 760 470" preserveAspectRatio="none">
          <path className="service-visual-line service-visual-line--one" d="M92 105 H260 L342 220" />
          <path className="service-visual-line service-visual-line--two" d="M668 105 H500 L418 220" />
          <path className="service-visual-line service-visual-line--three" d="M92 365 H260 L342 250" />
        </svg>
        <span className="service-visual-dot service-visual-dot--time" />
        <span className="service-visual-dot service-visual-dot--cost" />
        <span className="service-visual-dot service-visual-dot--flow" />
        <span className="service-visual-tag service-visual-tag--time">Time</span>
        <span className="service-visual-tag service-visual-tag--cost">Cost</span>
        <span className="service-visual-tag service-visual-tag--flow">Flow</span>
        <div className="service-visual-core">
          <span>Fix first</span>
          <strong>Priority</strong>
        </div>
      </div>
    </GraphicFrame>
  )
}

function ChangeGraphic() {
  return (
    <GraphicFrame visual="change">
      <div className="service-graphic-meta">
        <span>Business impact</span>
        <span>Value in motion</span>
      </div>

      <div className="service-visual-stage service-visual-stage--change">
        <div className="growth-bars">
          <div className="growth-bar growth-bar--cost"><i /><span>Cost</span></div>
          <div className="growth-bar growth-bar--capacity"><i /><span>Capacity</span></div>
          <div className="growth-bar growth-bar--revenue"><i /><span>Revenue</span></div>
        </div>
        <svg viewBox="0 0 760 470" preserveAspectRatio="none">
          <path className="growth-baseline" d="M82 424 H680" />
          <path className="growth-curve" d="M105 345 C230 350 260 280 350 265 C455 248 520 185 655 90" />
          <circle cx="655" cy="90" r="8" />
        </svg>
        <div className="growth-outcome">
          <span>Business value</span>
          <strong>Up and to the right</strong>
        </div>
      </div>
    </GraphicFrame>
  )
}

function PartnerGraphic() {
  return (
    <GraphicFrame visual="partner">
      <div className="service-graphic-meta">
        <span>Ongoing partner</span>
        <span>Built to keep improving</span>
      </div>

      <div className="service-visual-stage service-visual-stage--partner">
        <div className="partner-simple-ring partner-simple-ring--outer" />
        <div className="partner-simple-ring partner-simple-ring--inner" />
        <div className="partner-simple-core">
          <img src="/assets/logo-mark.svg" alt="" />
          <strong>Built around<br />your business</strong>
        </div>
        <span className="partner-simple-node partner-simple-node--maintain">Maintain</span>
        <span className="partner-simple-node partner-simple-node--improve">Improve</span>
        <span className="partner-simple-node partner-simple-node--grow">Grow</span>
      </div>
    </GraphicFrame>
  )
}

function ServiceGraphic({ visual }: { visual: Visual }) {
  if (visual === 'diagnose') return <DiagnoseGraphic />
  if (visual === 'change') return <ChangeGraphic />
  return <PartnerGraphic />
}

export default function ServicesSection() {
  return (
    <section id="services" className="overflow-hidden border-t border-ink/15 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-[110px] lg:px-14 lg:pb-28 lg:pt-[140px]">
        <Reveal variant="rise">
          <SectionLabel>What we do</SectionLabel>
        </Reveal>

        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal variant="rise" delay={0.04} className="lg:col-span-8">
            <h2 className="max-w-[920px] text-[48px] font-bold leading-[0.92] tracking-[-0.055em] sm:text-[64px] lg:text-[78px]">
              We improve how the business runs.
            </h2>
          </Reveal>
          <Reveal variant="rise" delay={0.08} className="lg:col-span-4 lg:pb-1">
            <p className="max-w-[430px] text-[18px] font-semibold leading-[1.45] tracking-[-0.025em] lg:text-[21px]">
              We work inside the business with your team. We find the problems worth fixing, build the right response, and stay involved as the company grows.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 pb-16 lg:gap-10 lg:px-14 lg:pb-24">
        {services.map((service, index) => (
          <Reveal key={service.title} variant="rise" delay={0.04 + index * 0.06}>
            <article className={`service-showcase ${index === 1 ? 'service-showcase--reverse' : ''}`}>
              <div className="service-showcase-copy">
                <div className="flex items-center justify-between border-b border-ink/14 pb-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">{service.label}</p>
                  <span className="text-[12px] font-bold tabular-nums text-ink/35">{service.number}</span>
                </div>
                <h3 className="mt-9 max-w-[520px] text-[40px] font-bold leading-[0.94] tracking-[-0.052em] sm:text-[50px] lg:text-[58px]">
                  {service.title}
                </h3>
                <p className="mt-6 max-w-[470px] text-[17px] font-medium leading-[1.55] text-ink/62 lg:text-[18px]">{service.body}</p>
                <div className="mt-auto grid grid-cols-[8px_minmax(0,1fr)] items-start gap-3 pt-10">
                  <span className="mt-[5px] block size-2 shrink-0 rounded-full bg-brand-600" />
                  <p className="max-w-[440px] text-[14px] font-bold uppercase leading-[1.35] tracking-[0.09em] text-ink/70">{service.result}</p>
                </div>
              </div>
              <ServiceGraphic visual={service.visual} />
            </article>
          </Reveal>
        ))}
      </div>

      <div className="relative overflow-hidden border-y border-ink/20 bg-[#061a3b] text-white">
        <img src="/assets/cta-build.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#061a3b]/82" />
        <div className="absolute inset-0 opacity-55">
          <ArtworkMotion variant="blueprint" />
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-7 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-12">
          <Reveal variant="rise">
            <h3 className="max-w-[760px] text-[34px] font-bold leading-none tracking-[-0.04em] sm:text-[43px]">
              What does your business{" "}
              <span className="block">need to make possible?</span>
            </h3>
          </Reveal>
          <PillButton href={CALENDAR_URL} variant="light">Start the conversation</PillButton>
        </div>
      </div>
    </section>
  )
}
