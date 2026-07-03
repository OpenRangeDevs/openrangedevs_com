import { useState } from 'react'
import SectionLabel from './SectionLabel'

const faqs = [
  {
    question: 'How senior is "senior"?',
    answer:
      "Everyone who touches your project has shipped production software for 10+ years, and in most cases helped build a company. We don't bill juniors to your roadmap.",
  },
  {
    question: 'Do you replace our team or work with it?',
    answer:
      'Either. We can run the whole build, or embed alongside your engineers and lead. The goal is to make your team stronger — not to become a dependency.',
  },
  {
    question: 'How fast can you actually start?',
    answer:
      'Usually within days. A senior squad can be standing up your project this week — that’s the whole point of "in days, not weeks."',
  },
  {
    question: 'Is it only Ruby on Rails?',
    answer:
      'Rails is our home stack — 15+ years of it — and it’s how we ship fast. But we also work across modern JavaScript, Hotwire, and whatever the job genuinely needs.',
  },
  {
    question: 'What does an engagement cost?',
    answer:
      "Most engagements start with a fixed-price Survey, then a fixed or retainer build depending on scope. You'll know the number before we start.",
  },
  {
    question: 'Where are you based?',
    answer:
      'Calgary, Alberta — working comfortably across North American hours and overlapping European ones.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-ink/12">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-14">
        <SectionLabel>Straight answers</SectionLabel>
        <h2 className="mt-4 max-w-[756px] text-[40px] font-bold leading-none sm:text-[52px] lg:text-[64px]">
          Questions we get a lot.
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
                {/* CSS plus that rotates into an X */}
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
                    className={`max-w-[1328px] px-6 pb-10 text-[16px] font-medium leading-[1.5] tracking-[-0.32px] transition-opacity duration-300 ${
                      isOpen ? 'opacity-80' : 'opacity-0'
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
