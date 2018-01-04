import { MARKER, INSTANCE, AsyncDynamicPart, DynamicPart } from '../constant.js'
import { walkDomTree, appendNode, replaceNode } from '../tools/dom.js'
import { List } from '../tools/list.js'
import { Pipe, Subscribtion, collectSubscribtions } from '../tools/subject.js'

import { Updater } from './updater/updater.js'
import { ContentUpdater } from './updater/content.js'
import { ElementUpdater } from './updater/element.js'
import { AttributeUpdater } from './updater/attribute.js'
import { EventUpdater } from './updater/event.js'

export const templateCache = new List<TemplateStringsArray, Template>()

/**
 * Template cache controller
 * it detect whether template is cached
 * then return it
 */
export function requestTemplate(staticParts: TemplateStringsArray) {
  const cachedTemplate = templateCache.get(staticParts)
  if (cachedTemplate) return cachedTemplate
  else {
    const newTemplate = new Template(staticParts)
    templateCache.set(staticParts, newTemplate)
    return newTemplate
  }
}

const restrictedParentTags = {
  li(html: string) {
    const ul = document.createElement('ul')
    ul.innerHTML = html
    return ul.children[0]
  },
  tr(html: string) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    table.appendChild(thead)
    thead.innerHTML = html
    return thead.children[0]
  },
  th(html: string) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    table.appendChild(thead)
    thead.appendChild(tr)
    tr.innerHTML = html
    return tr.children[0]
  },
  td(html: string) {
    return restrictedParentTags.th(html)
  },
}

const HTMLTagRx = /<([^\s>]+)/

function parseTemplateString(staticParts: TemplateStringsArray): Element {
  if ('HTMLTemplateElement' in window) {
    const template = document.createElement('template')
    template.innerHTML = staticParts.join(MARKER)
    return template.content.children[0]
  }
  else {
    const tag = staticParts[0].match(HTMLTagRx)[1]
    if (typeof restrictedParentTags[tag] === 'function') {
      return restrictedParentTags[tag](staticParts.join(MARKER))
    }
    else {
      const div = document.createElement('div')
      div.innerHTML = staticParts.join(MARKER)
      return div.children[0]
    }
  }
}

export interface TemplatePart {
  nodeIndex: number
  isElement?: boolean
  isAttribute?: boolean
  isEvent?: boolean
  isContent?: boolean
  attributeName?: string
  eventName?: string
}

/**
 * Template class is core of the library
 * it efficiently creates template literal to usable DOM
 */
export class Template {
  template: DocumentFragment
  templateParts: TemplatePart[]

  constructor(private staticParts: TemplateStringsArray) {
    const templateParts: TemplatePart[] = []

    const template = document.createDocumentFragment()
    template.appendChild(parseTemplateString(staticParts))

    /**
     * About the doAfterWalkTree,
     * when you want to modify the DOM Tree
     * you have to do it after the walkDomTree
     * or else walkDomTree will stop.
     */
    let doAfterWalkTree: Function[] = []

    /**
     * normalize the TextNode
     * because as default, after we join all staticParts with MARKER,
     * the TextNode can contains more than one MARKER
     * so we change the MARKER part with
     * comment that hold the MARKER
     */
    walkDomTree(template, (node) => {
      const fragment = document.createDocumentFragment()
      const staticParts = node.nodeValue.split(MARKER)

      const lastStaticIndex = staticParts.length - 1
      for (let index = 0; index < lastStaticIndex; index++) {
        fragment.appendChild(
          document.createTextNode(staticParts[index])
        )
        fragment.appendChild(
          document.createComment(MARKER)
        )
      }
      fragment.appendChild(
        document.createTextNode(staticParts[lastStaticIndex])
      )

      doAfterWalkTree.push(() => replaceNode(node, fragment))
    }, {
        whatToShow: 4 /* NodeFilter.SHOW_TEXT */,
        acceptNode(node) {
          return node.nodeValue.indexOf(MARKER) !== -1
            ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3 /* NodeFilter.FILTER_SKIP */
        }
      })

    doAfterWalkTree.forEach((doAfter) => doAfter())

    doAfterWalkTree = []

    /**
     * detecting MARKER and save its position.
     * So at the cloning proccess it already know
     * which part to look at.
     */
    walkDomTree(template, (node, nodeIndex) => {
      if (node.nodeType === 8 /* Node.COMMENT_NODE */)
        return templateParts.push({
          nodeIndex,
          isContent: true,
        })

      const length = node.attributes.length
      for (let index = 0; index < length; index++) {
        const attribute = node.attributes.item(index)

        if (attribute.name === MARKER) {
          templateParts.push({
            nodeIndex,
            isElement: true,
          })
          doAfterWalkTree.push(() => {
            (node as Element).removeAttributeNode(attribute)
          })
        }

        else if (attribute.name.slice(0, 2) === 'on') {
          templateParts.push({
            nodeIndex,
            isEvent: true,
            eventName: attribute.name.slice(2),
          })
          doAfterWalkTree.push(() => {
            (node as Element).removeAttributeNode(attribute)
          })
        }

        else if (attribute.nodeValue === MARKER) {
          templateParts.push({
            nodeIndex,
            isAttribute: true,
            attributeName: attribute.name,
          })
          doAfterWalkTree.push(() => attribute.nodeValue = '')
        }
      }
    }, {
        whatToShow: 1 /* NodeFilter.SHOW_ELEMENT */ | 128 /* NodeFilter.SHOW_COMMENT */,
        acceptNode(node) {
          if (node.nodeType === 8 /* Node.COMMENT_NODE */)
            return node.nodeValue === MARKER
              ? 1 /* NodeFilter.FILTER_ACCEPT */
              : 3 /* NodeFilter.FILTER_SKIP */
          else return node.hasAttributes()
            ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3 /* NodeFilter.FILTER_SKIP */
        }
      })

    doAfterWalkTree.forEach((doAfter) => doAfter())

    this.template = template
    this.templateParts = templateParts
  }

