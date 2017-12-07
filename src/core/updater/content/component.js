import { INSTANCE } from '../../../constant.js'
import { html } from '../../../html.js'
import { TemplateInstance } from '../../template.js';
import { replaceNode } from '../../../tools/dom.js'
import { LitTag } from '../../littag.js'

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
    /** @type {Component} */
    this.$parentComponent = this.$parentComponent
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
  component.$parentComponent = renderingComponent
  renderingComponent = component
  const instance = component.render().compile()
  renderingComponent = null
  connectInstanceComponent(instance, component)
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
  connectInstanceComponent(instance, newComponent)
  newComponent.$parentComponent = renderingComponent
  newComponent.$update()
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

/**
 * @param {TemplateInstance} instance 
 * @param {Component} newComponent 
 */
function connectInstanceComponent(instance, newComponent) {
  const oldComponent = instance.$component
  if (oldComponent === newComponent) return
  instance.$component = newComponent
  newComponent.$instance = instance
}
