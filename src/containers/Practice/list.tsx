import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { PracticeList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Practices = function (): JSX.Element {
  const navigate = useNavigate();
  const [data] = GetList('PracticeList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): PracticeList[] => paginationData();
    return (
      <>
        {tableData().map((practice) => (
          <tr
            className="link"
            key={`tr${practice.id}`}
            onClick={(): void => {
              navigate(`/practices/${practice.id}`);
            }}
            role="gridcell"
          >
            <td className="nowrap">{practice.date_str}</td>
            <td className="w250">{practice.kind_name}</td>
            <td className="w250 is-hidden-mobile">{practice.company_name}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="practices" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="nowrap">Дата тренировки</th>
            <th className="w250">Тип тренировки</th>
            <th className="w250 is-hidden-mobile">Организация</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};

export default Practices;
