// @ts-check

import { Stream } from "./stream.js";

/**
 * @typedef Stringable
 * @property {() => string} toString
 */

/**
 * @typedef {Attr|Node|void} BasicProp
 */

/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @typedef {Array<BasicProp|FnProp<TagName>>} ArrayProp
 */

/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @typedef {(element: HTMLElementTagNameMap[TagName]) => (BasicProp|ArrayProp<TagName>)} FnProp
 */

/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @typedef {BasicProp|FnProp<TagName>|Stream<BasicProp>} Prop
 */

/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @template {HTMLElementTagNameMap[TagName]} Elm
 * @param {TagName|Elm} tagNameOrElement
 * @param {Array<Prop<TagName>|Array<Prop<TagName>>>} [args]
 * @returns {HTMLElementTagNameMap[TagName]|Elm}
 */
export function createElement(tagNameOrElement, ...args) {
   /** @type {HTMLElementTagNameMap[TagName]|Elm} */
  const element = (typeof tagNameOrElement === 'string')
    ? document.createElement(tagNameOrElement)
    : tagNameOrElement;

  for (const propOrProps of args) {
    const props = Array.isArray(propOrProps) ? propOrProps : [propOrProps];
    for (const prop of props) {
      attachProp(element, prop);
    }
  }

  return element;
}

/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @template {keyof HTMLElementEventMap} EventName
 * @param {TagName} tagName
 * @param {EventName} eventName
 */
export function createProducerElement(tagName, eventName) {
  const element = createElement(tagName);
  /** @type {Stream<HTMLElementEventMap[EventName]>} */
  const stream = Stream.fromProducer((next) => {
    createElement(element, createListener(eventName, next));
  });
  return { element, stream };
}

/**
 * @template {keyof HTMLElementEventMap} EventName
 * @param {EventName} eventName
 * @param {(this: HTMLElement, ev: HTMLElementEventMap[EventName]) => any} listener
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {(element: HTMLElement) => void}
 */
export function createListener(eventName, listener, options) {
  return (element) => {
    element.addEventListener(eventName, listener, options);
  };
}

/**
 * @param {Stringable} data
 */
export function createText(data) {
  return document.createTextNode(data.toString());
}

/**
 * @template {keyof AttrTagNameMap} TagName
 * @param {AttrTagNameMap[TagName]} attrs
 * @returns {(element: HTMLElementTagNameMap[TagName]) => AttrTagNameMap[TagName]}
 */
export function createAttribute(attrs) {
  return (element) => attrs;
}

/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @param {HTMLElementTagNameMap[TagName]} element
 * @param {Prop<TagName>} prop
 * @param {BasicProp} [prevContent]
 */
async function attachProp(element, prop, prevContent) {
  if (!prop) {
    return;
  }

  if (prevContent instanceof Attr) {
    element.removeAttributeNode(prevContent);
  }

  if (prop instanceof Attr) {
    if (prevContent instanceof Element) {
      element.removeChild(prevContent);
    }
    element.setAttributeNode(prop);
  }

  else if (prop instanceof Node) {
    if (prevContent instanceof Node && !(prevContent instanceof Attr)) {
      element.replaceChild(prop, prevContent);
    } else {
      element.appendChild(prop);
    }
  }

  else if (typeof prop === 'function') {
    const computedProp = prop(element);
    if (Array.isArray(computedProp)) {
      for (const childProp of computedProp) {
        attachProp(element, childProp);
      }
    } else {
      attachProp(element, computedProp);
    }
  }

  else if (prop instanceof Stream) {
    /** @type {BasicProp} */
    let prevChildProp = document.createComment('');
    element.appendChild(prevChildProp);
    for await (let producedProp of prop) {
      if (!producedProp) producedProp = document.createComment('');
      attachProp(element, producedProp, prevChildProp);
      prevChildProp = producedProp;
    }
  }
}
