import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type BasicColors = 'black' | 'dark' | 'ghost' | 'light' | 'text' | 'white';

export type AdditionalColors = 'danger' | 'info' | 'success' | 'warning';

export type PrimarylColor = 'primary';

export type LinkColor = 'link';

export type Sizes = 'large' | 'medium' | 'normal' | 'small';

export type InputTypes = 'email' | 'password' | 'tel' | 'text';

export type Positions = 'left' | 'right';

type HtmlInputSetter = (event: ChangeEvent<HTMLInputElement>) => void;

export type StringInputProperties = {
  value?: string;
  setter: HtmlInputSetter;
};

export type NumberInputProperties = {
  value?: number;
  setter: HtmlInputSetter;
};

export type BooleanInputProperties = {
  value: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
};

export type SelectValues = {
  id?: number;
  setter: Dispatch<SetStateAction<number | undefined>>;
};

export type DatePickerValues = {
  value?: string;
  setter: Dispatch<SetStateAction<string | undefined>>;
};
