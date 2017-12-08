import { Expression } from './expression.js'

export class AttributeExpression extends Expression {
  constructor(
    nodeIndex: number,
    public attributeName: string,
    public staticParts: string[]
  ) { super(nodeIndex) }
}
