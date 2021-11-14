import { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import { NumberInputProperties, SelectValues, StringInputProperties } from './variables';

export const SirenTypeIDSelect = ({ id, setter }: SelectValues) => (
  <Select name="siren_type_id" label="Тип сирены" listName="SirenTypeSelect" id={id} icon="tag" setter={setter} />
);

export const SirenTypeNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="siren_type_name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Тип сирены"
    icon="tag"
    autocomplete="off"
  />
);

export const SirenTypeRadiusInput = ({ value, setter }: NumberInputProperties) => (
  <FormField
    name="siren_type_radius"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => setter(Number(event.target.value))}
    label="Радиус действия"
    icon="tag"
    autocomplete="off"
  />
);
