import { testimonial } from '../content'

type TestimonialProps = {
  light?: boolean
  boxed?: boolean
  className?: string
}

export default function Testimonial({ light = false, boxed = false, className = '' }: TestimonialProps) {
  const text = light ? 'text-white' : 'text-ink'
  return (
    <div
      className={`flex flex-col gap-1.5 leading-[1.5] ${text} ${
        boxed ? 'rounded-[12px] border border-white/12 bg-white/7 p-4' : ''
      } ${className}`}
    >
      <p className={`text-[16px] italic tracking-[-0.32px] ${light ? 'opacity-80' : ''}`}>{testimonial.quote}</p>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <p className="text-[14px] font-medium tracking-[-0.28px]">{testimonial.name}</p>
        <p className="text-[12px] tracking-[-0.24px] opacity-60">{testimonial.role}</p>
      </div>
    </div>
  )
}