  clone() {
    const partUpdaters = []
    const element: Node = this.template.cloneNode(true)

    walkDomTree(element, (node, nodeIndex, stop) => {

      this.templateParts.forEach((expression) => {

        if (expression.nodeIndex !== nodeIndex) return

        if (expression.isContent)
          partUpdaters.push(new ContentUpdater(node))

        else if (expression.isAttribute)
          partUpdaters.push(new AttributeUpdater(
            node.attributes.getNamedItem(expression.attributeName),
          ))

        else if (expression.isElement)
          partUpdaters.push(new ElementUpdater(node as Element))

        else if (expression.isEvent)
          partUpdaters.push(new EventUpdater(
            node as Element,
            expression.eventName,
          ))

      })

    }, {
        whatToShow: 1 /* NodeFilter.SHOW_ELEMENT */ | 128 /* NodeFilter.SHOW_COMMENT */,
        acceptNode(node) {
          if (node.nodeType === 8 /* Node.COMMENT_NODE */)
            return node.nodeValue === MARKER
              ? 1 /* NodeFilter.FILTER_ACCEPT */
              : 3 /* NodeFilter.FILTER_SKIP */
          else return node.hasAttributes()
            ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3 /* NodeFilter.FILTER_SKIP */
        }
      })

    return new TemplateInstance(
      this.staticParts,
      (element as Element).children[0],
      partUpdaters,
    )
  }
}

/**
 * Template Instance is the core result of sijs
 * it tightly couples Updaters and Nodes
 */
export class TemplateInstance {
  private subcribtionss: Subscribtion[][] = []

  constructor(
    public staticParts: TemplateStringsArray,
    public element: Element,
    private partUpdaters: Updater[]
  ) {
    this.element[INSTANCE] = this
  }

  clearSubcribtions() {
    this.subcribtionss.forEach((subcribtions) => {
      subcribtions.forEach((unsubcribe) => {
        unsubcribe()
      })
    })
    this.subcribtionss = []
  }

  init(expressions: AsyncDynamicPart[]) {
    const length = this.partUpdaters.length
    for (let index = 0; index < length; index++) {
      const updater = this.partUpdaters[index]
      const expression = expressions[index]
      this.subcribtionss.push(collectSubscribtions(() => {
        // console.log('BEGIN', this.element)
        if (expression instanceof Pipe) {
          let first = true
          expression.subscribe((value) => {
            // console.log('VALUE', value)
            if (first) {
              updater.init(value)
              first = false
            }
            else updater.update(value)
          })
        }
        else updater.init(expression)
        // console.log('END', this.element)
      }))
    }
  }

  update(expressions: AsyncDynamicPart[]) {
    const length = this.partUpdaters.length
    for (let index = 0; index < length; index++) {
      const updater = this.partUpdaters[index]
      const expression = expressions[index]
      this.subcribtionss.push(collectSubscribtions(() => {
        if (expression instanceof Pipe) {
          expression.subscribe((value) => {
            updater.update(value)
          })
        }
        else updater.update(expression)
      }))
    }
  }
}
