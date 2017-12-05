import { INSTANCE } from '../../../constant.js'
import { html } from '../../../html.js'
import { TemplateInstance } from '../../template.js';
import { replaceNode } from '../../../tools/dom.js'
import { LitTag } from '../../littag.js'

const COMPONENT_METHODS = {
  constructor: true,
  $update: true,
  $mount: true,
  render: true,
  updated: true,
  beforeDestroy: true,
}

const COMPONENT_PROPERTIES = {
  $instance: true,
}

/** @type {Component} */
let renderingComponent = null

export class Component {
  static get rendering() {
    return renderingComponent
  }

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
    /** @type {TemplateInstance} */
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
  render() {
    return this.html`<div></div>`
  }

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

  replaceNode(currentNode, instance.element)
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

  const oldComponent = instance.$component
  const propNames = Object.keys(oldComponent)
  let propName = ''
  while (propName = propNames.shift()) {
    const newPropValue = newComponent[propName]
    if (oldComponent[propName] !== newPropValue
      || (typeof newPropValue === 'object' && newPropValue != undefined)) {
      instance.$component = newComponent
      newComponent.$instance = instance
      newComponent.$update()
      break
    }
  }
}

/**
 * used for beforeDestroy event.
 * it is also useful in the future for transition hook
 * @param {Node} node
 */
export function beforeDestroyComponent(node) {
  const instance = node[INSTANCE]
  if (instance instanceof TemplateInstance) {
    const component = instance.$component
    if (component instanceof Component) {
      component.beforeDestroy()
    }
  }
}
