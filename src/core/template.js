import { getNodeTypes, NodeType } from '../structure/1_nodetype/nodetype.js'
import { getExpressionsFor, Expression } from '../structure/2_expression/expression.js'
import { getUpdatersFor, Updater } from '../structure/3_updater/updater.js'
import { MARKER, PLACEHOLDER } from '../constant.js'
import { walkDomTree } from '../tools/dom.js'
import { List } from '../tools/list.js'

export const templateCache = new List()

/**
 * @param {TemplateStringsArray} staticParts 
 */
export function requestTemplate(staticParts) {
  /**
   * @type {Template}
   */
  const cachedTemplate = templateCache.get(staticParts)
  if (cachedTemplate instanceof Template) {
    return cachedTemplate
  }
  const newTemplate = new Template(staticParts)
  templateCache.set(staticParts, newTemplate)
  return newTemplate
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
    const doAfterWalkTree = []

    walkDomTree(templateElm.content, (node) => {
      if (node.nodeValue.indexOf(MARKER) === -1) return
      const fragment = document.createDocumentFragment()
      const staticParts = node.nodeValue
        .split(MARKER)
        .join(MARKER + PLACEHOLDER + MARKER)
        .split(MARKER)
        .map((text) => document.createTextNode(text))
        .forEach((textNode) => {
          fragment.appendChild(textNode)
        })
      doAfterWalkTree.push(() => {
        node.parentNode.replaceChild(fragment, node)
      })
    }, {
        whatToShow: NodeFilter.SHOW_TEXT,
        acceptNode(node) {
          if (node.nodeValue.indexOf(MARKER) !== -1) {
            return NodeFilter.FILTER_ACCEPT
          }
        }
      })

    doAfterWalkTree.forEach((fn) => fn())

    walkDomTree(templateElm.content, (node, nodeIndex) => {
      const NodeTypeBase = getNodeTypes()
        .find((NodeTypeBase) => {
          return NodeTypeBase.filter(node)
        })

      if (!(NodeTypeBase && NodeTypeBase.prototype instanceof NodeType)) return

      NodeTypeBase.map(node, nodeIndex, (...args) => {

        const ExpressionBase = getExpressionsFor(NodeTypeBase)
          .find((ExpressionBase) => {
            return ExpressionBase.filter(...args)
          })

        if (!(ExpressionBase && ExpressionBase.prototype instanceof Expression)) return

        templateParts.push(new ExpressionBase(nodeIndex, ...args))

      })
    })

    this.templateElm = templateElm
    this.templateParts = templateParts
  }

  create() {
    const partUpdaters = []
    const element = document.importNode(this.templateElm.content, true)
    let partIndex = 0
    let expression = this.templateParts[partIndex]

    const doAfterWalkTree = []

    walkDomTree(element, (node, nodeIndex, stop) => {
      if (!expression) return stop()
      if (expression.nodeIndex !== nodeIndex) return

      const UpdaterBase = getUpdatersFor(expression.constructor)
        .find((UpdaterBase) => {
          return UpdaterBase.filter(expression)
        })

      if (!(UpdaterBase && UpdaterBase.prototype instanceof Updater)) return

      partUpdaters.push(new UpdaterBase(node, expression))

      expression = this.templateParts[++partIndex]
    })

    doAfterWalkTree.forEach((fn) => fn())

    return new TemplateInstance(
      this,
      element.children.item(0),
      partUpdaters,
    )
  }
}

export class TemplateInstance {
  /**
   * @param {Template} template 
   * @param {Node} element 
   * @param {Updater[]} partUpdaters 
   */
  constructor(template, element, partUpdaters) {
    this.template = template
    this.element = element
    this.partUpdaters = partUpdaters
  }

  /**
   * @param {any[]} expressions 
   */
  update(expressions) {
    let startIndex = 0
    this.partUpdaters.forEach((updater) => {
      updater.update(expressions.slice(
        startIndex,
        startIndex += updater.numberOfPart,
      ))
    })
  }
}
