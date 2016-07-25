import { ComponentClass } from './component'
import { RouterView } from './routerview'
import { Glue } from '../glue/index'
import { getObsValue, isObserved } from '../observer/observable'

export interface Hooks {
  beforeInstall: Function[]
  afterInstall: Function[]
  beforeDestroy: Function[]
  afterDestroy: Function[]
}

export const CompilerState = new CompilerStateConstructor()

export class CompilerStateConstructor {
  constructor(
    public glues: Glue[] = [],
    public events: string[] = [],
    public routers: RouterView[] = [],
    public hooks: Hooks = {
      beforeInstall: [],
      afterInstall: [],
      beforeDestroy: [],
      afterDestroy: []
    }
  ) { }

  getState() {
    return new CompilerStateConstructor(
      this.glues, this.events, this.routers, this.hooks
    )
  }

  takeState() {
    const state = this.getState()
    this.glues = []
    this.events = []
    this.routers = []
    this.hooks = {
      beforeInstall: [],
      afterInstall: [],
      beforeDestroy: [],
      afterDestroy: []
    }
    return state
  }

  mergeState(state: CompilerStateConstructor) {
    this.glues.push(...state.glues)
    this.events.push(...state.events)
    this.routers.push(...state.routers)
    this.hooks.beforeInstall.push(...state.hooks.beforeInstall)
    this.hooks.afterInstall.push(...state.hooks.afterInstall)
    this.hooks.beforeDestroy.push(...state.hooks.beforeDestroy)
    this.hooks.afterDestroy.push(...state.hooks.afterDestroy)
    return this
  }
}

export function getChildState(renderFn: Function): CompilerStateConstructor {
  const parentState = CompilerState.takeState()
  renderFn()
  const currentState = CompilerState.getState()

  console.log('COMPARE', 1, currentState)

  CompilerState.mergeState(parentState)

  console.log('COMPARE', 2, currentState)

  return currentState
}

export function render(Component: ComponentClass | RouterView) {
  if (Component instanceof RouterView) {
    var template = Component.generate()
    CompilerState.routers.push(Component)
  } else {
    var template = new Component().generate()
  }
  return template
}
