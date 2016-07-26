import { genId } from './uid'
import { CompilerState } from './index'
import { BindGlue } from '../glue/bind'
import { status } from '../instance/status'

export function Bind(factory: Function): string {
  const id = genId()

  if (status.browser) CompilerState.glues.push(
    new BindGlue(id, factory)
  )

  return `<span id="${id}">${factory()}</span>`
}
