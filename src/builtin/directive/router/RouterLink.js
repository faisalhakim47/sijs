import { Directive } from '../../../core/updater/content/directive.js'
import { ContentUpdater } from '../../../core/updater/content/content.js'
import { LitTag } from '../../../core/littag.js'
import { html } from '../../../html.js'
import { Router } from './router.js'
import { RootRoute, rootRoute } from './RootRoute.js'

export class RouterLink extends Directive {
  /**
   * @param {string} text
   * @returns {(href: string, handler: Function, isActive: Boolean) => LitTag} 
   */
  static defaultView(text) {
    return (href, handler, isActive) =>
      html`<a class=${isActive ? 'active' : ''} href=${href} onclick=${handler}>${text}</a>`
  }

  /**
   * @param {string} routeName 
   * @param {string[]} params 
   * @param {(href: string, handler: Function, isActive: Boolean) => LitTag} view 
   */
  constructor(routeName, params = [], view) {
    super()
    this.routeName = routeName
    this.params = params
    this.view = typeof view !== 'function'
      ? RouterLink.defaultView(view)
      : view
  }

  /**
   * @param {ContentUpdater} updater 
   */
  update(updater) {
    const value = this.routeName + this.params.join(';')
    if (value === updater.oldValue) return value
    const route = RootRoute.findRoute(this.routeName)
    const href = route.href(this.params)
    const isActive = rootRoute.routes.has(route)
    const handler = (event) => {
      event.preventDefault()
      Router.push(route, this.params)
    }
    this.view(href, handler, isActive)
      .mount(updater.previousNode.nextSibling)
    return value
  }
}
