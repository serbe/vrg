import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { colorDate, tinyDate } from '../services/utils';
import type { PracticeShort, PracticeValues } from './types';
import type { DatePickerValues, StringInputProperties } from './variables';

export function PracticeListForm({ practices }: PracticeValues): JSX.Element {
  const navigate = useNavigate();
  return practices.length > 0 ? (
    <div key="practices" className="field">
      <label className="label">Тренировки</label>
      {practices.map((practice) => (
        <Input
          key={`practice-${practice.id}`}
          isReadOnly
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
}

export function PracticeTopicInput({ value, setter }: StringInputProperties): JSX.Element {
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
}

export function PracticeDateInput({ value, setter }: DatePickerValues): JSX.Element {
  return <DatePicker label="Дата проведения тренировки" name="practice-date" setter={setter} value={value} />;
}

export function PracticeNearList({ list }: { readonly list: PracticeShort[] }): JSX.Element {
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map((row) => (
          <tr key={row.id}>
            <td className={`td-${colorDate(row.date_of_practice)}`} role="gridcell">
              <a href={`/practices/${row.id}`} className="has-text-black">
                {tinyDate(row.date_of_practice)}
              </a>
            </td>
            <td className={`td-${colorDate(row.date_of_practice)}-hover`} role="gridcell">
              <a href={`/kinds/${row.kind_id}`} className="has-text-black">
                {row.kind_short_name}
              </a>
            </td>
            <td className={`td-${colorDate(row.date_of_practice)}-hover`} role="gridcell">
              <a href={`/companies/${row.company_id}`} className="has-text-black">
                {row.company_name}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
