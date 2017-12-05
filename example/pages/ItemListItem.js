import { Component, Router, Route, repeat } from '../../src/index.js'

import { ItemListItemAbout } from './ItemListItemAbout.js'
import { ItemListItemPosts } from './ItemListItemPosts.js'

import { items } from '../data.js'

const RouterView = new Router([
  new Route('/', ItemListItemAbout, { exact: true }),
  new Route('/posts', ItemListItemPosts),
])

export class ItemListItem extends Component {
  constructor(id) {
    super()
    this.id = parseInt(id, 10)
    this.item = items.find((item) => item.id == id)
  }

  render() {
    return this.html`
      <div id="item-list-item">
        ${Router.link(`/items/${this.id}`, 'About')}
        ${Router.link(`/items/${this.id}/posts`, 'Posts')}
        <ul>${repeat(items,
          (item) => this.html
            `<li>${Router.link(`/items/${item.id}`, item.name)}</li>`,
          (item) => item.id.toString()
        )}</ul>
        <h1>${this.item.name}</h1>
        <p>${RouterView}</p>
      </div>
    `
  }
}
