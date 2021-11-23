import type { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import type { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables';
import { Input } from './input';

interface FormFieldProperties {
  autocomplete?: string;
  classNameDiv?: string;
  classNameInput?: string;
  color?: AdditionalColors | LinkColor | PrimarylColor;
  disabled?: boolean;
  focus?: boolean;
  hover?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string;
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

export const FormField = ({
  autocomplete,
  classNameDiv,
  classNameInput,
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
    {label != undefined && (
      <label className="label" htmlFor={name}>
        {label}
      </label>
    )}
    <Input
      autocomplete={autocomplete}
      classNameDiv={classNameDiv}
      classNameInput={classNameInput}
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
  autocomplete: undefined,
  classNameDiv: undefined,
  classNameInput: undefined,
  color: undefined,
  disabled: false,
  focus: false,
  hover: false,
  icon: undefined,
  iconRight: undefined,
  label: undefined,
  load: false,
  onBlur: undefined,
  onChange: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
  readonly: false,
  round: false,
  size: undefined,
  type: 'text',
  value: undefined,
};
