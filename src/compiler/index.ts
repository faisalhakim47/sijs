import { ComponentClass, Component } from './component'
import { RouterView } from './routerview'
import { Glue } from '../glue/index'

// export interface Hooks {
//   beforeInstall: Function[]
//   install: Function[]
//   destroy: Function[]
//   afterDestroy: Function[]
// }

export class CompilerStateConstructor {
  constructor(
    public glues: Glue[] = [],
    public events: string[] = [],
    public routers: RouterView[] = [],
    public components: Component[] = []
  ) { }

  getState() {
    return new CompilerStateConstructor(
      this.glues, this.events, this.routers, this.components
    )
  }

  takeState() {
    const state = this.getState()
    this.glues = []
    this.events = []
    this.routers = []
    this.components = []
    return state
  }

  mergeState(state: CompilerStateConstructor) {
    this.glues.push(...state.glues)
    this.events.push(...state.events)
    this.routers.push(...state.routers)
    this.components.push(...state.components)
    return this
  }
}

export const CompilerState = new CompilerStateConstructor()

export function getChildState(renderFn: Function): CompilerStateConstructor {
  const parentState = CompilerState.takeState()
  renderFn()
  const currentState = CompilerState.getState()

  console.log('COMPARE', 1, currentState)

  CompilerState.mergeState(parentState)

  console.log('COMPARE', 2, currentState)

  return currentState
}

export function render(Instance: ComponentClass | Component | RouterView) {
  if (Instance instanceof RouterView) {
    var template = Instance.generate()
    CompilerState.routers.push(Instance)
  } else if (Instance instanceof Component) {
    var template = Instance.$compile()
  } else {
    var template = new Instance().$compile()
  }
  return template
}
