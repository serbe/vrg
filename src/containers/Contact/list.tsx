import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { ContactList } from '../../models/types';
import { GetList } from '../../services/fetcher';
import { splitNumbers } from '../../services/utils';

export const Contacts = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('ContactList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): ContactList[] => paginationData();
    return (
      <>
        {tableData().map((contact) => (
          <tr key={`tr${contact.id}`}>
            <td
              className="w250 link"
              role="gridcell"
              onClick={(): void => {
                navigate(`/contacts/${contact.id}`);
              }}
            >
              {contact.name}
            </td>
            <td
              className="is-hidden-mobile w250 link"
              role="gridcell"
              onClick={(): void => {
                navigate(`/companies/${contact.company_id ?? 0}`);
              }}
            >
              {contact.company_name}
            </td>
            <td className="is-hidden-touch w250">{contact.post_name}</td>
            <td className="w95">{splitNumbers(contact.phones)}</td>
            <td className="is-hidden-mobile w95">{splitNumbers(contact.faxes)}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="contacts" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Фамилия Имя Отчество</th>
            <th className="is-hidden-mobile w250">Организация</th>
            <th className="is-hidden-touch w250">Должность</th>
            <th className="w95">Телефоны</th>
            <th className="is-hidden-mobile w95">Факсы</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};

export default Contacts;
