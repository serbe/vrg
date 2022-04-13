import { useCallback, useState } from 'react';
import { Bar, Data } from '../../components/table';
import type { DepartmentList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export function Departments(): JSX.Element {
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
          <tr key={`tr${department.id}`} role="gridcell">
            <a href={`/departments/${department.id}`} className="has-text-black">
              <td className="w250">{department.name}</td>
            </a>
          </tr>
        ))}
      </>
    );
  }, [paginationData]);

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
