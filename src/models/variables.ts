export type BasicColors = 'white' | 'light' | 'dark' | 'black' | 'text' | 'ghost';

export type AdditionalColors = 'info' | 'success' | 'warning' | 'danger';

export type PrimarylColor = 'primary';

export type LinkColor = 'link';

export type Sizes = 'small' | 'normal' | 'medium' | 'large';

export type InputTypes = 'text' | 'password' | 'email' | 'tel';

export type Positions = 'left' | 'right';

export interface StringInputProperties {
  value?: string;
  setter: (value?: string) => void;
}

export interface NumberInputProperties {
  value?: number;
  setter: (value?: number) => void;
}

export interface BooleanInputProperties {
  value: boolean;
  setter: (value: boolean) => void;
}

export interface SelectValues {
  id?: number;
  setter: (event?: number) => void;
}

export interface DatePickerValues {
  value?: string;
  setter: (value?: string) => void;
}
