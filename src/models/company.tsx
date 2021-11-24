/* eslint-disable camelcase */
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const CompanyIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return (
    <Select
      icon="building"
      id={id}
      label="Наименование организации"
      listName="CompanySelect"
      name="company-select"
      setter={setter}
    />
  );
};

export const CompanyNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="building"
      label="Наименование организации"
      name="company-name"
      onChange={setter}
      value={value}
    />
  );
};
