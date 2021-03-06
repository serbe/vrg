import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { PostList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export function Posts(): JSX.Element {
  const navigate = useNavigate();
  const [data] = GetList('PostList');
  const [search, setSearch] = useState('');

  const { paginationData, Paginate } = Data({
    data,
    search,
  });

  const Body = useCallback(() => {
    const tableData = (): PostList[] => paginationData();
    return (
      <>
        {tableData().map((post) => (
          <tr
            key={`tr${post.id}`}
            className="link"
            role="gridcell"
            onClick={(): void => {
              navigate(`/posts/${post.id}`);
            }}
          >
            <td>{post.name}</td>
            <td className="w9">
              <input readOnly checked={post.go} type="checkbox" />
            </td>
          </tr>
        ))}
      </>
    );
  }, [navigate, paginationData]);

  return (
    <>
      <Bar name="posts" setter={setSearch} value={search} />
      <table className="table is-narrow is-fullwidth">
        <tbody>
          <tr>
            <th>Наименование должности</th>
            <th className="w9">ГО</th>
          </tr>
          <Body />
        </tbody>
      </table>
      {Paginate}
    </>
  );
}

export default Posts;
