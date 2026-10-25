import { CALENDAR_URL, testimonial } from '../data/site'
import Footer from './Footer'
import Navbar from './Navbar'
import PillButton from './PillButton'

export type CaseStudyData = {
  client: string
  project: string
  title: string
  lede: string
  contextTitle: string
  context: string[]
  steps: { number: string; title: string; body: string }[]
  outcomeTitle: string
  outcomeBody: string
  disciplines: string[]
  signal: string[]
  showTestimonial: boolean
}

function CaseStudySignal({ study }: { study: CaseStudyData }) {
  const labels = study.signal

  return (
    <div className="relative mt-12 overflow-hidden rounded-[22px] border border-brand-600/20 bg-[#f7f9fd] px-5 py-8 sm:px-10 sm:py-12 lg:mt-16 lg:px-14 lg:py-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgb(0_3_9/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(0_3_9/0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative grid gap-4 lg:grid-cols-4 lg:gap-0">
        {labels.map((label, index) => (
          <div key={label} className="relative flex min-h-[126px] items-center lg:min-h-[180px]">
            {index < labels.length - 1 && (
              <span className="absolute left-[calc(50%+38px)] right-[-50%] top-1/2 hidden h-px bg-brand-600/35 lg:block" />
            )}
            <div className="relative z-10 w-full rounded-[14px] border border-brand-600/25 bg-white p-5 shadow-[0_16px_45px_rgb(23_95_242/0.07)] lg:mx-3">
              <span className="text-[10px] font-bold tracking-[0.15em] text-brand-700">0{index + 1}</span>
              <p className="mt-5 text-[20px] font-bold leading-[1.05] tracking-[-0.04em]">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-8 flex items-center justify-between border-t border-ink/12 pt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{study.client} · case study</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700">Work in motion</p>
      </div>
    </div>
  )
}

export default function CaseStudyPage({ study }: { study: CaseStudyData }) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar elevated />

      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-36 lg:px-14 lg:pb-24 lg:pt-48">
        <a
          href="/"
          className="inline-flex text-[13px] font-bold underline decoration-brand-600 underline-offset-4 transition-opacity hover:opacity-60"
        >
          ← Back to home
        </a>

        <div className="mt-8 rounded-[28px] bg-[#e8f0ff] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">{study.project}</p>
              <h1 className="mt-5 max-w-[900px] text-[52px] font-bold leading-[0.9] tracking-[-0.06em] sm:text-[72px] lg:text-[92px]">
                {study.title}
              </h1>
            </div>
            <aside className="max-w-[430px] border-l-2 border-brand-600 pl-5 lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">The brief</p>
              <p className="mt-4 text-[18px] font-medium leading-[1.55] text-ink/65">{study.lede}</p>
            </aside>
          </div>

          <CaseStudySignal study={study} />

          <div className="mt-5 grid border-y border-ink/15 lg:grid-cols-3">
            {[
              ['Client', study.client],
              ['Focus', study.project],
              ['OpenRangeDevs role', 'Discovery, product, engineering, and ongoing support'],
            ].map(([label, detail], index) => (
              <div key={label} className={`py-6 lg:px-7 ${index < 2 ? 'border-b border-ink/15 lg:border-b-0 lg:border-r' : ''}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/45">{label}</p>
                <p className="mt-3 text-[17px] font-semibold leading-[1.35]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/12">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-12 lg:px-14 lg:py-28">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">The situation</p>
            <h2 className="mt-5 max-w-[560px] text-[42px] font-bold leading-[0.94] tracking-[-0.052em] sm:text-[56px]">
              {study.contextTitle}
            </h2>
          </div>
          <div className="space-y-7 lg:col-span-5 lg:col-start-8 lg:pt-9">
            {study.context.map((paragraph) => (
              <p key={paragraph} className="text-[19px] font-medium leading-[1.58] text-ink/68">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {study.showTestimonial && (
        <section className="bg-[#061a3f] text-white">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 lg:grid-cols-12 lg:px-14 lg:py-24">
            <div className="lg:col-span-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">Client perspective</p>
            </div>
            <blockquote className="lg:col-span-8">
              <p className="text-[28px] font-semibold leading-[1.24] tracking-[-0.035em] sm:text-[38px]">{testimonial.quote}</p>
              <footer className="mt-8 border-t border-white/18 pt-5 text-[14px] text-white/65">
                <strong className="text-white">{testimonial.name}</strong> · {testimonial.role}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-14 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">How we worked</p>
            <h2 className="mt-5 max-w-[760px] text-[44px] font-bold leading-[0.94] tracking-[-0.052em] sm:text-[60px]">
              Keep the business steady while the work gets better.
            </h2>
          </div>
          <p className="max-w-[430px] text-[17px] font-medium leading-[1.55] text-ink/62 lg:col-span-4 lg:col-start-9">
            The work moved as a sequence of visible decisions. Each step reduced risk for the next one.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {study.steps.map((step) => (
            <article key={step.number} className="min-h-[320px] rounded-[20px] border border-ink/14 bg-[#f7f9fd] p-7 sm:p-9">
              <p className="text-[12px] font-bold tracking-[0.13em] text-brand-700">{step.number}</p>
              <h3 className="mt-20 text-[30px] font-bold leading-[1] tracking-[-0.045em]">{step.title}</h3>
              <p className="mt-5 max-w-[340px] text-[16px] font-medium leading-[1.55] text-ink/62">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-700 text-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-12 lg:px-14 lg:py-28">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">What changed</p>
            <h2 className="mt-5 max-w-[850px] text-[46px] font-bold leading-[0.92] tracking-[-0.055em] sm:text-[64px]">
              {study.outcomeTitle}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[18px] font-medium leading-[1.58] text-white/78">{study.outcomeBody}</p>
            <div className="mt-10 border-t border-white/20 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">Work involved</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {study.disciplines.map((discipline) => (
                  <li key={discipline} className="rounded-full border border-white/28 px-4 py-2 text-[12px] font-semibold">
                    {discipline}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-14 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[24px] border border-ink/14 p-8 sm:p-12 lg:flex-row lg:items-end lg:p-14">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">Your business</p>
            <h2 className="mt-5 max-w-[760px] text-[40px] font-bold leading-[0.96] tracking-[-0.05em] sm:text-[54px]">
              What needs to keep moving while something important changes?
            </h2>
          </div>
          <PillButton href={CALENDAR_URL}>Start a conversation</PillButton>
        </div>
      </section>

      <Footer />
    </main>
  )
}
