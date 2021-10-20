import { ChangeEvent, SetStateAction, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/button';
import { FormField } from '../components/formfield';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { useAuthState } from '../services/auth';
import { addEmptyString, prettyPhone } from '../services/utils';
import { SelectValues, StringInputProperties } from './variables';

export interface ParameterTypes {
  id: string
}

export type EmailValues = {
  emails: string[]
  setter: (value: SetStateAction<string[]>) => void
}

export type PhoneValues = {
  phones: string[]
  setter: (value: SetStateAction<string[]>) => void
}

export const EmailInputs = ({ emails, setter }: EmailValues) => (
  <div className="field">
    <label className="label">Электронный адрес</label>
    {emails.map((email, index) => (
      <Input
        name={`email-${email}-input`}
        type="email"
        icon="envelope"
        key={`email-${email}`}
        value={email}
        placeholder="Электронный адрес"
        onBlur={(event): void => {
          let values = emails
          values[index] = event.target.value
          values = addEmptyString(values)
          setter(values)
        }}
        classNameDiv="pb-1"
        autocomplete="off"
      />
    ))}
  </div>
)

export const PhoneInputs = ({ phones, setter }: PhoneValues) => (
  <div className="field">
    <label className="label">Телефон</label>
    {phones.map((phone, index) => (
      <Input
        name={`phone-${phone}-input`}
        type="tel"
        icon="phone"
        key={`phone-${phone}`}
        value={prettyPhone(phone)}
        placeholder="Телефон"
        onBlur={(event): void => {
          let values = phones
          values[index] = event.target.value
          values = addEmptyString(values)
          setter(values)
        }}
        classNameDiv="pb-1"
        autocomplete="off"
      />
    ))}
  </div>
)

export const FaxInputs = ({ phones, setter }: PhoneValues) => (
  <div className="field">
    <label className="label">Факс</label>
    {phones.map((fax, index) => (
      <Input
        name={`fax-${fax}-input`}
        type="tel"
        icon="fax"
        key={`fax-${fax}`}
        value={prettyPhone(fax)}
        placeholder="Факс"
        onBlur={(event): void => {
          let values = phones
          values[index] = event.target.value
          values = addEmptyString(values)
          setter(values)
        }}
        classNameDiv="pb-1"
        autocomplete="off"
      />
    ))}
  </div>
)

export const NoteInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="note"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value === '' ? undefined : event.target.value)
    }}
    label="Заметки"
    icon="comment"
    autocomplete="off"
  />
)

export const AddressInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="address"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Адрес"
    icon="address-card"
  />
)

export const ContactIDSelect = ({ id, setter }: SelectValues) => (
  <Select name="contact" label="Контактное лицо" listName="ContactSelect" id={id} icon="user" setter={setter} />
)

interface FormButtonsValues {
  del: () => void
  send: () => void
}

export const ItemFormButtons = ({ del, send }: FormButtonsValues) => {
  const history = useHistory()
  const { state } = useAuthState()

  const SaveButton = useCallback(
    () =>
      state.state === 'SIGNED_IN' && state.currentUser.role > 4 ? (
        <div className="control">
          <Button color="info" onClick={() => send()}>
            Сохранить
          </Button>
        </div>
      ) : (
        <></>
      ),
    [send, state],
  )

  const BackButton = useCallback(
    () => (
      <div className="control">
        <Button onClick={() => history.go(-1)}>Закрыть</Button>
      </div>
    ),
    [history],
  )

  const DeleteButton = useCallback(
    () =>
      state.state === 'SIGNED_IN' && state.currentUser.role > 8 ? (
        <div className="control mla">
          <Button
            color="danger"
            onClick={() => {
              if (window.confirm('Вы действительно хотите удалить запись?')) {
                del()
              }
            }}
          >
            Удалить
          </Button>
        </div>
      ) : (
        <></>
      ),
    [del, state],
  )

  return (
    <div className="field is-grouped">
      <SaveButton />
      <BackButton />
      <DeleteButton />
    </div>
  )
}
