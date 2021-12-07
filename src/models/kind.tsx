import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const KindNameInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Наименование типа тренировки"
      name="kind-name"
      value={value}
      onChange={setter}
    />
  );
};

export const KindShortNameInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Сокращенное наименование"
      name="kind-short-name"
      value={value}
      onChange={setter}
    />
  );
};

export const KindIDSelect = ({ id, setter }: SelectValues): JSX.Element => {
  return <Select icon="tag" id={id} label="Тип тренировки" listName="KindSelect" name="kink-select" setter={setter} />;
};
