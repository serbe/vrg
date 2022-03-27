import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { DepartmentList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export function Departments(): JSX.Element {
  const navigate = useNavigate();
  const [data] = GetList('DepartmentList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): DepartmentList[] => paginationData();
    return (
      <>
        {tableData().map((department) => (
          <tr
            key={`tr${department.id}`}
            className="link"
            role="gridcell"
            onClick={(): void => {
              navigate(`/departments/${department.id}`);
            }}
          >
            <td className="w250">{department.name}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="departments" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Наименование отдела</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
}

export default Departments;
