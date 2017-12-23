import { LitTag } from './core/expression/littag.js'
import { Directive } from './core/expression/directive.js'
import { Observable } from './tools/observable.js'

export const MARKER = '__sim__'
export const INSTANCE = '__sii__'
export type DynamicPart = string | LitTag | Directive | Function
export type AsyncDynamicPart = DynamicPart | Observable<DynamicPart>
