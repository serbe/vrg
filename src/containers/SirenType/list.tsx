import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { SirenTypeList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const SirenTypes = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('SirenTypeList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): SirenTypeList[] => paginationData();
    return (
      <>
        {tableData().map((siren_type) => (
          <tr
            key={`tr${siren_type.id}`}
            className="link"
            role="gridcell"
            onClick={(): void => {
              navigate(`/sirentypes/${siren_type.id}`);
            }}
          >
            <td>{siren_type.name}</td>
            <td>{siren_type.radius}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="sirentypes" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Тип сирены</th>
            <th>Радиус действия</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};

export default SirenTypes;
