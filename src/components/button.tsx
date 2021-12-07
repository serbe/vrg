import clsx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';
import type { AdditionalColors, BasicColors, LinkColor, PrimarylColor, Sizes } from '../models/variables';

interface ButtonProperties {
  active?: boolean;
  children: ReactNode;
  className?: string;
  color?: AdditionalColors | BasicColors | LinkColor | PrimarylColor;
  disable?: boolean;
  focus?: boolean;
  hover?: boolean;
  href?: string;
  invert?: boolean;
  isstatic?: boolean;
  light?: boolean;
  load?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLInputElement>;
  outline?: boolean;
  round?: boolean;
  size?: Sizes;
}

export const Button = ({
  active,
  children,
  className,
  color,
  disable,
  focus,
  hover,
  href,
  invert,
  isstatic,
  light,
  load,
  onClick,
  outline,
  round,
  size,
}: ButtonProperties): JSX.Element => {
  const buttonClass = clsx(`button`, className, {
    'is-active': active,
    'is-focused': focus,
    'is-hovered': hover,
    'is-inverted': invert,
    'is-light': light,
    'is-loading': load,
    'is-outlined': outline,
    'is-rounded': round,
    'is-static': isstatic,
    [`is-${color ?? 'primary'}`]: color,
    [`is-${size ?? 'normal'}`]: size,
  });

  return href ? (
    <a className={buttonClass} href={href} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button className={buttonClass} disabled={disable} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  active: false,
  className: undefined,
  color: undefined,
  disable: false,
  focus: false,
  hover: false,
  href: undefined,
  invert: false,
  isstatic: false,
  light: false,
  load: false,
  onClick: undefined,
  outline: false,
  round: false,
  size: undefined,
};

export default Button;
