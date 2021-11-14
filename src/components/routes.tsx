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
import { useAuthState } from '../services/auth';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

// const Root = ({ login }: { login: boolean }) => (
//   <>
//     <Route path="/" element={login ? <Home /> : <Login />} />
//     <Route path="/home" element={login ? <Home /> : <Login />} />
//   </>
// );

const Certificate = ({ login }: { login: boolean }) => (
  <>
    <Route path="/certificates" element={login ? <Certificates /> : <Login />} />
    <Route path="/certificates/:id" element={login ? <CertificateItem /> : <Login />} />
  </>
);

const Company = ({ login }: { login: boolean }) => (
  <>
    <Route path="/companies" element={login ? <Companies /> : <Login />} />
    <Route path="/companies/:id" element={login ? <CompanyItem /> : <Login />} />
  </>
);

const Contact = ({ login }: { login: boolean }) => (
  <>
    <Route path="/contacts" element={login ? <Contacts /> : <Login />} />
    <Route path="/contacts/:id" element={login ? <ContactItem /> : <Login />} />
  </>
);

const Department = ({ login }: { login: boolean }) => (
  <>
    <Route path="/departments" element={login ? <Departments /> : <Login />} />
    <Route path="/departments/:id" element={login ? <DepartmentItem /> : <Login />} />
  </>
);

const Education = ({ login }: { login: boolean }) => (
  <>
    <Route path="/educations" element={login ? <Educations /> : <Login />} />
    <Route path="/educations/:id" element={login ? <EducationItem /> : <Login />} />
  </>
);

const Kind = ({ login }: { login: boolean }) => (
  <>
    <Route path="/kinds" element={login ? <Kinds /> : <Login />} />
    <Route path="/kinds/:id" element={login ? <KindItem /> : <Login />} />
  </>
);

const Post = ({ login }: { login: boolean }) => (
  <>
    <Route path="/posts" element={login ? <Posts /> : <Login />} />
    <Route path="/posts/:id" element={login ? <PostItem /> : <Login />} />
  </>
);

const Practice = ({ login }: { login: boolean }) => (
  <>
    <Route path="/practices" element={login ? <Practices /> : <Login />} />
    <Route path="/practices/:id" element={login ? <PracticeItem /> : <Login />} />
  </>
);

const Rank = ({ login }: { login: boolean }) => (
  <>
    <Route path="/ranks" element={login ? <Ranks /> : <Login />} />
    <Route path="/ranks/:id" element={login ? <RankItem /> : <Login />} />
  </>
);

const Scope = ({ login }: { login: boolean }) => (
  <>
    <Route path="/scopes" element={login ? <Scopes /> : <Login />} />
    <Route path="/scopes/:id" element={login ? <ScopeItem /> : <Login />} />
  </>
);

const Siren = ({ login }: { login: boolean }) => (
  <>
    <Route path="/sirens" element={login ? <Sirens /> : <Login />} />
    <Route path="/sirens/:id" element={login ? <SirenItem /> : <Login />} />
  </>
);

const SirenType = ({ login }: { login: boolean }) => (
  <>
    <Route path="/sirentypes" element={login ? <SirenTypes /> : <Login />} />
    <Route path="/sirentypes/:id" element={login ? <SirenTypeItem /> : <Login />} />
  </>
);

export const Router = () => {
  const { state } = useAuthState();
  const login = state.state === 'SIGNED_IN';

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={login ? <Home /> : <Login />} />
        <Route path="/home" element={login ? <Home /> : <Login />} />
        <Certificate login={login} />
        <Company login={login} />
        <Contact login={login} />
        <Department login={login} />
        <Education login={login} />
        <Kind login={login} />
        <Post login={login} />
        <Practice login={login} />
        <Rank login={login} />
        <Scope login={login} />
        <Siren login={login} />
        <SirenType login={login} />
      </Routes>
    </Suspense>
  );
};

export default Router;
