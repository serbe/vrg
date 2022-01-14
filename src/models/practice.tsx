import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { tinyDate, trClass } from '../services/utils';
import type { PracticeShort, PracticeValues } from './types';
import type { DatePickerValues, StringInputProperties } from './variables';

export const PracticeListForm = ({ practices }: PracticeValues): JSX.Element => {
  const navigate = useNavigate();
  return practices.length > 0 ? (
    <div key="practices" className="field">
      <label className="label">Тренировки</label>
      {practices.map((practice) => (
        <Input
          key={`practice-${practice.id}`}
          readonly
          classNameDiv="pb-1"
          classNameInput="link"
          name={`practice-${practice.id}`}
          value={`${practice.date_str ?? ''} - ${practice.kind_name ?? ''} - ${practice.topic ?? ''}`}
          onClick={(): void => {
            navigate(`/practices/${practice.id}`);
          }}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export const PracticeTopicInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Тема тренировки"
      name="practice-topic"
      value={value}
      onChange={setter}
    />
  );
};

export const PracticeDateInput = ({ value, setter }: DatePickerValues): JSX.Element => {
  return <DatePicker label="Дата проведения тренировки" name="practice-date" setter={setter} value={value} />;
};

export const PracticeNearList = ({ list }: { list: PracticeShort[] }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map((row) => (
          <tr key={row.id} className={trClass(row.date_of_practice)}>
            <td
              className="has-text-black"
              role="gridcell"
              onMouseDown={(): void => {
                navigate(`/practices/${row.id}`);
              }}
            >
              {tinyDate(row.date_of_practice)}
            </td>
            <td
              className="has-text-black"
              role="gridcell"
              onMouseDown={(): void => {
                navigate(`/kinds/${row.kind_id}`);
              }}
            >
              {row.kind_short_name}
            </td>
            <td
              className="has-text-black"
              role="gridcell"
              onMouseDown={(): void => {
                navigate(`/companies/${row.company_id}`);
              }}
            >
              {row.company_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
