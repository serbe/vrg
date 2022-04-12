import { Fragment } from 'react';
import { DatePicker } from '../components/datepicker';
import { Select } from '../components/select';
import { colorDate, tinyDate } from '../services/utils';
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
  return (
    <table className="table is-narrow is-bordered">
      <tbody>
        {list.map((row) => (
          <Fragment key={row.id}>
            <tr>
              <td rowSpan={2} className={`td-${colorDate(row.start_date)} is-vcentered`} role="gridcell">
                <a href={`/educations/${row.id}`} className="has-text-black">
                  {tinyDate(row.start_date)}
                </a>
              </td>
              <td className={`td-${colorDate(row.start_date)}-hover`} role="gridcell">
                <a href={`/contacts/${row.contact_id}`} className="has-text-black">
                  {row.contact_name}
                </a>
              </td>
            </tr>
            <tr className={`tr-${colorDate(row.start_date)}`}>
              <td className={`td-${colorDate(row.start_date)}-hover`} role="gridcell">
                <a href={`/companies/${row.company_id}`} className="has-text-black">
                  {row.company_name}
                </a>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
