import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const ScopeIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Сфера деятельности" listName="ScopeSelect" name="scope" setter={setter} />;
};

export const ScopeNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Сфера деятельности" name="name" onChange={setter} value={value} />
  );
};
