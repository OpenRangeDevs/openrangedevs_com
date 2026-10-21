// Roger's scheduling link, used by every "Book a call" / "Contact Us" CTA
export const CALENDAR_URL = 'https://calendar.app.google/YDDatm6UwENuUcKGA'

export const testimonial = {
  quote:
    '“I’ve had the pleasure of collaborating with Open Range for several years on our Ruby on Rails platform, and I can confidently say he’s been an invaluable asset to our team. Their contributions have been instrumental in resolving issues related to API security and integration, among numerous other areas.”',
  name: 'Patrick Lalonde',
  role: 'Vice President, Student Works',
}

export const navLinks = [
  { label: 'Service', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

export const clientLogos: {
  src: string
  colorSrc?: string
  alt: string
  w: number
  h: number
}[] = [
  { src: '/assets/client-logo-1.png', alt: 'Client logo', w: 114.7, h: 31.4 },
  { src: '/assets/client-logo-2.png', alt: 'Client logo', w: 69.8, h: 31.4 },
  { src: '/assets/client-logo-3.svg', colorSrc: '/assets/client-logo-3-color.svg', alt: 'Client logo', w: 87, h: 31.6 },
  { src: '/assets/client-logo-4.png', alt: 'Client logo', w: 165.3, h: 27.7 },
  { src: '/assets/client-logo-5.png', alt: 'Client logo', w: 113.5, h: 31.4 },
]

export type CaseStudy = {
  slug: string
  client: string
  project: string
  title: string
  body: string
  challenge: string
  approach: string
  impact: string
  className: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'student-works',
    client: 'Student Works',
    project: 'Platform continuity',
    title: 'Keeping a critical platform moving.',
    body: 'OpenRangeDevs worked through the Rails platform while API security and integration work kept progressing.',
    challenge: 'Keep a business-critical platform moving while security and integration work evolved.',
    approach: 'Stabilize the core platform while advancing the work that could not wait.',
    impact: 'Important platform work kept moving without losing business continuity.',
    className: 'lg:col-span-7 lg:min-h-[560px]',
  },
  {
    slug: 'aspire',
    client: 'Aspire',
    project: 'Product delivery',
    title: 'A clearer route to the next release.',
    body: 'A focused product conversation creates a build the team can commit to.',
    challenge: 'Turn an ambitious product direction into a release the team could confidently ship.',
    approach: 'Align the opportunity, scope the right first move, and create a practical delivery path.',
    impact: 'A clearer decision and a more focused route to market.',
    className: 'lg:col-span-5 lg:min-h-[560px]',
  },
  {
    slug: 'wecasa',
    client: 'Wecasa',
    project: 'Product focus',
    title: 'Less surface area. More signal.',
    body: 'The smallest credible release gives clients something real to respond to.',
    challenge: 'Find the product work most likely to create useful client learning.',
    approach: 'Reduce scope to the essential experience and put it in front of real clients sooner.',
    impact: 'A smaller release designed to produce clearer decisions.',
    className: 'lg:col-span-5 lg:min-h-[500px]',
  },
  {
    slug: 'listo',
    client: 'Listo',
    project: 'Operational clarity',
    title: 'The work behind the work, untangled.',
    body: 'Clearer paths through the work let teams spend less time chasing the next handoff.',
    challenge: 'Remove the hidden operational friction slowing important work down.',
    approach: 'Map the flow, connect the handoffs, and make the next action obvious.',
    impact: 'More capacity for the work that directly moves the business forward.',
    className: 'lg:col-span-7 lg:min-h-[500px]',
  },
]
