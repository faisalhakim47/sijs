import { Component } from './component'
import { RouterView } from './routerview'
import { CompilerState } from './index'
import { genId } from './uid'
import { Glue } from '../glue/index'
import { ClassGlue } from '../glue/attributes/class'
import { EventGlue } from '../glue/attributes/event'
import { AttrGlue } from '../glue/attributes/general'
import { LinkGlue } from '../glue/attributes/link'
import { StyleGlue } from '../glue/attributes/style'
import { status } from '../instance/status'
import { camelToSnake } from '../tools/string'
import { isBoolean, isString } from '../tools/typecheck'

const onRx = /^on/

export function attrs(attrs: IAllAttribute = {}): string {
  let id: string
  if (attrs.id) {
    const attrId = attrs.id
    if (attrId instanceof Function) {
      id = attrId()
    } else {
      id = attrId
    }
  } else {
    id = genId()
  }
  let template = ` id="${id}"`
  attrs.id = null

  if (attrs.className !== undefined) {
    template += ' class="'
    if (attrs.class !== undefined) {
      const attrClass = attrs.class
      template += attrClass instanceof Function
        ? attrClass()
        : attrClass
      attrs.class = null
    }
    Object.keys(attrs.className).forEach((className) => {
      const cond = attrs.className[name]
      if (cond instanceof Function) {
        if (cond()) template = ` ${className}`
        CompilerState.glues.push(
          new ClassGlue(id, name, cond)
        )
      } else if (!!cond) {
        template = ` ${className}`
      }
    })
    template += '"'
    attrs.className = null
  }

  if (attrs.style !== undefined) {
    template += 'style="'
    Object.keys(attrs.style).forEach((styleName) => {
      let value = attrs.style[styleName]
      if (value instanceof Function) {
        CompilerState.glues.push(
          new StyleGlue(id, styleName, attrs.style[styleName])
        )
        template += `${camelToSnake(styleName)}:${value()};`
      } else {
        template += `${camelToSnake(styleName)}:${value};`
      }
    })
    template += '"'
    attrs.style = null
  }

  if (attrs.link !== undefined) {
    CompilerState.glues.push(
      new LinkGlue(id, attrs.link)
    )
    CompilerState.events.push('onclick')

    attrs.href = attrs.link

    attrs.link = null
  }

  Object.keys(attrs).forEach((name) => {
    const value = attrs[name]

    if (value === null) return

    if (onRx.test(name)) {
      CompilerState.glues.push(new EventGlue(
        id, name, value.bind(Component.ACTIVE_COMPONENT)
      ))
      CompilerState.events.push(name)
    } else if (value instanceof Function) {
      template += `${name}="${value()}"`
      CompilerState.glues.push(
        new AttrGlue(id, name, value)
      )
    } else {
      template += `${name}="${value}"`
    }
  })

  return template
}

