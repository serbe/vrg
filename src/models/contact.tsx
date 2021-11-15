/* eslint-disable camelcase */
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { ChangeEvent } from 'react';
import { BsCalendar2Date, BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Select } from '../components/select';
import { diffMonth } from '../services/utils';
import { ContactEducationsValues, ContactShortValues } from './types';
import { DatePickerValues, SelectValues, StringInputProperties } from './variables';

export const ContactNameInput = ({ value, setter }: StringInputProperties) => (
  <FormControl id="contact-name">
    <FormLabel>Фамилия Имя Отчество</FormLabel>
    <InputGroup borderColor="#E0E1E7">
      <InputLeftElement pointerEvents="none">
        <BsPerson color="gray.800" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Фамилия Имя Отчество"
        size="md"
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          setter(event.target.value === '' ? undefined : event.target.value)
        }
        value={value}
      />
    </InputGroup>
  </FormControl>
);

export const ContactBirthdayInput = ({ value, setter }: DatePickerValues) => (
  <FormControl id="contact-date">
    <FormLabel>Дата рождения</FormLabel>
    <InputGroup borderColor="#E0E1E7">
      <InputLeftElement pointerEvents="none">
        <BsCalendar2Date color="gray.800" />
      </InputLeftElement>
      <SingleDatepicker name="birthday" onDateChange={setter} date={value} />
    </InputGroup>
  </FormControl>
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
