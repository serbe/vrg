import type { RefObject } from 'react';
import { useEffect } from 'react';
import { SelectItem } from '../models/types';

export const latrus = (input: string): string => {
  const lat = '`qwertyuiop[]asdfghjkl;\'zxcvbnm,.~QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>';
  const rus = 'ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
  let word = '';
  for (let index = 0, inputLenght = input.length; index < inputLenght; index += 1) {
    const letter = input[index];
    const pos = lat.indexOf(letter);
    if (index === 0 && pos === -1) {
      return '';
    }

    word += pos === -1 ? letter : rus[pos];
  }

  return word;
};

export const addEmptyItem = (items: SelectItem[]): SelectItem[] => {
  let list: SelectItem[] = [];
  let id = 0;
  if (items) {
    list = items.filter((value): boolean => {
      if (value.name !== '') {
        id = value.id + 1;
        return true;
      }

      return false;
    });
  }

  list.push({ id, name: '' });
  return list;
};

export const prettyPhone = (phone: string): string => {
  let value = phone;
  if (value.length > 0) {
    let newValue = value.replace(/\D/g, '');
    if (newValue.length === 0) {
      return value;
    }

    if (newValue.length === 11) {
      if (newValue.startsWith('8')) {
        newValue = newValue.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1($2)$3-$4-$5');
      } else {
        newValue = newValue.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1($2)$3-$4-$5');
      }
    }

    if (newValue.length === 7) {
      newValue = newValue.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
    }

    value = newValue;
  }

  return value;
};

export const numbersToSelectItems = (values?: number[]): SelectItem[] => {
  if (values) {
    return values.map((value, index) => {
      return { id: index, name: prettyPhone(value.toString(10)) };
    });
  }

  return [];
};

export const stringsToSelectItems = (values?: string[]): SelectItem[] => {
  if (values) {
    return values.map((value, index) => {
      return { id: index, name: value };
    });
  }

  return [];
};

export const itemsToNumbers = (items?: SelectItem[]): number[] => {
  if (items) {
    return items.map((item) => Number(item.name.replace(/\D/g, ''))).filter((num) => num !== 0);
  }

  return [];
};

export const itemsToStrings = (items?: SelectItem[]): string[] => {
  if (items) {
    return items.map((item) => item.name).filter((num) => num !== '');
  }

  return [];
};

export const splitStrings = (items?: string[]): JSX.Element[] | undefined =>
  items?.map((arrayItem: string) => <div key={`div${arrayItem}`}>{arrayItem}</div>);

export const splitNumbers = (items?: number[]): JSX.Element[] | undefined =>
  items?.map((arrayItem: number) => <div key={`div${arrayItem}`}>{prettyPhone(arrayItem.toString(10))}</div>);

export const diffMonth = (month: number, date?: Date): Date => {
  const newDate = date ?? new Date();
  newDate.setMonth(newDate.getMonth() - month);
  return newDate;
};

export const trClass = (input: string): string => {
  const date = new Date(input);
  if (date < new Date()) {
    return 'tr-green';
  }

  const newDate = diffMonth(1);
  if (date < newDate) {
    return 'tr-red';
  }

  return 'tr-yellow';
};

export const tinyDate = (date: string): string => {
  if (date.length === 10) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`;
  }

  return date;
};

type AnyEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = (reference: RefObject<HTMLElement>, handler: (event: AnyEvent) => void): void => {
  useEffect(() => {
    const listener = (event: AnyEvent): void => {
      const element = reference.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return (): void => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [reference, handler]);
};

export const anyToString = (value: any): string => {
  if (value && typeof value !== 'number') {
    if (typeof value === 'string') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.join('');
    }
  }

  return '';
};
