(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.si = {})));
}(this, (function (exports) { 'use strict';

class NodeType {
  static filter() { }
  static map() { }
}

const nodetypeList = [];

/**
 * @return {(typeof NodeType)[]}
 */
function getNodeTypes() {
  return nodetypeList
}

/**
 * @param {typeof NodeType} NodeTypeBase
 */
function addNodeType(NodeTypeBase) {
  nodetypeList.push(NodeTypeBase);
}

class List {
  constructor() {
    this.keys = [];
    this.values = [];
  }

  set(key, value) {
    this.keys.push(key);
    this.values.push(value);
  }

  get(key) {
    return this.values[this.keys.indexOf(key)]
  }

  remove(key) {
    const index = this.keys.indexOf(key);
    this.keys.splice(index, 1);
    this.values.splice(index, 1);
  }
}

class Expression {
  filter() { }

  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    this.nodeIndex = nodeIndex;
  }
}

const expressionList = new List();

/**
 * @param {number} nodeTypeBase
 * @return {(typeof Expression)[]}
 */
function getExpressionsFor(nodeTypeBase) {
  return expressionList.get(nodeTypeBase)
}

/**
 * @param {number} nodeTypeBase
 * @param {typeof Expression} expressionBase
 */
function addExpressionFor(nodeTypeBase, expressionBase) {
  const directives = getExpressionsFor(nodeTypeBase);
  if (Array.isArray(directives)) directives.push(expressionBase);
  else expressionList.set(nodeTypeBase, [expressionBase]);
}

class Updater {
  static filter() { }
  static map() { }
  update() { }
}

const updaterList = new List();

/**
 * @param {typeof Expression} expressionBase
 * @return {(typeof Updater)[]}
 */
function getUpdatersFor(expressionBase) {
  return updaterList.get(expressionBase)
}

/**
 * @param {typeof Expression} expressionBase
 * @param {typeof Updater} updater
 */
function addUpdaterFor(expressionBase, updater) {
  const updaters = getUpdatersFor(expressionBase);
  if (Array.isArray(updaters)) updaters.push(updater);
  else updaterList.set(expressionBase, [updater]);
}

const MARKER = '__sijs_marker__';
const PLACEHOLDER = '__sijs_placeholder__';
const INSTANCE = '__sijs_instance__';

/**
 * @param {Node} dom 
 * @param {(node: Node, nodeIndex: number, stop?: Function) => void} walkerFn 
 */
function walkDomTree(dom, walkerFn, { whatToShow, acceptNode } = {}) {
  const options = {
    acceptNode: acceptNode || (() => NodeFilter.FILTER_ACCEPT)
  };
  const walker = document.createTreeWalker(
    dom,
    whatToShow || (NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT),
    options,
    false
  );
  let nodeIndex = -1;
  let isContinue = true;
  const stop = () => isContinue = false;
  while (walker.nextNode() && isContinue) {
    nodeIndex++;
    walkerFn(walker.currentNode, nodeIndex, stop);
  }
}

const templateCache = new List();

/**
 * @param {TemplateStringsArray} staticParts 
 */
function requestTemplate(staticParts) {
  /**
   * @type {Template}
   */
  const cachedTemplate = templateCache.get(staticParts);
  if (cachedTemplate instanceof Template) {
    return cachedTemplate
  }
  const newTemplate = new Template(staticParts);
  templateCache.set(staticParts, newTemplate);
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
    const templateParts = [];
    const templateElm = document.createElement('template');
    templateElm.innerHTML = staticParts.join(MARKER);

    /**
     * About the doAfterWalkTree,
     * when you want to modify the DOM Tree
     * you have to do it after the walkDomTree
     * or else walkDomTree will stop.
     */
    const doAfterWalkTree = [];

    walkDomTree(templateElm.content, (node) => {
      if (node.nodeValue.indexOf(MARKER) === -1) return
      const fragment = document.createDocumentFragment();
      const staticParts = node.nodeValue
        .split(MARKER)
        .join(MARKER + PLACEHOLDER + MARKER)
        .split(MARKER)
        .map((text) => document.createTextNode(text))
        .forEach((textNode) => {
          fragment.appendChild(textNode);
        });
      doAfterWalkTree.push(() => {
        node.parentNode.replaceChild(fragment, node);
      });
    }, {
        whatToShow: NodeFilter.SHOW_TEXT,
        acceptNode(node) {
          if (node.nodeValue.indexOf(MARKER) !== -1) {
            return NodeFilter.FILTER_ACCEPT
          }
        }
      });

    doAfterWalkTree.forEach((fn) => fn());

    walkDomTree(templateElm.content, (node, nodeIndex) => {
      const NodeTypeBase = getNodeTypes()
        .find((NodeTypeBase) => {
          return NodeTypeBase.filter(node)
        });

      if (!(NodeTypeBase && NodeTypeBase.prototype instanceof NodeType)) return

      NodeTypeBase.map(node, nodeIndex, (...args) => {

        const ExpressionBase = getExpressionsFor(NodeTypeBase)
          .find((ExpressionBase) => {
            return ExpressionBase.filter(...args)
          });

        if (!(ExpressionBase && ExpressionBase.prototype instanceof Expression)) return

        templateParts.push(new ExpressionBase(nodeIndex, ...args));

      });
    });

    this.templateElm = templateElm;
    this.templateParts = templateParts;
  }

  create() {
    const partUpdaters = [];
    const element = document.importNode(this.templateElm.content, true);
    let partIndex = 0;
    let expression = this.templateParts[partIndex];

    const doAfterWalkTree = [];

    walkDomTree(element, (node, nodeIndex, stop) => {
      if (!expression) return stop()
      if (expression.nodeIndex !== nodeIndex) return

      const UpdaterBase = getUpdatersFor(expression.constructor)
        .find((UpdaterBase) => {
          return UpdaterBase.filter(expression)
        });

      if (!(UpdaterBase && UpdaterBase.prototype instanceof Updater)) return

      partUpdaters.push(new UpdaterBase(node, expression));

      expression = this.templateParts[++partIndex];
    });

    doAfterWalkTree.forEach((fn) => fn());

    return new TemplateInstance(
      this,
      element.children.item(0),
      partUpdaters,
    )
  }
}

class TemplateInstance {
  /**
   * @param {Template} template 
   * @param {Node} element 
   * @param {Updater[]} partUpdaters 
   */
  constructor(template, element, partUpdaters) {
    this.template = template;
    this.element = element;
    this.partUpdaters = partUpdaters;
  }

  /**
   * @param {any[]} expressions 
   */
  update(expressions) {
    let startIndex = 0;
    this.partUpdaters.forEach((updater) => {
      updater.update(expressions.slice(
        startIndex,
        startIndex += updater.numberOfPart,
      ));
    });
  }
}

class LitTag {
  /**
   * @param {TemplateStringsArray} staticParts 
   * @param {any[]} dymanicParts 
   */
  constructor(staticParts, dymanicParts) {
    this.staticParts = staticParts;
    this.dymanicParts = dymanicParts;
  }

  /**
   * @param {TemplateInstance} instance 
   */
  verify(instance) {
    return templateCache.get(this.staticParts) === instance.template
  }

  compile() {
    const instance = requestTemplate(this.staticParts).create();
    instance.element[INSTANCE] = instance;
    instance.update(this.dymanicParts);
    return instance
  }

  /**
   * @param {Node} container
   */
  render(container) {
    if (container[INSTANCE] instanceof TemplateInstance && this.verify(container[INSTANCE])) {
      const instance = container[INSTANCE];
      instance.update(this.dymanicParts);
    } else {
      const instance = this.compile();
      container.parentNode.replaceChild(instance.element, container);
    }
  }
}

/**
 * @param {TemplateStringsArray} staticParts 
 * @param {any[]} dynamicParts
 */
function html(staticParts, ...dynamicParts) {
  return new LitTag(staticParts, dynamicParts)
}

class ElementNodeType extends NodeType {
  /**
   * @param {Node} node 
   */
  static filter(node) {
    return node.nodeType === Node.ELEMENT_NODE && node.hasAttributes()
  }

  /**
   * @param {Node} node
   * @param {Function} node
   */
  static map(node, nodeIndex, mapFn) {
    for (const attribute of node.attributes) mapFn(attribute);
  }
}

class TextNodeType extends NodeType {
  /**
   * @param {Node} node 
   */
  static filter(node) {
    return node.nodeType === Node.TEXT_NODE && node.nodeValue === PLACEHOLDER
  }

  /**
   * @param {Node} node
   * @param {Function} node
   */
  static map(node, nodeIndex, mapFn) {
    mapFn();
  }
}

class AttributeExpression extends Expression {
  /**
   * @param {Attr} attribute 
   */
  static filter(attribute) {
    return attribute.value.indexOf(MARKER) !== -1
  }

  /**
   * @param {number} nodeIndex
   * @param {Attr} attribute 
   */
  constructor(nodeIndex, attribute) {
    super(nodeIndex);
    this.attributeName = attribute.name;
    this.staticParts = attribute.value.split(MARKER);
  }
}

class ContentExpression extends Expression {
  static filter() {
    return true
  }

  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    super(nodeIndex);
  }
}

