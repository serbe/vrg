import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'

import { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables'
import { Input } from './input'

interface FormFieldProperties {
  autocomplete?: string
  className?: string
  classNameDiv?: string
  disabled?: boolean
  icon?: string
  iconRight?: string
  label?: string
  name: string
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  readonly?: boolean
  type?: InputTypes
  value?: number | string
  color?: AdditionalColors | PrimarylColor | LinkColor
  size?: Sizes
  round?: boolean
  hover?: boolean
  focus?: boolean
  load?: boolean
}

export const FormField = ({
  autocomplete,
  className,
  classNameDiv,
  disabled,
  icon,
  iconRight,
  label,
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
}: FormFieldProperties) => (
  <div className="field">
    {label && (
      <label className="label" htmlFor={name}>
        {label}
      </label>
    )}
    <Input
      autocomplete={autocomplete}
      className={className}
      classNameDiv={classNameDiv}
      disabled={disabled}
      icon={icon}
      iconRight={iconRight}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      readonly={readonly}
      type={type}
      value={value}
      color={color}
      size={size}
      round={round}
      hover={hover}
      focus={focus}
      load={load}
    />
  </div>
)

FormField.defaultProps = {
  autocomplete: undefined,
  className: undefined,
  classNameDiv: undefined,
  disabled: false,
  icon: undefined,
  iconRight: undefined,
  label: undefined,
  onBlur: undefined,
  onChange: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
  readonly: false,
  type: 'text',
  value: undefined,
  color: undefined,
  size: undefined,
  round: false,
  hover: false,
  focus: false,
  load: false,
}

export default FormField
