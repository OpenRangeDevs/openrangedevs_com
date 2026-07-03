type PillButtonProps = {
  children: React.ReactNode
  className?: string
  size?: 'md' | 'lg'
  variant?: 'dark' | 'light'
  href?: string
  onClick?: () => void
}

export default function PillButton({ children, className = '', size = 'lg', variant = 'dark', href, onClick }: PillButtonProps) {
  const sizeClasses = size === 'lg' ? 'px-8 py-4 text-[18px]' : 'px-6 py-4 text-[16px]'
  const variantClasses = variant === 'dark' ? 'bg-ink text-white' : 'bg-white text-ink'
  const classes = `inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[19px] font-semibold leading-none transition-transform hover:scale-[1.03] active:scale-[0.98] ${sizeClasses} ${variantClasses} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
