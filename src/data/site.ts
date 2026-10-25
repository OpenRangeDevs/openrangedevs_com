export const SITE = {
  name: 'OpenRangeDevs',
  url: 'https://openrangedevs.com',
  title: 'OpenRangeDevs — We build like founders. Because we are.',
  description:
    'OpenRangeDevs is a senior product and engineering studio that turns important business opportunities into focused products, faster releases, and better operations.',
  email: 'hello@openrangedevs.com',
  phone: '+15873287001',
  address: {
    street: '225 First Avenue NW',
    locality: 'Airdrie',
    region: 'AB',
    postalCode: 'T4B 2M8',
    country: 'CA',
  },
  ogImage: '/og-image.jpg',
}

// Roger's scheduling link, used by every "Book a call" / "Contact Us" CTA
export const CALENDAR_URL = 'https://calendar.app.google/YDDatm6UwENuUcKGA'

export const testimonial = {
  quote:
    '“I’ve had the pleasure of collaborating with Open Range for several years on our Ruby on Rails platform, and I can confidently say he’s been an invaluable asset to our team. Their contributions have been instrumental in resolving issues related to API security and integration, among numerous other areas.”',
  name: 'Patrick Lalonde',
  role: 'Vice President, Student Works',
}

// Section anchors on the home page. Components prefix them with "/" when
// rendered on any other page so they navigate home first.
export const navLinks = [
  { label: 'Service', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

export const sectionHref = (href: string, onHome: boolean) => (onHome ? href : `/${href}`)

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

export const faqs = [
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
