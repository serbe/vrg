import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export function DepartmentIDSelect({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Отдел" listName="DepartmentSelect" name="department" setter={setter} />;
}

export function DepartmentNameInput({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Наименование отдела" name="name" value={value} onChange={setter} />
  );
}
