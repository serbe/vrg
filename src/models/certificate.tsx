/* eslint-disable camelcase */
import { ChangeEvent } from 'react';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { DatePickerValues, StringInputProperties } from './variables';

export const CertificateNumberInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="num"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Серийный номер удостоверения"
    icon="tag"
  />
);

export const CertificateDateInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker name="cert-date" label="Дата выдачи" value={value} setter={setter} />
);
