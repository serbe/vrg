/* eslint-disable camelcase */
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { Select } from '../components/select';
import { tinyDate, trClass } from '../services/utils';
import type { EducationShort } from './types';
import type { DatePickerValues, SelectValues } from './variables';

export const EducationNameSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    icon="user"
    id={id}
    label="Полное имя обучаемого"
    listName="ContactSelect"
    name="education-contact-name"
    setter={setter}
  />
);

export const EducationStartDateInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker label="Дата начала обучения" name="education-start-date" setter={setter} value={value} />
);

export const EducationEndDateInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker label="Дата окончания обучения" name="education-end-date" setter={setter} value={value} />
);

export const EducationNearList = ({ list }: { list: EducationShort[] }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map((row) => (
          <tr className={trClass(row.start_date)} key={row.id}>
            <td
              className="has-text-black"
              onMouseDown={(): void => {
                navigate(`/educations/${row.id}`);
              }}
              role="gridcell"
            >
              {tinyDate(row.start_date)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => {
                navigate(`/contacts/${row.contact_id}`);
              }}
              role="gridcell"
            >
              {row.contact_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
