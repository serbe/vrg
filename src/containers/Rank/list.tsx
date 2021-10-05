import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '~/services/auth';

import { Bar, Data } from '../../components/table';
import { RankList } from '../../models/rank';
import { GetList } from '../../services/fetcher';

export const Ranks = () => {
  const { token } = useToken()
  const history = useHistory()
  const data = GetList('RankList', token)
  const [search, setSearch] = useState('')

  const [paginationData, Paginate] = Data({
    data,
    search,
  })

  const tableData = (): RankList[] => {
    return paginationData()
  }

  const Body = () => (
    <>
      {tableData().map(rank => (
        <tr
          key={`tr${rank.id}`}
          onClick={(): void => history.push(`/ranks/${rank.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{rank.name}</td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <Bar value={search} setter={setSearch} name="ranks" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Наименование чина</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  )
}
