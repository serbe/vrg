import { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import { SelectValues, StringInputProperties } from './variables';

export const RankIDSelect = ({ id, setter }: SelectValues) => (
  <Select icon="tag" id={id} label="Чин" listName="RankSelect" name="rank" setter={setter} />
);

export const RankNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    icon="tag"
    label="Наименование чина"
    name="name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    value={value}
    autocomplete="off"
  />
);
