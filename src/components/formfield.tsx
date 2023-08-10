import type {
  ChangeEventHandler,
  Dispatch,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from 'react';
import type { AdditionalColors, InputTypes, LinkColor, PrimarylColor, Sizes } from '../models/variables';
import { Input } from './input';

type FormFieldProperties = {
  readonly autocomplete?: string;
  readonly children?: ReactNode;
  readonly classNameDiv?: string;
  readonly classNameInput?: string;
  readonly color?: AdditionalColors | LinkColor | PrimarylColor;
  readonly defaultValue?: number | string;
  readonly isDisabled?: boolean;
  readonly isFocus?: boolean;
  readonly isHover?: boolean;
  readonly icon?: string;
  readonly iconRight?: string;
  readonly label?: string;
  readonly isLoad?: boolean;
  readonly name: string;
  readonly onBlur?: FocusEventHandler<HTMLInputElement>;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly onClear?: Dispatch<SetStateAction<string>>;
  readonly onClick?: MouseEventHandler<HTMLInputElement>;
  readonly onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  readonly placeholder?: string;
  readonly isReadOnly?: boolean;
  readonly isRound?: boolean;
  readonly size?: Sizes;
  readonly type?: InputTypes;
  readonly value?: number | string;
};

export function FormField({
  autocomplete,
  children,
  classNameDiv,
  classNameInput,
  color,
  defaultValue,
  isDisabled,
  isFocus,
  isHover,
  icon,
  iconRight,
  label,
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
}: FormFieldProperties): JSX.Element {
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
        isDisabled={isDisabled}
        isFocus={isFocus}
        isHover={isHover}
        icon={icon}
        iconRight={iconRight}
        isLoad={isLoad}
        name={name}
        placeholder={placeholder}
        isReadOnly={isReadOnly}
        isRound={isRound}
        size={size}
        type={type}
        value={value ?? ''}
        onBlur={onBlur}
        onChange={onChange}
        onClear={onClear}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      {children}
    </div>
  );
}

FormField.defaultProps = {
  autocomplete: undefined,
  children: undefined,
  classNameDiv: undefined,
  classNameInput: undefined,
  color: undefined,
  defaultValue: undefined,
  isDisabled: false,
  isFocus: false,
  isHover: false,
  icon: undefined,
  iconRight: undefined,
  label: undefined,
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
  value: undefined,
};

export default FormField;
