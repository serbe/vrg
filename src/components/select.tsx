import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import type { SelectItem } from '../models/types';
import type { AdditionalColors, PrimarylColor } from '../models/variables';
import { GetSelect } from '../services/fetcher';
import { useStringU } from '../services/hooks';
import { Icon } from './icon';
import './select.css';

interface SelectProperties {
  color?: AdditionalColors | PrimarylColor;
  icon?: string;
  id?: number;
  label?: string;
  listName: string;
  name: string;
  setter: Dispatch<SetStateAction<number | undefined>>;
}

export const Select = ({ name, id, label, icon, color, listName, setter }: SelectProperties): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const [itemID, setItemID] = useState(id ?? 0);
  const [list, error] = GetSelect(listName);
  const [value, setValue, valueInput] = useStringU();

  useEffect(() => {
    if (itemID === 0 && id != undefined) {
      setItemID(id);
    }
    if (list[0].id !== 0) {
      list.unshift({ id: 0, name: '' });
    }
    if (id === 0) {
      setValue('');
    } else {
      const currentItem = list.find((item) => item.id === id);
      setValue(currentItem?.name ?? '');
    }
  }, [list, id, itemID, setValue]);

  const currentValue = (): string => {
    if (opened) {
      return value ?? '';
    }
    const currentItem = list.find((item) => item.id === itemID);
    return currentItem?.name ?? '';
  };

  const filteredList = (): SelectItem[] => {
    const inputValue = currentValue();

    if (inputValue.trim().length === 0) {
      return list;
    }

    const inputArray = inputValue.split(' ');

    return list.filter(
      (listItem) =>
        listItem.name === '' ||
        inputArray.every((listItemValue: string) => new RegExp(listItemValue, 'i').exec(listItem.name)),
    );
  };

  return (
    <div className="field" key={name}>
      {label != undefined && (
        <label className="label" htmlFor={`select-${name}-id`} key="SelectLabel">
          {label}
        </label>
      )}
      <div
        className={`control is-expanded select is-fullwidth ${icon != undefined ? 'has-icons-left' : ''}`}
        id={`select-${name}-id`}
        key={`${name}-control`}
      >
        <input
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          autoComplete="off"
          className={`input ${color ? `is-${color}` : ''}`}
          key={`${name}-input`}
          name={name}
          onBlur={(): void => {
            setTimeout(() => {
              setOpened(false);
            }, 300);
          }}
          onChange={valueInput}
          onFocus={(): void => {
            setOpened(true);
          }}
          type="text"
          value={currentValue()}
        />
        {icon != undefined && (
          <Icon color={color !== 'primary' ? color : undefined} icon={icon} key="SelectIconLeft" position="left" />
        )}
      </div>
      {!error && opened && (
        <div className="select-box" key={`${name}-dropdown`}>
          {filteredList().map((ListItem, index) => (
            <div
              className="select-item"
              key={`${name}-${ListItem.id}`}
              onMouseDown={(): void => {
                setItemID(ListItem.id);
                setValue(ListItem.name);
                setter(ListItem.id === 0 ? undefined : ListItem.id);
              }}
              role="row"
              tabIndex={index}
            >
              {ListItem.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Select.defaultProps = {
  color: undefined,
  icon: undefined,
  id: 0,
  label: undefined,
};
