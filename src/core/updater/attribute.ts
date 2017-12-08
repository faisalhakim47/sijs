import { Updater } from './updater.js'
import { equalArray } from '../../tools/array.js'

export class AttributeUpdater extends Updater {
  node: Element = null
  oldValue: string[] = []

  constructor(
    private attribute: Attr,
    private staticParts: string[]
  ) {
    super()
    this.node = attribute.parentElement
    this.numberOfPart = staticParts.length - 1
  }

  generateValue(values: string[]) {
    let value = ''
    const staticParts = this.staticParts
    const lastStaticIndex = staticParts.length - 1
    for (let index = 0; index < lastStaticIndex; index++) {
      value += staticParts[index] + values[index]
    }
    value += staticParts[lastStaticIndex]
    return value
  }

  init(values: string[]) {
    if (values.length === 1 && typeof values[0] === 'boolean') {
      if (values[0])
        this.node.removeAttributeNode(this.attribute)
      else
        this.node.setAttributeNode(this.attribute)
    } else {
      this.attribute.nodeValue = this.generateValue(values)
      this.oldValue = values
    }
  }

  update(values: string[]) {
    if (values.length === 1 && typeof values[0] === 'boolean') {
      if (values[0])
        this.node.removeAttributeNode(this.attribute)
      else
        this.node.setAttributeNode(this.attribute)
    } else {
      if (!equalArray(values, this.oldValue)) {
        this.attribute.nodeValue = this.generateValue(values)
        this.oldValue = values
      }
    }
  }
}
