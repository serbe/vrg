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

type InputProperties = {
  autocomplete?: string;
  classNameDiv?: string;
  classNameInput?: string;
  color?: AdditionalColors | LinkColor | PrimarylColor;
  defaultValue?: number | string;
  isDisabled?: boolean;
  isFocus?: boolean;
  isHover?: boolean;
  icon?: string;
  iconRight?: string;
  isLoad?: boolean;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClear?: Dispatch<SetStateAction<string>>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  isReadOnly?: boolean;
  isRound?: boolean;
  size?: Sizes;
  type?: InputTypes;
  value?: number | string;
};

export function Input({
  autocomplete,
  classNameDiv,
  classNameInput,
  color,
  defaultValue,
  isDisabled,
  isFocus,
  isHover,
  icon,
  iconRight,
  isLoad,
  name,
  onBlur,
  onChange,
  onClear,
  onClick,
  onKeyPress,
  placeholder,
  isReadOnly,
  isRound,
  size,
  type,
  value,
}: InputProperties): JSX.Element {
  const divClass = clsx(
    'control',
    classNameDiv,
    { 'has-icons-left': icon },
    { 'has-icons-right': onClear ?? iconRight },
    { 'is-loading': isLoad },
  );
  const inputClass = clsx(
    'input',
    classNameInput,
    { 'is-rounded': isRound },
    { 'is-hovered': isHover },
    { 'is-focused': isFocus },
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
        disabled={isDisabled}
        id={name}
        name={name}
        placeholder={placeholder}
        readOnly={isReadOnly}
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
}

Input.defaultProps = {
  autocomplete: undefined,
  classNameDiv: undefined,
  classNameInput: undefined,
  color: undefined,
  defaultValue: undefined,
  isDisabled: false,
  isFocus: false,
  isHover: false,
  icon: undefined,
  iconRight: undefined,
  isLoad: false,
  onBlur: undefined,
  onChange: undefined,
  onClear: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
  isReadOnly: false,
  isRound: false,
  size: undefined,
  type: 'text',
  value: '',
};

export default Input;
