import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '~/services/auth';

import { Bar, Data } from '../../components/table';
import { SirenTypeList } from '../../models/sirentype';
import { GetList } from '../../services/fetcher';

/* eslint-disable camelcase */
export const SirenTypes = () => {
  const { token } = useToken()
  const history = useHistory()
  const data = GetList('SirenTypeList', token)
  const [search, setSearch] = useState('')

  const [paginationData, Paginate] = Data({
    data,
    search,
  })

  const tableData = (): SirenTypeList[] => {
    return paginationData()
  }

  const Body = () => (
    <>
      {tableData().map(siren_type => (
        <tr
          key={`tr${siren_type.id}`}
          onClick={(): void => history.push(`/sirentypes/${siren_type.id}`)}
          role="gridcell"
          className="link"
        >
          <td>{siren_type.name}</td>
          <td>{siren_type.radius}</td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <Bar value={search} setter={setSearch} name="sirentypes" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Тип сирены</th>
            <th>Радиус действия</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  )
}
