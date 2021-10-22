import clsx from 'clsx'
import { MouseEvent } from 'react'

import { AdditionalColors, BasicColors, LinkColor, PrimarylColor, Sizes } from '../models/variables'

interface ButtonProperties {
  children?: string
  className?: string
  color?: BasicColors | AdditionalColors | PrimarylColor | LinkColor
  disable?: boolean
  href?: string
  light?: boolean
  outline?: boolean
  invert?: boolean
  round?: boolean
  hover?: boolean
  focus?: boolean
  active?: boolean
  load?: boolean
  isstatic?: boolean
  size?: Sizes
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLInputElement, globalThis.MouseEvent>) => void
}

export const Button = ({
  children,
  className,
  color,
  disable,
  href,
  light,
  outline,
  invert,
  round,
  size,
  hover,
  focus,
  active,
  load,
  isstatic,
  onClick,
}: ButtonProperties) => {
  const buttonClass = clsx(`button`, className, {
    'is-light': light,
    'is-outlined': outline,
    'is-inverted': invert,
    'is-rounded': round,
    'is-hovered': hover,
    'is-focused': focus,
    'is-active': active,
    'is-loading': load,
    'is-static': isstatic,
    [`is-${color || 'primary'}`]: color,
    [`is-${size || 'normal'}`]: size,
  })

  return href ? (
    <a href={href} onClick={onClick} className={buttonClass}>
      {children}
    </a>
  ) : (
    <button type="button" disabled={disable} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  children: undefined,
  className: undefined,
  color: undefined,
  disable: false,
  href: undefined,
  light: false,
  outline: false,
  invert: false,
  round: false,
  hover: false,
  focus: false,
  active: false,
  load: false,
  isstatic: false,
  size: undefined,
  onClick: undefined,
}

export default Button
