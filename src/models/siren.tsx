/* eslint-disable camelcase */
import { FormField } from '../components/formfield';
import type { NumberInputProperties, StringInputProperties } from './variables';

export const SirenNumberIDInput = function ({ value, setter }: NumberInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Инвентарный номер"
      name="siren_number_id"
      onChange={setter}
      value={value}
    />
  );
};

export const SirenNumberPassportInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Номер по паспорту"
      name="siren_number_passport"
      onChange={setter}
      value={value}
    />
  );
};

export const SirenRadioInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return <FormField autocomplete="off" icon="tag" label="Радио" name="siren_radio" onChange={setter} value={value} />;
};

export const SirenDeskInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Пульт управления"
      name="siren_desk"
      onChange={setter}
      value={value}
    />
  );
};

export const SirenLatitudeInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Широта" name="siren_latitude" onChange={setter} value={value} />
  );
};

export const SirenLongitudeInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Долгота" name="siren_longtitude" onChange={setter} value={value} />
  );
};

export const SirenStageInput = function ({ value, setter }: NumberInputProperties): JSX.Element {
  return <FormField autocomplete="off" icon="tag" label="Этап" name="siren_stage" onChange={setter} value={value} />;
};

export const SirenOwnInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="tag" label="Собственность" name="siren_own" onChange={setter} value={value} />
  );
};
