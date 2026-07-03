import { useState } from 'react'
import { prefersReducedMotion, useInView } from '../hooks/useInView'

type Variant = 'rise' | 'rise-clip' | 'scale-in' | 'free' | 'wipe'

type RevealProps = {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
}

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

// keyframe, default duration, easing per variant
const VARIANTS: Record<Variant, { keyframe: string; duration: number; ease: string }> = {
  rise: { keyframe: 'rise', duration: 0.5, ease: EASE_OUT },
  'rise-clip': { keyframe: 'word-rise', duration: 0.6, ease: EASE_OUT },
  'scale-in': { keyframe: 'scale-in', duration: 0.45, ease: 'ease-out' },
  free: { keyframe: 'free-rise', duration: 0.6, ease: 'ease-out' },
  wipe: { keyframe: 'wipe-in', duration: 1.1, ease: EASE_OUT },
}

export default function Reveal({ children, variant = 'rise', delay = 0, duration, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [reduced] = useState(() => prefersReducedMotion())

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const { keyframe, duration: defaultDuration, ease } = VARIANTS[variant]
  const animation = `${keyframe} ${duration ?? defaultDuration}s ${ease} ${delay}s both`

  if (variant === 'rise-clip') {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <div style={inView ? { animation } : { transform: 'translateY(120%)' }}>{children}</div>
      </div>
    )
  }

  if (variant === 'wipe') {
    // the clip lives on an inner wrapper: a fully clipped element reports zero
    // intersection area in Chromium, so observing the clipped node never fires
    return (
      <div ref={ref} className={className}>
        <div className="h-full w-full" style={inView ? { animation } : { clipPath: 'inset(0 100% 0 0)' }}>
          <div
            className="h-full w-full"
            style={inView ? { animation: `settle ${(duration ?? defaultDuration) + 0.3}s ${EASE_OUT} ${delay}s both` } : undefined}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={className} style={inView ? { animation } : { opacity: 0 }}>
      {children}
    </div>
  )
}