class ElementExpression extends Expression {
  /**
   * @param {Attr} attribute 
   */
  static filter(attribute) {
    return attribute.name === MARKER
  }

  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    super(nodeIndex);
  }
}

class AttributeUpdater extends Updater {
  static filter() { return true }

  /**
   * @param {Node} node 
   * @param {AttributeExpression} expression
   */
  constructor(node, expression) {
    super();
    this.node = node;
    this.attributeName = expression.attributeName;
    this.staticParts = expression.staticParts;
    /* @type {string[]}  */
    this.oldValues = [];
    this.numberOfPart = staticParts.length - 1;
  }

  /**
   * @param {string[]} newValues 
   */
  update(newValues) {
    if (newValues.findIndex((newValue, index) => {
      return newValue !== this.oldValues[index]
    }) === -1) return
    let newValueIndex = 0;
    const lastPartIndex = this.numberOfPart;
    const value = this.staticParts.map((staticPart, index) => {
      if (index === lastPartIndex) return staticPart
      return staticPart + newValues[newValueIndex++]
    }).join('');
    this.node.setAttribute(this.attributeName, value);
    this.oldValues = newValues;
  }
}

/**
 * @param {any[]} items
 * @param {(item: any, index: number) => LitTag} mapFn 
 */
function repeat(items, mapFn) {
  return new Repeat(items, mapFn)
}

