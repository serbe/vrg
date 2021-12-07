import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CertificateItem, Certificates } from '../containers/Certificate';
import { Companies, CompanyItem } from '../containers/Company';
import { ContactItem, Contacts } from '../containers/Contact';
import { DepartmentItem, Departments } from '../containers/Department';
import { EducationItem, Educations } from '../containers/Education';
import { Home } from '../containers/Home';
import { KindItem, Kinds } from '../containers/Kind';
import { Login } from '../containers/Login';
import { PostItem, Posts } from '../containers/Post';
import { PracticeItem, Practices } from '../containers/Practice';
import { RankItem, Ranks } from '../containers/Rank';
import { ScopeItem, Scopes } from '../containers/Scope';
import { SirenItem, Sirens } from '../containers/Siren';
import { SirenTypeItem, SirenTypes } from '../containers/SirenType';

interface RouterProperties {
  path: string;
  element: ReactElement;
}

const routerList: RouterProperties[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/certificates', element: <Certificates /> },
  { path: '/certificates/:id', element: <CertificateItem /> },
  { path: '/companies', element: <Companies /> },
  { path: '/companies/:id', element: <CompanyItem /> },
  { path: '/contacts', element: <Contacts /> },
  { path: '/contacts/:id', element: <ContactItem /> },
  { path: '/departments', element: <Departments /> },
  { path: '/departments/:id', element: <DepartmentItem /> },
  { path: '/educations', element: <Educations /> },
  { path: '/educations/:id', element: <EducationItem /> },
  { path: '/kinds', element: <Kinds /> },
  { path: '/kinds/:id', element: <KindItem /> },
  { path: '/posts', element: <Posts /> },
  { path: '/posts/:id', element: <PostItem /> },
  { path: '/practices', element: <Practices /> },
  { path: '/practices/:id', element: <PracticeItem /> },
  { path: '/ranks', element: <Ranks /> },
  { path: '/ranks/:id', element: <RankItem /> },
  { path: '/scopes', element: <Scopes /> },
  { path: '/scopes/:id', element: <ScopeItem /> },
  { path: '/sirens', element: <Sirens /> },
  { path: '/sirens/:id', element: <SirenItem /> },
  { path: '/sirentypes', element: <SirenTypes /> },
  { path: '/sirentypes/:id', element: <SirenTypeItem /> },
];

const Loading = (): JSX.Element => {
  return <p className="p-4 w-full h-full text-center">Loading...</p>;
};

export const Router = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routerList.map((item) => (
          <Route key={item.path} element={item.element} path={item.path} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
