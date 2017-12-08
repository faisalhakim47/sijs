import { INSTANCE } from '../../../constant.js'
import { html } from '../../../html.js'
import { TemplateInstance } from '../../template.js';
import { replaceNode } from '../../../tools/dom.js'
import { LitTag } from '../../littag.js'

// TODO: PARENT-CHILD COMMUNICATION

/** @type {Component} */
let renderingComponent = null

export class Component {
  $instance: TemplateInstance
  $parentComponent: Component
  $childComponents: Component[]

  static get rendering() {
    return renderingComponent
  }

  // --- PROPERTY ---
  get html() {
    return html
  }

  $mount(container: Node) {
    initComponent(this, container)
    return this
  }

  $update() {
    this.$instance.update(
      this.render().dymanicParts
    )
  }

  // --- VIEW ---
  render() {
    return this.html`<div></div>`
  }

  // --- HOOKS ---
  updated() { }
  beforeDestroy() { }
}

export function initComponent(component: Component, currentNode: Node) {
  component.$parentComponent = renderingComponent
  if (renderingComponent instanceof Component)
    renderingComponent.$childComponents.push(component)
  renderingComponent = component
  renderingComponent.$childComponents = []
  const instance = component.render().compile()
  renderingComponent = null
  connectInstanceComponent(instance, component)
  replaceNode(currentNode, instance.element)
}

export function updateComponent(newComponent: Component, currentNode: Node) {
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
 */
export function beforeDestroyComponent(node: Node) {
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
