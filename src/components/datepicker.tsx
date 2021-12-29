import type { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

interface DatePickerProperties {
  label?: string;
  name: string;
  setter: Dispatch<SetStateAction<string | undefined>>;
  value?: string;
}

interface DatePickerMonth {
  value: string;
  name: string;
}

const listDays = (date: Date): string[] => {
  const days = date.getDate();
  const list = [' '];
  for (let index = 1; index <= days; index += 1) {
    list.push(index.toString().length === 1 ? `0${index}` : index.toString());
  }

  return list;
};

const listMonths = (): DatePickerMonth[] => {
  return [
    { value: ' ', name: ' ' },
    { value: '01', name: 'января' },
    { value: '02', name: 'февраля' },
    { value: '03', name: 'марта' },
    { value: '04', name: 'апреля' },
    { value: '05', name: 'мая' },
    { value: '06', name: 'июня' },
    { value: '07', name: 'июля' },
    { value: '08', name: 'августа' },
    { value: '09', name: 'сентября' },
    { value: '10', name: 'октября' },
    { value: '11', name: 'ноября' },
    { value: '12', name: 'декабря' },
  ];
};

const listYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const list = [' '];
  for (let index = currentYear + 1; index > currentYear - 100; index -= 1) {
    list.push(index.toString());
  }

  return list;
};

export const DatePicker = ({ name, value, setter, label }: DatePickerProperties): JSX.Element => {
  const [year, setYear] = useState(' ');
  const [month, setMonth] = useState(' ');
  const [day, setDay] = useState(' ');
  const [rawDate, setRawDate] = useState('');

  useEffect(() => {
    if (value && value !== rawDate) {
      const values = value.split('-');
      if (values.length === 3) {
        setRawDate(value);
        setYear(values[0]);
        setMonth(values[1]);
        setDay(values[2]);
      }
    }
  }, [rawDate, value]);

  useEffect(() => {
    const strdate = `${year}-${month}-${day}`;
    if (strdate !== rawDate) {
      setRawDate(strdate);
      setter(year !== ' ' && month !== ' ' && day !== ' ' ? strdate : undefined);
    }
  }, [day, month, setter, rawDate, year]);

  const setYearHandler = (event: ChangeEvent<HTMLSelectElement> | FocusEvent<HTMLSelectElement>): void => {
    setYear(event.target.value);
  };

  const setMonthHandler = (event: ChangeEvent<HTMLSelectElement> | FocusEvent<HTMLSelectElement>): void => {
    setMonth(event.target.value);
  };

  const setDayHandler = (event: ChangeEvent<HTMLSelectElement> | FocusEvent<HTMLSelectElement>): void => {
    setDay(event.target.value);
  };

  return (
    <div key={name} className="field">
      {label && (
        <label key="DateLabel" className="label" htmlFor={`datepicker-${name}-id`}>
          {label}
        </label>
      )}
      <div className="field has-addons" id={`datepicker-${name}-id`}>
        <div className="control">
          <div className="select">
            <select key={`${name}day`} className="select" value={day} onBlur={setDayHandler} onChange={setDayHandler}>
              {listDays(new Date(Number(year === ' ' ? '2021' : year), Number(month === ' ' ? '1' : month), 0)).map(
                (item) => (
                  <option key={`${name}day-${item}`} value={item}>
                    {item}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select
              key={`${name}month`}
              className="select"
              value={month}
              onBlur={setMonthHandler}
              onChange={setMonthHandler}
            >
              {listMonths().map((item) => (
                <option key={`${name}month-${item.value}`} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select
              key={`${name}year`}
              className="select"
              value={year}
              onBlur={setYearHandler}
              onChange={setYearHandler}
            >
              {listYears().map((item) => (
                <option key={`${name}year-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

DatePicker.defaultProps = {
  label: undefined,
  value: undefined,
};

export default DatePicker;
