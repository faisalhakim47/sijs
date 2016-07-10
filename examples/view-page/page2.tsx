import { Component, React } from '../../lib/common'

export class Page2 extends Component {
  constructor() {
    super()
    this.state.set(null, {
      bool: true,
      str: 'test2'
    })
  }
  render(e, state) {
    return <div>
      <input model={state.get('str')}/>
      {state.get('str')}
    </div>
  }
}
