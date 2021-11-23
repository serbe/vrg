import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { useAuthState } from '../services/auth';
import { addEmptyString, prettyPhone } from '../services/utils';
import type { EmailValues, PhoneValues } from './types';
import type { SelectValues, StringInputProperties } from './variables';

export const EmailInputs = ({ emails, setter }: EmailValues): JSX.Element => (
  <div className="field">
    <label className="label">Электронный адрес</label>
    {emails.map((email, index) => (
      <Input
        autocomplete="off"
        classNameDiv="pb-1"
        icon="envelope"
        key={`email-${email}`}
        name={`email-${email}-input`}
        onBlur={(event): void => {
          let values = emails;
          values[index] = event.target.value;
          values = addEmptyString(values);
          setter(values);
        }}
        placeholder="Электронный адрес"
        type="email"
        value={email}
      />
    ))}
  </div>
);

export const PhoneInputs = ({ phones, setter }: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label">Телефон</label>
    {phones.map((phone, index) => (
      <Input
        autocomplete="off"
        classNameDiv="pb-1"
        icon="phone"
        key={`phone-${phone}`}
        name={`phone-${phone}-input`}
        onBlur={(event): void => {
          let values = phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          setter(values);
        }}
        placeholder="Телефон"
        type="tel"
        value={prettyPhone(phone)}
      />
    ))}
  </div>
);

export const FaxInputs = ({ phones, setter }: PhoneValues): JSX.Element => (
  <div className="field">
    <label className="label">Факс</label>
    {phones.map((fax, index) => (
      <Input
        autocomplete="off"
        classNameDiv="pb-1"
        icon="fax"
        key={`fax-${fax}`}
        name={`fax-${fax}-input`}
        onBlur={(event): void => {
          let values = phones;
          values[index] = event.target.value;
          values = addEmptyString(values);
          setter(values);
        }}
        placeholder="Факс"
        type="tel"
        value={prettyPhone(fax)}
      />
    ))}
  </div>
);

export const NoteInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField autocomplete="off" icon="comment" label="Заметки" name="note" onChange={setter} value={value} />
);

export const AddressInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField icon="address-card" label="Адрес" name="address" onChange={setter} value={value} />
);

export const ContactIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="user" id={id} label="Контактное лицо" listName="ContactSelect" name="contact" setter={setter} />
);

interface FormButtonsValues {
  del: () => void;
  send: () => void;
}

export const ItemFormButtons = ({ del, send }: FormButtonsValues): JSX.Element => {
  const navigate = useNavigate();
  const { state } = useAuthState();

  const SaveButton = useCallback(
    () =>
      state.state === 'SIGNED_IN' && state.currentUser.role > 4 ? (
        <div className="control">
          <Button
            color="info"
            onClick={(): void => {
              send();
            }}
          >
            Сохранить
          </Button>
        </div>
      ) : // eslint-disable-next-line unicorn/no-null
      null,
    [send, state],
  );

  const BackButton = useCallback(
    () => (
      <div className="control">
        <Button
          onClick={(): void => {
            navigate(-1);
          }}
        >
          Закрыть
        </Button>
      </div>
    ),
    [navigate],
  );

  const DeleteButton = useCallback(
    () =>
      state.state === 'SIGNED_IN' && state.currentUser.role > 8 ? (
        <div className="control mla">
          <Button
            color="danger"
            onClick={(): void => {
              if (window.confirm('Вы действительно хотите удалить запись?')) {
                del();
              }
            }}
          >
            Удалить
          </Button>
        </div>
      ) : // eslint-disable-next-line unicorn/no-null
      null,
    [del, state],
  );

  return (
    <div className="field is-grouped">
      <SaveButton />
      <BackButton />
      <DeleteButton />
    </div>
  );
};
