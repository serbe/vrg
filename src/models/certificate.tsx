/* eslint-disable camelcase */
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import type { DatePickerValues, StringInputProperties } from './variables';

export const CertificateNumberInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return <FormField icon="tag" label="Серийный номер удостоверения" name="num" onChange={setter} value={value} />;
};

export const CertificateDateInput = function ({ value, setter }: DatePickerValues): JSX.Element {
  return <DatePicker label="Дата выдачи" name="cert-date" setter={setter} value={value} />;
};
