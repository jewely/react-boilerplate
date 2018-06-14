import AsyncComponent from './asyncComponent'

const ArtistCreate = AsyncComponent(() =>
  import(/* webpackChunkName: "upload_frozen_phone" */ './components/artists/ArtistCreate')
)

export default {
  path: 'artists/new',
  component: ArtistCreate,
  childRoutes: [],
}
