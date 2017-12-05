import { Component, repeat, Router } from '../../src/index.js'

import { items } from '../data.js'

export class ItemList extends Component {
  render() {
    return this.html`
      <div id="ItemList">
        <p>ItemList</p>
        <ul>${repeat(items,
        (item) => this.html
          `<li>${Router.link(`/items/${item.id}`, item.name)}</li>`,
        (item) => item.id.toString()
      )}</ul>
      </div>
    `
  }
}
