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
  { label: 'Case Studies', href: '#case-studies' },
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

// one testimonial per client logo (aligned by index); index 2 is the real Student Works one
export const testimonials = [
  {
    quote:
      '“Open Range felt less like an agency and more like a founding team that already knew how to ship. We went from a rough idea to paying customers in a single quarter.”',
    name: 'Dana Whitfield',
    role: 'Founder & CEO, Northwind Labs',
  },
  {
    quote:
      "“They rebuilt the core of our platform without ever stalling the business. Senior people, honest timelines, and code we're genuinely proud to own.”",
    name: 'Marcus Bell',
    role: 'CTO, Cedar & Pine',
  },
  testimonial,
  {
    quote:
      '“What surprised me most was the candor. They told us what not to build, which probably saved us six months and a small fortune.”',
    name: 'Priya Raman',
    role: 'Co-founder, Loomstack',
  },
  {
    quote:
      '“Every week there was working software in front of real users. No hand-offs, no ramp-up — just steady, senior momentum from day one.”',
    name: 'Elliot Vance',
    role: 'Head of Product, Bright Harbor',
  },
]
