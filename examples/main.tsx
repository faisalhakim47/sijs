import { Component, GlobalEvent } from '../lib/common'
import { PageView } from './view-page/index'

export class App extends Component {
  render(e) {
    GlobalEvent.emit('resetIds')
    return <body><div id="app">{PageView}</div></body>
  }
}
