import clsx from 'clsx';
import type { AdditionalColors, Positions } from '../models/variables';

interface IconProperties {
  children?: Element;
  className?: string;
  color?: AdditionalColors;
  icon: string;
  position?: Positions;
}

export const Icon = ({ children, className, color, position, icon }: IconProperties): JSX.Element => {
  const spanClass = clsx('icon', className, {
    [`has-text-${color ?? 'info'}`]: color,
    [`is-${position ?? 'left'}`]: position,
  });
  const iconClass = clsx('fas', { [`fa-${icon}`]: icon });

  return (
    <span className={spanClass}>
      <i className={iconClass}>{children}</i>
    </span>
  );
};

Icon.defaultProps = {
  children: undefined,
  className: undefined,
  color: undefined,
  position: undefined,
};
