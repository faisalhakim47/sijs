import { Directive } from './core/expression/directive.js'
import { html, LitTag } from './core/expression/littag.js'
import { repeat, Repeat } from './builtin/directive/repeat.js'
import { until, Until } from './builtin/directive/until.js'
import { Router, Route } from './builtin/directive/router.js'
import { DataStream } from './tools/datastream.js'

export default {
  Directive,
  html, LitTag,
  repeat, Repeat,
  until, Until,
  Router, Route,
  DataStream,
}

export {
  Directive,
  html, LitTag,
  repeat, Repeat,
  until, Until,
  Router, Route,
  DataStream,
}
