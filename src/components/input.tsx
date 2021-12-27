import clsx from 'clsx';
import type {
  ChangeEventHandler,
  Dispatch,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import { ClearIcon } from '../models/impersonal';
import type { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables';
import { Icon } from './icon';

interface InputProperties {
  autocomplete?: string;
  classNameDiv?: string;
  classNameInput?: string;
  color?: AdditionalColors | LinkColor | PrimarylColor;
  defaultValue?: number | string;
  disabled?: boolean;
  focus?: boolean;
  hover?: boolean;
  icon?: string;
  iconRight?: string;
  load?: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClear?: Dispatch<SetStateAction<string>>;
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
  classNameDiv,
  classNameInput,
  color,
  defaultValue,
  disabled,
  focus,
  hover,
  icon,
  iconRight,
  load,
  name,
  onBlur,
  onChange,
  onClear,
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
    { 'has-icons-right': onClear ?? iconRight },
    { 'is-loading': load },
  );
  const inputClass = clsx(
    'input',
    classNameInput,
    { 'is-rounded': round },
    { 'is-hovered': hover },
    { 'is-focused': focus },
    { [`is-${color ?? 'text'}`]: color },
    { [`is-${size ?? 'normal'}`]: size },
  );

  return (
    <div className={divClass}>
      <input
        key={name}
        autoComplete={autocomplete}
        className={inputClass}
        defaultValue={defaultValue}
        disabled={disabled}
        id={name}
        name={name}
        placeholder={placeholder}
        readOnly={readonly}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      {icon && <Icon icon={icon} position="left" />}
      <ClearIcon setter={onClear} />
      {iconRight && <Icon icon={iconRight} position="right" />}
    </div>
  );
};

Input.defaultProps = {
  autocomplete: undefined,
  classNameDiv: undefined,
  classNameInput: undefined,
  color: undefined,
  defaultValue: undefined,
  disabled: false,
  focus: false,
  hover: false,
  icon: undefined,
  iconRight: undefined,
  load: false,
  onBlur: undefined,
  onChange: undefined,
  onClear: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
  readonly: false,
  round: false,
  size: undefined,
  type: 'text',
  value: '',
};

export default Input;
