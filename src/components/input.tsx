import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { AdditionalColors, InputTypes, Sizes } from '~/models/variables';

import { Icon } from './icon';

export interface StringInputProperties {
  value?: string
  setter: (value?: string) => void
}

export interface NumberInputProperties {
  value?: number
  setter: (value?: number) => void
}

export interface BooleanInputProperties {
  value: boolean
  setter: (value: boolean) => void
}

interface InputProperties {
  autocomplete?: string
  className?: string
  classNameDiv?: string
  disabled?: boolean
  icon?: string
  iconRight?: string
  name: string
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  readonly?: boolean
  type?: InputTypes
  value?: number | string
  color?: AdditionalColors
  size?: Sizes
  round?: boolean
  hover?: boolean
  focus?: boolean
  load?: boolean
}

export const Input = ({
  autocomplete,
  className,
  classNameDiv,
  disabled,
  icon,
  iconRight,
  name,
  onBlur,
  onChange,
  onClick,
  onKeyPress,
  placeholder,
  readonly,
  type,
  value,
  color,
  size,
  round,
  hover,
  focus,
  load,
}: InputProperties) => {
  const divClass = clsx(
    'control',
    classNameDiv,
    { 'has-icons-left': icon },
    { 'has-icons-right': iconRight },
    { 'is-loading': load },
  )
  const inputClass = clsx(
    'input',
    className,
    { 'is-rounded': round },
    { 'is-hovered': hover },
    { 'is-focused': focus },
    { [`is-${color}`]: color },
    { [`is-${size}`]: size },
  )

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
      {icon && <Icon position="left" icon={icon} />}
      {iconRight && <Icon position="right" icon={iconRight} />}
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
}
