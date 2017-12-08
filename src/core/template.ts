import { MARKER, INSTANCE } from '../constant.js'
import { walkDomTree, appendNode, replaceNode } from '../tools/dom.js'
import { List } from '../tools/list.js'

import { Expression } from './expression/expression.js'
import { AttributeExpression } from './expression/attribute.js'
import { ElementExpression } from './expression/element.js'
import { EventExpression } from './expression/event.js'
import { ContentExpression } from './expression/content.js'

import { Updater } from './updater/updater.js'
import { ContentUpdater } from './updater/content/content.js'
import { ElementUpdater } from './updater/element/element.js'
import { AttributeUpdater } from './updater/attribute.js'
import { EventUpdater } from './updater/event.js'

import { Component } from './updater/content/component.js'

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

const HTMLTagRx = /<([^\s>]+)/

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

/**
 * Template class is core of the library
 * it efficiently creates template literal to usable DOM
 */
export class Template {
  template: DocumentFragment
  templateParts: Expression[]

  constructor(private staticParts: TemplateStringsArray) {
    const templateParts: Expression[] = []

    const template = document.createDocumentFragment()
    template.appendChild(parseTemplateString(staticParts))

    /**
     * About the doAfterWalkTree,
     * when you want to modify the DOM Tree
     * you have to do it after the walkDomTree
     * or else walkDomTree will stop.
     */
    const doAfterWalkTree: Function[] = []

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

    let index = doAfterWalkTree.length
    let afterWalkTreeFn: Function
    while (afterWalkTreeFn = doAfterWalkTree[--index])
      afterWalkTreeFn()

    /**
     * detecting MARKER and save its position.
     * So at the cloning proccess it already know
     * which part to look at.
     */
    walkDomTree(template, (node, nodeIndex) => {
      if (node.nodeType === 8 /* Node.COMMENT_NODE */)
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

    this.template = template
    this.templateParts = templateParts
  }

  clone() {
    const partUpdaters = []
    const element: Node = this.template.cloneNode(true)

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
          partUpdaters.push(new ElementUpdater(node as Element))

        else if (expression instanceof EventExpression)
          partUpdaters.push(new EventUpdater(
            node as Element,
            expression.eventName,
          ))
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
  $component: Component = null

  constructor(
    public staticParts: TemplateStringsArray,
    public element: Element,
    private partUpdaters: Updater[]
  ) {
    this.$component = null
    this.element[INSTANCE] = this
  }

  init(expressions: any[]) {
    let startIndex = 0
    let index = 0
    let updater
    while (updater = this.partUpdaters[index++]) {
      updater.init(expressions.slice(
        startIndex,
        startIndex += updater.numberOfPart,
      ))
    }
  }

  update(expressions: any[]) {
    let partIndex = 0
    let updaterIndex = 0
    let updater
    while (updater = this.partUpdaters[updaterIndex++])
      updater.update(expressions.slice(
        partIndex,
        partIndex += updater.numberOfPart,
      ))
  }
}
