import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { NumberInputProperties, SelectValues, StringInputProperties } from './variables';

export const SirenTypeIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Тип сирены" listName="SirenTypeSelect" name="siren_type_id" setter={setter} />
);

export const SirenTypeNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Тип сирены" name="siren_type_name" onChange={setter} value={value} />
);

export const SirenTypeRadiusInput = ({ value, setter }: NumberInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="tag"
    label="Радиус действия"
    name="siren_type_radius"
    onChange={setter}
    value={value}
  />
);
