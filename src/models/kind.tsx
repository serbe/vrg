/* eslint-disable camelcase */
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { SelectValues, StringInputProperties } from './variables';

export const KindNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Наименование типа тренировки"
      name="kind-name"
      onChange={setter}
      value={value}
    />
  );
};

export const KindShortNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Сокращенное наименование"
      name="kind-short-name"
      onChange={setter}
      value={value}
    />
  );
};

export const KindIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Тип тренировки" listName="KindSelect" name="kink-select" setter={setter} />;
};
