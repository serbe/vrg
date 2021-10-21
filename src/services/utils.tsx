import { RefObject, useEffect } from 'react'

export const filterArrayString = (values: string[]): string[] => values.filter((value: string) => value !== '')

export const filterArrayNumber = (values: string[]): number[] =>
  values.map((value: string) => Number(value)).filter((value: number) => value !== 0)

export const latrus = (input: string): string => {
  const lat = '`qwertyuiop[]asdfghjkl;\'zxcvbnm,.~QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>'
  const rus = 'ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ'
  let word = ''
  for (let index = 0, L = input.length; index < L; index += 1) {
    const letter = input[index]
    const pos = lat.indexOf(letter)
    if (index === 0 && pos === -1) {
      return ''
    }
    word += pos === -1 ? letter : rus[pos]
  }
  return word
}

// export const stringNoNull = (value?: string): string => {
//   return value || '';
// };

// export const numberNoNull = (value?: number): number => {
//   return value || 0;
// };

export const addEmptyString = (values?: string[]): string[] => {
  let list: string[] = []
  if (values) {
    list = values.filter(value => value !== '')
  }
  list.push('')
  return list
}

export const numberToString = (values?: number[]): string[] => {
  let list: string[] = []
  if (values) {
    list = values.map(value => value.toString())
  }
  return list
}

export const splitStrings = (items?: string[]) => (
  <>{items && items.map((arrayItem: string) => <div key={`div${arrayItem}`}>{arrayItem}</div>)}</>
)

export const prettyPhone = (phone: string): string => {
  let value = phone
  if (value.length > 0) {
    value = value.replace(/\D/g, '')
    if (value.length === 10) {
      value = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7-$1-$2-$3-$4')
    }
    if (value.length === 11) {
      if (value[0] === '8') {
        value = `7${value.slice(1)}`
      }
      value = value.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1-$2-$3-$4-$5')
    }
    if (value.length === 7) {
      value = value.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')
    }
  }
  return value
}

export const splitNumbers = (items?: number[]) => (
  <>
    {items &&
      items.map((arrayItem: number) => <div key={`div${arrayItem}`}>{prettyPhone(arrayItem.toString(10))}</div>)}
  </>
)

export const diffMonth = (month: number, date?: Date): Date => {
  const newDate = date || new Date()
  newDate.setMonth(newDate.getMonth() - month)
  return newDate
}

export const trClass = (input: string): string => {
  const date = new Date(input)
  if (date < new Date()) {
    return 'tr-green'
  }
  const newDate = diffMonth(1)
  if (date < newDate) {
    return 'tr-red'
  }
  return 'tr-yellow'
}

export const tinyDate = (date: string): string => {
  if (date.length === 10) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(2, 4)}`
  }
  return date
}

type AnyEvent = MouseEvent | TouchEvent

export const useOnClickOutside = (reference: RefObject<HTMLElement>, handler: (event: AnyEvent) => void): void => {
  useEffect(() => {
    const listener = (event: AnyEvent): void => {
      const element = reference?.current

      if (!element || element.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener(`mousedown`, listener)
    document.addEventListener(`touchstart`, listener)

    return () => {
      document.removeEventListener(`mousedown`, listener)
      document.removeEventListener(`touchstart`, listener)
    }
  }, [reference, handler])
}
