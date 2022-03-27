import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/datepicker';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { diffMonth } from '../services/utils';
import type { ContactEducationsValues, ContactShortValues } from './types';
import type { DatePickerValues, SelectValues, StringInputProperties } from './variables';

export function ContactNameInput({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="user"
      label="Фамилия Имя Отчество"
      name="contact-name"
      value={value}
      onChange={setter}
    />
  );
}

export function ContactBirthdayInput({ value, setter }: DatePickerValues): JSX.Element {
  return <DatePicker label="Дата рождения" name="birthday" setter={setter} value={value} />;
}

export function ContactShortForm({ contacts }: ContactShortValues): JSX.Element {
  const navigate = useNavigate();
  return (
    <div key="contacts" className="field">
      <label className="label">Сотрудники</label>
      {contacts.map((contact) => (
        <Input
          key={`contact-${contact.id}`}
          readonly
          autocomplete="off"
          classNameDiv="pb-1"
          classNameInput="link"
          icon="user"
          name={`contact-${contact.id}`}
          value={`${contact.name ?? ''} - ${contact.post_name ?? ''}`}
          onClick={(): void => {
            navigate(`/contacts/${contact.id}`);
          }}
        />
      ))}
    </div>
  );
}

export function ContactIDSelect({ id, setter }: SelectValues): JSX.Element {
  return (
    <Select icon="user" id={id} label="Фамилия Имя Отчество" listName="ContactSelect" name="contact" setter={setter} />
  );
}

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

export function ContactEducations({ educations }: ContactEducationsValues): JSX.Element {
  return educations.length > 0 ? (
    <div className="field">
      <label className="label">Даты обучения в УМЦ</label>
      {educations.map((education) => (
        <Input
          key={`education-${education}`}
          classNameDiv="pb-1"
          classNameInput={inputClass(education)}
          name={`education-${education}-input`}
          value={education}
        />
      ))}
    </div>
  ) : (
    <></>
  );
}
