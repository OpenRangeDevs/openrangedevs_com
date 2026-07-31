import { useState } from 'react'
import SectionLabel from './SectionLabel'

const faqs = [
  {
    question: 'Why work with OpenRangeDevs?',
    answer:
      'We learn how your business works before proposing a solution, challenge ideas that will not pay back, and stay involved after launch. You get clearer operations, lower costs, more room to grow, and a team that already understands the system when the next need appears.',
  },
  {
    question: 'What business problems can you help us solve?',
    answer:
      'We help when work is slow, repetitive, expensive, or scattered across too many tools. That can mean replacing spreadsheets and subscriptions with one internal system, automating handoffs, improving how clients are served, or building a digital service around a real market need.',
  },
  {
    question: 'Where are you based?',
    answer:
      'Our head office is in Canada, with a team that works across the Americas and globally. We collaborate comfortably across North American hours and overlap with Western Europe, too.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-ink/12">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-14">
        <SectionLabel>Straight answers</SectionLabel>
        <h2 className="mt-4 max-w-[820px] text-[40px] font-bold leading-none sm:text-[52px] lg:text-[64px]">
          What businesses ask us before we start.
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] lg:px-6">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div key={faq.question} className="border-t border-ink/12 last:border-b">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-7 text-left lg:px-8"
              >
                <span className="text-[24px] font-bold leading-none sm:text-[32px] lg:text-[40px]">
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={`relative size-6 shrink-0 transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-[135deg]' : ''
                  }`}
                >
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-ink" />
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`max-w-[1120px] px-6 pb-10 text-[17px] font-medium leading-[1.55] tracking-[-0.02em] transition-opacity duration-300 ${
                      isOpen ? 'opacity-75' : 'opacity-0'
                    } lg:px-8`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
