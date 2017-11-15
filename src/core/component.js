import { INSTANCE } from '../constant.js'
import { html } from '../html.js'
import { TemplateInstance } from './template.js';

const COMPONENT_METHODS = {
  constructor: true,
  props: true,
  update: true,
  render: true,
  beforeCreate: true,
  created: true,
  mounted: true,
  beforeDestroy: true,
}

export class Component {
  // --- PROPERTY ---
  get html() {
    return html
  }

  // --- METHODS ---
  props() {
    return this
  }

  update() {
    this.$instance.update(
      this.render().dymanicParts
    )
  }

  /**
   * @param {Node} container 
   */
  mount(container) {
    initComponent(this, container)
  }

  // --- VIEW ---
  render() { return html`<div></div>` }

  // --- HOOKS ---
  data() {
    /** @type {TemplateInstance} */
    this.$instance = null
  }
  mounted() { }
  beforeDestroy() { }
}

/**
 * @param {Component} component 
 * @param {Node} currentNode 
 */
export function initComponent(component, currentNode) {
  /* saving props state,
  in updateComponent will be compared to decide component update or not */
  const props = {}
  const propNames = Object.keys(component)
  let propName
  while (propName = propNames.shift()) {
    props[propName] = component[propName]
  }

  // AUTOBIND METHODS
  const methodNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(component)
  )
  let methodName
  while (methodName = methodNames.shift()) {
    if (COMPONENT_METHODS[methodName]) continue
    const propValue = component[methodName]
    if (typeof propValue !== 'function') continue
    component[methodName] = propValue.bind(component)
  }

  component.beforeCreate()

  const instance = component.render().compile()

  // used by updateComponent
  component.$props = props
  instance.$component = component

  // used by Component.prototype.update
  component.$instance = instance

  currentNode.parentNode.replaceChild(instance.element, currentNode)
}

/**
 * @param {Component} newComponent 
 * @param {Node} currNode 
 */
export function updateComponent(newComponent, currNode) {
  /** @type {Component} */
  const component = currNode[INSTANCE].$component
  const propNames = Object.keys(component.$props)
  let isUpdate = false
  let propName
  while (propName = propNames.shift()) {
    const newProp = newComponent[propName]
    if (!isUpdate) isUpdate = component[propName] !== newProp
    if (isUpdate) component[propName] = newProp
  }
  if (isUpdate) component.update()
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
