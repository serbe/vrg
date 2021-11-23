/* eslint-disable camelcase */
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { diffMonth } from '../services/utils';
import type { ContactEducationsValues, ContactShortValues } from './types';
import type { DatePickerValues, SelectValues, StringInputProperties } from './variables';

export const ContactNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="user"
    label="Фамилия Имя Отчество"
    name="contact-name"
    onChange={setter}
    value={value}
  />
);

export const ContactBirthdayInput = ({ value, setter }: DatePickerValues): JSX.Element => (
  <DatePicker label="Дата рождения" name="birthday" setter={setter} value={value} />
);

export const ContactShortForm = ({ contacts }: ContactShortValues): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="field" key="contacts">
      <label className="label">Сотрудники</label>
      {contacts.map((contact) => (
        <Input
          autocomplete="off"
          classNameDiv="pb-1"
          classNameInput="link"
          icon="user"
          key={`contact-${contact.id}`}
          name={`contact-${contact.id}`}
          onClick={(): void => {
            navigate(`/contacts/${contact.id}`);
          }}
          readonly
          value={`${contact.name ?? ''} - ${contact.post_name ?? ''}`}
        />
      ))}
    </div>
  );
};

export const ContactIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="user" id={id} label="Фамилия Имя Отчество" listName="ContactSelect" name="contact" setter={setter} />
);

const inputClass = (input: string): string => {
  const date = new Date(input);
  if (date > new Date()) {
    return 'is-warning';
  }
  const newDate = diffMonth(60);
  if (date > newDate) {
    return 'is-success';
  }
  return 'is-danger';
};

export const ContactEducations = ({ educations }: ContactEducationsValues): JSX.Element | null =>
  educations.length > 0 ? (
    <div className="field">
      <label className="label">Даты обучения в УМЦ</label>
      {educations.map((education) => (
        <Input
          classNameDiv="pb-1"
          classNameInput={inputClass(education)}
          key={`education-${education}`}
          name={`education-${education}-input`}
          value={education}
        />
      ))}
    </div>
  ) : // eslint-disable-next-line unicorn/no-null
  null;
