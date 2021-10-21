import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Bar, Data } from '../../components/table'
import { DepartmentList } from '../../models/department'
import { GetList } from '../../services/fetcher'

export const Departments = () => {
  const history = useHistory()
  const [data] = GetList('DepartmentList')
  const [search, setSearch] = useState('')

  const { paginationData, Paginate } = Data({
    data,
    search,
  })

  const Body = useCallback(() => {
    const tableData = (): DepartmentList[] => paginationData()
    return (
      <>
        {tableData().map(department => (
          <tr
            key={`tr${department.id}`}
            onClick={(): void => history.push(`/departments/${department.id}`)}
            role="gridcell"
            className="link"
          >
            <td className="w250">{department.name}</td>
          </tr>
        ))}
      </>
    )
  }, [history, paginationData])

  return (
    <>
      <Bar value={search} setter={setSearch} name="departments" />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th className="w250">Наименование отдела</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  )
}

export default Departments
