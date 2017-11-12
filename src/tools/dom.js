/**
 * @param {Node} dom 
 * @param {(node: Node, nodeIndex: number, stop?: Function) => void} walkerFn 
 */
export function walkDomTree(
  dom,
  walkerFn, {
  whatToShow = 1 /* NodeFilter.SHOW_ELEMENT */ | 4 /* NodeFilter.SHOW_TEXT */,
  acceptNode = () => 1 /* NodeFilter.FILTER_ACCEPT */ } = {}
) {
  const walker = document.createTreeWalker(
    dom,
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
