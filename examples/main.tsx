import { Component } from '../lib/common'
import { PageView } from './view-page/index'

export class App extends Component {
  render(e) {
    return <body><div id="app">{PageView}</div></body>
  }
}
