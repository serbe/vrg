import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/nb';
// import { Router } from './components/routes';
import { AuthProvider, checkUser, useAuthState, useSign } from './services/auth';

const Initializаtion = () => <p className="p-4 w-full h-full text-center">Initializаtion...</p>;

const Main = () => {
  const { signIn, signOut } = useSign();
  const { state } = useAuthState();
  useEffect(() => {
    checkUser()
      .then((user) => {
        if (user.token !== '') return signIn(user);
        return signOut();
      })
      .catch(() => signOut());
  }, [signIn, signOut]);

  return (
    <BrowserRouter>
      {state.state === 'UNKNOWN' ? (
        <Initializаtion />
      ) : (
        <div className="">
          <Navbar />
          <div className="px-4 py-4">{/* <Router /> */}</div>
        </div>
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
