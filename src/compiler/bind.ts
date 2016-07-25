import { genId } from './uid'
import { CompilerState } from './index'
import { BindGlue } from '../glue/bind'
import { status } from '../instance/status'
import { parseObsValue } from '../observer/observable'

export function Bind(factory: any): string {
  const id = genId()

  if (status.browser) CompilerState.glues.push(
    new BindGlue(id, factory)
  )

  return `<span id="${id}">${parseObsValue(factory)}</span>`
}
