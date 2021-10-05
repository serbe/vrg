import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '~/services/auth';

import { Bar, Data } from '../../components/table';
import { EducationList } from '../../models/education';
import { GetList } from '../../services/fetcher';

export const Educations = () => {
  const { token } = useToken()
  const history = useHistory()
  const data = GetList('EducationList', token)
  const [search, setSearch] = useState('')

  const [paginationData, Paginate] = Data({
    data,
    search,
  })

  const tableData = (): EducationList[] => {
    return paginationData()
  }

  const Body = () => (
    <>
      {tableData().map(education => (
        <tr
          key={`tr${education.id}`}
          onClick={(): void => history.push(`/educations/${education.id}`)}
          role="gridcell"
          className="link"
        >
          <td>{education.contact_name}</td>
          <td className="is-hidden-mobile">{education.post_name}</td>
          <td>{education.start_str}</td>
          <td className="is-hidden-mobile">{education.end_str}</td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <Bar value={search} setter={setSearch} name="educations" />
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
  )
}