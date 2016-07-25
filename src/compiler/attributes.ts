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
import { isObservable, isObserved, getObsValue, parseObsValue } from '../observer/observable'

const onRx = /^on/

export function Attrs(attrs: IAllAttribute = {}): string {
  let id: string
  if (attrs.id) {
    id = parseObsValue(attrs.id)
  } else {
    id = genId()
  }
  let template = ` id="${id}"`
  attrs.id = null

  if (attrs.className !== undefined) {
    template += ' class="'
    if (attrs.class !== undefined) {
      template += `${parseObsValue(attrs.class)}`
      attrs.class = null
    }
    Object.keys(attrs.className).forEach((className) => {
      const cond = parseObsValue(attrs.className[name])
      if (cond && isObservable(attrs.className[name])) {
        if (cond) template = ` ${className}`
        CompilerState.glues.push(
          new ClassGlue(id, name, attrs.className[name])
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
      let value = parseObsValue(attrs.style[styleName])
      if (isObservable(attrs.style[styleName])) {
        CompilerState.glues.push(
          new StyleGlue(id, styleName, attrs.style[styleName])
        )
      }
      template += `${camelToSnake(styleName)}:${value}`
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
    const val = parseObsValue(attrs[name])

    if (val === null) return

    if (onRx.test(name)) {
      CompilerState.glues.push(
        new EventGlue(id, name, val)
      )
      CompilerState.events.push(name)
    } else {
      template += `${name}="${val}"`
      if (isObservable(attrs[name])) {
        CompilerState.glues.push(
          new AttrGlue(id, name, attrs[name])
        )
      }
      template += '"'
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
  accesskey? // FUTURE CHANGE
  class? // FUTURE CHANGE
  dir? // FUTURE CHANGE
  draggable? // FUTURE CHANGE
  dropzone? // FUTURE CHANGE
  hidden? // FUTURE CHANGE
  id? // FUTURE CHANGE
  itemprop? // FUTURE CHANGE
  lang? // FUTURE CHANGE
  spellcheck? // FUTURE CHANGE
  style? // FUTURE CHANGE
  tabindex? // FUTURE CHANGE
  title? // FUTURE CHANGE

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
  accept? // FUTURE CHANGE
  'accept-charset'? // FUTURE CHANGE
  accesskey? // FUTURE CHANGE
  action? // FUTURE CHANGE
  align? // FUTURE CHANGE
  alt? // FUTURE CHANGE
  autocomplete? // FUTURE CHANGE
  autofocus? // FUTURE CHANGE
  autoplay? // FUTURE CHANGE
  autosave? // FUTURE CHANGE
  bgcolor? // FUTURE CHANGE
  border? // FUTURE CHANGE
  buffered? // FUTURE CHANGE
  challenge? // FUTURE CHANGE
  charset? // FUTURE CHANGE
  checked? // FUTURE CHANGE
  cite? // FUTURE CHANGE
  class? // FUTURE CHANGE
  code? // FUTURE CHANGE
  codebase? // FUTURE CHANGE
  color? // FUTURE CHANGE
  cols? // FUTURE CHANGE
  colspan? // FUTURE CHANGE
  content? // FUTURE CHANGE
  contenteditable? // FUTURE CHANGE
  contextmenu? // FUTURE CHANGE
  controls? // FUTURE CHANGE
  coords? // FUTURE CHANGE
  data? // FUTURE CHANGE
  datetime? // FUTURE CHANGE
  default? // FUTURE CHANGE
  defer? // FUTURE CHANGE
  dir? // FUTURE CHANGE
  dirname? // FUTURE CHANGE
  disabled? // FUTURE CHANGE
  download? // FUTURE CHANGE
  draggable? // FUTURE CHANGE
  dropzone? // FUTURE CHANGE
  enctype? // FUTURE CHANGE
  for? // FUTURE CHANGE
  form? // FUTURE CHANGE
  formaction? // FUTURE CHANGE
  headers? // FUTURE CHANGE
  height? // FUTURE CHANGE
  hidden? // FUTURE CHANGE
  high? // FUTURE CHANGE
  href? // FUTURE CHANGE
  hreflang? // FUTURE CHANGE
  'http-equiv'? // FUTURE CHANGE
  icon? // FUTURE CHANGE
  id? // FUTURE CHANGE
  ismap? // FUTURE CHANGE
  itemprop? // FUTURE CHANGE
  keytype? // FUTURE CHANGE
  kind? // FUTURE CHANGE
  label? // FUTURE CHANGE
  lang? // FUTURE CHANGE
  language? // FUTURE CHANGE
  list? // FUTURE CHANGE
  loop? // FUTURE CHANGE
  low? // FUTURE CHANGE
  manifest? // FUTURE CHANGE
  max? // FUTURE CHANGE
  maxlength? // FUTURE CHANGE
  media? // FUTURE CHANGE
  method? // FUTURE CHANGE
  min? // FUTURE CHANGE
  multiple? // FUTURE CHANGE
  muted? // FUTURE CHANGE
  name? // FUTURE CHANGE
  novalidate? // FUTURE CHANGE
  open? // FUTURE CHANGE
  optimum? // FUTURE CHANGE
  pattern? // FUTURE CHANGE
  ping? // FUTURE CHANGE
  placeholder? // FUTURE CHANGE
  poster? // FUTURE CHANGE
  preload? // FUTURE CHANGE
  radiogroup? // FUTURE CHANGE
  readonly? // FUTURE CHANGE
  rel? // FUTURE CHANGE
  required? // FUTURE CHANGE
  reversed? // FUTURE CHANGE
  rows? // FUTURE CHANGE
  rowspan? // FUTURE CHANGE
  scope? // FUTURE CHANGE
  scoped? // FUTURE CHANGE
  seamless? // FUTURE CHANGE
  selected? // FUTURE CHANGE
  shape? // FUTURE CHANGE
  size? // FUTURE CHANGE
  sizes? // FUTURE CHANGE
  span? // FUTURE CHANGE
  spellcheck? // FUTURE CHANGE
  src? // FUTURE CHANGE
  srcdoc? // FUTURE CHANGE
  srclang? // FUTURE CHANGE
  srcset? // FUTURE CHANGE
  start? // FUTURE CHANGE
  step? // FUTURE CHANGE
  style? // FUTURE CHANGE
  summary? // FUTURE CHANGE
  tabindex? // FUTURE CHANGE
  target? // FUTURE CHANGE
  title? // FUTURE CHANGE
  type? // FUTURE CHANGE
  usemap? // FUTURE CHANGE
  value? // FUTURE CHANGE
  width? // FUTURE CHANGE
  wrap? // FUTURE CHANGE
}

export interface IStyles {
  [index: number]: any
  alignContent? // FUTURE CHANGE
  alignItems? // FUTURE CHANGE
  alignSelf? // FUTURE CHANGE
  alignmentBaseline? // FUTURE CHANGE
  animation? // FUTURE CHANGE
  animationDelay? // FUTURE CHANGE
  animationDirection? // FUTURE CHANGE
  animationDuration? // FUTURE CHANGE
  animationFillMode? // FUTURE CHANGE
  animationIterationCount? // FUTURE CHANGE
  animationName? // FUTURE CHANGE
  animationPlayState? // FUTURE CHANGE
  animationTimingFunction? // FUTURE CHANGE
  backfaceVisibility? // FUTURE CHANGE
  background? // FUTURE CHANGE
  backgroundAttachment? // FUTURE CHANGE
  backgroundClip? // FUTURE CHANGE
  backgroundColor? // FUTURE CHANGE
  backgroundImage? // FUTURE CHANGE
  backgroundOrigin? // FUTURE CHANGE
  backgroundPosition? // FUTURE CHANGE
  backgroundPositionX? // FUTURE CHANGE
  backgroundPositionY? // FUTURE CHANGE
  backgroundRepeat? // FUTURE CHANGE
  backgroundSize? // FUTURE CHANGE
  baselineShift? // FUTURE CHANGE
  border? // FUTURE CHANGE
  borderBottom? // FUTURE CHANGE
  borderBottomColor? // FUTURE CHANGE
  borderBottomLeftRadius? // FUTURE CHANGE
  borderBottomRightRadius? // FUTURE CHANGE
  borderBottomStyle? // FUTURE CHANGE
  borderBottomWidth? // FUTURE CHANGE
  borderCollapse? // FUTURE CHANGE
  borderColor? // FUTURE CHANGE
  borderImage? // FUTURE CHANGE
  borderImageOutset? // FUTURE CHANGE
  borderImageRepeat? // FUTURE CHANGE
  borderImageSlice? // FUTURE CHANGE
  borderImageSource? // FUTURE CHANGE
  borderImageWidth? // FUTURE CHANGE
  borderLeft? // FUTURE CHANGE
  borderLeftColor? // FUTURE CHANGE
  borderLeftStyle? // FUTURE CHANGE
  borderLeftWidth? // FUTURE CHANGE
  borderRadius? // FUTURE CHANGE
  borderRight? // FUTURE CHANGE
  borderRightColor? // FUTURE CHANGE
  borderRightStyle? // FUTURE CHANGE
  borderRightWidth? // FUTURE CHANGE
  borderSpacing? // FUTURE CHANGE
  borderStyle? // FUTURE CHANGE
  borderTop? // FUTURE CHANGE
  borderTopColor? // FUTURE CHANGE
  borderTopLeftRadius? // FUTURE CHANGE
  borderTopRightRadius? // FUTURE CHANGE
  borderTopStyle? // FUTURE CHANGE
  borderTopWidth? // FUTURE CHANGE
  borderWidth? // FUTURE CHANGE
  bottom? // FUTURE CHANGE
  boxShadow? // FUTURE CHANGE
  boxSizing? // FUTURE CHANGE
  breakAfter? // FUTURE CHANGE
  breakBefore? // FUTURE CHANGE
  breakInside? // FUTURE CHANGE
  captionSide? // FUTURE CHANGE
  clear? // FUTURE CHANGE
  clip? // FUTURE CHANGE
  clipPath? // FUTURE CHANGE
  clipRule? // FUTURE CHANGE
  color? // FUTURE CHANGE
  colorInterpolationFilters? // FUTURE CHANGE
  columnCount? // FUTURE CHANGE
  columnFill? // FUTURE CHANGE
  columnGap? // FUTURE CHANGE
  columnRule? // FUTURE CHANGE
  columnRuleColor? // FUTURE CHANGE
  columnRuleStyle? // FUTURE CHANGE
  columnRuleWidth? // FUTURE CHANGE
  columnSpan? // FUTURE CHANGE
  columnWidth? // FUTURE CHANGE
  columns? // FUTURE CHANGE
  content? // FUTURE CHANGE
  counterIncrement? // FUTURE CHANGE
  counterReset? // FUTURE CHANGE
  cssFloat? // FUTURE CHANGE
  cssText? // FUTURE CHANGE
  cursor? // FUTURE CHANGE
  direction? // FUTURE CHANGE
  display? // FUTURE CHANGE
  dominantBaseline? // FUTURE CHANGE
  emptyCells? // FUTURE CHANGE
  enableBackground? // FUTURE CHANGE
  fill? // FUTURE CHANGE
  fillOpacity? // FUTURE CHANGE
  fillRule? // FUTURE CHANGE
  filter? // FUTURE CHANGE
  flex? // FUTURE CHANGE
  flexBasis? // FUTURE CHANGE
  flexDirection? // FUTURE CHANGE
  flexFlow? // FUTURE CHANGE
  flexGrow? // FUTURE CHANGE
  flexShrink? // FUTURE CHANGE
  flexWrap? // FUTURE CHANGE
  floodColor? // FUTURE CHANGE
  floodOpacity? // FUTURE CHANGE
  font? // FUTURE CHANGE
  fontFamily? // FUTURE CHANGE
  fontFeatureSettings? // FUTURE CHANGE
  fontSize? // FUTURE CHANGE
  fontSizeAdjust? // FUTURE CHANGE
  fontStretch? // FUTURE CHANGE
  fontStyle? // FUTURE CHANGE
  fontVariant? // FUTURE CHANGE
  fontWeight? // FUTURE CHANGE
  glyphOrientationHorizontal? // FUTURE CHANGE
  glyphOrientationVertical? // FUTURE CHANGE
  height? // FUTURE CHANGE
  imeMode? // FUTURE CHANGE
  justifyContent? // FUTURE CHANGE
  kerning? // FUTURE CHANGE
  left? // FUTURE CHANGE
  length? // FUTURE CHANGE
  letterSpacing? // FUTURE CHANGE
  lightingColor? // FUTURE CHANGE
  lineHeight? // FUTURE CHANGE
  listStyle? // FUTURE CHANGE
  listStyleImage? // FUTURE CHANGE
  listStylePosition? // FUTURE CHANGE
  listStyleType? // FUTURE CHANGE
  margin? // FUTURE CHANGE
  marginBottom? // FUTURE CHANGE
  marginLeft? // FUTURE CHANGE
  marginRight? // FUTURE CHANGE
  marginTop? // FUTURE CHANGE
  marker? // FUTURE CHANGE
  markerEnd? // FUTURE CHANGE
  markerMid? // FUTURE CHANGE
  markerStart? // FUTURE CHANGE
  mask? // FUTURE CHANGE
  maxHeight? // FUTURE CHANGE
  maxWidth? // FUTURE CHANGE
  minHeight? // FUTURE CHANGE
  minWidth? // FUTURE CHANGE
  msContentZoomChaining? // FUTURE CHANGE
  msContentZoomLimit? // FUTURE CHANGE
  msContentZoomLimitMax? // FUTURE CHANGE
  msContentZoomLimitMin? // FUTURE CHANGE
  msContentZoomSnap? // FUTURE CHANGE
  msContentZoomSnapPoints? // FUTURE CHANGE
  msContentZoomSnapType? // FUTURE CHANGE
  msContentZooming? // FUTURE CHANGE
  msFlowFrom? // FUTURE CHANGE
  msFlowInto? // FUTURE CHANGE
  msFontFeatureSettings? // FUTURE CHANGE
  msGridColumn? // FUTURE CHANGE
  msGridColumnAlign? // FUTURE CHANGE
  msGridColumnSpan? // FUTURE CHANGE
  msGridColumns? // FUTURE CHANGE
  msGridRow? // FUTURE CHANGE
  msGridRowAlign? // FUTURE CHANGE
  msGridRowSpan? // FUTURE CHANGE
  msGridRows? // FUTURE CHANGE
  msHighContrastAdjust? // FUTURE CHANGE
  msHyphenateLimitChars? // FUTURE CHANGE
  msHyphenateLimitLines? // FUTURE CHANGE
  msHyphenateLimitZone? // FUTURE CHANGE
  msHyphens? // FUTURE CHANGE
  msImeAlign? // FUTURE CHANGE
  msOverflowStyle? // FUTURE CHANGE
  msScrollChaining? // FUTURE CHANGE
  msScrollLimit? // FUTURE CHANGE
  msScrollLimitXMax? // FUTURE CHANGE
  msScrollLimitXMin? // FUTURE CHANGE
  msScrollLimitYMax? // FUTURE CHANGE
  msScrollLimitYMin? // FUTURE CHANGE
  msScrollRails? // FUTURE CHANGE
  msScrollSnapPointsX? // FUTURE CHANGE
  msScrollSnapPointsY? // FUTURE CHANGE
  msScrollSnapType? // FUTURE CHANGE
  msScrollSnapX? // FUTURE CHANGE
  msScrollSnapY? // FUTURE CHANGE
  msScrollTranslation? // FUTURE CHANGE
  msTextCombineHorizontal? // FUTURE CHANGE
  msTextSizeAdjust? // FUTURE CHANGE
  msTouchAction? // FUTURE CHANGE
  msTouchSelect? // FUTURE CHANGE
  msUserSelect? // FUTURE CHANGE
  msWrapFlow? // FUTURE CHANGE
  msWrapMargin? // FUTURE CHANGE
  msWrapThrough? // FUTURE CHANGE
  opacity? // FUTURE CHANGE
  order? // FUTURE CHANGE
  orphans? // FUTURE CHANGE
  outline? // FUTURE CHANGE
  outlineColor? // FUTURE CHANGE
  outlineStyle? // FUTURE CHANGE
  outlineWidth? // FUTURE CHANGE
  overflow? // FUTURE CHANGE
  overflowX? // FUTURE CHANGE
  overflowY? // FUTURE CHANGE
  padding? // FUTURE CHANGE
  paddingBottom? // FUTURE CHANGE
  paddingLeft? // FUTURE CHANGE
  paddingRight? // FUTURE CHANGE
  paddingTop? // FUTURE CHANGE
  pageBreakAfter? // FUTURE CHANGE
  pageBreakBefore? // FUTURE CHANGE
  pageBreakInside? // FUTURE CHANGE
  parentRule?: CSSRule
  perspective? // FUTURE CHANGE
  perspectiveOrigin? // FUTURE CHANGE
  pointerEvents? // FUTURE CHANGE
  position? // FUTURE CHANGE
  quotes? // FUTURE CHANGE
  right? // FUTURE CHANGE
  rubyAlign? // FUTURE CHANGE
  rubyOverhang? // FUTURE CHANGE
  rubyPosition? // FUTURE CHANGE
  stopColor? // FUTURE CHANGE
  stopOpacity? // FUTURE CHANGE
  stroke? // FUTURE CHANGE
  strokeDasharray? // FUTURE CHANGE
  strokeDashoffset? // FUTURE CHANGE
  strokeLinecap? // FUTURE CHANGE
  strokeLinejoin? // FUTURE CHANGE
  strokeMiterlimit? // FUTURE CHANGE
  strokeOpacity? // FUTURE CHANGE
  strokeWidth? // FUTURE CHANGE
  tableLayout? // FUTURE CHANGE
  textAlign? // FUTURE CHANGE
  textAlignLast? // FUTURE CHANGE
  textAnchor? // FUTURE CHANGE
  textDecoration? // FUTURE CHANGE
  textFillColor? // FUTURE CHANGE
  textIndent? // FUTURE CHANGE
  textJustify? // FUTURE CHANGE
  textKashida? // FUTURE CHANGE
  textKashidaSpace? // FUTURE CHANGE
  textOverflow? // FUTURE CHANGE
  textShadow? // FUTURE CHANGE
  textTransform? // FUTURE CHANGE
  textUnderlinePosition? // FUTURE CHANGE
  top? // FUTURE CHANGE
  touchAction? // FUTURE CHANGE
  transform? // FUTURE CHANGE
  transformOrigin? // FUTURE CHANGE
  transformStyle? // FUTURE CHANGE
  transition? // FUTURE CHANGE
  transitionDelay? // FUTURE CHANGE
  transitionDuration? // FUTURE CHANGE
  transitionProperty? // FUTURE CHANGE
  transitionTimingFunction? // FUTURE CHANGE
  unicodeBidi? // FUTURE CHANGE
  verticalAlign? // FUTURE CHANGE
  visibility? // FUTURE CHANGE
  webkitAlignContent? // FUTURE CHANGE
  webkitAlignItems? // FUTURE CHANGE
  webkitAlignSelf? // FUTURE CHANGE
  webkitAnimation? // FUTURE CHANGE
  webkitAnimationDelay? // FUTURE CHANGE
  webkitAnimationDirection? // FUTURE CHANGE
  webkitAnimationDuration? // FUTURE CHANGE
  webkitAnimationFillMode? // FUTURE CHANGE
  webkitAnimationIterationCount? // FUTURE CHANGE
  webkitAnimationName? // FUTURE CHANGE
  webkitAnimationPlayState? // FUTURE CHANGE
  webkitAnimationTimingFunction? // FUTURE CHANGE
  webkitAppearance? // FUTURE CHANGE
  webkitBackfaceVisibility? // FUTURE CHANGE
  webkitBackground? // FUTURE CHANGE
  webkitBackgroundAttachment? // FUTURE CHANGE
  webkitBackgroundClip? // FUTURE CHANGE
  webkitBackgroundColor? // FUTURE CHANGE
  webkitBackgroundImage? // FUTURE CHANGE
  webkitBackgroundOrigin? // FUTURE CHANGE
  webkitBackgroundPosition? // FUTURE CHANGE
  webkitBackgroundPositionX? // FUTURE CHANGE
  webkitBackgroundPositionY? // FUTURE CHANGE
  webkitBackgroundRepeat? // FUTURE CHANGE
  webkitBackgroundSize? // FUTURE CHANGE
  webkitBorderBottomLeftRadius? // FUTURE CHANGE
  webkitBorderBottomRightRadius? // FUTURE CHANGE
  webkitBorderImage? // FUTURE CHANGE
  webkitBorderImageOutset? // FUTURE CHANGE
  webkitBorderImageRepeat? // FUTURE CHANGE
  webkitBorderImageSlice? // FUTURE CHANGE
  webkitBorderImageSource? // FUTURE CHANGE
  webkitBorderImageWidth? // FUTURE CHANGE
  webkitBorderRadius? // FUTURE CHANGE
  webkitBorderTopLeftRadius? // FUTURE CHANGE
  webkitBorderTopRightRadius? // FUTURE CHANGE
  webkitBoxAlign? // FUTURE CHANGE
  webkitBoxDirection? // FUTURE CHANGE
  webkitBoxFlex? // FUTURE CHANGE
  webkitBoxOrdinalGroup? // FUTURE CHANGE
  webkitBoxOrient? // FUTURE CHANGE
  webkitBoxPack? // FUTURE CHANGE
  webkitBoxSizing? // FUTURE CHANGE
  webkitColumnBreakAfter? // FUTURE CHANGE
  webkitColumnBreakBefore? // FUTURE CHANGE
  webkitColumnBreakInside? // FUTURE CHANGE
  webkitColumnCount? // FUTURE CHANGE
  webkitColumnGap? // FUTURE CHANGE
  webkitColumnRule? // FUTURE CHANGE
  webkitColumnRuleColor? // FUTURE CHANGE
  webkitColumnRuleStyle? // FUTURE CHANGE
  webkitColumnRuleWidth? // FUTURE CHANGE
  webkitColumnSpan? // FUTURE CHANGE
  webkitColumnWidth? // FUTURE CHANGE
  webkitColumns? // FUTURE CHANGE
  webkitFilter? // FUTURE CHANGE
  webkitFlex? // FUTURE CHANGE
  webkitFlexBasis? // FUTURE CHANGE
  webkitFlexDirection? // FUTURE CHANGE
  webkitFlexFlow? // FUTURE CHANGE
  webkitFlexGrow? // FUTURE CHANGE
  webkitFlexShrink? // FUTURE CHANGE
  webkitFlexWrap? // FUTURE CHANGE
  webkitJustifyContent? // FUTURE CHANGE
  webkitOrder? // FUTURE CHANGE
  webkitPerspective? // FUTURE CHANGE
  webkitPerspectiveOrigin? // FUTURE CHANGE
  webkitTapHighlightColor? // FUTURE CHANGE
  webkitTextFillColor? // FUTURE CHANGE
  webkitTextSizeAdjust? // FUTURE CHANGE
  webkitTransform? // FUTURE CHANGE
  webkitTransformOrigin? // FUTURE CHANGE
  webkitTransformStyle? // FUTURE CHANGE
  webkitTransition? // FUTURE CHANGE
  webkitTransitionDelay? // FUTURE CHANGE
  webkitTransitionDuration? // FUTURE CHANGE
  webkitTransitionProperty? // FUTURE CHANGE
  webkitTransitionTimingFunction? // FUTURE CHANGE
  webkitUserSelect? // FUTURE CHANGE
  webkitWritingMode? // FUTURE CHANGE
  whiteSpace? // FUTURE CHANGE
  widows? // FUTURE CHANGE
  width? // FUTURE CHANGE
  wordBreak? // FUTURE CHANGE
  wordSpacing? // FUTURE CHANGE
  wordWrap? // FUTURE CHANGE
  writingMode? // FUTURE CHANGE
  zIndex? // FUTURE CHANGE
  zoom? // FUTURE CHANGE
}
