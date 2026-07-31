import { testimonial } from '../content'
import SectionLabel from './SectionLabel'

export default function TestimonialSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-[120px] pt-[120px] lg:px-14">
      <div className="grid overflow-hidden rounded-[28px] border border-ink/15 bg-white lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col justify-between border-b border-ink/15 p-8 lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <SectionLabel>Client proof</SectionLabel>
            <h2 className="mt-5 max-w-[430px] text-[38px] font-bold leading-[0.96] tracking-[-0.05em] sm:text-[48px]">
              Trusted with work that cannot stand still.
            </h2>
          </div>
          <img
            src="/assets/client-logo-3-color.svg"
            alt="Student Works"
            className="mt-12 h-10 w-auto self-start object-contain"
          />
        </div>

        <blockquote className="flex flex-col justify-between bg-[#edf3ff] p-8 lg:p-12">
          <p className="text-[22px] font-medium leading-[1.42] tracking-[-0.035em] sm:text-[28px] lg:text-[34px]">
            {testimonial.quote}
          </p>
          <footer className="mt-10 border-t border-ink/20 pt-5">
            <p className="text-[18px] font-bold">{testimonial.name}</p>
            <p className="mt-1 text-[15px] text-ink/60">{testimonial.role}</p>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
