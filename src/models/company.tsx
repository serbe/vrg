/* eslint-disable camelcase */
import { ChangeEvent } from 'react'

import { FormField } from '../components/formfield'
import { Select } from '../components/select'
import { SelectValues, StringInputProperties } from './variables'

export const CompanyIDSelect = ({ id, setter }: SelectValues) => (
  <Select
    name="company-select"
    label="Наименование организации"
    listName="CompanySelect"
    id={id}
    icon="building"
    setter={setter}
  />
)

export const CompanyNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="company-name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование организации"
    icon="building"
    autocomplete="off"
  />
)