class Repeat {
  /**
   * @param {any[]} items
   * @param {(item: any, index: number) => LitTag} mapFn 
   */
  constructor(items, mapFn) {
    this.items = items;
    this.mapFn = mapFn;
  }

  /**
   * @param {Node} prevNode 
   * @param {Node} nextNode 
   */
  update(oldElements, prevNode, nextNode) {
    const parentNode = nextNode.parentNode;
    this.items.map(this.mapFn).forEach((litTag) => {
      const oldElement = oldElements.shift();
      if (oldElement) litTag.render(oldElement);
      else {
        const instance = litTag.compile();
        parentNode.insertBefore(instance.element, nextNode);
      }
    });
    oldElements.forEach((oldElement) => {
      parentNode.removeChild(oldElement);
    });
  }
}

class ContentUpdater extends Updater {
  static filter() { return true }

  /**
   * @param {Node} node
   */
  constructor(node, expression) {
    super();
    if (node.previousSibling == null) {
      node.parentNode.insertBefore(
        document.createTextNode(''),
        node
      );
    }
    this.prevNode = node.previousSibling;
    this.nextNode = node.nextSibling;
    this.numberOfPart = 1;
  }

  get oldElements() {
    let content = this.prevNode.nextSibling;
    /**
     * @type {Node[]}
     */
    const oldElements = [];
    while (content !== this.nextNode) {
      oldElements.push(content);
      content = content.nextSibling;
    }
    return oldElements
  }

