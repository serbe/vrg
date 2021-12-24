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

const Item = ({ check, index, link, ellipsis, current, setter }: ItemProperties): JSX.Element | null => {
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
  const Li = (): JSX.Element => (ellipsis ? Ellipsis : Link);

  return check ? (
    <li key={`li${index}`}>
      <Li />
    </li>
  ) : null;
};

Item.defaultProps = {
  ellipsis: false,
  link: undefined,
};

export const Pagination = ({ currentPage, lastPage, setter }: PaginationProperties): JSX.Element => {
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
        <Item check={currentPage > 1} current={currentPage} index={1} link={1} setter={setter} />
        <Item ellipsis check={currentPage > 3} current={currentPage} index={2} setter={setter} />
        <Item check={currentPage > 2} current={currentPage} index={3} link={currentPage - 1} setter={setter} />
        <Item check current={currentPage} index={4} link={currentPage} setter={setter} />
        <Item
          check={currentPage < lastPage - 1}
          current={currentPage}
          index={5}
          link={currentPage + 1}
          setter={setter}
        />
        <Item ellipsis check={currentPage < lastPage - 2} current={currentPage} index={6} setter={setter} />
        <Item check={currentPage < lastPage} current={currentPage} index={7} link={lastPage} setter={setter} />
      </ul>
    </nav>
  );
};

export default Pagination;
