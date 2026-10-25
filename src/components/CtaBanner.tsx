import { CALENDAR_URL } from '../data/site'
import ArtworkMotion from './ArtworkMotion'
import PillButton from './PillButton'

type CtaBannerProps = {
  title: string
  body: string
  buttonLabel: string
  backgroundImage?: string
  motion?: 'blueprint' | 'discovery'
  appearance?: 'artwork' | 'quiet'
}

function BuildRouteArtwork() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 460"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <g stroke="rgb(216 231 255 / 0.2)" strokeWidth="1" fill="none">
        <path d="M0 92H1200M0 230H1200M0 368H1200" />
        <path d="M168 0V460M1032 0V460" />
        <rect x="54" y="76" width="180" height="136" />
        <rect x="966" y="248" width="180" height="136" />
      </g>
      <g fill="none" stroke="#b9d1ff" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
        <path className="quiet-route" pathLength="1" d="M-24 320H132V222H276" />
        <path className="quiet-route" pathLength="1" style={{ animationDelay: '-4.5s' }} d="M924 138H1054V244H1224" />
      </g>
      <g fill="#b9d1ff">
        <circle className="quiet-route-node" cx="132" cy="222" r="5" />
        <circle className="quiet-route-node" cx="1054" cy="244" r="5" style={{ animationDelay: '-4.5s' }} />
      </g>
      <g fill="rgb(185 209 255 / 0.14)">
        <circle cx="132" cy="222" r="22" />
        <circle cx="1054" cy="244" r="22" />
      </g>
    </svg>
  )
}

export default function CtaBanner({
  title,
  body,
  buttonLabel,
  backgroundImage,
  motion,
  appearance = 'artwork',
}: CtaBannerProps) {
  const isQuiet = appearance === 'quiet'

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
      <div
        className={`relative flex min-h-[458px] items-center justify-center overflow-hidden rounded-[20px] border px-6 py-16 ${
          isQuiet ? 'border-brand-600/35 bg-[#0d3b88]' : 'border-transparent'
        }`}
      >
        {!isQuiet && backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[28%_center] sm:object-center"
          />
        )}
        {!isQuiet && <div className="absolute inset-0 bg-ink/20" />}
        {isQuiet ? (
          <BuildRouteArtwork />
        ) : (
          motion && <ArtworkMotion variant={motion} />
        )}
        <div className={`relative z-10 flex max-w-[756px] flex-col items-center gap-[26px] text-center text-white`}>
          <h2 className="text-[36px] font-bold leading-none sm:text-[48px] lg:text-[56px]">{title}</h2>
          <p className="max-w-[635px] text-[17px] font-medium leading-[1.5] tracking-[-0.4px] text-white/80 lg:text-[20px]">{body}</p>
          <PillButton href={CALENDAR_URL} variant="light">
            {buttonLabel}
          </PillButton>
        </div>
      </div>
    </div>
  )
}
