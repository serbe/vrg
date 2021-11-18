import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const ScopeIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Сфера деятельности" listName="ScopeSelect" name="scope" setter={setter} />
);

export const ScopeNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Сфера деятельности" name="name" onChange={setter} value={value} />
);
