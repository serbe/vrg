import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import type { PostList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Posts = (): JSX.Element => {
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
            className="link"
            key={`tr${post.id}`}
            onClick={(): void => {
              navigate(`/posts/${post.id}`);
            }}
            role="gridcell"
          >
            <td>{post.name}</td>
            <td className="w9">
              <input checked={post.go} readOnly type="checkbox" />
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
};
