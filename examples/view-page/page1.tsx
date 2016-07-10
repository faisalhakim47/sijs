import { Component } from '../../lib/common'

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
