import { LitTag } from './core/expression/littag.js'
import { Directive } from './core/expression/directive.js'
import { DataStream } from './tools/datastream.js'

export const MARKER = '__sim__'
export const INSTANCE = '__sii__'
export interface LiteralPart {
  html?: string
}
export type DynamicPart = string | LitTag | Directive | Function | LiteralPart
export type AsyncDynamicPart = DynamicPart | DataStream<DynamicPart>
