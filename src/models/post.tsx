import { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import { BooleanInputProperties, SelectValues, StringInputProperties } from './variables';

export const PostIDSelect = ({ id, setter }: SelectValues) => (
  <Select name="post" label="Должность" listName="PostSelect" id={id} icon="tag" setter={setter} />
);

export const PostGoIDSelect = ({ id, setter }: SelectValues) => (
  <Select name="post-go" label="Должность ГО ЧС" listName="PostGoSelect" id={id} icon="tag" setter={setter} />
);

export const PostNameInput = ({ value, setter }: StringInputProperties) => (
  <FormField
    name="post-name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование должности"
    icon="tag"
    autocomplete="off"
  />
);

export const PostGOSwitch = ({ value, setter }: BooleanInputProperties) => (
  <div className="field">
    <div className="control">
      <label className="checkbox" htmlFor="post-go">
        <input
          className="checkbox"
          type="checkbox"
          name="post-go"
          id="post-go"
          checked={value}
          onClick={() => setter(!value)}
        />
        Должность по гражданской обороне
      </label>
    </div>
  </div>
);
