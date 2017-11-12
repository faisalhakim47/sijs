import { MARKER, PLACEHOLDER } from '../constant.js'
import { walkDomTree } from '../tools/dom.js'
import { List } from '../tools/list.js'

import { Expression } from './expression/expression.js';
import { AttributeExpression } from './expression/attribute.js';
import { ElementExpression } from './expression/element.js';
import { EventExpression } from './expression/event.js';
import { ContentExpression } from './expression/content.js';

import { Updater } from './updater/updater.js';
import { AttributeUpdater } from './updater/attribute.js';
import { ElementUpdater } from './updater/element.js';
import { EventUpdater } from './updater/event.js';
import { ContentUpdater } from './updater/content.js';

export const templateCache = new List()

/**
 * @param {TemplateStringsArray} staticParts 
 */
export function requestTemplate(staticParts) {
  /**
   * @type {Template}
   */
  const cachedTemplate = templateCache.get(staticParts)
  if (cachedTemplate) return cachedTemplate
  else {
    const newTemplate = new Template(staticParts)
    templateCache.set(staticParts, newTemplate)
    return newTemplate
  }
}

class Template {
  /**
   * @param {TemplateStringsArray} staticParts 
   */
  constructor(staticParts) {
    /**
     * @type {Expression[]}
     */
    const templateParts = []
    const templateElm = document.createElement('template')
    templateElm.innerHTML = staticParts.join(MARKER)

    /**
     * About the doAfterWalkTree,
     * when you want to modify the DOM Tree
     * you have to do it after the walkDomTree
     * or else walkDomTree will stop.
     */
    let doAfterWalkTree = []
    walkDomTree(templateElm.content, (node) => {
      const fragment = document.createDocumentFragment()
      const staticParts = node.nodeValue
        .replace(new RegExp(MARKER, 'g'), MARKER + PLACEHOLDER + MARKER)
        .split(MARKER)
      const length = staticParts.length
      for (let index = 0; index < length; index++) {
        fragment.appendChild(
          document.createTextNode(staticParts[index])
        )
      }
      doAfterWalkTree.push(() => {
        node.parentNode.replaceChild(fragment, node)
      })
    }, {
        whatToShow: 4 /* NodeFilter.SHOW_TEXT */,
        acceptNode(node) {
          return node.nodeValue.indexOf(MARKER) !== -1
            ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3 /* NodeFilter.FILTER_SKIP */
        }
      })
    doAfterWalkTree.forEach((fn) => fn())

    walkDomTree(templateElm.content, (node, nodeIndex) => {
      if (node.nodeType === 3 /* Node.TEXT_NODE */)
        return templateParts.push(new ContentExpression(
          nodeIndex,
        ))

      const length = node.attributes.length
      for (let index = 0; index < length; index++) {
        const attribute = node.attributes.item(index)

        if (attribute.name === MARKER)
          templateParts.push(new ElementExpression(
            nodeIndex,
          ))

        else if (attribute.name.slice(0, 2) === 'on')
          templateParts.push(new EventExpression(
            nodeIndex,
            attribute.name.slice(2),
          ))

        else if (attribute.nodeValue.indexOf(MARKER) !== -1)
          templateParts.push(new AttributeExpression(
            nodeIndex,
            attribute.name,
            attribute.nodeValue.split(MARKER),
          ))
      }
    }, {
        acceptNode(node) {
          if (node.nodeType === 3 /* Node.TEXT_NODE */)
            return node.nodeValue === PLACEHOLDER
              ? 1 /* NodeFilter.FILTER_ACCEPT */
              : 3 /* NodeFilter.FILTER_SKIP */
          else return node.hasAttributes()
            ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3 /* NodeFilter.FILTER_SKIP */
        }
      })

    this.staticParts = staticParts
    this.templateElm = templateElm
    this.templateParts = templateParts
  }

  create() {
    const partUpdaters = []
    const element = document.importNode(this.templateElm.content, true)

    walkDomTree(element, (node, nodeIndex, stop) => {

      const length = this.templateParts.length

      for (let index = 0; index < length; index++) {
        const expression = this.templateParts[index]

        if (expression.nodeIndex !== nodeIndex) continue

        if (expression instanceof ContentExpression)
          partUpdaters.push(new ContentUpdater(node))

        else if (expression instanceof AttributeExpression)
          partUpdaters.push(new AttributeUpdater(
            node.attributes.getNamedItem(expression.attributeName),
            expression.staticParts,
          ))

        else if (expression instanceof ElementExpression)
          partUpdaters.push(new ElementUpdater(node))

        else if (expression instanceof EventExpression)
          partUpdaters.push(new EventUpdater(
            node,
            expression.eventName,
          ))
      }

    }, {
        acceptNode(node) {
          if (node.nodeType === 3 /* Node.TEXT_NODE */)
            return node.nodeValue === PLACEHOLDER
              ? 1 /* NodeFilter.FILTER_ACCEPT */
              : 3 /* NodeFilter.FILTER_SKIP */
          else return node.hasAttributes()
            ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3 /* NodeFilter.FILTER_SKIP */
        }
      })

    return new TemplateInstance(
      this.staticParts,
      element.children.item(0),
      partUpdaters,
    )
  }
}

export class TemplateInstance {
  /**
   * @param {TemplateStringsArray} staticParts 
   * @param {Node} element 
   * @param {Updater[]} partUpdaters 
   */
  constructor(staticParts, element, partUpdaters) {
    this.staticParts = staticParts
    this.element = element
    this.partUpdaters = partUpdaters
  }

  /**
   * @param {any[]} expressions 
   */
  update(expressions) {
    let startIndex = 0
    let index = 0
    let updater
    while (updater = this.partUpdaters[index++]) {
      updater.update(expressions.slice(
        startIndex,
        startIndex += updater.numberOfPart,
      ))
    }
  }
}
