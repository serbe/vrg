/* eslint-disable camelcase */
import { useHistory } from 'react-router-dom'
import { EducationShort } from './types'

import { DatePicker } from '../components/datepicker'
import { Select } from '../components/select'
import { tinyDate, trClass } from '../services/utils'
import { DatePickerValues, SelectValues } from './variables'

export const EducationNameSelect = ({ id, setter }: SelectValues) => (
  <Select
    name="education-contact-name"
    label="Полное имя обучаемого"
    listName="ContactSelect"
    id={id}
    icon="user"
    setter={setter}
  />
)

export const EducationStartDateInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker name="education-start-date" label="Дата начала обучения" value={value} setter={setter} />
)

export const EducationEndDateInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker name="education-end-date" label="Дата окончания обучения" value={value} setter={setter} />
)

export const EducationNearList = ({ list }: { list: EducationShort[] }) => {
  const history = useHistory()
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map(row => (
          <tr key={row.id} className={trClass(row.start_date)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/educations/${row.id}`)}
              role="gridcell"
            >
              {tinyDate(row.start_date)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/contacts/${row.contact_id}`)}
              role="gridcell"
            >
              {row.contact_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
