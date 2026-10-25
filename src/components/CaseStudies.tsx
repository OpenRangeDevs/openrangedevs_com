import Reveal from './Reveal'

export type CaseStudyCard = {
  slug: string
  client: string
  project: string
  title: string
  summary: string
}

// Alternating wide/narrow cards on the 12-column grid
const LAYOUT = [
  'lg:col-span-7 lg:min-h-[560px]',
  'lg:col-span-5 lg:min-h-[560px]',
  'lg:col-span-5 lg:min-h-[500px]',
  'lg:col-span-7 lg:min-h-[500px]',
]

function Card({ study, index }: { study: CaseStudyCard; index: number }) {
  return (
    <a
      href={`/case-studies/${study.slug}/`}
      aria-label={`Read the ${study.client} case study`}
      className={`case-study-card group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-ink/15 bg-white p-7 transition-colors hover:border-brand-600/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 sm:p-9 lg:p-10 ${LAYOUT[index % LAYOUT.length]}`}
    >
      <div className="relative z-10 flex items-start justify-between gap-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">{study.project}</p>
        <span className="text-[11px] font-bold tabular-nums text-ink/35">0{index + 1}</span>
      </div>
      <div className="relative z-10 mt-12 max-w-[380px]">
        <p className="text-[13px] font-bold uppercase tracking-[0.13em] text-brand-700">{study.client}</p>
        <h3 className="mt-3 text-[38px] font-bold leading-[0.96] tracking-[-0.05em] sm:text-[46px]">{study.title}</h3>
        <p className="mt-5 text-[16px] font-medium leading-[1.55] text-ink/65">{study.summary}</p>
      </div>
      <p className="relative z-10 mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-brand-700">Read case study ↗</p>
      <div aria-label={`${study.client} client preview placeholder`} className="case-client-preview mt-12 -mb-7 -mx-7 transition-colors group-hover:bg-brand-600/20 sm:-mb-9 sm:-mx-9 lg:-mb-10 lg:-mx-10" />
    </a>
  )
}

export default function CaseStudies({ studies }: { studies: CaseStudyCard[] }) {
  return (
    <section id="case-studies" className="border-t border-ink/15">
      <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-[110px] lg:px-14 lg:pb-20 lg:pt-[140px]">
        <Reveal variant="rise">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/45">Case studies</p>
          <h2 className="mt-5 max-w-[780px] text-[48px] font-bold leading-[0.93] tracking-[-0.055em] sm:text-[64px] lg:text-[76px]">
            Work that holds up in the real world.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-4 px-6 pb-6 lg:grid-cols-12 lg:px-14 lg:pb-14">
        {studies.map((study, index) => (
          <Card key={study.client} study={study} index={index} />
        ))}
      </div>
    </section>
  )
}
