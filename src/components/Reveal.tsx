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

/**
 * Renders plain HTML; src/scripts/site.ts animates it when it scrolls into view.
 * The element with `data-reveal` is observed; it and any descendant `data-anim`
 * nodes get their animation applied. `data-hide` sets the pre-reveal state
 * (only while JS is running — see global.css — so content is never lost).
 */
export default function Reveal({ children, variant = 'rise', delay = 0, duration, className = '' }: RevealProps) {
  const { keyframe, duration: defaultDuration, ease } = VARIANTS[variant]
  const total = duration ?? defaultDuration
  const animation = `${keyframe} ${total}s ${ease} ${delay}s both`

  if (variant === 'rise-clip') {
    return (
      <div data-reveal className={`overflow-hidden ${className}`}>
        <div data-anim={animation} data-hide="translate">
          {children}
        </div>
      </div>
    )
  }

  if (variant === 'wipe') {
    // observe the unclipped outer node: a fully clipped element reports zero
    // intersection area in Chromium, so observing the clipped node never fires
    return (
      <div data-reveal className={className}>
        <div className="h-full w-full" data-anim={animation} data-hide="clip">
          <div className="h-full w-full" data-anim={`settle ${total + 0.3}s ${EASE_OUT} ${delay}s both`}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-reveal data-anim={animation} data-hide="opacity" className={className}>
      {children}
    </div>
  )
}
