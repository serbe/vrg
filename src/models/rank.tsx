import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const RankIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Чин" listName="RankSelect" name="rank" setter={setter} />
);

export const RankNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Наименование чина" name="name" onChange={setter} value={value} />
);
