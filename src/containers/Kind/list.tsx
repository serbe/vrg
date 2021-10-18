import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Bar, Data } from '../../components/table';
import { KindList } from '../../models/kind';
import { GetList } from '../../services/fetcher';

export const Kinds = () => {
  const history = useHistory()
  const data = GetList('KindList')
  const [search, setSearch] = useState('')

  const { paginationData, Paginate } = Data({
    data,
    search,
  })

  const tableData = (): KindList[] => paginationData()

  const Body = () => (
    <>
      {tableData().map(kind => (
        <tr
          key={`tr${kind.id}`}
          onClick={(): void => history.push(`/kinds/${kind.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{kind.name}</td>
          <td className="w250">{kind.short_name}</td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <Bar value={search} setter={setSearch} name="kinds" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Тип тренировки</th>
            <th>Сокращенное наименование</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  )
}
