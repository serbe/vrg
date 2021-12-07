import { FormField } from '../components/formfield';
import type { NumberInputProperties, StringInputProperties } from './variables';

export const SirenNumberIDInput = ({ value, setter }: NumberInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Инвентарный номер"
      name="siren_number_id"
      value={value}
      onChange={setter}
    />
  );
};

export const SirenNumberPassportInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Номер по паспорту"
      name="siren_number_passport"
      value={value}
      onChange={setter}
    />
  );
};

export const SirenRadioInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return <FormField autocomplete="off" icon="tag" label="Радио" name="siren_radio" value={value} onChange={setter} />;
};

export const SirenDeskInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Пульт управления"
      name="siren_desk"
      value={value}
      onChange={setter}
    />
  );
};

export const SirenLatitudeInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField autocomplete="off" icon="tag" label="Широта" name="siren_latitude" value={value} onChange={setter} />
  );
};

export const SirenLongitudeInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField autocomplete="off" icon="tag" label="Долгота" name="siren_longtitude" value={value} onChange={setter} />
  );
};

export const SirenStageInput = ({ value, setter }: NumberInputProperties): JSX.Element => {
  return <FormField autocomplete="off" icon="tag" label="Этап" name="siren_stage" value={value} onChange={setter} />;
};

export const SirenOwnInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField autocomplete="off" icon="tag" label="Собственность" name="siren_own" value={value} onChange={setter} />
  );
};
