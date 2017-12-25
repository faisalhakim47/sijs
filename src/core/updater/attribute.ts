import { Updater } from './updater.js'
import { equalArray } from '../../tools/array.js'

export class AttributeUpdater extends Updater {
  node: Element = null
  oldValue: string

  constructor(
    private attribute: Attr
  ) {
    super()
    this.node = attribute.parentElement
  }

  init(value: string) {
    if (typeof value === 'boolean') {
      if (value) this.node.removeAttributeNode(this.attribute)
      else this.node.setAttributeNode(this.attribute)
    } else {
      this.attribute.nodeValue = value
      this.oldValue = value
    }
  }

  update(value: string) {
    if (typeof value === 'boolean') {
      if (value) this.node.removeAttributeNode(this.attribute)
      else this.node.setAttributeNode(this.attribute)
    } else {
      if (value !== this.oldValue) {
        this.attribute.nodeValue = value
        this.oldValue = value
      }
    }
  }
}
