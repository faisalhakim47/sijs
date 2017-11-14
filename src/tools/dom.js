/**
 * @param {Node} root 
 * @param {(node: Node, nodeIndex: number, stop?: Function) => void} walkerFn 
 */
export function walkDomTree(
  root,
  walkerFn, {
    whatToShow = 4294967295 /* NodeFilter.SHOW_ALL */,
    acceptNode = () => 1 /* NodeFilter.FILTER_ACCEPT */
  } = {}
) {
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
