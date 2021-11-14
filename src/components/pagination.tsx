import { useCallback } from 'react';

interface PaginationProperties {
  currentPage: number;
  lastPage: number;
  setter: (value: number) => void;
}

interface ItemProperties {
  check: boolean;
  ellipsis?: boolean;
  index: number;
  link?: number;
  current: number;
  setter: (value: number) => void;
}

const Item = ({ check, index, link, ellipsis, current, setter }: ItemProperties) =>
  check ? (
    <li key={`li${index}`}>
      {ellipsis ? (
        <span className="pagination-ellipsis">&hellip;</span>
      ) : (
        <a
          className={link === current ? 'pagination-link is-current' : 'pagination-link'}
          href="#item"
          onClick={link === current || !link ? undefined : (): void => setter(link)}
        >
          {link}
        </a>
      )}
    </li>
  ) : null;

Item.defaultProps = {
  ellipsis: false,
  link: undefined,
};

export const Pagination = ({ currentPage, lastPage, setter }: PaginationProperties) => {
  const navClasses = `pagination is-rounded is-centered`;

  const Previous = useCallback(
    () =>
      currentPage > 1 ? (
        <a
          className="pagination-previous"
          href="#prev"
          key="PaginationPrev"
          onClick={(): void => setter(currentPage - 1)}
        >
          Назад
        </a>
      ) : (
        <button type="button" className="pagination-previous" disabled>
          Назад
        </button>
      ),
    [currentPage, setter],
  );

  const Next = useCallback(
    () =>
      currentPage < lastPage ? (
        <a className="pagination-next" href="#next" key="PaginationNext" onClick={(): void => setter(currentPage + 1)}>
          Далее
        </a>
      ) : (
        <button type="button" className="pagination-next" disabled>
          Далее
        </button>
      ),
    [currentPage, lastPage, setter],
  );

  return (
    <nav className={navClasses} key="pagination" role="navigation" aria-label="pagination">
      <Previous />
      <Next />
      <ul className="pagination-list" key="ul">
        <Item check={currentPage > 1} index={1} link={1} current={currentPage} setter={setter} />
        <Item check={currentPage > 3} index={2} ellipsis current={currentPage} setter={setter} />
        <Item check={currentPage > 2} index={3} link={currentPage - 1} current={currentPage} setter={setter} />
        <Item check index={4} link={currentPage} current={currentPage} setter={setter} />
        <Item
          check={currentPage < lastPage - 1}
          index={5}
          link={currentPage + 1}
          current={currentPage}
          setter={setter}
        />
        <Item check={currentPage < lastPage - 2} index={6} ellipsis current={currentPage} setter={setter} />
        <Item check={currentPage < lastPage} index={7} link={lastPage} current={currentPage} setter={setter} />
      </ul>
    </nav>
  );
};

export default Pagination;
