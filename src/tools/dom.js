import { beforeDestroyComponent } from '../core/updater/content/component.js'

/**
 * @param {Node} root 
 * @param {(node: Node, nodeIndex: number, stop?: Function) => void} walkerFn 
 */
export function walkDomTree(root, walkerFn, {
    whatToShow = 4294967295 /* NodeFilter.SHOW_ALL */,
    acceptNode = () => 1 /* NodeFilter.FILTER_ACCEPT */ } = {}) {
  const walker = document.createTreeWalker(
    root,
    whatToShow,
    { acceptNode },
    false
  )
  let nodeIndex = -1
  let isContinue = true
  const stop = () => isContinue = false
  while (walker.nextNode() && isContinue) {
    nodeIndex++
    walkerFn(walker.currentNode, nodeIndex, stop)
  }
}

/**
 * @param {Node} parentNode 
 * @param {Node} node 
 */
export function appendNode(parentNode, node) {
  return parentNode.appendChild(node)
}

/**
 * @param {Node} refNode 
 * @param {Node} node 
 */
export function insertNodeBefore(refNode, node) {
  return refNode.parentNode.insertBefore(node, refNode)
}

/**
 * @param {Node} node 
 */
export function removeNode(node) {
  beforeDestroyComponent(node)
  return node.parentNode.removeChild(node)
}

/**
 * @param {Node} oldNode 
 * @param {Node} newNode 
 */
export function replaceNode(oldNode, newNode) {
  beforeDestroyComponent(oldNode)
  return oldNode.parentNode.replaceChild(newNode, oldNode)
}
