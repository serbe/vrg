import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { useAuthState } from '../services/auth';
import type { InputValues } from './types';
import type { SelectValues, StringInputProperties } from './variables';

export const EmailInputs = function ({ values, onBlur, onChange }: InputValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Электронный адрес</label>
      {values.map(({ id, name }) => (
        <Input
          autocomplete="off"
          classNameDiv="pb-1"
          icon="envelope"
          key={`email-inpit-key-${id}`}
          name={`email-input-${id}`}
          onBlur={onBlur}
          onChange={onChange(id)}
          placeholder="Электронный адрес"
          type="email"
          value={name}
        />
      ))}
    </div>
  );
};

export const PhoneInputs = function ({ values, onBlur, onChange }: InputValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Телефон</label>
      {values.map(({ id, name }) => (
        <Input
          autocomplete="off"
          classNameDiv="pb-1"
          icon="phone"
          key={`phone-inpit-key-${id}`}
          name={`phone-input-${id}`}
          onBlur={onBlur}
          onChange={onChange(id)}
          placeholder="Телефон"
          type="tel"
          value={name}
        />
      ))}
    </div>
  );
};

export const FaxInputs = function ({ values, onBlur, onChange }: InputValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Факс</label>
      {values.map(({ id, name }) => (
        <Input
          autocomplete="off"
          classNameDiv="pb-1"
          icon="phone"
          key={`fax-inpit-key-${id}`}
          name={`fax-input-${id}`}
          onBlur={onBlur}
          onChange={onChange(id)}
          placeholder="Факс"
          type="tel"
          value={name}
        />
      ))}
    </div>
  );
};

export const NoteInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return <FormField autocomplete="off" icon="comment" label="Заметки" name="note" onChange={setter} value={value} />;
};

export const AddressInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return <FormField icon="address-card" label="Адрес" name="address" onChange={setter} value={value} />;
};

export const ContactIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="user" id={id} label="Контактное лицо" listName="ContactSelect" name="contact" setter={setter} />;
};

interface FormButtonsValues {
  del: () => void;
  send: () => void;
}

export const ItemFormButtons = function ({ del, send }: FormButtonsValues): JSX.Element {
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
      ) : null,
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
              // eslint-disable-next-line no-alert
              if (window.confirm('Вы действительно хотите удалить запись?')) {
                del();
              }
            }}
          >
            Удалить
          </Button>
        </div>
      ) : null,
    [del, state],
  );

  return (
    <div className="field is-grouped pt-4">
      <SaveButton />
      <BackButton />
      <DeleteButton />
    </div>
  );
};
