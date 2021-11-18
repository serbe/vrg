import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface ReturnBooleanType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export const useBoolean = (defaultValue?: boolean): ReturnBooleanType => {
  const [value, setValue] = useState(defaultValue ?? false);

  const setTrue = (): void => {
    setValue(true);
  };
  const setFalse = (): void => {
    setValue(false);
  };
  const toggle = (): void => {
    setValue((x) => !x);
  };

  return { value, setValue, setTrue, setFalse, toggle };
};

export const useNumberU = (): [
  number | undefined,
  Dispatch<SetStateAction<number | undefined>>,
  (event: ChangeEvent<HTMLInputElement>) => void,
] => {
  const [value, setValue] = useState<number>();

  const setter = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value === '0' ? undefined : Number(event.target.value));
  };

  return [value, setValue, setter];
};

export const useString = (
  initValue: string,
): [string, Dispatch<SetStateAction<string>>, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initValue);

  const setter = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return [value, setValue, setter];
};

export const useStringU = (): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>,
  (event: ChangeEvent<HTMLInputElement>) => void,
] => {
  const [value, setValue] = useState<string>();

  const setter = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value === '' ? undefined : event.target.value);
  };

  return [value, setValue, setter];
};
