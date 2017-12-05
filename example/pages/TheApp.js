import { Component, Router, Route } from '../../src/index.js'

import { Dashboard } from './Dashboard.js'
import { ItemList } from './ItemList.js'
import { ItemListItem } from './ItemListItem.js'

const RouterView = new Router([
  new Route('/', Dashboard, { exact: true }),
  new Route('/items', ItemList, { exact: true }),
  new Route('/items/*', ItemListItem),
])

export class App extends Component {
  render() {
    return this.html`
      <div id="App">
        <nav>
          <ul>
            <li>${Router.link('/', 'Dashboard')}</li>
            <li>${Router.link('/items', 'Items')}</li>
          </ul>
        </nav>
        ${RouterView}
      </div>
    `
  }
}
