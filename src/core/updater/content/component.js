import { INSTANCE } from '../../../constant.js'
import { html } from '../../../html.js'
import { TemplateInstance } from '../../template.js';
import { Route, RootRoute } from '../../../builtin/directive/router.js'

const COMPONENT_METHODS = {
  constructor: true,
  $update: true,
  $mount: true,
  render: true,
  updated: true,
  beforeDestroy: true,
}

/** @type {Component} */
export let renderingComponent = null

export class Component {
  // --- PROPERTY ---
  get html() {
    return html
  }

  /**
   * @param {Node} container 
   */
  $mount(container) {
    /** @type {TemplateInstance} */
    this.$instance = this.$instance
    /** @type {Route} */
    this.$route = this.$route
    /** @type {RootRoute} */
    this.$rootRoute = this.$rootRoute
    initComponent(this, container)
  }

  $update() {
    renderingComponent = this
    this.$instance.update(
      this.render().dymanicParts
    )
    renderingComponent = null
  }

  // --- VIEW ---
  render() { return this.html`<div></div>` }

  // --- HOOKS ---
  updated() { }
  beforeDestroy() { }
}

/**
 * @param {Component} component 
 * @param {Node} currentNode 
 */
export function initComponent(component, currentNode) {
  const methodNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(component)
  )
  let methodName
  while (methodName = methodNames.shift()) {
    if (COMPONENT_METHODS[methodName]) continue
    const method = component[methodName]
    if (typeof method !== 'function') continue
    component[methodName] = method.bind(component)
  }

  renderingComponent = component
  const instance = component.render().compile()
  renderingComponent = null

  // used by updateComponent
  instance.$component = component
  // used by Component.prototype.update
  component.$instance = instance

  currentNode.parentNode.replaceChild(instance.element, currentNode)
}

/**
 * @param {Component} newComponent 
 * @param {Node} currentNode 
 */
export function updateComponent(newComponent, currentNode) {
  /** @type {TemplateInstance} */
  const instance = currentNode[INSTANCE]
  if (!instance || !instance.$component || !(newComponent instanceof instance.$component.constructor)) {
    return initComponent(newComponent, currentNode)
  }

  /** @type {Component} */
  const component = instance.$component
  const propNames = Object.keys(component)
  let isUpdate = false
  let propName = ''
  while (propName = propNames.shift()) {
    const newPropValue = newComponent[propName]
    component[propName] = newPropValue
    if (!isUpdate) isUpdate = component[propName] !== newPropValue
      || (typeof newPropValue === 'object' && !!newPropValue)
  }

  if (isUpdate) component.$update()
}

/**
 * used for beforeDestroy event.
 * it is also useful in the future for transition hook
 * @param {Node} node
 */
export function prepareToRemoveNode(node) {
  const instance = node[INSTANCE]
  if (instance instanceof TemplateInstance) {
    const component = instance.$component
    if (component instanceof Component) {
      component.beforeDestroy()
    }
  }
}
