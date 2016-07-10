import { PageView } from './index'
import { Component } from '../../lib/common'

@PageView.register({
  name: 'page2'
})

export class Page2 extends Component {
  constructor() {
    super()
    this.state.set(null, {
      bool: true,
      str: 'test'
    })
  }
  render(e, state) {
    return <div>
      <input class="fa fa-facebook" model={state.get('str')}/>
      {state.get('str')}
    </div>
  }
}
