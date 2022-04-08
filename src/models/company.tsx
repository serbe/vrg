import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export function CompanyIDSelect({ id, setter }: SelectValues): JSX.Element {
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
}

export function CompanyNameInput({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="building"
      label="Наименование организации"
      name="company-name"
      value={value}
      onChange={setter}
    />
  );
}

export function CompanyFullNameInput({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="building"
      label="Полное наименование организации"
      name="company-name"
      value={value}
      onChange={setter}
    />
  );
}
