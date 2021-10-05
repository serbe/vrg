import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { checkUser, useAuthState, useSign } from '~/services/auth';
import { Router } from '~/services/router';

function Main() {
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

  return <BrowserRouter>{state.state === 'UNKNOWN' ? <Initializаtion /> : <Router />} </BrowserRouter>
}

export default Main
