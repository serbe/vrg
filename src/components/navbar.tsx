// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// import { useAuthState } from "../services/auth";
// import { Button } from "./button";

// interface Setter {
//   setter: (value: boolean) => void;
// }

// interface OpenState {
//   open: boolean;
//   setter: (value: boolean) => void;
// }

// const mainItems = [
//   { link: "/contacts", name: "Контакты" },
//   { link: "/companies", name: "Организации" },
//   { link: "/sirens", name: "Сирены" },
// ];

// const dropdownItems = [
//   { link: "/departments", name: "Отделы" },
//   { link: "/educations", name: "Обучение" },
//   { link: "/kinds", name: "Типы тренировок" },
//   { link: "/posts", name: "Должности" },
//   { link: "/practices", name: "Учения" },
//   { link: "/ranks", name: "Чины" },
//   { link: "/scopes", name: "Сферы" },
//   { link: "/certificates", name: "Удостоверения" },
//   { link: "/sirentypes", name: "Типы сирен" },
// ];

const Drawer = () => (
<div className="rounded-lg shadow bg-base-200 drawer h-16">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="flex flex-col drawer-content">
    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2">
        <span>
              Change screen size to show/hide menu
            </span>
      </div> 
      <div className="flex-none hidden lg:block">
        <ul className="menu horizontal">
          <li>
            <a className="rounded-btn">Item 1</a>
          </li> 
          <li>
            <a className="rounded-btn">Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" className="drawer-overlay" /> 
    <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
      <li>
        <a>Item 1</a>
      </li> 
      <li>
        <a>Item 2</a>
      </li>
    </ul>
  </div>
</div>
)

// const NavbarNotLogged = () => (
//   <nav className="navbar is-dark" role="navigation">
//     <div className="navbar-brand">
//       <NavLink className="navbar-item" key="NavbarNotLogged" to="/login">
//         Авторизация
//       </NavLink>
//     </div>
//   </nav>
// );

// const MainItems = (value: Setter) => (
//   <>
//     {mainItems.map((item) => (
//       <NavLink
//         activeClassName="is-active"
//         className="navbar-item"
//         to={item.link}
//         key={`main-items-${item.name}`}
//         onClick={() => value.setter(false)}
//       >
//         {item.name}
//       </NavLink>
//     ))}
//   </>
// );

// const NavbarDropdown = (value: Setter) => (
//   <div className="navbar-dropdown" key="navbar-dropdown">
//     {dropdownItems.map((item) => (
//       <NavLink
//         activeClassName="is-active"
//         className="navbar-item"
//         to={item.link}
//         key={`navbar-dropdown-${item.name}`}
//         onClick={() => value.setter(false)}
//       >
//         {item.name}
//       </NavLink>
//     ))}
//   </div>
// );

// const NavBarStart = (value: Setter) => (
//   <div className="navbar-start" key="navbar-start">
//     <MainItems setter={value.setter} />
//     <div className="navbar-item has-dropdown is-hoverable" key="dropdown-items">
//       <a href="#directory" className="navbar-link">
//         Справочники
//       </a>
//       <NavbarDropdown setter={value.setter} />
//     </div>
//   </div>
// );

// const NavbarEnd = () => {
//   const { auth, setAuth } = useAuthState();
//   return (
//     <div className="navbar-end" key="navbar-end">
//       <div className="navbar-item has-dropdown is-hoverable">
//         <a href="#user" className="navbar-link">
//           {auth.user.name}
//         </a>
//         <div className="navbar-dropdown is-right">
//           <div className="navbar-item">
//             <Button
//               className="is-link"
//               onClick={() => {
//                 setAuth({ type: "ClearAuth" });
//               }}
//             >
//               Выход
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BrandBar = ({ open, setter }: OpenState) => {
//   return (
//     <>
//       <NavLink activeClassName="is-active" className="navbar-item" exact to="/">
//         ЕДДС
//       </NavLink>
//       <a
//         aria-expanded="false"
//         aria-label="menu"
//         className={open ? "navbar-burger is-active" : "navbar-burger"}
//         data-target="navbarData"
//         role="button"
//         href="#button"
//         onClick={() => setter(!open)}
//       >
//         <span aria-hidden="true" />
//         <span aria-hidden="true" />
//         <span aria-hidden="true" />
//       </a>
//     </>
//   );
// };

// export const NavBar = () => {
//   // const openClassName = (cn: string): string => (open ? `${cn} is-active` : cn);
//   const { auth } = useAuthState();
//   const [open, setOpen] = useState(false);

//   const divClass = () => {
//     return open ? "navbar-menu is-active" : "navbar-menu";
//   };

//   return auth.user.role > 0 ? (
//     <nav
//       className="navbar is-dark"
//       role="navigation"
//       aria-label="dropdown navigation"
//     >
//       <div className="container px-4">
//         <div className="navbar-brand">
//           <BrandBar open={open} setter={setOpen} />
//         </div>
//         <div id="navbarData" className={divClass()}>
//           <NavBarStart setter={setOpen} />
//           <NavbarEnd />
//         </div>
//       </div>
//     </nav>
//   ) : (
//     <NavbarNotLogged />
//   );
// };

export const NavBar = () => (
  <Drawer />
)