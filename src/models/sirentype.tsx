import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { NumberInputProperties, SelectValues, StringInputProperties } from './variables';

export const SirenTypeIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return (
    <Select icon="tag" id={id} label="Тип сирены" listName="SirenTypeSelect" name="siren_type_id" setter={setter} />
  );
};

export const SirenTypeNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Тип сирены"
      name="siren_type_name"
      onChange={setter}
      value={value}
    />
  );
};

export const SirenTypeRadiusInput = function ({ value, setter }: NumberInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Радиус действия"
      name="siren_type_radius"
      onChange={setter}
      value={value}
    />
  );
};
