import { Dispatch, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { FormField } from '../components/formfield';
import { Icon } from '../components/icon';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { useAuthState } from '../services/auth';
import type { InputValues } from './types';
import type { SelectValues, StringInputProperties } from './variables';

export function EmailInputs({ values, onBlur, onChange }: InputValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Электронный адрес</label>
      {values.map(({ id, name }) => (
        <Input
          key={`email-inpit-key-${id}`}
          autocomplete="off"
          classNameDiv="pb-1"
          icon="envelope"
          name={`email-input-${id}`}
          placeholder="Электронный адрес"
          type="email"
          value={name}
          onBlur={onBlur}
          onChange={onChange(id)}
        />
      ))}
    </div>
  );
}

export function PhoneInputs({ values, onBlur, onChange }: InputValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Телефон</label>
      {values.map(({ id, name }) => (
        <Input
          key={`phone-inpit-key-${id}`}
          autocomplete="off"
          classNameDiv="pb-1"
          icon="phone"
          name={`phone-input-${id}`}
          placeholder="Телефон"
          type="tel"
          value={name}
          onBlur={onBlur}
          onChange={onChange(id)}
        />
      ))}
    </div>
  );
}

export function FaxInputs({ values, onBlur, onChange }: InputValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Факс</label>
      {values.map(({ id, name }) => (
        <Input
          key={`fax-inpit-key-${id}`}
          autocomplete="off"
          classNameDiv="pb-1"
          icon="phone"
          name={`fax-input-${id}`}
          placeholder="Факс"
          type="tel"
          value={name}
          onBlur={onBlur}
          onChange={onChange(id)}
        />
      ))}
    </div>
  );
}

export function NoteInput({ value, setter }: StringInputProperties): JSX.Element {
  return <FormField autocomplete="off" icon="comment" label="Заметки" name="note" value={value} onChange={setter} />;
}

export function AddressInput({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField autocomplete="off" icon="address-card" label="Адрес" name="address" value={value} onChange={setter} />
  );
}

export function ContactIDSelect({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="user" id={id} label="Контактное лицо" listName="ContactSelect" name="contact" setter={setter} />;
}

type FormButtonsValues = {
  del: () => void;
  send: () => void;
};

export function ItemFormButtons({ del, send }: FormButtonsValues): JSX.Element {
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
}

export function ClearIcon({ setter }: { setter?: Dispatch<SetStateAction<string>> }): JSX.Element {
  return setter ? (
    <Icon
      className="is-clickable"
      icon="times"
      position="right"
      onClick={(): void => {
        setter('');
      }}
    />
  ) : (
    <></>
  );
}
