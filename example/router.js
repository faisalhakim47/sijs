import { Router, Route } from '../src/index.js'

import { Dashboard } from './pages/Dashboard.js'
import { ItemList } from './pages/ItemList.js'
import { ItemListItem } from './pages/ItemListItem.js'

const itemListItemRouter = new Router([

])

export const RootRouter = new Router([
  new Route('/', 'Dashboard', Dashboard),
  new Route('/items', 'ItemList', ItemList),
  new Route('/items/*', 'ItemListitem', ItemListItem, itemListItemRouter),
])
