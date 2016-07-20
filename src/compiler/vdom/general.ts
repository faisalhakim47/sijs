import { Component } from './../component'
import { TChild, h, Elem } from './../elem'
import { RouterView } from './../routerview'
import { genId } from './../uid'
import { IGlobalAttribute, IAllAttribute } from './../interfaces'
import { ObsObject } from '../../observer/observable'
import { isString } from '../../tools/typecheck'

export const vdom = {
  // HTML-Standard
  a: createElemFn('a'),
  abbr: createElemFn('abbr'),
  address: createElemFn('address'),
  area: createElemFn('area'),
  b: createElemFn('b'),
  base: createElemFn('base'),
  bdo: createElemFn('bdo'),
  blockquote: createElemFn('blockquote'),
  body: createElemFn('body'),
  br: createElemFn('br'),
  button: createElemFn('button'),
  caption: createElemFn('caption'),
  cite: createElemFn('cite'),
  code: createElemFn('code'),
  col: createElemFn('col'),
  colgroup: createElemFn('colgroup'),
  dd: createElemFn('dd'),
  del: createElemFn('del'),
  dfn: createElemFn('dfn'),
  div: createElemFn('div'),
  dl: createElemFn('dl'),
  dt: createElemFn('dt'),
  em: createElemFn('em'),
  fieldset: createElemFn('fieldset'),
  form: createElemFn('form'),
  h1: createElemFn('h1'),
  h2: createElemFn('h2'),
  h3: createElemFn('h3'),
  h4: createElemFn('h4'),
  h5: createElemFn('h5'),
  h6: createElemFn('h6'),
  head: createElemFn('head'),
  hr: createElemFn('hr'),
  html: createElemFn('html'),
  i: createElemFn('i'),
  iframe: createElemFn('iframe'),
  img: createElemFn('img'),
  input: createElemFn('input'),
  ins: createElemFn('ins'),
  kbd: createElemFn('kbd'),
  label: createElemFn('label'),
  legend: createElemFn('legend'),
  li: createElemFn('li'),
  link: createElemFn('link'),
  map: createElemFn('map'),
  meta: createElemFn('meta'),
  noscript: createElemFn('noscript'),
  object: createElemFn('object'),
  ol: createElemFn('ol'),
  optgroup: createElemFn('optgroup'),
  option: createElemFn('option'),
  p: createElemFn('p'),
  param: createElemFn('param'),
  pre: createElemFn('pre'),
  q: createElemFn('q'),
  s: createElemFn('s'),
  samp: createElemFn('samp'),
  script: createElemFn('script'),
  select: createElemFn('select'),
  small: createElemFn('small'),
  span: createElemFn('span'),
  strong: createElemFn('strong'),
  style: createElemFn('style'),
  sub: createElemFn('sub'),
  sup: createElemFn('sup'),
  table: createElemFn('table'),
  tbody: createElemFn('tbody'),
  td: createElemFn('td'),
  textarea: createElemFn('textarea'),
  tfoot: createElemFn('tfoot'),
  th: createElemFn('th'),
  thead: createElemFn('thead'),
  title: createElemFn('title'),
  tr: createElemFn('tr'),
  u: createElemFn('u'),
  ul: createElemFn('ul'),
  variable: createElemFn('var'),

  // HTML5
  article: createElemFn('article'),
  aside: createElemFn('aside'),
  audio: createElemFn('audio'),
  bdi: createElemFn('bdi'),
  canvas: createElemFn('canvas'),
  data: createElemFn('data'),
  datalist: createElemFn('datalist'),
  details: createElemFn('details'),
  dialog: createElemFn('dialog'),
  element: createElemFn('element'),
  embed: createElemFn('embed'),
  figcaption: createElemFn('figcaption'),
  figure: createElemFn('figure'),
  footer: createElemFn('footer'),
  header: createElemFn('header'),
  main: createElemFn('main'),
  mark: createElemFn('mark'),
  menu: createElemFn('menu'),
  menuitem: createElemFn('menuitem'),
  meter: createElemFn('meter'),
  nav: createElemFn('nav'),
  output: createElemFn('output'),
  picture: createElemFn('picture'),
  progress: createElemFn('progress'),
  rp: createElemFn('rp'),
  rt: createElemFn('rt'),
  rtc: createElemFn('rtc'),
  ruby: createElemFn('ruby'),
  section: createElemFn('section'),
  source: createElemFn('source'),
  summary: createElemFn('summary'),
  template: createElemFn('template'),
  time: createElemFn('time'),
  track: createElemFn('track'),
  video: createElemFn('video'),
  wbr: createElemFn('wbr')
}

function createElemFn(tag: string) {
  return (attrs?: IAllAttribute, children?: (TChild[] | TChild)): Elem => {
    if (!Array.isArray(children)) {
      children = [<TChild>children]
    }
    return h(tag, attrs, <TChild[]>children)
  }
}
