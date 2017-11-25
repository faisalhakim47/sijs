import { ContentUpdater } from '../../core/updater/content.js'
import { Component } from '../../core/component.js'
import { Directive } from '../../core/directive.js'

/** @type {Router} */
let rootRouter = null

export class Router {
  static go(target) {
    if (typeof target === 'number') {
      history.go(target)
    }
    else if (typeof target === 'object') {

    }
  }

  static link() {
    return new RouterLink
  }

  /**
   * @param {Route[]} routes 
   */
  constructor(routes) {
    this.routes = routes
    /** @type {Router} */
    this.parentRouter = null
    const length = this.routes.length
    for (let index = 0; index < length; index++) {
      const route = this.routes[index]
      route.parentRouter = this
      route.childRouter.parentRouter = this
    }
    rootRouter = this
  }

  view() {
    return new RouterView()
  }
}

export class Route {
  /**
   * @param {string} path 
   * @param {string} name 
   * @param {Component} component 
   * @param {Router} childRouter 
   */
  constructor(path, name, component, childRouter) {
    this.path = path
    this.name = name
    this.component = component
    this.childRouter = childRouter
    this.pathParts = path.slice('/')
    /** @type {Router} */
    this.parentRouter = null
  }
}

export class RouterView extends Directive {
  constructor() {
    super()
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  init(contentUpdater) {
    return null
  }

  /**
   * @param {any} oldValue 
   * @param {ContentUpdater} contentUpdater 
   */
  update(oldValue, contentUpdater) {

  }
}

export class RouterLink extends Directive {
  constructor() {
    super()
  }

  /**
   * @param {ContentUpdater} contentUpdater 
   */
  init(contentUpdater) {
    return null
  }

  /**
   * @param {any} oldValue 
   * @param {ContentUpdater} contentUpdater 
   */
  update(oldValue, contentUpdater) {

  }
}
