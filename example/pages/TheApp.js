import { Component, Router } from '../../src/index.js'

export class App extends Component {
  render() {
    return this.html`
      <div id="App">
        <nav>
          <ul>
            <li>${Router.link({ name: 'Dashboard' }, 'Dashboard')}</li>
            <li>${Router.link({ name: 'ItemList' }, 'Items')}</li>
          </ul>
        </nav>
        ${Router.view(this)}
      </div>
    `
  }
}
