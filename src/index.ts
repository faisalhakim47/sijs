import { LiteralPart } from './constant.js'
import { html } from './html.js'
import { Directive } from './core/expression/directive.js'
import { LitTag } from './core/expression/littag.js'
import { repeat, Repeat } from './builtin/directive/repeat.js'
import { until, Until } from './builtin/directive/until.js'
import { Router, Route } from './builtin/directive/router.js'
import { DataStream } from './tools/datastream.js'

export default {
  html,
  Directive,
  repeat,
  until,
  Router,
  Route,
  DataStream,
}

export {
  html,
  Directive,
  repeat,
  until,
  Router,
  Route,
  DataStream,
}
