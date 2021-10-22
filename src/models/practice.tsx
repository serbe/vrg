/* eslint-disable camelcase */
import { ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { PracticeShort, PracticeValues } from './types'

import { DatePicker } from '../components/datepicker'
import { FormField } from '../components/formfield'
import { Input } from '../components/input'
import { tinyDate, trClass } from '../services/utils'
import { DatePickerValues, StringInputProperties } from './variables'

export const PracticeListForm = ({ practices }: PracticeValues) => {
  const history = useHistory()
  return practices.length > 0 ? (
    <div className="field" key="practices">
      <label className="label">Тренировки</label>
      {practices.map(practice => (
        <Input
          name={`practice-${practice.id}`}
          key={`practice-${practice.id}`}
          onClick={(): void => history.push(`/practices/${practice.id}`)}
          value={`${practice.date_str || ''} - ${practice.kind_name || ''} - ${practice.topic || ''}`}
          readonly
          classNameDiv="pb-1"
          className="link"
        />
      ))}
    </div>
  ) : (
    <></>
  )
}

export const PracticeTopicInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="practice-topic"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Тема тренировки"
    icon="tag"
    autocomplete="off"
  />
)

export const PracticeDateInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker name="practice-date" label="Дата проведения тренировки" value={value} setter={setter} />
)

export const PracticeNearList = ({ list }: { list: PracticeShort[] }) => {
  const history = useHistory()
  return (
    <table className="table is-narrow">
      <tbody>
        {list.map(row => (
          <tr key={row.id} className={trClass(row.date_of_practice)}>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/practices/${row.id}`)}
              role="gridcell"
            >
              {tinyDate(row.date_of_practice)}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/kinds/${row.kind_id}`)}
              role="gridcell"
            >
              {row.kind_short_name}
            </td>
            <td
              className="has-text-black"
              onMouseDown={(): void => history.push(`/companies/${row.company_id}`)}
              role="gridcell"
            >
              {row.company_name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
