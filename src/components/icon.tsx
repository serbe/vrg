import clsx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';
import type { AdditionalColors, Positions } from '../models/variables';

type IconProperties = {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly color?: AdditionalColors;
  readonly icon: string;
  readonly onClick?: MouseEventHandler;
  readonly position?: Positions;
};

export function Icon({ children, className, color, icon, onClick, position }: IconProperties): JSX.Element {
  const spanClass = clsx('icon', className, {
    [`has-text-${color ?? 'info'}`]: color,
    [`is-${position ?? 'left'}`]: position,
  });
  const iconClass = clsx('fas', { [`fa-${icon}`]: icon });

  return (
    <span className={spanClass} onClick={onClick}>
      <i className={iconClass}>{children}</i>
    </span>
  );
}

Icon.defaultProps = {
  children: undefined,
  className: undefined,
  color: undefined,
  onClick: undefined,
  position: undefined,
};

export default Icon;
