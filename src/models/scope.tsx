import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export function ScopeIDSelect({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Сфера деятельности" listName="ScopeSelect" name="scope" setter={setter} />;
}

export function ScopeNameInput({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Сфера деятельности" name="name" value={value} onChange={setter} />
  );
}
