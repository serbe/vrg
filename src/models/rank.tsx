import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const RankIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Чин" listName="RankSelect" name="rank" setter={setter} />;
};

export const RankNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Наименование чина" name="name" onChange={setter} value={value} />
  );
};
