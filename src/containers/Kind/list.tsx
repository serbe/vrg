import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { KindList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export function Kinds(): JSX.Element {
  const navigate = useNavigate();
  const [data] = GetList('KindList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): KindList[] => paginationData();
    return (
      <>
        {tableData().map((kind) => (
          <tr
            key={`tr${kind.id}`}
            className="link"
            role="gridcell"
            onClick={(): void => {
              navigate(`/kinds/${kind.id}`);
            }}
          >
            <td className="w250">{kind.name}</td>
            <td className="w250">{kind.short_name}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="kinds" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Тип тренировки</th>
            <th>Сокращенное наименование</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
}

export default Kinds;
