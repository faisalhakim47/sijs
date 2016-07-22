import { Glue, getEl, removeElRef, addEvents, installElem, destroyElem } from './glue'
import { RouterView } from '../compiler/routerview'
import { GlobalEvent } from '../instance/global-event'

export class RouterViewGlue extends Glue {
  constructor(
    id: string,
    private router: RouterView
  ) {
    super()
    this.id = id
  }

  install() {
    if (!(this.el = <HTMLInputElement>getEl(this.id))) {
      return console.warn(
        'Input element #', this.id, 'has not been inserted yet.', this
      )
    }
    this.watchers.push(
      GlobalEvent.on('route:change', (path) => {
        this.updateRouter(this.router, path)
      })
    )
    this.isInstalled = true
  }

  destroy() {
    if (this.isInstalled) {
      this.teardown()
    } else {
      console.warn(
        'Glue routerview #', this.id, 'has not been installed yet.', this
      )
    }
  }

  updateRouter(router: RouterView, path: string) {
    if (this.shouldUpdate(router, path)) {
      RouterView.PATH = path
      destroyElem(router.elem, () => {
        this.destroyChild(this.el, this.el.id)
      })

      const { matches, route } = router.findTheRoute()
      router.state = router.generateState(
        path, matches, route
      )
      const e = router.generateElem(route.component)

      installElem(e, (template) => {
        this.el.insertAdjacentHTML('afterend',
          template.replace('>', ` ${router.id}>`)
        )
      })
    } else {
      const parentPath = RouterView.PATH
      const parentRouter = RouterView.ROUTER
      RouterView.PATH = path.replace(router.state.route.rx, '')
      RouterView.ROUTER = router
  
      router.childRoutes.forEach((childRouter) => {
        this.updateRouter(childRouter, RouterView.PATH)
      })

      RouterView.PATH = parentPath
      RouterView.ROUTER = parentRouter
    }
  }

  destroyChild(el: Element, id: string) {
    const nextElement = el.nextElementSibling
    if (nextElement.hasAttribute(id)) {
      if (
        nextElement.tagName === 'script' &&
        nextElement.id.slice(0, 1) === '_'
      ) {
        this.destroyChild(nextElement, nextElement.id)
      }
      this.el.parentElement.removeChild(nextElement)
    }
  }

  shouldUpdate(router: RouterView, path: string) {
    const route = router.state.route
    if (!route.rx.test(path)) {
      return true
    }

    if (route.params.length) {
      const matches = path.match(route.rx)
      matches.shift()
      const newState = router.generateState(path, matches, route)
      const oldState = router.state
      for (let key in newState.params) {
        if (newState.params[key] !== oldState.params[key]) {
          return true
        }
      }
      if (newState.query !== newState.query) {
        return true
      }
    }

    return false
  }
}

const instances = {}
