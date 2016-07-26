import { attrs } from '../compiler/attributes';
import { Component } from '../compiler/component';
import { render } from '../compiler/index';
import { listenObs } from '../observer/dependent';
import { getSetter } from '../observer/setter';
import { IListener } from '../observer/emitter';

export class InputText extends Component {
  render() {
    return `<input ${attrs({
      oninput: ({ target }) => this.setModel(target.value),
      value: this.model,
    })} type="text">`
  }

  setModel: (value) => void 

  constructor(
    private model: Function
  ) {
    super()
    this.setModel = getSetter(model)
  }
}
