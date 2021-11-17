import type { Dispatch, SetStateAction } from 'react';

export type BasicColors = 'black' | 'dark' | 'ghost' | 'light' | 'text' | 'white';

export type AdditionalColors = 'danger' | 'info' | 'success' | 'warning';

export type PrimarylColor = 'primary';

export type LinkColor = 'link';

export type Sizes = 'large' | 'medium' | 'normal' | 'small';

export type InputTypes = 'email' | 'password' | 'tel' | 'text';

export type Positions = 'left' | 'right';

export interface StringInputProperties {
  value?: string;
  setter: Dispatch<SetStateAction<string | undefined>>;
}

export interface NumberInputProperties {
  value?: number;
  setter: Dispatch<SetStateAction<number | undefined>>;
}

export interface BooleanInputProperties {
  value: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}

export interface SelectValues {
  id?: number;
  setter: Dispatch<SetStateAction<number | undefined>>;
}

export interface DatePickerValues {
  value?: string;
  setter: Dispatch<SetStateAction<string | undefined>>;
}
