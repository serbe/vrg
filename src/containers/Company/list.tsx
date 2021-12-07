import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { CompanyList } from '../../models/types';
import { GetList } from '../../services/fetcher';
import { splitNumbers, splitStrings } from '../../services/utils';

export const Companies = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('CompanyList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): CompanyList[] => paginationData();
    return (
      <>
        {tableData().map((company) => (
          <tr key={`tr${company.id}`}>
            <td
              className="w250 link"
              role="gridcell"
              onClick={(): void => {
                navigate(`/companies/${company.id}`);
              }}
            >
              {company.name}
            </td>
            <td className="is-hidden-touch w250">{company.address}</td>
            <td className="is-hidden-mobile w250">{company.scope_name}</td>
            <td className="w95">{splitNumbers(company.phones)}</td>
            <td className="is-hidden-touch w95">{splitNumbers(company.faxes)}</td>
            <td className="is-hidden-touch is-hidden-desktop-only w95">{splitStrings(company.practices)}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="companies" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Наименование</th>
            <th className="is-hidden-touch w250">Адрес</th>
            <th className="is-hidden-mobile w250">Сфера деятельности</th>
            <th className="w95">Телефоны</th>
            <th className="is-hidden-touch w95">Факсы</th>
            <th className="is-hidden-touch is-hidden-desktop-only w95">Тренировки</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};

export default Companies;
