import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Router } from './components/routes';
import Login from './containers/Login';
import './index.scss';
import { AuthProvider, checkUser, useAuthState, useSign } from './services/auth';

const Initializаtion = () => <p className="p-4 w-full h-full text-center">Initializаtion...</p>;

const Main = () => {
  const { signIn, signOut } = useSign();
  const { state } = useAuthState();

  useEffect(() => {
    checkUser()
      .then((user) => {
        if (user.token !== '') return signIn(user);
        signOut();
        return;
      })
      .catch(() => signOut());
  }, []);

  return (
    <BrowserRouter>
      {state.state === 'UNKNOWN' ? (
        <Initializаtion />
      ) : state.state === 'SIGNED_IN' ? (
        <Navbar>
          <Router />
        </Navbar>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default Main;

export const App = () => (
  <AuthProvider>
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  </AuthProvider>
);
