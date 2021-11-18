/* eslint-disable camelcase */
import { FormField } from '../components/formfield';
import type { NumberInputProperties, StringInputProperties } from './variables';

export const SirenNumberIDInput = ({ value, setter }: NumberInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="tag"
    label="Инвентарный номер"
    name="siren_number_id"
    onChange={setter}
    value={value}
  />
);

export const SirenNumberPassportInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="tag"
    label="Номер по паспорту"
    name="siren_number_passport"
    onChange={setter}
    value={value}
  />
);

export const SirenRadioInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Радио" name="siren_radio" onChange={setter} value={value} />
);

export const SirenDeskInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Пульт управления" name="siren_desk" onChange={setter} value={value} />
);

export const SirenLatitudeInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Широта" name="siren_latitude" onChange={setter} value={value} />
);

export const SirenLongitudeInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Долгота" name="siren_longtitude" onChange={setter} value={value} />
);

export const SirenStageInput = ({ value, setter }: NumberInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Этап" name="siren_stage" onChange={setter} value={value} />
);

export const SirenOwnInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="tag" label="Собственность" name="siren_own" onChange={setter} value={value} />
);
