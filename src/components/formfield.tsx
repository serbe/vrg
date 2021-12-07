import type { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import type { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables';
import { Input } from './input';

interface FormFieldProperties {
  autocomplete?: string;
  children?: ReactNode;
  classNameDiv?: string;
  classNameInput?: string;
  color?: AdditionalColors | LinkColor | PrimarylColor;
  defaultValue?: number | string;
  disabled?: boolean;
  focus?: boolean;
  hover?: boolean;
  icon?: string;
  iconRight?: string;
  label?: string;
  load?: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
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
  children,
  classNameDiv,
  classNameInput,
  color,
  defaultValue,
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
}: FormFieldProperties): JSX.Element => {
  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <Input
        autocomplete={autocomplete}
        classNameDiv={classNameDiv}
        classNameInput={classNameInput}
        color={color}
        defaultValue={defaultValue}
        disabled={disabled}
        focus={focus}
        hover={hover}
        icon={icon}
        iconRight={iconRight}
        load={load}
        name={name}
        placeholder={placeholder}
        readonly={readonly}
        round={round}
        size={size}
        type={type}
        value={value ?? ''}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      {children}
    </div>
  );
};

FormField.defaultProps = {
  autocomplete: undefined,
  children: undefined,
  classNameDiv: undefined,
  classNameInput: undefined,
  color: undefined,
  defaultValue: undefined,
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

export default FormField;
