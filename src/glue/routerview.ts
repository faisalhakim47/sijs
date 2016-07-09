import { Glue } from './glue'
import { RouterView } from '../compiler/elem-routerview'

export class RouterViewGlue extends Glue {
  constructor(
    public id: string,
    private rv: RouterView
  ) {
    super()
  }
  install() {

  }
  destroy() {

  }
}

const instances = {}
