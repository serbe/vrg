import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { RankList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Ranks = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('RankList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): RankList[] => paginationData();
    return (
      <>
        {tableData().map((rank) => (
          <tr
            key={`tr${rank.id}`}
            className="link"
            role="gridcell"
            onClick={(): void => {
              navigate(`/ranks/${rank.id}`);
            }}
          >
            <td className="w250">{rank.name}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="ranks" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Наименование чина</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};

export default Ranks;
