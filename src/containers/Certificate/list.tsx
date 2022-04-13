import { useCallback, useState } from 'react';
import { Bar, Data } from '../../components/table';
import type { CertificateList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export function Certificates(): JSX.Element {
  const [data] = GetList('CertificateList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): CertificateList[] => paginationData();
    return (
      <>
        {tableData().map((certificate) => (
          <tr key={`tr${certificate.id}`}>
            <td className="nowrap" role="gridcell">
              <a href={`/certificates/${certificate.id}`} className="has-text-black">
                {certificate.num}
              </a>
            </td>
            <td role="gridcell">
              <a href={`/contacts/${certificate.contact_id ?? 0}`} className="has-text-black">
                {certificate.contact_name}
              </a>
            </td>
            <td className="is-hidden-mobile" role="gridcell">
              <a href={`/companies/${certificate.company_id ?? 0}`} className="has-text-black">
                {certificate.company_name}
              </a>
            </td>
            <td className="nowrap">{certificate.cert_date}</td>
          </tr>
        ))}
      </>
    );
  }, [paginationData]);

  return (
    <>
      <Bar name="certificates" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Номер</th>
            <th>Фамилия Имя Отчество</th>
            <th className="is-hidden-mobile">Учебно-методический центр</th>
            <th>Дата</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
}

export default Certificates;
