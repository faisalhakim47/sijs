(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.si = {})));
}(this, (function (exports) { 'use strict';

const MARKER = '__sim__';
const PLACEHOLDER = '__sip__';
const INSTANCE = '__sii__';
const IFELSE = '__siie__';

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
  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    this.nodeIndex = nodeIndex;
  }
}

class AttributeExpression extends Expression {
  /**
   * @param {number} nodeIndex
   * @param {string} attributeName 
   * @param {string[]} staticParts 
   */
  constructor(nodeIndex, attributeName, staticParts) {
    super(nodeIndex);
    this.attributeName = attributeName;
    this.staticParts = staticParts;
  }
}

class ElementExpression extends Expression {
  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    super(nodeIndex);
  }
}

class EventExpression extends Expression {
  /**
   * @param {number} nodeIndex 
   * @param {string} eventName 
   */
  constructor(nodeIndex, eventName) {
    super(nodeIndex);
    this.eventName = eventName;
  }
}

class ContentExpression extends Expression {
  /**
   * @param {number} nodeIndex 
   */
  constructor(nodeIndex) {
    super(nodeIndex);
  }
}

class Updater {
  constructor() {
    this.numberOfPart = 1;
  }
  update() { }
}

class AttributeUpdater extends Updater {
  /**
   * @param {Attr} attribute 
   * @param {string[]} expression
   */
  constructor(attribute, staticParts) {
    super();
    this.attribute = attribute;
    this.staticParts = staticParts;
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
    this.attribute.value = value;
    this.oldValues = newValues;
  }
}

class ElementUpdater extends Updater {
  /**
   * @param {Element} node
   */
  constructor(node) {
    super();
    this.node = node;
    this.prevNode = node.previousSibling;
    this.nextNode = node.nextSibling;
    this.options = {};
  }

  update(options) {
    options = options[0];
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
   * @param {Element} node
   * @param {AttributeExpression} expression 
   */
  constructor(node, eventName) {
    super();
    this.node = node;
    this.eventName = eventName;
    this.oldListener = null;
    node.removeAttribute('on' + eventName);
  }

  /**
   * @param {((event:Event) => void)[]} newListener 
   */
  update(newListener) {
    newListener = newListener[0];
    if (newListener === this.oldListener) return
    if (this.oldListener) this.node.removeEventListener(this.eventName, this.oldListener);
    if (newListener) this.node.addEventListener(this.eventName, newListener);
    this.oldListener = newListener;
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
  /**
   * @param {Node} node
   */
  constructor(node) {
    super();

    if (node.previousSibling == null)
      node.parentNode.insertBefore(
        document.createTextNode(''),
        node,
      );

    if (node.nextSibling == null)
      node.parentNode.appendChild(document.createTextNode(''));

    this.prevNode = node.previousSibling;
    this.nextNode = node.nextSibling;
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
    const oldElement = this.prevNode.nextSibling;
    const newValue = newValues[0];
    if (newValue instanceof LitTag) {
      newValue.render(oldElement);
    }
    else if (newValue instanceof Repeat) {
      newValue.update(this.oldElements, this.prevNode, this.nextNode);
    }
    else if (('' + newValue) !== this.oldElements[0].nodeValue) {
      oldElement.nodeValue = newValue;
    }
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
    let doAfterWalkTree = [];
    walkDomTree(templateElm.content, (node) => {
      const fragment = document.createDocumentFragment();
      const staticParts = node.nodeValue
        .replace(new RegExp(MARKER, 'g'), MARKER + PLACEHOLDER + MARKER)
        .split(MARKER);
      const length = staticParts.length;
      for (let index = 0; index < length; index++) {
        fragment.appendChild(
          document.createTextNode(staticParts[index])
        );
      }
      doAfterWalkTree.push(() => {
        node.parentNode.replaceChild(fragment, node);
      });
    }, {
        whatToShow: NodeFilter.SHOW_TEXT,
        acceptNode(node) {
          return node.nodeValue.indexOf(MARKER) !== -1
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT
        }
      });
    doAfterWalkTree.forEach((fn) => fn());

    walkDomTree(templateElm.content, (node, nodeIndex) => {
      if (node.nodeType === Node.TEXT_NODE)
        return templateParts.push(new ContentExpression(
          nodeIndex,
        ))

      const length = node.attributes.length;
      for (let index = 0; index < length; index++) {
        const attribute = node.attributes.item(index);
        if (attribute.name === MARKER)
          templateParts.push(new ElementExpression(
            nodeIndex,
          ));

        else if (attribute.name.slice(0, 2) === 'on')
          templateParts.push(new EventExpression(
            nodeIndex,
            attribute.name.slice(2),
          ));

        else if (attribute.value.indexOf(MARKER) !== -1)
          templateParts.push(new AttributeExpression(
            nodeIndex,
            attribute.name,
            attribute.value.split(MARKER),
          ));
      }
    }, {
        acceptNode(node) {
          if (node.nodeType === Node.TEXT_NODE)
            return node.nodeValue === PLACEHOLDER
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP
          else return node.hasAttributes()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
        }
      });

    this.templateElm = templateElm;
    this.templateParts = templateParts;
  }

  create() {
    const partUpdaters = [];
    const element = document.importNode(this.templateElm.content, true);

    walkDomTree(element, (node, nodeIndex, stop) => {

      this.templateParts.filter((expression) => {
        return expression.nodeIndex === nodeIndex
      }).forEach((expression) => {
        if (expression instanceof ContentExpression)
          partUpdaters.push(new ContentUpdater(node));

        else if (expression instanceof AttributeExpression)
          partUpdaters.push(new AttributeUpdater(
            node.attributes.getNamedItem(expression.attributeName),
            expression.staticParts,
          ));

        else if (expression instanceof ElementExpression)
          partUpdaters.push(new ElementUpdater(node));

        else if (expression instanceof EventExpression)
          partUpdaters.push(new EventUpdater(
            node,
            expression.eventName,
          ));
      });

    }, {
        acceptNode(node) {
          if (node.nodeType === Node.TEXT_NODE)
            return node.nodeValue === PLACEHOLDER
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP
          else return node.hasAttributes()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
        }
      });

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

exports.html = html;
exports.repeat = repeat;

Object.defineProperty(exports, '__esModule', { value: true });

})));