export interface IGlobalAttribute {
  // Custom Attributes
  [name: string]: any
  if?
  model?
  link?
  className?: {
    [name: string]: any
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  accesskey?: string | Function
  class?: string | Function
  dir?: string | Function
  draggable?: string | Function
  dropzone?: string | Function
  hidden?: string | Function
  id?: string | Function
  itemprop?: string | Function
  lang?: string | Function
  spellcheck?: string | Function
  style?: string | Function
  tabindex?: string | Function
  title?: string | Function

  // Events
  onabort?: Function
  onautocomplete?: Function
  onautocompleteerror?: Function
  onblur?: Function
  oncancel?: Function
  oncanplay?: Function
  oncanplaythrough?: Function
  onchange?: Function
  onclick?: Function
  onclose?: Function
  oncontextmenu?: Function
  oncuechange?: Function
  ondblclick?: Function
  ondrag?: Function
  ondragend?: Function
  ondragenter?: Function
  ondragexit?: Function
  ondragleave?: Function
  ondragover?: Function
  ondragstart?: Function
  ondrop?: Function
  ondurationchange?: Function
  onemptied?: Function
  onended?: Function
  onerror?: Function
  onfocus?: Function
  oninput?: Function
  oninvalid?: Function
  onkeydown?: Function
  onkeypress?: Function
  onkeyup?: Function
  onload?: Function
  onloadeddata?: Function
  onloadedmetadata?: Function
  onloadstart?: Function
  onmousedown?: Function
  onmouseenter?: Function
  onmouseleave?: Function
  onmousemove?: Function
  onmouseout?: Function
  onmouseover?: Function
  onmouseup?: Function
  onmousewheel?: Function
  onpause?: Function
  onplay?: Function
  onplaying?: Function
  onprogress?: Function
  onratechange?: Function
  onreset?: Function
  onresize?: Function
  onscroll?: Function
  onseeked?: Function
  onseeking?: Function
  onselect?: Function
  onshow?: Function
  onsort?: Function
  onstalled?: Function
  onsubmit?: Function
  onsuspend?: Function
  ontimeupdate?: Function
  ontoggle?: Function
  onvolumechange?: Function
  onwaiting?: Function
}

export interface IAllAttribute extends IGlobalAttribute {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  accept?: string | Function
  'accept-charset'?: string | Function
  accesskey?: string | Function
  action?: string | Function
  align?: string | Function
  alt?: string | Function
  autocomplete?: string | Function
  autofocus?: string | Function
  autoplay?: string | Function
  autosave?: string | Function
  bgcolor?: string | Function
  border?: string | Function
  buffered?: string | Function
  challenge?: string | Function
  charset?: string | Function
  checked?: string | Function
  cite?: string | Function
  class?: string | Function
  code?: string | Function
  codebase?: string | Function
  color?: string | Function
  cols?: string | Function
  colspan?: string | Function
  content?: string | Function
  contenteditable?: string | Function
  contextmenu?: string | Function
  controls?: string | Function
  coords?: string | Function
  data?: string | Function
  datetime?: string | Function
  default?: string | Function
  defer?: string | Function
  dir?: string | Function
  dirname?: string | Function
  disabled?: string | Function
  download?: string | Function
  draggable?: string | Function
  dropzone?: string | Function
  enctype?: string | Function
  for?: string | Function
  form?: string | Function
  formaction?: string | Function
  headers?: string | Function
  height?: string | Function
  hidden?: string | Function
  high?: string | Function
  href?: string | Function
  hreflang?: string | Function
  'http-equiv'?: string | Function
  icon?: string | Function
  id?: string | Function
  ismap?: string | Function
  itemprop?: string | Function
  keytype?: string | Function
  kind?: string | Function
  label?: string | Function
  lang?: string | Function
  language?: string | Function
  list?: string | Function
  loop?: string | Function
  low?: string | Function
  manifest?: string | Function
  max?: string | Function
  maxlength?: string | Function
  media?: string | Function
  method?: string | Function
  min?: string | Function
  multiple?: string | Function
  muted?: string | Function
  name?: string | Function
  novalidate?: string | Function
  open?: string | Function
  optimum?: string | Function
  pattern?: string | Function
  ping?: string | Function
  placeholder?: string | Function
  poster?: string | Function
  preload?: string | Function
  radiogroup?: string | Function
  readonly?: string | Function
  rel?: string | Function
  required?: string | Function
  reversed?: string | Function
  rows?: string | Function
  rowspan?: string | Function
  scope?: string | Function
  scoped?: string | Function
  seamless?: string | Function
  selected?: string | Function
  shape?: string | Function
  size?: string | Function
  sizes?: string | Function
  span?: string | Function
  spellcheck?: string | Function
  src?: string | Function
  srcdoc?: string | Function
  srclang?: string | Function
  srcset?: string | Function
  start?: string | Function
  step?: string | Function
  style?: string | Function
  summary?: string | Function
  tabindex?: string | Function
  target?: string | Function
  title?: string | Function
  type?: string | Function
  usemap?: string | Function
  value?: string | Function
  width?: string | Function
  wrap?: string | Function
}

export interface IStyles {
  [index: number]: any
  alignContent?: string | Function
  alignItems?: string | Function
  alignSelf?: string | Function
  alignmentBaseline?: string | Function
  animation?: string | Function
  animationDelay?: string | Function
  animationDirection?: string | Function
  animationDuration?: string | Function
  animationFillMode?: string | Function
  animationIterationCount?: string | Function
  animationName?: string | Function
  animationPlayState?: string | Function
  animationTimingFunction?: string | Function
  backfaceVisibility?: string | Function
  background?: string | Function
  backgroundAttachment?: string | Function
  backgroundClip?: string | Function
  backgroundColor?: string | Function
  backgroundImage?: string | Function
  backgroundOrigin?: string | Function
  backgroundPosition?: string | Function
  backgroundPositionX?: string | Function
  backgroundPositionY?: string | Function
  backgroundRepeat?: string | Function
  backgroundSize?: string | Function
  baselineShift?: string | Function
  border?: string | Function
  borderBottom?: string | Function
  borderBottomColor?: string | Function
  borderBottomLeftRadius?: string | Function
  borderBottomRightRadius?: string | Function
  borderBottomStyle?: string | Function
  borderBottomWidth?: string | Function
  borderCollapse?: string | Function
  borderColor?: string | Function
  borderImage?: string | Function
  borderImageOutset?: string | Function
  borderImageRepeat?: string | Function
  borderImageSlice?: string | Function
  borderImageSource?: string | Function
  borderImageWidth?: string | Function
  borderLeft?: string | Function
  borderLeftColor?: string | Function
  borderLeftStyle?: string | Function
  borderLeftWidth?: string | Function
  borderRadius?: string | Function
  borderRight?: string | Function
  borderRightColor?: string | Function
  borderRightStyle?: string | Function
  borderRightWidth?: string | Function
  borderSpacing?: string | Function
  borderStyle?: string | Function
  borderTop?: string | Function
  borderTopColor?: string | Function
  borderTopLeftRadius?: string | Function
  borderTopRightRadius?: string | Function
  borderTopStyle?: string | Function
  borderTopWidth?: string | Function
  borderWidth?: string | Function
  bottom?: string | Function
  boxShadow?: string | Function
  boxSizing?: string | Function
  breakAfter?: string | Function
  breakBefore?: string | Function
  breakInside?: string | Function
  captionSide?: string | Function
  clear?: string | Function
  clip?: string | Function
  clipPath?: string | Function
  clipRule?: string | Function
  color?: string | Function
  colorInterpolationFilters?: string | Function
  columnCount?: string | Function
  columnFill?: string | Function
  columnGap?: string | Function
  columnRule?: string | Function
  columnRuleColor?: string | Function
  columnRuleStyle?: string | Function
  columnRuleWidth?: string | Function
  columnSpan?: string | Function
  columnWidth?: string | Function
  columns?: string | Function
  content?: string | Function
  counterIncrement?: string | Function
  counterReset?: string | Function
  cssFloat?: string | Function
  cssText?: string | Function
  cursor?: string | Function
  direction?: string | Function
  display?: string | Function
  dominantBaseline?: string | Function
  emptyCells?: string | Function
  enableBackground?: string | Function
  fill?: string | Function
  fillOpacity?: string | Function
  fillRule?: string | Function
  filter?: string | Function
  flex?: string | Function
  flexBasis?: string | Function
  flexDirection?: string | Function
  flexFlow?: string | Function
  flexGrow?: string | Function
  flexShrink?: string | Function
  flexWrap?: string | Function
  floodColor?: string | Function
  floodOpacity?: string | Function
  font?: string | Function
  fontFamily?: string | Function
  fontFeatureSettings?: string | Function
  fontSize?: string | Function
  fontSizeAdjust?: string | Function
  fontStretch?: string | Function
  fontStyle?: string | Function
  fontVariant?: string | Function
  fontWeight?: string | Function
  glyphOrientationHorizontal?: string | Function
  glyphOrientationVertical?: string | Function
  height?: string | Function
  imeMode?: string | Function
  justifyContent?: string | Function
  kerning?: string | Function
  left?: string | Function
  length?: string | Function
  letterSpacing?: string | Function
  lightingColor?: string | Function
  lineHeight?: string | Function
  listStyle?: string | Function
  listStyleImage?: string | Function
  listStylePosition?: string | Function
  listStyleType?: string | Function
  margin?: string | Function
  marginBottom?: string | Function
  marginLeft?: string | Function
  marginRight?: string | Function
  marginTop?: string | Function
  marker?: string | Function
  markerEnd?: string | Function
  markerMid?: string | Function
  markerStart?: string | Function
  mask?: string | Function
  maxHeight?: string | Function
  maxWidth?: string | Function
  minHeight?: string | Function
  minWidth?: string | Function
  msContentZoomChaining?: string | Function
  msContentZoomLimit?: string | Function
  msContentZoomLimitMax?: string | Function
  msContentZoomLimitMin?: string | Function
  msContentZoomSnap?: string | Function
  msContentZoomSnapPoints?: string | Function
  msContentZoomSnapType?: string | Function
  msContentZooming?: string | Function
  msFlowFrom?: string | Function
  msFlowInto?: string | Function
  msFontFeatureSettings?: string | Function
  msGridColumn?: string | Function
  msGridColumnAlign?: string | Function
  msGridColumnSpan?: string | Function
  msGridColumns?: string | Function
  msGridRow?: string | Function
  msGridRowAlign?: string | Function
  msGridRowSpan?: string | Function
  msGridRows?: string | Function
  msHighContrastAdjust?: string | Function
  msHyphenateLimitChars?: string | Function
  msHyphenateLimitLines?: string | Function
  msHyphenateLimitZone?: string | Function
  msHyphens?: string | Function
  msImeAlign?: string | Function
  msOverflowStyle?: string | Function
  msScrollChaining?: string | Function
  msScrollLimit?: string | Function
  msScrollLimitXMax?: string | Function
  msScrollLimitXMin?: string | Function
  msScrollLimitYMax?: string | Function
  msScrollLimitYMin?: string | Function
  msScrollRails?: string | Function
  msScrollSnapPointsX?: string | Function
  msScrollSnapPointsY?: string | Function
  msScrollSnapType?: string | Function
  msScrollSnapX?: string | Function
  msScrollSnapY?: string | Function
  msScrollTranslation?: string | Function
  msTextCombineHorizontal?: string | Function
  msTextSizeAdjust?: string | Function
  msTouchAction?: string | Function
  msTouchSelect?: string | Function
  msUserSelect?: string | Function
  msWrapFlow?: string | Function
  msWrapMargin?: string | Function
  msWrapThrough?: string | Function
  opacity?: string | Function
  order?: string | Function
  orphans?: string | Function
  outline?: string | Function
  outlineColor?: string | Function
  outlineStyle?: string | Function
  outlineWidth?: string | Function
  overflow?: string | Function
  overflowX?: string | Function
  overflowY?: string | Function
  padding?: string | Function
  paddingBottom?: string | Function
  paddingLeft?: string | Function
  paddingRight?: string | Function
  paddingTop?: string | Function
  pageBreakAfter?: string | Function
  pageBreakBefore?: string | Function
  pageBreakInside?: string | Function
  parentRule?: CSSRule
  perspective?: string | Function
  perspectiveOrigin?: string | Function
  pointerEvents?: string | Function
  position?: string | Function
  quotes?: string | Function
  right?: string | Function
  rubyAlign?: string | Function
  rubyOverhang?: string | Function
  rubyPosition?: string | Function
  stopColor?: string | Function
  stopOpacity?: string | Function
  stroke?: string | Function
  strokeDasharray?: string | Function
  strokeDashoffset?: string | Function
  strokeLinecap?: string | Function
  strokeLinejoin?: string | Function
  strokeMiterlimit?: string | Function
  strokeOpacity?: string | Function
  strokeWidth?: string | Function
  tableLayout?: string | Function
  textAlign?: string | Function
  textAlignLast?: string | Function
  textAnchor?: string | Function
  textDecoration?: string | Function
  textFillColor?: string | Function
  textIndent?: string | Function
  textJustify?: string | Function
  textKashida?: string | Function
  textKashidaSpace?: string | Function
  textOverflow?: string | Function
  textShadow?: string | Function
  textTransform?: string | Function
  textUnderlinePosition?: string | Function
  top?: string | Function
  touchAction?: string | Function
  transform?: string | Function
  transformOrigin?: string | Function
  transformStyle?: string | Function
  transition?: string | Function
  transitionDelay?: string | Function
  transitionDuration?: string | Function
  transitionProperty?: string | Function
  transitionTimingFunction?: string | Function
  unicodeBidi?: string | Function
  verticalAlign?: string | Function
  visibility?: string | Function
  webkitAlignContent?: string | Function
  webkitAlignItems?: string | Function
  webkitAlignSelf?: string | Function
  webkitAnimation?: string | Function
  webkitAnimationDelay?: string | Function
  webkitAnimationDirection?: string | Function
  webkitAnimationDuration?: string | Function
  webkitAnimationFillMode?: string | Function
  webkitAnimationIterationCount?: string | Function
  webkitAnimationName?: string | Function
  webkitAnimationPlayState?: string | Function
  webkitAnimationTimingFunction?: string | Function
  webkitAppearance?: string | Function
  webkitBackfaceVisibility?: string | Function
  webkitBackground?: string | Function
  webkitBackgroundAttachment?: string | Function
  webkitBackgroundClip?: string | Function
  webkitBackgroundColor?: string | Function
  webkitBackgroundImage?: string | Function
  webkitBackgroundOrigin?: string | Function
  webkitBackgroundPosition?: string | Function
  webkitBackgroundPositionX?: string | Function
  webkitBackgroundPositionY?: string | Function
  webkitBackgroundRepeat?: string | Function
  webkitBackgroundSize?: string | Function
  webkitBorderBottomLeftRadius?: string | Function
  webkitBorderBottomRightRadius?: string | Function
  webkitBorderImage?: string | Function
  webkitBorderImageOutset?: string | Function
  webkitBorderImageRepeat?: string | Function
  webkitBorderImageSlice?: string | Function
  webkitBorderImageSource?: string | Function
  webkitBorderImageWidth?: string | Function
  webkitBorderRadius?: string | Function
  webkitBorderTopLeftRadius?: string | Function
  webkitBorderTopRightRadius?: string | Function
  webkitBoxAlign?: string | Function
  webkitBoxDirection?: string | Function
  webkitBoxFlex?: string | Function
  webkitBoxOrdinalGroup?: string | Function
  webkitBoxOrient?: string | Function
  webkitBoxPack?: string | Function
  webkitBoxSizing?: string | Function
  webkitColumnBreakAfter?: string | Function
  webkitColumnBreakBefore?: string | Function
  webkitColumnBreakInside?: string | Function
  webkitColumnCount?: string | Function
  webkitColumnGap?: string | Function
  webkitColumnRule?: string | Function
  webkitColumnRuleColor?: string | Function
  webkitColumnRuleStyle?: string | Function
  webkitColumnRuleWidth?: string | Function
  webkitColumnSpan?: string | Function
  webkitColumnWidth?: string | Function
  webkitColumns?: string | Function
  webkitFilter?: string | Function
  webkitFlex?: string | Function
  webkitFlexBasis?: string | Function
  webkitFlexDirection?: string | Function
  webkitFlexFlow?: string | Function
  webkitFlexGrow?: string | Function
  webkitFlexShrink?: string | Function
  webkitFlexWrap?: string | Function
  webkitJustifyContent?: string | Function
  webkitOrder?: string | Function
  webkitPerspective?: string | Function
  webkitPerspectiveOrigin?: string | Function
  webkitTapHighlightColor?: string | Function
  webkitTextFillColor?: string | Function
  webkitTextSizeAdjust?: string | Function
  webkitTransform?: string | Function
  webkitTransformOrigin?: string | Function
  webkitTransformStyle?: string | Function
  webkitTransition?: string | Function
  webkitTransitionDelay?: string | Function
  webkitTransitionDuration?: string | Function
  webkitTransitionProperty?: string | Function
  webkitTransitionTimingFunction?: string | Function
  webkitUserSelect?: string | Function
  webkitWritingMode?: string | Function
  whiteSpace?: string | Function
  widows?: string | Function
  width?: string | Function
  wordBreak?: string | Function
  wordSpacing?: string | Function
  wordWrap?: string | Function
  writingMode?: string | Function
  zIndex?: string | Function
  zoom?: string | Function
}
