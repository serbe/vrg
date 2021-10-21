import clsx from 'clsx'

interface IconProperties {
  children?: Element
  className?: string
  color?: 'info' | 'success' | 'warning' | 'danger'
  icon: string
  position?: 'left' | 'right'
}

export const Icon = ({ children, className, color, position, icon }: IconProperties) => {
  const spanClass = clsx('icon', className, {
    [`has-text-${color || 'info'}`]: color,
    [`is-${position || 'left'}`]: position,
  })
  const iconClass = clsx('fas', { [`fa-${icon}`]: icon })

  return (
    <span className={spanClass}>
      <i className={iconClass}>{children}</i>
    </span>
  )
}

export default Icon
