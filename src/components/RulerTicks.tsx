type RulerTicksProps = {
  side: 'left' | 'right'
  className?: string
}

// ticks kept short of the bottom hero labels ("EST. ON THE OPEN RANGE" / "NO FENCES.");
// count and height move together so the 20px tick spacing stays constant
const TICKS = 20
const SPACING = 20

export default function RulerTicks({ side, className = '' }: RulerTicksProps) {
  const origin = side === 'right' ? 'right center' : 'left center'
  const align = side === 'right' ? 'items-end' : 'items-start'
  return (
    <div
      aria-hidden
      className={`flex w-[55px] flex-col justify-between ${align} ${className}`}
      style={{ height: `${TICKS * SPACING}px` }}
    >
      <div
        className="h-[3px] w-full bg-white"
        style={{ transformOrigin: origin, animation: 'tick-in 0.6s ease-out both' }}
      />
      {Array.from({ length: TICKS }, (_, i) => (
        <div
          key={i}
          className="h-px w-[45px] bg-white opacity-60"
          style={{
            transformOrigin: origin,
            animation: `tick-in 0.5s ease-out ${0.15 + i * 0.06}s both, tick-wave 3.2s ease-in-out ${1 + i * 0.18}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
