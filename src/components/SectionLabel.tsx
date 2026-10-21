type SectionLabelProps = {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function SectionLabel({ children, light = false, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`text-[14px] font-medium leading-[1.5] tracking-[-0.28px] opacity-40 ${light ? 'text-white' : 'text-ink'} ${className}`}
    >
      {children}
    </p>
  )
}
