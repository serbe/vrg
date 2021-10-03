import { useEffect } from 'react'
import { Router } from '~/services/router'
import { checkUser, useAuthState, useSign } from '~/services/auth'

function Main() {
  const { signIn, signOut } = useSign()
  const { state } = useAuthState()
  useEffect(() => {
    checkUser()
      .then(user => signIn(user))
      .catch(() => signOut())
  }, [])

  const Initialize = () => {
    return <div>Initialize</div>
  }

  return (
    <main>
      {state.state === 'UNKNOWN' ? <Initialize /> : <Router />}
    </main>
  )
}

export default Main
