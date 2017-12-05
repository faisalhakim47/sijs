import { Component } from '../../src/index.js'

export class ItemListItemAbout extends Component {
  constructor(id) {
    super()
    this.id = parseInt(id, 10)
  }

  render() {
    return this.html`
      <p>ItemListItemAbout</p>
    `
  }
}
