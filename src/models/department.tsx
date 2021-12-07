import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const DepartmentIDSelect = ({ id, setter }: SelectValues): JSX.Element => {
  return <Select icon="tag" id={id} label="Отдел" listName="DepartmentSelect" name="department" setter={setter} />;
};

export const DepartmentNameInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField autocomplete="off" icon="tag" label="Наименование отдела" name="name" value={value} onChange={setter} />
  );
};
