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

function NavbarNotLogged(): JSX.Element {
  return (
    <nav className="navbar is-dark" role="navigation">
      <div className="navbar-brand">
        <NavLink key="NavbarNotLogged" className="navbar-item" to="/login">
          Авторизация
        </NavLink>
      </div>
    </nav>
  );
}

function MainItems({ setter }: Setter): JSX.Element {
  return (
    <>
      {mainItems.map((item) => (
        <NavLink
          key={`main-items-${item.name}`}
          className="navbar-item"
          to={item.link}
          onClick={(): void => {
            setter(false);
          }}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
}

function NavbarDropdown({ setter }: Setter): JSX.Element {
  return (
    <div key="navbar-dropdown" className="navbar-dropdown">
      {dropdownItems.map((item) => (
        <NavLink
          key={`navbar-dropdown-${item.name}`}
          className="navbar-item"
          to={item.link}
          onClick={(): void => {
            setter(false);
          }}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

function NavBarStart({ setter }: Setter): JSX.Element {
  return (
    <div className="navbar-start">
      <MainItems setter={setter} />
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link" href="#directory">
          Справочники
        </a>
        <NavbarDropdown setter={setter} />
      </div>
    </div>
  );
}

function NavbarEnd({ user }: { user: User }): JSX.Element {
  const { signOut } = useSign();
  return (
    <div className="navbar-end">
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
}

function BrandBar({ open, setter }: OpenState): JSX.Element {
  return (
    <div className="navbar-brand">
      <NavLink className="navbar-item" to="/">
        ЕДДС
      </NavLink>
      <a
        aria-expanded="false"
        aria-label="menu"
        className={open ? 'navbar-burger is-active' : 'navbar-burger'}
        data-target="navbarData"
        href="#button"
        role="button"
        onClick={(): void => {
          setter(!open);
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
  );
}

export function Navbar(): JSX.Element {
  // Const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);
  const { state } = useAuthState();
  const [open, setOpen] = useState(false);

  const divClass = (): string => (open ? 'navbar-menu is-active' : 'navbar-menu');

  return state.state === 'SIGNED_IN' ? (
    <nav aria-label="main navigation" className="navbar is-dark" role="navigation">
      <div className="container px-4">
        <BrandBar open={open} setter={setOpen} />
        <div className={divClass()} id="navbarData">
          <NavBarStart setter={setOpen} />
          <NavbarEnd user={state.currentUser} />
        </div>
      </div>
    </nav>
  ) : (
    <NavbarNotLogged />
  );
}

export default Navbar;
