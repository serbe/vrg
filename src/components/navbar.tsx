import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { User } from '../models/types';
import { useAuthState, useSign } from '../services/auth';
import { Button } from './button';

interface Setter {
  setter: Dispatch<SetStateAction<boolean>>;
}

interface OpenState {
  open: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}

const mainItems = [
  { link: '/contacts', name: 'Контакты' },
  { link: '/companies', name: 'Организации' },
  { link: '/sirens', name: 'Сирены' },
];

const dropdownItems = [
  { link: '/departments', name: 'Отделы' },
  { link: '/educations', name: 'Обучение' },
  { link: '/kinds', name: 'Типы тренировок' },
  { link: '/posts', name: 'Должности' },
  { link: '/practices', name: 'Учения' },
  { link: '/ranks', name: 'Чины' },
  { link: '/scopes', name: 'Сферы' },
  { link: '/certificates', name: 'Удостоверения' },
  { link: '/sirentypes', name: 'Типы сирен' },
];

const NavbarNotLogged = (): JSX.Element => (
  <nav className="navbar is-dark" role="navigation">
    <div className="navbar-brand">
      <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
        Авторизация
      </NavLink>
    </div>
  </nav>
);

const MainItems = ({ setter }: Setter): JSX.Element => (
  <>
    {mainItems.map((item) => (
      <NavLink
        className="navbar-item"
        key={`main-items-${item.name}`}
        onClick={(): void => {
          setter(false);
        }}
        to={item.link}
      >
        {item.name}
      </NavLink>
    ))}
  </>
);

const NavbarDropdown = ({ setter }: Setter): JSX.Element => (
  <div className="navbar-dropdown" key="navbar-dropdown">
    {dropdownItems.map((item) => (
      <NavLink
        className="navbar-item"
        key={`navbar-dropdown-${item.name}`}
        onClick={(): void => {
          setter(false);
        }}
        to={item.link}
      >
        {item.name}
      </NavLink>
    ))}
  </div>
);

const NavBarStart = ({ setter }: Setter): JSX.Element => (
  <div className="navbar-start" key="navbar-start">
    <MainItems setter={setter} />
    <div className="navbar-item has-dropdown is-hoverable" key="dropdown-items">
      <a className="navbar-link" href="#directory">
        Справочники
      </a>
      <NavbarDropdown setter={setter} />
    </div>
  </div>
);

const NavbarEnd = ({ user }: { user: User }): JSX.Element => {
  const { signOut } = useSign();
  return (
    <div className="navbar-end" key="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link" href="#user">
          {user.name}
        </a>
        <div className="navbar-dropdown is-right">
          <div className="navbar-item">
            <Button
              className="is-link"
              onClick={(): void => {
                signOut();
              }}
            >
              Выход
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandBar = ({ open, setter }: OpenState): JSX.Element => (
  <>
    <NavLink className="navbar-item" to="/">
      ЕДДС
    </NavLink>
    <a
      aria-expanded="false"
      aria-label="menu"
      className={open ? 'navbar-burger is-active' : 'navbar-burger'}
      data-target="navbarData"
      href="#button"
      onClick={(): void => {
        setter(!open);
      }}
      role="button"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </>
);

export const Navbar = (): JSX.Element => {
  // const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);
  const { state } = useAuthState();
  const [open, setOpen] = useState(false);

  const divClass = (): string => (open ? 'navbar-menu is-active' : 'navbar-menu');

  return state.state === 'SIGNED_IN' ? (
    <nav aria-label="dropdown navigation" className="navbar is-dark" role="navigation">
      <div className="container px-4">
        <div className="navbar-brand">
          <BrandBar open={open} setter={setOpen} />
        </div>
        <div className={divClass()} id="navbarData">
          <NavBarStart setter={setOpen} />
          <NavbarEnd user={state.currentUser} />
        </div>
      </div>
    </nav>
  ) : (
    <NavbarNotLogged />
  );
};
