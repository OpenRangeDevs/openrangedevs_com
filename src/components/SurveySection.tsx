import { CALENDAR_URL } from '../data/site'
import PillButton from './PillButton'
import Reveal from './Reveal'

type PhaseIconProps = {
  type: 'discover' | 'focus' | 'release' | 'improve'
}

function PhaseIcon({ type }: PhaseIconProps) {
  const animationClass =
    type === 'discover'
      ? 'phase-icon-orbit'
      : type === 'focus'
        ? 'phase-icon-pulse'
        : type === 'release'
          ? 'phase-icon-nudge'
          : 'phase-icon-cycle'

  if (type === 'discover') {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className={`size-16 ${animationClass}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="32" cy="32" r="22" />
        <path d="M32 16v32M16 32h32" />
        <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (type === 'focus') {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className={`size-16 ${animationClass}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="10" y="10" width="44" height="44" />
        <rect x="22" y="22" width="20" height="20" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (type === 'release') {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className={`size-16 ${animationClass}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 32h42M38 18l14 14-14 14" />
        <circle cx="16" cy="32" r="6" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`size-16 ${animationClass}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="32" cy="32" r="21" />
      <circle cx="32" cy="32" r="10" opacity="0.35" />
      <circle cx="32" cy="11" r="5" fill="currentColor" stroke="none" />
    </svg>
  )
}

type Phase = {
  label: string
  note: string
  description: string
  icon: PhaseIconProps['type']
  highlight?: string
  cta?: string
}

const phases: Phase[] = [
  {
    label: 'Discover',
    note: 'Discovery',
    cta: 'Schedule a discovery',
    description:
      'A working session to map the business problem, your need, and the most valuable opportunity to pursue.',
    icon: 'discover',
  },
  {
    label: 'Focus',
    note: 'MVP',
    description:
      'We collaborate with you to choose the smallest feature steps that deliver value and create momentum for your business.',
    icon: 'focus',
  },
  {
    label: 'Release',
    note: 'Early',
    description:
      'You put working software in front of clients early, learn from how they use it, and make each next decision with real evidence.',
    icon: 'release',
  },
  {
    label: 'Improve',
    note: 'Ongoing',
    description:
      'We remove friction and strengthen what earns adoption, leaving the business with a product that can keep evolving.',
    icon: 'improve',
  },
]

export default function SurveySection() {
  return (
    <section id="process" className="border-t border-ink/15">
      <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-[110px] text-center lg:px-14 lg:pb-20 lg:pt-[140px]">
        <Reveal variant="rise" delay={0.04}>
          <h2 className="mx-auto max-w-[820px] text-[48px] font-bold leading-[0.92] tracking-[-0.055em] sm:text-[64px] lg:text-[76px]">
            From idea to launch.
          </h2>
        </Reveal>
        <Reveal variant="rise" delay={0.08}>
          <p className="mx-auto mt-7 max-w-[660px] text-[17px] font-medium leading-[1.5] opacity-65 lg:text-[19px]">
            Discovery sets a clear direction. One experienced team carries the work through launch and ongoing improvement.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1440px] border-y border-ink/20 lg:grid-cols-2">
        {phases.map((phase, index) => (
          <Reveal
            key={phase.label}
            variant="rise"
            delay={0.04 + index * 0.05}
            className={`p-7 sm:p-10 lg:min-h-[390px] lg:p-12 ${
              index < phases.length - 1 ? 'border-b border-ink/20' : ''
            } ${index % 2 === 0 ? 'lg:border-r' : ''} ${
              index >= 2 ? 'lg:border-b-0' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <PhaseIcon type={phase.icon} />
              <span
                className="border border-ink/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
              >
                {phase.note}
              </span>
            </div>
            <h3 className="mt-14 text-[38px] font-bold leading-none tracking-[-0.045em]">
              {phase.label}
            </h3>
            <p className="mt-5 max-w-[500px] text-[16px] font-medium leading-[1.55] opacity-65">{phase.description}</p>
            {phase.cta && (
              <PillButton href={CALENDAR_URL} size="md" className="mt-7">
                {phase.cta}
              </PillButton>
            )}
          </Reveal>
        ))}
      </div>

    </section>
  )
}
