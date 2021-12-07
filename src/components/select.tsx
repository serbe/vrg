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
    if (itemID === 0 && id) {
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

  const inputColor = color ? `is-${color}` : '';
  const iconColor = color === 'primary' ? undefined : color;

  return (
    <div key={name} className="field">
      {label && (
        <label key="SelectLabel" className="label" htmlFor={`select-${name}-id`}>
          {label}
        </label>
      )}
      <div
        key={`${name}-control`}
        className={`control is-expanded select is-fullwidth ${icon ? 'has-icons-left' : ''}`}
        id={`select-${name}-id`}
      >
        <input
          key={`${name}-input`}
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          autoComplete="off"
          className={`input ${inputColor}`}
          name={name}
          type="text"
          value={currentValue()}
          onBlur={(): void => {
            setTimeout(() => {
              setOpened(false);
            }, 300);
          }}
          onChange={valueInput}
          onFocus={(): void => {
            setOpened(true);
          }}
        />
        {icon && <Icon key="SelectIconLeft" color={iconColor} icon={icon} position="left" />}
      </div>
      {!error && opened && (
        <div key={`${name}-dropdown`} className="select-box">
          {filteredList().map((ListItem, index) => (
            <div
              key={`${name}-${ListItem.id}`}
              className="select-item"
              role="row"
              tabIndex={index}
              onMouseDown={(): void => {
                setItemID(ListItem.id);
                setValue(ListItem.name);
                setter(ListItem.id === 0 ? undefined : ListItem.id);
              }}
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

export default Select;
