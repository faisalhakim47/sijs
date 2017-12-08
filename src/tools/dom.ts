import { beforeDestroyComponent } from '../core/updater/content/component.js'

export function walkDomTree(
  root: Node,
  walkerFn: (node: Node | Element, nodeIndex: number, stop?: Function) => void,
  {
    whatToShow = 4294967295 /* NodeFilter.SHOW_ALL */,
    acceptNode = (node: Node) => 1 /* NodeFilter.FILTER_ACCEPT */
  } = {}) {
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

export function appendNode(parentNode: Node, node: Node) {
  return parentNode.appendChild(node)
}

export function insertNodeBefore(refNode: Node, node: Node) {
  return refNode.parentNode.insertBefore(node, refNode)
}

export function removeNode(node: Node) {
  beforeDestroyComponent(node)
  return node.parentNode.removeChild(node)
}

export function replaceNode(oldNode: Node, newNode: Node) {
  beforeDestroyComponent(oldNode)
  return oldNode.parentNode.replaceChild(newNode, oldNode)
}
