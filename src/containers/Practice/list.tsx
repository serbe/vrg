import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '~/services/auth';

import { Bar, Data } from '../../components/table';
import { PracticeList } from '../../models/practice';
import { GetList } from '../../services/fetcher';

export const Practices = () => {
  const { token } = useToken()
  const history = useHistory()
  const data = GetList('PracticeList', token)
  const [search, setSearch] = useState('')

  const [paginationData, Paginate] = Data({
    data,
    search,
  })

  const tableData = (): PracticeList[] => {
    return paginationData()
  }

  const Body = () => (
    <>
      {tableData().map(practice => (
        <tr
          key={`tr${practice.id}`}
          onClick={(): void => history.push(`/practices/${practice.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="nowrap">{practice.date_str}</td>
          <td className="w250">{practice.kind_name}</td>
          <td className="w250 is-hidden-mobile">{practice.company_name}</td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <Bar value={search} setter={setSearch} name="practices" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="nowrap">Дата тренировки</th>
            <th className="w250">Тип тренировки</th>
            <th className="w250 is-hidden-mobile">Организация</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  )
}
