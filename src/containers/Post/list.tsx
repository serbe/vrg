import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Data } from '../../components/table';
import { PostList } from '../../models/types';
import { GetList } from '../../services/fetcher';

export const Posts = () => {
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
          <tr key={`tr${post.id}`} onClick={(): void => navigate(`/posts/${post.id}`)} role="gridcell" className="link">
            <td>{post.name}</td>
            <td className="w9">
              <input type="checkbox" checked={post.go} readOnly />
            </td>
          </tr>
        ))}
      </>
    );
  }, [history, paginationData]);

  return (
    <>
      <Bar value={search} setter={setSearch} name="posts" />
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

export default Posts;
