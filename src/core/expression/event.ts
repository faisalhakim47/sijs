import { Expression } from './expression.js'

export class EventExpression extends Expression {
  constructor(
    nodeIndex: number,
    public eventName: string
  ) { super(nodeIndex) }
}
