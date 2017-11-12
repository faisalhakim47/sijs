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

  // --- VIEW ---
  render() { return html`` }

  // --- HOOKS ---
  beforeCreate() { }
  created() { }
  mounted() { }
  beforeDestroy() { }
}

/**
 * @param {Component} component 
 * @param {Node} currNode 
 */
export function initiateComponent(component, currNode) {
  const props = {}
  const propNames = Object.keys(component)
  let propName
  while (propName = propNames.shift()) {
    props[propName] = component[propName]
  }

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

  component.$props = props
  component.$instance = instance
  instance.$component = component

  currNode.parentNode.replaceChild(instance.element, currNode)
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
