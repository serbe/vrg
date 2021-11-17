import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { EducationList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Educations = (): JSX.Element => {
  const navigate = useNavigate();
  const [data] = GetList('EducationList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): EducationList[] => paginationData();
    return (
      <>
        {tableData().map((education) => (
          <tr
            className="link"
            key={`tr${education.id}`}
            onClick={(): void => {
              navigate(`/educations/${education.id}`);
            }}
            role="gridcell"
          >
            <td>{education.contact_name}</td>
            <td className="is-hidden-mobile">{education.post_name}</td>
            <td>{education.start_str}</td>
            <td className="is-hidden-mobile">{education.end_str}</td>
          </tr>
        ))}
      </>
    );
  }, [history, paginationData]);

  return (
    <>
      <Bar name="educations" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Полное имя обучаемого</th>
            <th className="is-hidden-mobile">Должность ГО ЧС</th>
            <th>Начало обучения</th>
            <th className="is-hidden-mobile">Конец обучения</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
};