  update(newValues) {
    const oldElement = this.oldElements[0];
    const newValue = newValues[0];
    if (newValue instanceof LitTag) {
      newValue.render(oldElement);
    }
    else if (newValue instanceof Repeat) {
      newValue.update(this.oldElements, this.prevNode, this.nextNode);
    }
    else if (('' + newValues) !== this.oldElements[0].nodeValue) {
      oldElement.nodeValue = newValues;
    }
  }
}

class ElementUpdater extends Updater {
  static filter() { return true }

  /**
   * @param {Element} node 
   */
  constructor(node) {
    super();
    this.node = node;
    this.prevNode = node.previousSibling;
    this.nextNode = node.nextSibling;
    this.options = {};
    this.numberOfPart = 1;
  }

  update(options) {
    for (const key in options) {
      const newOption = options[key];
      if (key === 'if') {
        if (newOption === this.options.if) continue
        else if (!newOption) {
          this.nextNode.parentNode.removeChild(
            this.node,
          );
          this.nextNode[IFELSE] = false;
        }
        else if (newOption) {
          this.nextNode.parentNode.insertBefore(
            this.node,
            this.nextNode,
          );
          this.nextNode[IFELSE] = true;
        }
        this.options.if = newOption;
      }
      else if (key === 'elseIf') {
        const prevIf = this.prevNode[IFELSE];
        if (newOption === this.options.elseIf && prevIf === this.options.prevIf) {
          continue
        }
        if (!newOption || prevIf) {
          this.nextNode.parentNode.removeChild(
            this.node,
          );
          this.nextNode[IFELSE] = prevIf;
        }
        else if (newOption) {
          this.nextNode.parentNode.insertBefore(
            this.node,
            this.nextNode,
          );
          this.nextNode[IFELSE] = true;
        }
        this.options.prevIf = prevIf;
        this.options.elseIf = newOption;
      }
    }
  }
}

class EventUpdater extends Updater {
  /**
   * @param {AttributeExpression} expression 
   */
  static filter(expression) {
    return expression.attributeName.slice(0, 2) === 'on'
  }

  /**
   * @param {Element} node 
   * @param {AttributeExpression} expression 
   */
  constructor(node, expression) {
    super();
    this.node = node;
    this.eventName = expression.attributeName.slice(2);
    this.oldListener = null;
    this.numberOfPart = 1;
    this.node.removeAttribute(expression.attributeName);
  }

  /**
   * @param {(event:Event) => void} newListener 
   */
  update(newListener) {
    newListener = newListener[0];
    if (newListener === this.oldListener) return
    if (this.oldListener) this.node.removeEventListener(this.eventName, this.oldListener);
    if (newListener) this.node.addEventListener(this.eventName, newListener);
    this.oldListener = newListener;
  }
}

/** the sequence affects the results */

addNodeType(ElementNodeType);
addNodeType(TextNodeType);

addExpressionFor(ElementNodeType, AttributeExpression);
addExpressionFor(ElementNodeType, ElementExpression);
addExpressionFor(TextNodeType, ContentExpression);

addUpdaterFor(AttributeExpression, EventUpdater);
addUpdaterFor(AttributeExpression, AttributeUpdater);
addUpdaterFor(ContentExpression, ContentUpdater);
addUpdaterFor(ElementExpression, ElementUpdater);

exports.html = html;
exports.repeat = repeat;

Object.defineProperty(exports, '__esModule', { value: true });

})));
