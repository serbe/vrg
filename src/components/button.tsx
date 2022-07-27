import clsx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';
import type { AdditionalColors, BasicColors, LinkColor, PrimarylColor, Sizes } from '../models/variables';

type ButtonProperties = {
  isActive?: boolean;
  children: ReactNode;
  className?: string;
  color?: AdditionalColors | BasicColors | LinkColor | PrimarylColor;
  isDisable?: boolean;
  isFocus?: boolean;
  isHover?: boolean;
  href?: string;
  isInvert?: boolean;
  isStatic?: boolean;
  isLight?: boolean;
  isLoad?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLInputElement>;
  isOutline?: boolean;
  isRound?: boolean;
  size?: Sizes;
};

export function Button({
  isActive,
  children,
  className,
  color,
  isDisable,
  isFocus,
  isHover,
  href,
  isInvert,
  isStatic,
  isLight,
  isLoad,
  onClick,
  isOutline,
  isRound,
  size,
}: ButtonProperties): JSX.Element {
  const buttonClass = clsx(`button`, className, {
    'is-active': isActive,
    'is-focused': isFocus,
    'is-hovered': isHover,
    'is-inverted': isInvert,
    'is-light': isLight,
    'is-loading': isLoad,
    'is-outlined': isOutline,
    'is-rounded': isRound,
    'is-static': isStatic,
    [`is-${color ?? 'primary'}`]: color,
    [`is-${size ?? 'normal'}`]: size,
  });

  return href ? (
    <a className={buttonClass} href={href} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button className={buttonClass} disabled={isDisable} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  isActive: false,
  className: undefined,
  color: undefined,
  isDisable: false,
  isFocus: false,
  isHover: false,
  href: undefined,
  isInvert: false,
  isStatic: false,
  isLight: false,
  isLoad: false,
  onClick: undefined,
  isOutline: false,
  isRound: false,
  size: undefined,
};

export default Button;
