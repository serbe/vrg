/* eslint-disable camelcase */
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { tinyDate, trClass } from '../services/utils';
import type { PracticeShort, PracticeValues } from './types';
import type { DatePickerValues, StringInputProperties } from './variables';

export const PracticeListForm = ({ practices }: PracticeValues): JSX.Element | null => {
  const navigate = useNavigate();
  return practices.length > 0 ? (
    <div className="field" key="practices">
      <label className="label">Тренировки</label>
      {practices.map((practice) => (
        <Input
          className="link"
          classNameDiv="pb-1"
          key={`practice-${practice.id}`}
          name={`practice-${practice.id}`}
          onClick={(): void => {
            navigate(`/practices/${practice.id}`);
          }}
          readonly
          value={`${practice.date_str ?? ''} - ${practice.kind_name ?? ''} - ${practice.topic ?? ''}`}
        />
      ))}
    </div>
  ) : null;
};

export const PracticeTopicInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="tag"
    label="Тема тренировки"
    name="practice-topic"
    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value === '' ? undefined : event.target.value);
    }}
    value={value}
  />
);

export const PracticeDateInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker label="Дата проведения тренировки" name="practice-date" setter={setter} value={value} />
);

export const PracticeNearList = ({ list }: { list: PracticeShort[] }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map((row) => (
          <tr className={trClass(row.date_of_practice)} key={row.id}>
            <td
              className="has-text-black"
              onMouseDown={(): void => {
                navigate(`/practices/${row.id}`);
              }}
              role="gridcell"
            >
              {tinyDate(row.date_of_practice)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => {
                navigate(`/kinds/${row.kind_id}`);
              }}
              role="gridcell"
            >
              {row.kind_short_name}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => {
                navigate(`/companies/${row.company_id}`);
              }}
              role="gridcell"
            >
              {row.company_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
