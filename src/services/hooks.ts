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
  const [value, setValue] = useState<number | undefined>();

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

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((value_: T) => T)) => void] => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      // eslint-disable-next-line no-console
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((value_: T) => T)): void => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// A wrapper for "JSON.parse()"" to support "undefined" value
// export const parseJSON = <T>(value: string | null): T | undefined => {
//   try {
//     return value === 'undefined' ? undefined : (JSON.parse(value ?? '') as T);
//   } catch {
//     console.log('parsing error on', { value });
//     return undefined;
//   }
// };