import { Component, Router } from '../../src/index.js'

export class ItemListItem extends Component {
  constructor(id) {
    this.id = parseInt(id, 10)
  }

  render() {
    return this.html`
      <div id="item-list-item">
        ${Router.link({
          name: 'ItemListItemAbout',
          params: { id: this.id }
        }, 'About')}
        ${Router.link({
          name: 'ItemListItemPosts',
          params: { id: this.id }
        }, 'Posts')}
        <p>${Router.view(this)}</p>
      </div>
    `
  }
}
