import { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { NavBar } from '~/components/navbar';

import { useAuthState } from './auth';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>

const Index = lazy(() => import('~/screens/Index'))
const Page404Screen = lazy(() => import('~/screens/404'))
const Login = lazy(() => import('~/containers/Login'))

export const Router = () => {
  const { state } = useAuthState()
  const history = useHistory()

  useEffect(() => {
    if (state.state === 'SIGNED_OUT') history.push('/login')
  }, [state.state])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <NavBar />
        <main className="flex flex-col min-h-screen">
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route path="*">
            <Page404Screen />
          </Route>
        </main>
      </Switch>
    </Suspense>
  )
}
