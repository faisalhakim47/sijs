/**
 * @param {Node} dom 
 * @param {(node: Node, nodeIndex: number, stop?: Function) => void} walkerFn 
 */
export function walkDomTree(dom, walkerFn, { whatToShow, acceptNode } = {}) {
  const options = {
    acceptNode: acceptNode || (() => NodeFilter.FILTER_ACCEPT)
  }
  const walker = document.createTreeWalker(
    dom,
    whatToShow || (NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT),
    options,
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
