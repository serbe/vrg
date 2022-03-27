import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import type { DatePickerValues, StringInputProperties } from './variables';

export function CertificateNumberInput({ value, setter }: StringInputProperties): JSX.Element {
  return <FormField icon="tag" label="Серийный номер удостоверения" name="num" value={value} onChange={setter} />;
}

export function CertificateDateInput({ value, setter }: DatePickerValues): JSX.Element {
  return <DatePicker label="Дата выдачи" name="cert-date" setter={setter} value={value} />;
}
