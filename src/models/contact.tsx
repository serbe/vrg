/* eslint-disable camelcase */
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { diffMonth } from '../services/utils';
import { ContactEducationsValues, ContactShortValues } from './types';
import { DatePickerValues, SelectValues, StringInputProperties } from './variables';

export const ContactNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    icon="user"
    label="Фамилия Имя Отчество"
    name="contact-name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    value={value}
    autocomplete="off"
  />
);

export const ContactBirthdayInput = ({ value, setter }: DatePickerValues) => (
  <DatePicker label="Дата рождения" name="birthday" setter={setter} value={value} />
);

export const ContactShortForm = ({ contacts }: ContactShortValues) => {
  const navigate = useNavigate();
  return (
    <div className="field" key="contacts">
      <label className="label">Сотрудники</label>
      {contacts.map((contact) => (
        <Input
          className="link"
          classNameDiv="pb-1"
          icon="user"
          key={`contact-${contact.id}`}
          name={`contact-${contact.id}`}
          onClick={(): void => navigate(`/contacts/${contact.id}`)}
          readonly
          value={`${contact.name || ''} - ${contact.post_name || ''}`}
          autocomplete="off"
        />
      ))}
    </div>
  );
};

export const ContactIDSelect = ({ id, setter }: SelectValues) => (
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

export const ContactEducations = ({ educations }: ContactEducationsValues) =>
  educations.length > 0 ? (
    <div className="field">
      <label className="label">Даты обучения в УМЦ</label>
      {educations.map((education) => (
        <Input
          name={`education-${education}-input`}
          key={`education-${education}`}
          value={education}
          className={inputClass(education)}
          classNameDiv="pb-1"
        />
      ))}
    </div>
  ) : null;
