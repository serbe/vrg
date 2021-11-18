import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const DepartmentIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Отдел" listName="DepartmentSelect" name="department" setter={setter} />
);

export const DepartmentNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Наименование отдела" name="name" onChange={setter} value={value} />
);
