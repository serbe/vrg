import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from '~/components/header'

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>

const IndexScreen = lazy(() => import('~/screens/Index'))
const Page404Screen = lazy(() => import('~/screens/404'))

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Header />
          <Route exact path="/">
            <IndexScreen />
          </Route>
          <Route path="*">
            <Page404Screen />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
