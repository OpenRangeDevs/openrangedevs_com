import { useState } from 'react'
import { prefersReducedMotion, useInView } from '../hooks/useInView'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

const members = [
  { name: 'Roger Kondrat', role: 'Founder' },
  { name: 'Arnold Roa', role: 'CTO' },
  { name: 'Ehab Fayez', role: 'UX/UI Designer - Product Designer' },
  { name: 'Genesis Anosike', role: 'UX/UI Designer - Product Designer' },
  { name: 'Mahmoud Bakr', role: 'Developer' },
  { name: 'Nnah Godspower', role: 'Developer' },
  { name: 'Timileyin Babalola', role: 'Developer' },
  { name: 'Maria Duarte', role: 'Recruitment Specialist' },
]

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

function MemberCard({ member, style }: { member: { name: string; role: string }; style?: React.CSSProperties }) {
  return (
    <div
      className="group flex flex-col gap-5 rounded-[20px] bg-[#fafafa] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)]"
      style={style}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-gradient-to-br from-[#ece8f8] to-[#d3c9ee]">
        <span className="absolute inset-0 flex items-center justify-center text-[44px] font-bold text-[#42307d] opacity-30 transition-transform duration-500 ease-out group-hover:scale-110">
          {initials(member.name)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-2 pb-1">
        <p className="text-[20px] font-bold leading-none lg:text-[22px]">{member.name}</p>
        <p className="text-[15px] font-semibold leading-[1.4] tracking-[-0.3px] text-[#42307d] opacity-70">
          {member.role}
        </p>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const [reduced] = useState(() => prefersReducedMotion())
  const show = inView || reduced

  return (
    <section className="relative overflow-hidden bg-[#42307d]">
      <div className="absolute bottom-0 left-6 top-0 z-10 hidden w-px hairline-white lg:block" />
      <div className="absolute bottom-0 right-6 top-0 z-10 hidden w-px hairline-white lg:block" />

      {/* friendly floating orbs drifting behind the crew */}
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-[8%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#7a5af0] opacity-25 blur-[90px]"
            style={{ animation: 'drift-1 18s ease-in-out infinite' }}
          />
          <div
            className="absolute right-[2%] top-[24%] h-[360px] w-[360px] rounded-full bg-[#c084fc] opacity-20 blur-[90px]"
            style={{ animation: 'drift-2 22s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-[4%] left-[38%] h-[380px] w-[380px] rounded-full bg-[#4f7cff] opacity-[0.18] blur-[100px]"
            style={{ animation: 'drift-3 26s ease-in-out infinite' }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-[120px] lg:px-14">
        <Reveal variant="rise">
          <SectionLabel light>The outfit</SectionLabel>
        </Reveal>
        <Reveal variant="rise" delay={0.06}>
          <h2 className="mt-4 max-w-[756px] text-[40px] font-bold leading-none text-white sm:text-[52px] lg:text-[64px]">
            A small crew of senior people.
          </h2>
        </Reveal>
        <Reveal variant="rise" delay={0.12}>
          <p className="mt-6 max-w-[720px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] text-white opacity-80 lg:text-[20px]">
            No bench of juniors, no rotating cast. The people you meet are the people who build.
          </p>
        </Reveal>

        <div ref={ref} className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {members.map((member, i) => (
            <MemberCard
              key={i}
              member={member}
              style={
                reduced
                  ? undefined
                  : show
                    ? { animation: `pop-up 0.6s ${EASE_OUT} ${i * 0.07}s both` }
                    : { opacity: 0 }
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
