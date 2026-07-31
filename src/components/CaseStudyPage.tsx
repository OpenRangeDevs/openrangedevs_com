import { useLayoutEffect } from 'react'
import { CALENDAR_URL, caseStudies, testimonial, type CaseStudy } from '../content'
import Footer from './Footer'
import Navbar from './Navbar'
import PillButton from './PillButton'

type Story = {
  lede: string
  contextTitle: string
  context: string[]
  approach: { number: string; title: string; body: string }[]
  outcomeTitle: string
  outcomeBody: string
  disciplines: string[]
  quote?: {
    copy: string
    name: string
    role: string
  }
}

const stories: Record<string, Story> = {
  'student-works': {
    lede:
      'Student Works relies on a Ruby on Rails platform that supports day-to-day operations. Security and integration work needed to move forward without putting that continuity at risk.',
    contextTitle: 'Improve the platform without making the business wait.',
    context: [
      'A business-critical platform rarely gets the luxury of a clean restart. People are already using it, integrations already depend on it, and the next priority is already waiting.',
      'OpenRangeDevs worked inside the existing Rails platform. We kept the core stable, addressed API security and integration work, and made room for the changes the business still needed.',
    ],
    approach: [
      {
        number: '01',
        title: 'Start with operating risk.',
        body: 'We identified the parts of the platform and connected services that could interrupt important work.',
      },
      {
        number: '02',
        title: 'Sequence the change.',
        body: 'Security, integration, and platform work moved in smaller releases that the team could verify without stalling the business.',
      },
      {
        number: '03',
        title: 'Keep context with the work.',
        body: 'The same people stayed close to the platform and its business priorities, which reduced relearning between decisions.',
      },
    ],
    outcomeTitle: 'The platform kept moving while the important work moved with it.',
    outcomeBody:
      'Student Works gained a clearer path through platform, security, and integration work without losing business continuity. The relationship continued because the team already understood the system and the operation behind it.',
    disciplines: ['Ruby on Rails', 'API security', 'Systems integration', 'Ongoing platform support'],
    quote: {
      copy: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
    },
  },
  aspire: {
    lede:
      'Aspire had an ambitious product direction. The work was to turn that direction into a release the team could explain, commit to, and move into delivery.',
    contextTitle: 'Make the next release easier to decide and easier to deliver.',
    context: [
      'A broad product direction creates options, but it can also hide the decision that matters now.',
      'OpenRangeDevs brought the opportunity, product scope, and delivery constraints into one working conversation so the team could choose a practical next release.',
    ],
    approach: [
      { number: '01', title: 'Clarify the opportunity.', body: 'We made the business goal and intended client value explicit.' },
      { number: '02', title: 'Reduce the surface area.', body: 'We narrowed the release to the smallest coherent product move.' },
      { number: '03', title: 'Create the delivery path.', body: 'The team left with a build it could commit to and a clear next decision.' },
    ],
    outcomeTitle: 'A focused route from product direction to the next release.',
    outcomeBody:
      'The team could move forward with a tighter scope, clearer tradeoffs, and a release shaped around business value.',
    disciplines: ['Product discovery', 'Product direction', 'Release planning', 'Delivery support'],
  },
  wecasa: {
    lede:
      'The opportunity needed a smaller product surface and a faster way to learn what clients valued.',
    contextTitle: 'Put the essential experience in front of clients sooner.',
    context: [
      'More product does not always create more useful evidence. A wide release can delay the moment when the team learns what matters.',
      'OpenRangeDevs reduced the work to the essential client flow and shaped a release that could produce a clear response.',
    ],
    approach: [
      { number: '01', title: 'Choose the client need.', body: 'We centered the release on the problem the experience had to solve.' },
      { number: '02', title: 'Remove supporting noise.', body: 'Secondary ideas moved out of the way of the core flow.' },
      { number: '03', title: 'Release for evidence.', body: 'The product could now create feedback that informed the next decision.' },
    ],
    outcomeTitle: 'A smaller release built to produce a clearer signal.',
    outcomeBody:
      'The team gained a more focused product direction and a faster route to useful client feedback.',
    disciplines: ['Product focus', 'Experience design', 'Release scope', 'Client learning'],
  },
  listo: {
    lede:
      'Important work was losing time between handoffs. The opportunity was to make the path through the operation easier to see and easier to act on.',
    contextTitle: 'Turn hidden operational friction into a workable system.',
    context: [
      'When ownership lives across inboxes, documents, and conversations, people spend time finding the next step instead of completing it.',
      'OpenRangeDevs mapped the flow, found where context disappeared, and shaped a clearer digital path through the work.',
    ],
    approach: [
      { number: '01', title: 'Map the real flow.', body: 'We followed the work across people, tools, and repeated handoffs.' },
      { number: '02', title: 'Make ownership visible.', body: 'Each stage gained a clearer next action and responsible person.' },
      { number: '03', title: 'Support the operation.', body: 'The product direction followed the way the team needed to work.' },
    ],
    outcomeTitle: 'Less time chasing the work. More capacity to move it forward.',
    outcomeBody:
      'The operation gained a clearer path through recurring work and fewer places for context to disappear.',
    disciplines: ['Workflow mapping', 'Operational design', 'Custom software', 'Ongoing improvement'],
  },
}

