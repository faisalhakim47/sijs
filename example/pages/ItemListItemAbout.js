import { Component } from '../../src/index.js'

export class ItemListItemAbout extends Component {
  constructor(id) {
    this.id = parseInt(id, 10)
  }

  render() {
    return this.html`
      <p>ItemListItemAbout</p>
    `
  }
}