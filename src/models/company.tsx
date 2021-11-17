/* eslint-disable camelcase */
import type { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const CompanyIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    icon="building"
    id={id}
    label="Наименование организации"
    listName="CompanySelect"
    name="company-select"
    setter={setter}
  />
);

export const CompanyNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="building"
    label="Наименование организации"
    name="company-name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value === '' ? undefined : event.target.value);
    }}
    value={value}
  />
);
