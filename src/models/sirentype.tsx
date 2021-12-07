import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { NumberInputProperties, SelectValues, StringInputProperties } from './variables';

export const SirenTypeIDSelect = ({ id, setter }: SelectValues): JSX.Element => {
  return (
    <Select icon="tag" id={id} label="Тип сирены" listName="SirenTypeSelect" name="siren_type_id" setter={setter} />
  );
};

export const SirenTypeNameInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Тип сирены"
      name="siren_type_name"
      value={value}
      onChange={setter}
    />
  );
};

export const SirenTypeRadiusInput = ({ value, setter }: NumberInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Радиус действия"
      name="siren_type_radius"
      value={value}
      onChange={setter}
    />
  );
};
