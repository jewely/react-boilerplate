import React from 'react'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import AsyncComponent from './asyncComponent'

import system from './system'

const history = createHistory()

const Home = AsyncComponent(() =>
  import(/* webpackChunkName: "home" */ './components/artists/ArtistCreate')
)
const NotFound = AsyncComponent(() =>
  import(/* webpackChunkName: "upload_frozen_phone" */ './components/NotFound')
)
const ArtistMain = AsyncComponent(() =>
  import(/* webpackChunkName: "upload_frozen_phone" */ './components/artists/ArtistCreate')
)

const rootRoute = {
  path: '/',
  component: Home,
  indexRoute: { component: ArtistMain },
  childRoutes: [
    system,
    {
      path: '*',
      component: NotFound,
    },
  ],
}

export default <Router history={history} routes={rootRoute} />
