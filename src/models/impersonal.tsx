import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { FormField } from '../components/formfield';
import { Icon } from '../components/icon';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { useAuthState } from '../services/auth';
import { addEmptyString } from '../services/utils';
import type { EmailValues, PhoneValues } from './types';
import type { SelectValues, StringInputProperties } from './variables';

export const EmailInputs = function ({ emails, setter }: EmailValues): JSX.Element {
  return (
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
};

// const Phone = function ({ value }: { value: string }): JSX.Element {
//   const [phone, setPhone] = useState(prettyPhone(value));

//   return (
//     <Input
//       classNameDiv="pb-1"
//       icon="phone"
//       onChange={(event): void => {
//         setPhone(prettyPhone(event.target.value));
//       }}
//       placeholder="Phone"
//       type="text"
//       value={phone}
//       name={`ph-${phone}`}
//     />
//   );
// };

export const PhoneInputs = function ({ phones, setter }: PhoneValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Телефон</label>
      {phones.map(({ id, name }) => (
        <div className="control has-icons-left pb-1" key={`phone-div-${id}`}>
          <input
            autoComplete="off"
            className="input"
            id={`${id}`}
            key={`phone-input-${id}`}
            name={`phone-${id}-input`}
            onChange={setter(id)}
            placeholder="Телефон"
            type="tel"
            value={name}
          />
          <Icon icon="phone" position="left" />
        </div>
      ))}
    </div>
  );
};

export const FaxInputs = function ({ phones, setter }: PhoneValues): JSX.Element {
  return (
    <div className="field">
      <label className="label">Факс</label>
      {phones.map(({ id, name }) => (
        <Input
          autocomplete="off"
          icon="phone"
          key={`fax-inpit-key-${id}`}
          name={`fax-input-${id}`}
          onChange={setter(id)}
          placeholder="Факс"
          type="tel"
          value={name}
        />
        // <div className="control has-icons-left pb-1" key={`fax-div-${id}`}>
        //   <input
        //     autoComplete="off"
        //     className="input"
        //     id={`${id}`}
        //     key={`fax-input-${id}`}
        //     name={`fax-${id}-input`}
        //     onChange={setter(id)}
        //     placeholder="Факс"
        //     type="tel"
        //     value={name}
        //   />
        //   <Icon icon="phone" position="left" />
        // </div>
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
    <div className="field is-grouped">
      <SaveButton />
      <BackButton />
      <DeleteButton />
    </div>
  );
};
