import { useCallback } from 'react';

type PaginationProperties = {
  currentPage: number;
  lastPage: number;
  setter: (page: number) => void;
};

type ItemProperties = {
  isCheck: boolean;
  isEllipsis?: boolean;
  index: number;
  link?: number;
  current: number;
  setter: (page: number) => void;
};

function Item({ isCheck, index, link, isEllipsis, current, setter }: ItemProperties): JSX.Element {
  const Ellipsis = <span className="pagination-ellipsis">&hellip;</span>;
  const Link = (
    <a
      className={link === current ? 'pagination-link is-current' : 'pagination-link'}
      href={`#${link ?? 1}`}
      onClick={(): void => {
        if (link && link !== current) setter(link);
      }}
    >
      {link}
    </a>
  );
  function Li(): JSX.Element {
    return isEllipsis ? Ellipsis : Link;
  }

  return isCheck ? (
    <li key={`li${index}`}>
      <Li />
    </li>
  ) : (
    <></>
  );
}

Item.defaultProps = {
  isEllipsis: false,
  link: undefined,
};

export function Pagination({ currentPage, lastPage, setter }: PaginationProperties): JSX.Element {
  const navClasses = `pagination is-rounded is-centered`;

  const Previous = useCallback(
    () =>
      currentPage > 1 ? (
        <a
          key="PaginationPrev"
          className="pagination-previous"
          href={`#${currentPage - 1}`}
          onClick={(): void => {
            setter(currentPage - 1);
          }}
        >
          Назад
        </a>
      ) : (
        <button disabled className="pagination-previous" type="button">
          Назад
        </button>
      ),
    [currentPage, setter],
  );

  const Next = useCallback(
    () =>
      currentPage < lastPage ? (
        <a
          key="PaginationNext"
          className="pagination-next"
          href={`#${currentPage + 1}`}
          onClick={(): void => {
            setter(currentPage + 1);
          }}
        >
          Далее
        </a>
      ) : (
        <button disabled className="pagination-next" type="button">
          Далее
        </button>
      ),
    [currentPage, lastPage, setter],
  );

  return (
    <nav key="pagination" aria-label="pagination" className={navClasses} role="navigation">
      <Previous />
      <Next />
      <ul key="ul" className="pagination-list">
        <Item isCheck={currentPage > 1} current={currentPage} index={1} link={1} setter={setter} />
        <Item isEllipsis isCheck={currentPage > 3} current={currentPage} index={2} setter={setter} />
        <Item isCheck={currentPage > 2} current={currentPage} index={3} link={currentPage - 1} setter={setter} />
        <Item isCheck current={currentPage} index={4} link={currentPage} setter={setter} />
        <Item
          isCheck={currentPage < lastPage - 1}
          current={currentPage}
          index={5}
          link={currentPage + 1}
          setter={setter}
        />
        <Item isEllipsis isCheck={currentPage < lastPage - 2} current={currentPage} index={6} setter={setter} />
        <Item isCheck={currentPage < lastPage} current={currentPage} index={7} link={lastPage} setter={setter} />
      </ul>
    </nav>
  );
}

export default Pagination;