const fallbackStory = (study: CaseStudy): Story => ({
  lede: study.body,
  contextTitle: study.challenge,
  context: [study.challenge, study.approach],
  approach: [
    { number: '01', title: 'Understand the business.', body: 'Bring the people, constraints, and opportunity into one working picture.' },
    { number: '02', title: 'Choose the valuable move.', body: 'Focus the work around the result that matters now.' },
    { number: '03', title: 'Build and learn.', body: 'Put the work in use and let the result guide what happens next.' },
  ],
  outcomeTitle: study.impact,
  outcomeBody: study.body,
  disciplines: ['Discovery', 'Product direction', 'Engineering', 'Ongoing support'],
})

function CaseStudySignal({ study }: { study: CaseStudy }) {
  const labelsBySlug: Record<string, string[]> = {
    'student-works': ['Rails platform', 'API security', 'Integrations', 'Business continuity'],
    aspire: ['Opportunity', 'Product decision', 'Delivery path', 'Next release'],
    wecasa: ['Client need', 'Essential flow', 'Early release', 'Useful signal'],
    listo: ['Handoffs', 'Connected flow', 'Clear ownership', 'More capacity'],
  }
  const labels = labelsBySlug[study.slug] ?? ['Context', 'Decision', 'Working release', 'Business impact']

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

export default function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const study = caseStudies.find((item) => item.slug === slug)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!study) return null

  const story = stories[slug] ?? fallbackStory(study)

  return (
    <main className="min-h-screen bg-white">
      <Navbar elevated />

      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-36 lg:px-14 lg:pb-24 lg:pt-48">
        <a
          href="#"
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
              <p className="mt-4 text-[18px] font-medium leading-[1.55] text-ink/65">{story.lede}</p>
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
              {story.contextTitle}
            </h2>
          </div>
          <div className="space-y-7 lg:col-span-5 lg:col-start-8 lg:pt-9">
            {story.context.map((paragraph) => (
              <p key={paragraph} className="text-[19px] font-medium leading-[1.58] text-ink/68">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {story.quote && (
        <section className="bg-[#061a3f] text-white">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 lg:grid-cols-12 lg:px-14 lg:py-24">
            <div className="lg:col-span-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">Client perspective</p>
            </div>
            <blockquote className="lg:col-span-8">
              <p className="text-[28px] font-semibold leading-[1.24] tracking-[-0.035em] sm:text-[38px]">{story.quote.copy}</p>
              <footer className="mt-8 border-t border-white/18 pt-5 text-[14px] text-white/65">
                <strong className="text-white">{story.quote.name}</strong> · {story.quote.role}
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
          {story.approach.map((step) => (
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
              {story.outcomeTitle}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[18px] font-medium leading-[1.58] text-white/78">{story.outcomeBody}</p>
            <div className="mt-10 border-t border-white/20 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">Work involved</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {story.disciplines.map((discipline) => (
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

type CaseStudyPageProps = {
  slug: string
}
