import { Component } from '../../../core/updater/content/component.js'
import { normalizePath } from './tools.js'
import { Router } from './router.js'

export class Route {
  /**
   * @param {string} path 
   * @param {string} name 
   * @param {new () => Component} Component 
   * @param {Router} childRouter 
   */
  constructor(path, name, Component, childRouter) {
    this.fullPath = this.path = normalizePath(path)
    this.name = name
    this.Component = Component
    /** @type {Route} */
    this.parentRoute = null
    this.childRouter = childRouter
    this.regex = new RegExp('', '')
    /** @type {number[]} */
    this.dynamicParts = []
  }

  /**
   * @param {Node} container 
   * @param {string[]} params 
   */
  mount(container, params = []) {
    new this.Component(...params).$mount(container)
  }

  /**
   * @param {string[]} params 
   */
  href(params) {
    let href = this.fullPath
    const length = params.length
    for (let index = 0; index < length; index++)
      href = href.replace('*', this.params[index])
    return href
  }
}
