import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { Select } from '../components/select';
import { tinyDate, trClass } from '../services/utils';
import type { EducationShort } from './types';
import type { DatePickerValues, SelectValues } from './variables';

export function EducationNameSelect({ id, setter }: SelectValues): JSX.Element {
  return (
    <Select
      icon="user"
      id={id}
      label="Полное имя обучаемого"
      listName="ContactSelect"
      name="education-contact-name"
      setter={setter}
    />
  );
}

export function EducationStartDateInput({ value, setter }: DatePickerValues): JSX.Element {
  return <DatePicker label="Дата начала обучения" name="education-start-date" setter={setter} value={value} />;
}

export function EducationEndDateInput({ value, setter }: DatePickerValues): JSX.Element {
  return <DatePicker label="Дата окончания обучения" name="education-end-date" setter={setter} value={value} />;
}

export function EducationNearList({ list }: { list: EducationShort[] }): JSX.Element {
  const navigate = useNavigate();
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map((row) => (
          <Fragment key={row.id}>
            <tr className={`${trClass(row.start_date)}`}>
              <td
                rowSpan={2}
                className="has-text-black is-vcentered"
                role="gridcell"
                onMouseDown={(): void => {
                  navigate(`/educations/${row.id}`);
                }}
              >
                {tinyDate(row.start_date)}
              </td>
              <td
                className="has-text-black"
                role="gridcell"
                onMouseDown={(): void => {
                  navigate(`/contacts/${row.contact_id}`);
                }}
              >
                {row.contact_name}
              </td>
            </tr>
            <tr>
              <td
                className={`${trClass(row.start_date)} has-text-black`}
                role="gridcell"
                onMouseDown={(): void => {
                  navigate(`/companies/${row.company_id}`);
                }}
              >
                {row.company_name}
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
