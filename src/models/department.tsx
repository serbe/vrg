import { ChangeEvent } from 'react'

import { FormField } from '../components/formfield'
import { Select } from '../components/select'
import { SelectValues, StringInputProperties } from './variables'

export const DepartmentIDSelect = ({ id, setter }: SelectValues) => (
  <Select name="department" label="Отдел" listName="DepartmentSelect" id={id} icon="tag" setter={setter} />
)

export const DepartmentNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование отдела"
    icon="tag"
    autocomplete="off"
  />
)
