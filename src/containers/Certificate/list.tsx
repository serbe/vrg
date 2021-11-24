import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { CertificateList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Certificates = function (): JSX.Element {
  const navigate = useNavigate();
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
            <td
              className="link nowrap"
              onClick={(): void => {
                navigate(`/certificates/${certificate.id}`);
              }}
              role="gridcell"
            >
              {certificate.num}
            </td>
            <td
              className="link"
              onClick={(): void => {
                navigate(`/contacts/${certificate.contact_id ?? 0}`);
              }}
              role="gridcell"
            >
              {certificate.contact_name}
            </td>
            <td
              className="is-hidden-mobile link"
              onClick={(): void => {
                navigate(`/companies/${certificate.company_id ?? 0}`);
              }}
              role="gridcell"
            >
              {certificate.company_name}
            </td>
            <td className="nowrap">{certificate.cert_date}</td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

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
};

export default Certificates;
