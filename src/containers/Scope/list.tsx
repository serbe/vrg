import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { ScopeList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Scopes = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('ScopeList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): ScopeList[] => paginationData();
    return (
      <>
        {tableData().map((scope) => (
          <tr
            key={`tr${scope.id}`}
            className="link"
            role="gridcell"
            onClick={(): void => {
              navigate(`/scopes/${scope.id}`);
            }}
          >
            <td className="w250">{scope.name}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="scopes" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Сфера деятельности</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};

export default Scopes;
