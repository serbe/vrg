import { Table, Tbody, Td, Th, Tr } from '@chakra-ui/react';
import { ReactNode, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import { CertificateList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Certificates = () => {
  const navigate = useNavigate();
  const [data] = GetList('CertificateList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(
    ({ children }: { children: ReactNode }) => {
      const tableData = (): CertificateList[] => paginationData();
      return (
        <Tbody>
          {children}
          {tableData().map((certificate) => (
            <Tr key={`tr${certificate.id}`}>
              <Td onClick={(): void => navigate(`/certificates/${certificate.id}`)} className="link nowrap">
                {certificate.num}
              </Td>
              <Td onClick={(): void => navigate(`/contacts/${certificate.contact_id || 0}`)} className="link">
                {certificate.contact_name}
              </Td>
              <Td
                onClick={(): void => navigate(`/companies/${certificate.company_id || 0}`)}
                className="link"
                display={{ base: 'none', lg: 'table-cell' }}
              >
                {certificate.company_name}
              </Td>
              <Td className="nowrap">{certificate.cert_date}</Td>
            </Tr>
          ))}
        </Tbody>
      );
    },
    [history, paginationData],
  );

  return (
    <>
      <Bar value={search} setter={setSearch} name="certificates" />
      <Table size="sm">
        <Body>
          <Tr>
            <Th>Номер</Th>
            <Th>Фамилия Имя Отчество</Th>
            <Th display={{ base: 'none', lg: 'table-cell' }}>Учебно-методический центр</Th>
            <Th>Дата</Th>
          </Tr>
        </Body>
      </Table>
      {Paginate}
    </>
  );
};

export default Certificates;
