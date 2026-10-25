import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

type Member = {
  name: string
  role: string
  bio: string
  image?: string
}

const members: Member[] = [
  { name: 'Roger Kondrat', role: 'Founder', bio: 'Roger keeps the business, product, and delivery decisions connected from the first conversation through launch.', image: '/assets/team/roger.webp?v=20260729' },
  { name: 'Arnold Roa', role: 'CTO', bio: 'With over 20 years of experience in the industry, Arnold brings leadership and technical direction to complex builds, balancing durable systems with useful momentum.', image: '/assets/team/arnold.webp?v=20260729-2' },
  { name: 'Maria Duarte', role: 'Operations Manager - Recruitment Specialist', bio: 'Maria helps grow the OpenRangeDevs team with people who care about the business outcome as much as the build.', image: '/assets/team/maria.webp?v=20260729' },
  { name: 'Genesis Anosike', role: 'Product Designer', bio: 'Genesis shapes thoughtful product interfaces and helps teams turn product intent into a coherent experience.', image: '/assets/team/genesis.webp?v=20260729' },
  { name: 'Ehab Fayez', role: 'Product Designer', bio: 'Ehab turns business context into product experiences that are clear, useful, and ready for real clients.', image: '/assets/team/ehab.webp?v=20260729-2' },
  { name: 'Mahmoud Bakr', role: 'Software Engineer', bio: 'Mahmoud builds reliable product foundations and keeps the details of delivery moving in the right direction.', image: '/assets/team/mahmoud.webp?v=20260729' },
  { name: 'Nnah Godspower', role: 'Software Engineer', bio: 'Nnah brings steady engineering craft to the work, from practical implementation through continual improvement.', image: '/assets/team/nnah.webp?v=20260729' },
]

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-')

function MemberPortrait({ member, large = false }: { member: Member; large?: boolean }) {
  if (member.image) {
    return <img src={member.image} alt={`Portrait of ${member.name}`} className="size-full object-cover" />
  }

  return (
    <span className={`absolute inset-0 flex items-center justify-center font-bold text-[#42307d] opacity-30 ${large ? 'text-[84px]' : 'text-[44px]'}`}>
      {initials(member.name)}
    </span>
  )
}

// Cards open a native <dialog> (site.ts wires [data-dialog-open] / close / backdrop click).
function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <button
      type="button"
      data-dialog-open={`team-${slug(member.name)}`}
      aria-haspopup="dialog"
      data-anim={`pop-up 0.6s ${EASE_OUT} ${index * 0.07}s both`}
      data-hide="opacity"
      className="group flex flex-col gap-5 rounded-[20px] bg-[#fafafa] p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-gradient-to-br from-[#ece8f8] to-[#d3c9ee]">
        <MemberPortrait member={member} />
      </div>
      <div className="flex flex-col gap-1.5 px-2 pb-1">
        <p className="text-[20px] font-bold leading-none lg:text-[22px]">{member.name}</p>
        <p className="text-[15px] font-semibold leading-[1.4] tracking-[-0.3px] text-[#42307d] opacity-70">
          {member.role}
        </p>
      </div>
    </button>
  )
}

function MemberDialog({ member }: { member: Member }) {
  const id = `team-${slug(member.name)}`
  return (
    <dialog
      id={id}
      aria-labelledby={`${id}-name`}
      className="team-dialog w-[calc(100%-48px)] max-w-[760px] overflow-hidden rounded-[24px] bg-white p-0 text-ink shadow-2xl"
    >
      <div className="relative grid sm:grid-cols-[0.84fr_1.16fr]">
        <div className="relative min-h-[300px] bg-gradient-to-br from-[#e8efff] to-[#cad8f7] sm:min-h-full">
          <MemberPortrait member={member} large />
        </div>
        <div className="p-8 sm:p-12">
          <button
            type="button"
            data-dialog-close
            aria-label="Close team member details"
            className="absolute right-5 top-5 grid size-10 cursor-pointer place-items-center rounded-full border border-ink/15 bg-white text-[24px] leading-none transition-colors hover:bg-ink hover:text-white"
          >
            ×
          </button>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">OpenRangeDevs team</p>
          <h3 id={`${id}-name`} className="mt-5 text-[42px] font-bold leading-[0.95] tracking-[-0.05em] sm:text-[52px]">
            {member.name}
          </h3>
          <p className="mt-4 text-[17px] font-bold text-ink/60">{member.role}</p>
          <p className="mt-10 max-w-[410px] text-[18px] font-medium leading-[1.55] text-ink/75">{member.bio}</p>
        </div>
      </div>
    </dialog>
  )
}

export default function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-[#42307d]">
      <div className="absolute bottom-0 left-6 top-0 z-10 hidden w-px hairline-white lg:block" />
      <div className="absolute bottom-0 right-6 top-0 z-10 hidden w-px hairline-white lg:block" />

      {/* friendly floating orbs drifting behind the crew (hidden for reduced motion) */}
      <div aria-hidden className="motion-only pointer-events-none absolute inset-0 overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-[120px] lg:px-14">
        <Reveal variant="rise">
          <SectionLabel light>The outfit</SectionLabel>
        </Reveal>
        <Reveal variant="rise" delay={0.06}>
          <h2 className="mt-4 max-w-[756px] text-[40px] font-bold leading-none text-white sm:text-[52px] lg:text-[64px]">
            Our crew of talented people.
          </h2>
        </Reveal>
        <Reveal variant="rise" delay={0.12}>
          <p className="mt-6 max-w-[720px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] text-white opacity-80 lg:text-[20px]">
            A steady crew of experienced builders, from kickoff to launch. The people you meet are the people who build.
          </p>
        </Reveal>

        <div data-reveal data-threshold="0.15" className="mt-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-8">
            {members.slice(0, 3).map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5 sm:mt-8 sm:grid-cols-4 lg:gap-8">
            {members.slice(3).map((member, i) => (
              <MemberCard key={member.name} member={member} index={i + 3} />
            ))}
          </div>
        </div>
      </div>

      {members.map((member) => (
        <MemberDialog key={member.name} member={member} />
      ))}
    </section>
  )
}
