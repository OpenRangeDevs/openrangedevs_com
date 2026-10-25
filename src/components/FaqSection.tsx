import { faqs } from '../data/site'
import SectionLabel from './SectionLabel'


export default function FaqSection() {
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
          const isOpen = i === 0 // first answer starts open; site.ts toggles the rest
          return (
            <div key={faq.question} data-faq-item data-open={isOpen ? "true" : "false"} className="faq-item border-t border-ink/12 last:border-b">
              <button
                type="button"
                data-faq-toggle
                aria-controls={`faq-answer-${i}`}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-7 text-left lg:px-8"
              >
                <span className="text-[24px] font-bold leading-none sm:text-[32px] lg:text-[40px]">
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className="faq-icon relative size-6 shrink-0 transition-transform duration-300 ease-out"
                >
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-ink" />
                </span>
              </button>
              <div id={`faq-answer-${i}`} className="faq-panel grid transition-[grid-template-rows] duration-300 ease-out">
                <div className="overflow-hidden">
                  <p
                    className="faq-answer max-w-[1120px] px-6 pb-10 text-[17px] font-medium leading-[1.55] tracking-[-0.02em] transition-opacity duration-300 lg:px-8"
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
