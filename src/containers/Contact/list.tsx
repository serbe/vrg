import { useCallback, useState } from 'react';
import { Bar, Data } from '../../components/table';
import type { ContactList } from '../../models/types';
import { GetList } from '../../services/fetcher';
import { splitNumbers } from '../../services/utils';

export function Contacts(): JSX.Element {
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
            <td className="w250" role="gridcell">
              <a href={`/contacts/${contact.id}`} className="has-text-black">
                {contact.name}
              </a>
            </td>
            <td className="is-hidden-mobile w250" role="gridcell">
              <a href={`/companies/${contact.company_id ?? 0}`} className="has-text-black">
                {contact.company_name}
              </a>
            </td>
            <td className="is-hidden-touch w250">{contact.post_name}</td>
            <td className="w95 nowrap">{splitNumbers(contact.phones)}</td>
            <td className="is-hidden-mobile w95 nowrap">{splitNumbers(contact.faxes)}</td>
          </tr>
        ))}
      </>
    );
  }, [paginationData]);

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
}

export default Contacts;
