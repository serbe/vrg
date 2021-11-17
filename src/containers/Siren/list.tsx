import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { SirenList } from '../../models/types';
import { GetList } from '../../services/fetcher';
import { splitNumbers } from '../../services/utils';

export const Sirens = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('SirenList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): SirenList[] => paginationData();
    return (
      <>
        {tableData().map((siren) => (
          <tr
            className="link"
            key={`tr${siren.id}`}
            onClick={(): void => {
              navigate(`/sirens/${siren.id}`);
            }}
            role="gridcell"
          >
            <td className="w250">{siren.siren_type_name}</td>
            <td className="is-hidden-mobile">{siren.address}</td>
            <td className="is-hidden-touch w250">{siren.contact_name}</td>
            <td className="w95 nowrap">{splitNumbers(siren.phones)}</td>
          </tr>
        ))}
      </>
    );
  }, [history, paginationData]);

  return (
    <>
      <Bar name="sirens" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Тип сирены</th>
            <th className="is-hidden-mobile w250">Адрес</th>
            <th>Ответственный</th>
            <th className="w95 nowrap">Телефоны</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
