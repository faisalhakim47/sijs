import { renderingComponent } from '../../../core/updater/content/component.js'
import { Directive } from '../../../core/updater/content/directive.js'
import { ContentUpdater } from '../../../core/updater/content/content.js'
import { rootRoute, subscribeRouteView } from './RootRoute.js'

/** @type {RouterView} */
let activeRouterViews = []

export class RouterView extends Directive {
  static get activeViews() {
    return activeRouterViews
  }

  static resetActiveViews() {
    activeRouterViews = []
  }

  constructor() {
    super()
    /** @type {Route} */
    this.route = rootRoute.routerViewList.get(renderingComponent.constructor)
    /** @type {RegExpMatchArray} */
    this.params = rootRoute.routes.get(this.route)
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  update(contentUpdater) {
    contentUpdater.update([
      new this.route.Component(...this.params)
    ])
  }
}
