import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import type { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables';
import { Input } from './input';

interface FormFieldProperties {
  autocomplete?: string;
  className?: string;
  classNameDiv?: string;
  color?: AdditionalColors | LinkColor | PrimarylColor;
  disabled?: boolean;
  focus?: boolean;
  hover?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string;
  load?: boolean;
  name: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  round?: boolean;
  size?: Sizes;
  type?: InputTypes;
  value?: number | string;
}

export const FormField = ({
  autocomplete,
  className,
  classNameDiv,
  color,
  disabled,
  focus,
  hover,
  icon,
  iconRight,
  label,
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
}: FormFieldProperties): JSX.Element => (
  <div className="field">
    {label != null && (
      <label className="label" htmlFor={name}>
        {label}
      </label>
    )}
    <Input
      autocomplete={autocomplete}
      className={className}
      classNameDiv={classNameDiv}
      color={color}
      disabled={disabled}
      focus={focus}
      hover={hover}
      icon={icon}
      iconRight={iconRight}
      load={load}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onClick={onClick}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      readonly={readonly}
      round={round}
      size={size}
      type={type}
      value={value}
    />
  </div>
);

FormField.defaultProps = {
  autocomplete: null,
  className: null,
  classNameDiv: null,
  color: null,
  disabled: false,
  focus: false,
  hover: false,
  icon: null,
  iconRight: null,
  label: null,
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
