import { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import { SelectValues, StringInputProperties } from './variables';

export type Scope = {
  id: number
  name?: string
  note?: string
}

export const ScopeEmpty: Scope = {
  id: 0,
}

export type ScopeList = {
  id: number
  name?: string
  note?: string
}

export const ScopeIDSelect = ({ id, setter }: SelectValues) => (
  <Select name="scope" label="Сфера деятельности" listName="ScopeSelect" id={id} icon="tag" setter={setter} />
)

export const ScopeNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Сфера деятельности"
    icon="tag"
    autocomplete="off"
  />
)
