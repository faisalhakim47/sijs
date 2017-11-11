export class NodeType {
  static filter() { }
  static map() { }
}

const nodetypeList = []

/**
 * @return {(typeof NodeType)[]}
 */
export function getNodeTypes() {
  return nodetypeList
}

/**
 * @param {typeof NodeType} NodeTypeBase
 */
export function addNodeType(NodeTypeBase) {
  nodetypeList.push(NodeTypeBase)
}
