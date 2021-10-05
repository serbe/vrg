import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '~/services/auth';

import { Bar, Data } from '../../components/table';
import { ScopeList } from '../../models/scope';
import { GetList } from '../../services/fetcher';

export const Scopes = () => {
  const { token } = useToken()
  const history = useHistory()
  const data = GetList('ScopeList', token)
  const [search, setSearch] = useState('')

  const [paginationData, Paginate] = Data({
    data,
    search,
  })

  const tableData = (): ScopeList[] => {
    return paginationData()
  }

  const Body = () => (
    <>
      {tableData().map(scope => (
        <tr
          key={`tr${scope.id}`}
          onClick={(): void => history.push(`/scopes/${scope.id}`)}
          role="gridcell"
          className="link"
        >
          <td className="w250">{scope.name}</td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <Bar value={search} setter={setSearch} name="scopes" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Сфера деятельности</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  )
}
