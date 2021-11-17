import clsx from 'clsx';
import type { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import type { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables';
import { Icon } from './icon';

interface InputProperties {
  autocomplete?: string;
  className?: string;
  classNameDiv?: string;
  color?: AdditionalColors | LinkColor | PrimarylColor;
  disabled?: boolean;
  focus?: boolean;
  hover?: boolean;
  icon?: string;
  iconRight?: string;
  load?: boolean;
  name: string;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  readonly?: boolean;
  round?: boolean;
  size?: Sizes;
  type?: InputTypes;
  value?: number | string;
}

export const Input = ({
  autocomplete,
  className,
  classNameDiv,
  color,
  disabled,
  focus,
  hover,
  icon,
  iconRight,
  load,
  name,
  onBlur,
  onChange,
  onClick,
  onKeyPress,
  placeholder,
  readonly,
  round,
  size,
  type,
  value,
}: InputProperties): JSX.Element => {
  const divClass = clsx(
    'control',
    classNameDiv,
    { 'has-icons-left': icon },
    { 'has-icons-right': iconRight },
    { 'is-loading': load },
  );
  const inputClass = clsx(
    'input',
    className,
    { 'is-rounded': round },
    { 'is-hovered': hover },
    { 'is-focused': focus },
    { [`is-${color ?? 'text'}`]: color },
    { [`is-${size ?? 'normal'}`]: size },
  );

  return (
    <div className={divClass}>
      <input
        autoComplete={autocomplete}
        className={inputClass}
        defaultValue={value}
        disabled={disabled}
        id={name}
        key={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
      />
      {icon != null && <Icon icon={icon} position="left" />}
      {iconRight != null && <Icon icon={iconRight} position="right" />}
    </div>
  );
};

Input.defaultProps = {
  autocomplete: null,
  className: null,
  classNameDiv: null,
  color: null,
  disabled: false,
  focus: false,
  hover: false,
  icon: null,
  iconRight: null,
  load: false,
  onBlur: null,
  onChange: null,
  onClick: null,
  onKeyPress: null,
  placeholder: null,
  readonly: false,
  round: false,
  size: null,
  type: 'text',
  value: null,
};
