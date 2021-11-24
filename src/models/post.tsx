import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { BooleanInputProperties, SelectValues, StringInputProperties } from './variables';

export const PostIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Должность" listName="PostSelect" name="post" setter={setter} />;
};

export const PostGoIDSelect = function ({ id, setter }: SelectValues): JSX.Element {
  return <Select icon="tag" id={id} label="Должность ГО ЧС" listName="PostGoSelect" name="post-go" setter={setter} />;
};

export const PostNameInput = function ({ value, setter }: StringInputProperties): JSX.Element {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Наименование должности"
      name="post-name"
      onChange={setter}
      value={value}
    />
  );
};

export const PostGOSwitch = function ({ value, setter }: BooleanInputProperties): JSX.Element {
  return (
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
};
