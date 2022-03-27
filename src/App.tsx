import { useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Router } from './components/routes';
import { Login } from './containers/Login';
import './index.scss';
import { AuthProvider, checkUser, useAuthState, useSign } from './services/auth';

function Initializаtion(): JSX.Element {
  return <p className="p-4 w-full h-full text-center">Initializаtion...</p>;
}

function Main(): JSX.Element {
  const { signIn, signOut } = useSign();
  const { state } = useAuthState();

  useEffect(() => {
    checkUser()
      .then((user) => {
        if (user.token !== '') {
          signIn(user);
          return;
        }

        signOut();
      })
      .catch(() => {
        signOut();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Content = useCallback(() => {
    if (state.state === 'UNKNOWN') {
      return <Initializаtion />;
    }

    if (state.state === 'SIGNED_IN') {
      return (
        <>
          <Navbar />
          <div className="container p-4">
            <Router />
          </div>
        </>
      );
    }

    return <Login />;
  }, [state.state]);

  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

export function App(): JSX.Element {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
