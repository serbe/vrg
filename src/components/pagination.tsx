import { useCallback } from 'react';

interface PaginationProperties {
  currentPage: number;
  lastPage: number;
  setter: (page: number) => void;
}

interface ItemProperties {
  check: boolean;
  ellipsis?: boolean;
  index: number;
  link?: number;
  current: number;
  setter: (page: number) => void;
}

const Item = function ({ check, index, link, ellipsis, current, setter }: ItemProperties): JSX.Element | null {
  return check ? (
    <li key={`li${index}`}>
      {ellipsis ?? false ? (
        <span className="pagination-ellipsis">&hellip;</span>
      ) : (
        <a
          className={link === current ? 'pagination-link is-current' : 'pagination-link'}
          href="#item"
          onClick={(): void => {
            if (link === current) setter(link);
          }}
        >
          {link}
        </a>
      )}
    </li>
  ) : null;
};

Item.defaultProps = {
  ellipsis: false,
  link: undefined,
};

export const Pagination = function ({ currentPage, lastPage, setter }: PaginationProperties): JSX.Element {
  const navClasses = `pagination is-rounded is-centered`;

  const Previous = useCallback(
    () =>
      currentPage > 1 ? (
        <a
          className="pagination-previous"
          href="#prev"
          key="PaginationPrev"
          onClick={(): void => {
            setter(currentPage - 1);
          }}
        >
          Назад
        </a>
      ) : (
        <button className="pagination-previous" disabled type="button">
          Назад
        </button>
      ),
    [currentPage, setter],
  );

  const Next = useCallback(
    () =>
      currentPage < lastPage ? (
        <a
          className="pagination-next"
          href="#next"
          key="PaginationNext"
          onClick={(): void => {
            setter(currentPage + 1);
          }}
        >
          Далее
        </a>
      ) : (
        <button className="pagination-next" disabled type="button">
          Далее
        </button>
      ),
    [currentPage, lastPage, setter],
  );

  return (
    <nav aria-label="pagination" className={navClasses} key="pagination" role="navigation">
      <Previous />
      <Next />
      <ul className="pagination-list" key="ul">
        <Item check={currentPage > 1} current={currentPage} index={1} link={1} setter={setter} />
        <Item check={currentPage > 3} current={currentPage} ellipsis index={2} setter={setter} />
        <Item check={currentPage > 2} current={currentPage} index={3} link={currentPage - 1} setter={setter} />
        <Item check current={currentPage} index={4} link={currentPage} setter={setter} />
        <Item
          check={currentPage < lastPage - 1}
          current={currentPage}
          index={5}
          link={currentPage + 1}
          setter={setter}
        />
        <Item check={currentPage < lastPage - 2} current={currentPage} ellipsis index={6} setter={setter} />
        <Item check={currentPage < lastPage} current={currentPage} index={7} link={lastPage} setter={setter} />
      </ul>
    </nav>
  );
};

export default Pagination;
