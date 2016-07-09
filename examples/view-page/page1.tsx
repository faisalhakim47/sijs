import { PageView } from './index'
import { Component } from '../../lib/common'

@PageView.register({
  name: 'page1'
})

export class Page1 extends Component {
  constructor() {
    super()
    this.state.set(null, {
      bool: true,
      str: 'test'
    })
  }
  render(e, state) {
    return <div>
      <input model={state.get('str')}/>
      {state.get('str')}
    </div>
  }
}
