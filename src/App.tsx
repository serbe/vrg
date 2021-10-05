import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, checkUser, useAuthState, useSign } from '~/services/auth';

import { NavBar } from './components/navbar';
import { Router } from './components/routes';

const Main = () => {
  const { signIn, signOut } = useSign()
  const { state } = useAuthState()
  useEffect(() => {
    checkUser()
      .then(user => {
        if (user.token !== '') signIn(user)
        else signOut()
      })
      .catch(() => signOut())
  }, [])

  const Initializаtion = () => {
    return <p className="p-4 w-full h-full text-center">Initializаtion...</p>
  }

  return (
    <BrowserRouter>
      {state.state === 'UNKNOWN' ? (
        <Initializаtion />
      ) : (
        <>
          <NavBar />
          <div className="container px-4 py-4">
            {' '}
            <Router />{' '}
          </div>
        </>
      )}{' '}
    </BrowserRouter>
  )
}

export default Main

export const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </HelmetProvider>
  )
}
