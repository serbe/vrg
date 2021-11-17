import type { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { BooleanInputProperties, SelectValues, StringInputProperties } from './variables';

export const PostIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Должность" listName="PostSelect" name="post" setter={setter} />
);

export const PostGoIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select icon="tag" id={id} label="Должность ГО ЧС" listName="PostGoSelect" name="post-go" setter={setter} />
);

export const PostNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    autocomplete="off"
    icon="tag"
    label="Наименование должности"
    name="post-name"
    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
      setter(event.target.value === '' ? undefined : event.target.value);
    }}
    value={value}
  />
);

export const PostGOSwitch = ({ value, setter }: BooleanInputProperties): JSX.Element => (
  <div className="field">
    <div className="control">
      <label className="checkbox" htmlFor="post-go">
        <input
          checked={value}
          className="checkbox"
          id="post-go"
          name="post-go"
          onClick={(): void => {
            setter(!value);
          }}
          type="checkbox"
        />
        Должность по гражданской обороне
      </label>
    </div>
  </div>
);
