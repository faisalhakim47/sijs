import { Component } from '../../core/component.js'
import { Directive } from '../../core/directive.js'

export class Router {
  /**
   * @param {Route} routes 
   */
  constructor(routes) {
    this.routes = routes
  }
}

export class Route {
  /**
   * @param {string} name 
   * @param {string} path 
   * @param {Component} component 
   */
  constructor(name, path, component) {
    this.name = name
    this.path = path
    this.component = component
    this.pathParts = path.slice('/')
  }
}
