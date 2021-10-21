/* eslint-disable unicorn/filename-case */
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components/navbar'
import { Router } from './components/routes'
import { AuthProvider, checkUser, useAuthState, useSign } from './services/auth'

const Main = () => {
  const { signIn, signOut } = useSign()
  const { state } = useAuthState()
  useEffect(() => {
    checkUser()
      .then(user => {
        if (user.token !== '') return signIn(user)
        return signOut()
      })
      .catch(() => signOut())
  }, [signIn, signOut])

  const Initializаtion = () => <p className="p-4 w-full h-full text-center">Initializаtion...</p>

  return (
    <BrowserRouter>
      {state.state === 'UNKNOWN' ? (
        <Initializаtion />
      ) : (
        <div className="">
          <NavBar />
          <div className="px-4 py-4">
            <Router />
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}

export default Main

export const App = () => (
  <AuthProvider>
    <Main />
  </AuthProvider>
)
