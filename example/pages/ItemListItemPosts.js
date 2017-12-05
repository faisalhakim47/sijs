import { Component } from '../../src/index.js'

export class ItemListItemPosts extends Component {
  constructor(id) {
    super()
    this.id = parseInt(id, 10)
  }

  render() {
    return this.html`
      <p>ItemListItemPosts</p>
    `
  }
}
