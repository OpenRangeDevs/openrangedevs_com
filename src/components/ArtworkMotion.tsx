type ArtworkMotionProps = {
  variant: 'blueprint' | 'discovery'
}

const blueprintTraces = [
  { d: 'M28 64H238V176H82', delay: '0s' },
  { d: 'M196 458V286H302V110', delay: '-4.8s' },
  { d: 'M0 386L210 176', delay: '-8.7s' },
  { d: 'M915 72H1168V220H1018', delay: '-2.9s' },
  { d: 'M998 458V326H1168V250', delay: '-7.1s' },
  { d: 'M1032 374A144 144 0 0 1 1176 230', delay: '-10.2s' },
]

const discoveryTraces = [
  { d: 'M-34 382A190 190 0 0 1 286 382', delay: '-1.2s' },
  { d: 'M-72 382A238 238 0 0 1 326 382', delay: '-6.4s' },
  { d: 'M842 -24A294 294 0 0 0 1218 216', delay: '-3.8s' },
  { d: 'M906 -18A226 226 0 0 0 1208 164', delay: '-9.5s' },
  { d: 'M526 488A286 286 0 0 1 1028 488', delay: '-7.6s' },
]

const nodes = {
  blueprint: [
    { cx: 238, cy: 176, delay: '-1s' },
    { cx: 196, cy: 286, delay: '-3.6s' },
    { cx: 915, cy: 72, delay: '-6.2s' },
    { cx: 1032, cy: 374, delay: '-8.4s' },
  ],
  discovery: [
    { cx: 112, cy: 382, delay: '-2.1s' },
    { cx: 936, cy: 62, delay: '-5.7s' },
    { cx: 926, cy: 382, delay: '-8.8s' },
  ],
}

export default function ArtworkMotion({ variant }: ArtworkMotionProps) {
  const traces = variant === 'blueprint' ? blueprintTraces : discoveryTraces

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 460"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full text-[#9fc8ff] mix-blend-screen"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.15">
        {traces.map((trace) => (
          <path
            key={trace.d}
            d={trace.d}
            pathLength="1"
            vectorEffect="non-scaling-stroke"
            className="blueprint-trace"
            style={{ animationDelay: trace.delay }}
          />
        ))}

        {variant === 'discovery' && (
          <>
            <path
              d="M16 174C190 92 316 68 470 8"
              vectorEffect="non-scaling-stroke"
              className="discovery-flight"
            />
            <path
              d="M796 456C936 338 1052 246 1194 138"
              vectorEffect="non-scaling-stroke"
              className="discovery-flight"
              style={{ animationDelay: '-7s' }}
            />
          </>
        )}
      </g>

      {nodes[variant].map((node) => (
        <circle
          key={`${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="currentColor"
          className="blueprint-node"
          style={{ animationDelay: node.delay }}
        />
      ))}
    </svg>
  )
}
