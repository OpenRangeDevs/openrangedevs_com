import { CALENDAR_URL } from '../content'
import PillButton from './PillButton'

type CtaBannerProps = {
  title: string
  body: string
  buttonLabel: string
}

export default function CtaBanner({ title, body, buttonLabel }: CtaBannerProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
      <div className="relative flex min-h-[458px] items-center justify-center overflow-hidden rounded-[20px] px-6 py-16">
        <img src="/assets/cta-clouds-back.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <img src="/assets/cta-clouds-front.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(179.5deg, rgba(0,0,0,0.6) 1.2%, rgba(255,255,255,0) 161.7%)' }}
        />
        <div className="relative flex max-w-[756px] flex-col items-center gap-[26px] text-center text-white">
          <h2 className="text-[36px] font-bold leading-none sm:text-[48px] lg:text-[56px]">{title}</h2>
          <p className="max-w-[635px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] lg:text-[20px]">{body}</p>
          <PillButton href={CALENDAR_URL}>{buttonLabel}</PillButton>
        </div>
      </div>
    </div>
  )
}
