
import { Route, Router, RootRoute } from '../src/index.js'

import { Dashboard } from './pages/Dashboard.js'
import { ItemList } from './pages/ItemList.js'
import { ItemListItem } from './pages/ItemListItem.js'
import { ItemListItemAbout } from './pages/ItemListItemAbout.js'
import { ItemListItemPosts } from './pages/ItemListItemPosts.js'
import { App } from './pages/TheApp.js'

setTimeout(() => {
  const start = performance.now()

  new RootRoute(
    new Route('/', 'App', App, new Router([
      new Route('/', 'Dashboard', Dashboard),
      new Route('/items', 'ItemList', ItemList),
      new Route('/items/*', 'ItemListitem', ItemListItem, new Router([
        new Route('/', 'ItemListItemAbout', ItemListItemAbout),
        new Route('/posts', 'ItemListItemPosts', ItemListItemPosts),
      ])),
    ]))
  ).mount(document.getElementById('app'))

  console.log(performance.now() - start)

}, 500)
