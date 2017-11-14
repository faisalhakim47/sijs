import { Updater } from './updater.js'

export class AttributeUpdater extends Updater {
  /**
   * @param {Attr} attribute 
   * @param {string[]} expression
   */
  constructor(attribute, staticParts) {
    super()
    this.node = attribute.parentElement
    this.attribute = attribute
    this.staticParts = staticParts
    /** @type {string[]} */
    this.oldValue = ''
    this.numberOfPart = staticParts.length - 1
  }

  generateValue(values) {
    let value = ''
    const staticParts = this.staticParts
    const lastStaticIndex = staticParts.length - 1
    for (let index = 0; index < lastStaticIndex; index++) {
      value += staticParts[index] + values[index]
    }
    value += staticParts[lastStaticIndex]
    return value
  }

  /**
   * @param {string[]} values
   */
  init(values) {
    if (values.length === 1 && typeof values[0] === 'boolean') {
      if (values[0])
        this.node.removeAttributeNode(this.attribute)
      else
        this.node.setAttributeNode(this.attribute)
    } else {
      this.oldValue = this.attribute.nodeValue = this.generateValue(values)
    }
  }

  /**
   * @param {string[]} values
   */
  update(values) {
    if (values.length === 1 && typeof values[0] === 'boolean') {
      if (values[0])
        this.node.removeAttributeNode(this.attribute)
      else
        this.node.setAttributeNode(this.attribute)
    } else {
      const value = this.generateValue(values)
      if (value !== this.oldValue)
        this.oldValue = this.attribute.nodeValue = value
    }
  }
}
