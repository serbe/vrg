import type { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../services/auth';
import type { List } from '../services/fetcher';
import { anyToString, latrus } from '../services/utils';
import { Button } from './button';
import { Input } from './input';
import { Pagination } from './pagination';

export type SData = {
  data: string;
  id: number;
};

type PaginateProperties = {
  readonly currentPage: number;
  readonly filteredDataLength: number;
  readonly itemsPerPage: number;
  readonly setter: (page: number) => void;
};

type DataProperties = {
  data: List[];
  search: string;
};

type BarProperties = {
  readonly name: string;
  readonly setter: Dispatch<SetStateAction<string>>;
  readonly value: string;
};

type PaginateState = {
  currentPage: number;
  filteredData: List[];
  filteredDataLength: number;
  itemsPerPage: number;
  searchValues: SData[];
};

type PaginateAction =
  | { type: 'changeSearch'; value: List[]; search: string }
  | { type: 'searchLessThanTwo'; value: List[]; valueLength: number }
  | { type: 'setCurrentPage'; value: number }
  | { type: 'setFilteredData'; value: List[] }
  | { type: 'setFilteredDataLength'; value: number }
  | { type: 'setSearchValues'; value: SData[] };

const initialArguments = {
  currentPage: 0,
  filteredData: [],
  filteredDataLength: 0,
  itemsPerPage: 20,
  searchValues: [],
};

const paginateReducer = (state: PaginateState, action: PaginateAction): PaginateState => {
  switch (action.type) {
    case 'searchLessThanTwo':
      if (state.filteredDataLength !== action.valueLength) {
        return {
          ...state,
          filteredDataLength: action.valueLength,
          filteredData: action.value,
        };
      }

      return state;
    case 'changeSearch': {
      const searchArray = action.search.toLowerCase().split(' ');
      const temporaryFilteredData = action.value.filter((_, index) =>
        searchArray.every(
          (value: string) =>
            state.searchValues[index].data.includes(value) ||
            (latrus(value[0]) && state.searchValues[index].data.includes(latrus(value))),
        ),
      );
      const temporaryFilteredLength = temporaryFilteredData.length;
      if (temporaryFilteredLength !== state.filteredDataLength) {
        if (state.currentPage > 1 && state.currentPage + 1 > Math.ceil(temporaryFilteredLength / state.itemsPerPage)) {
          return {
            ...state,
            currentPage: Math.ceil(temporaryFilteredLength / state.itemsPerPage) - 1,
            filteredData: temporaryFilteredData,
            filteredDataLength: temporaryFilteredLength,
          };
        }

        return {
          ...state,
          filteredData: temporaryFilteredData,
          filteredDataLength: temporaryFilteredLength,
        };
      }

      return state;
    }

    case 'setFilteredData':
      return { ...state, filteredData: action.value };
    case 'setCurrentPage':
      return { ...state, currentPage: action.value };
    case 'setSearchValues':
      return { ...state, searchValues: action.value };
    case 'setFilteredDataLength':
      return { ...state, filteredDataLength: action.value };
    default:
      return state;
  }
};

function Paginate({ filteredDataLength, itemsPerPage, currentPage, setter }: PaginateProperties): JSX.Element {
  const receiveChildValue = (value: number): void => {
    setter(value - 1);
  };

  return filteredDataLength / itemsPerPage > 2 ? (
    <Pagination
      currentPage={currentPage + 1}
      lastPage={Math.ceil(filteredDataLength / itemsPerPage)}
      setter={receiveChildValue}
    />
  ) : (
    <></>
  );
}

export function Data({ data, search }: DataProperties): {
  paginationData: () => List[];
  Paginate: ReactElement;
} {
  type TableData = typeof data;

  const [{ filteredData, currentPage, filteredDataLength, itemsPerPage }, dispatch] = useReducer(
    paginateReducer,
    initialArguments,
  );

  const setCurrentPage = (page: number): void => {
    dispatch({
      type: 'setCurrentPage',
      value: page,
    });
  };

  useEffect(() => {
    const sv: SData[] = data.map((row, index): SData => {
      const values = Object.values(row);
      const rowString: string[] = values.map((value) => anyToString(value));
      return { id: index, data: rowString.join('').toLowerCase() };
    });
    dispatch({ type: 'setSearchValues', value: sv });
    dispatch({ type: 'setFilteredData', value: data });
    dispatch({ type: 'setFilteredDataLength', value: data.length });
  }, [data]);

  useEffect(() => {
    if (search.length < 2) {
      dispatch({
        type: 'searchLessThanTwo',
        value: data,
        valueLength: data.length,
      });
    } else {
      dispatch({ type: 'changeSearch', value: data, search });
    }
  }, [search, data]);

  const paginationData = (): TableData =>
    filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return {
    paginationData,
    Paginate: (
      <Paginate
        currentPage={currentPage}
        filteredDataLength={filteredDataLength}
        itemsPerPage={itemsPerPage}
        setter={setCurrentPage}
      />
    ),
  };
}

export function Bar({ name, setter, value }: BarProperties): JSX.Element {
  const { state } = useAuthState();
  const navigate = useNavigate();

  const CreateButton = useCallback(
    () =>
      state.state === 'SIGNED_IN' && state.currentUser.role > 2 ? (
        <div key="TableNewItem" className="control mb-4">
          <Button
            onClick={(): void => {
              navigate(`/${name}/0`);
            }}
          >
            Создать
          </Button>
        </div>
      ) : null,
    [name, navigate, state],
  );

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setter(event.target.value);
  };

  return (
    <div className="field is-grouped">
      <CreateButton />
      <div key="TableSearch" className="control mb-4 is-expanded">
        <Input
          classNameInput="input is-expanded"
          name="search"
          placeholder="Поиск"
          value={value}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
}

export default Data;
