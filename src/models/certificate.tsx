/* eslint-disable camelcase */
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import type { DatePickerValues, StringInputProperties } from './variables';

export const CertificateNumberInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField icon="tag" label="Серийный номер удостоверения" name="num" onChange={setter} value={value} />
);

export const CertificateDateInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker label="Дата выдачи" name="cert-date" setter={setter} value={value} />
);
