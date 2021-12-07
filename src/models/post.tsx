import { FormField } from '../components/formfield';
import { Select } from '../components/select';
import type { BooleanInputProperties, SelectValues, StringInputProperties } from './variables';

export const PostIDSelect = ({ id, setter }: SelectValues): JSX.Element => {
  return <Select icon="tag" id={id} label="Должность" listName="PostSelect" name="post" setter={setter} />;
};

export const PostGoIDSelect = ({ id, setter }: SelectValues): JSX.Element => {
  return <Select icon="tag" id={id} label="Должность ГО ЧС" listName="PostGoSelect" name="post-go" setter={setter} />;
};

export const PostNameInput = ({ value, setter }: StringInputProperties): JSX.Element => {
  return (
    <FormField
      autocomplete="off"
      icon="tag"
      label="Наименование должности"
      name="post-name"
      value={value}
      onChange={setter}
    />
  );
};

export const PostGOSwitch = ({ value, setter }: BooleanInputProperties): JSX.Element => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox" htmlFor="post-go">
          <input
            checked={value}
            className="checkbox"
            id="post-go"
            name="post-go"
            type="checkbox"
            onClick={(): void => {
              setter(!value);
            }}
          />
          Должность по гражданской обороне
        </label>
      </div>
    </div>
  );
};
