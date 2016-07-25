import { Attrs } from '../compiler/attributes'
import { Component } from '../compiler/component'

class InputText extends Component {
  constructor(
    private factory: Function
  ) {
    super()
  }

  render() {
    return `<input type="text" ${Attrs({ oninput: this.oninput })}/>`
  }

  oninput() {
    this.factory()
  }
}
