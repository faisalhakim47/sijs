import { LitTag } from './core/expression/littag.js'
import { Directive } from './core/expression/directive.js'
import { Pipe } from './tools/subject.js'

export const MARKER = '__sim__'
export const INSTANCE = '__sii__'
export type BasicDynamicPart = string | LitTag | Directive | Function
export type DynamicPart = BasicDynamicPart | Array<BasicDynamicPart>
export type AsyncDynamicPart = DynamicPart | Pipe<DynamicPart>
