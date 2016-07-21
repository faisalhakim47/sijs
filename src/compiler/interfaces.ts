import { Glue } from '../glue/glue'
import { ObsObject } from '../observer/observable'

export interface IElem {
  _isElem: boolean
  id: string
  template: string
  glues: Glue[]
  events: string[]
}

export interface IGlobalAttribute {
  // custom
  [name: string]: any
  empty?: boolean
  if?: ObsObject
  model?: ObsObject
  link?: string
  className?: IStyles

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  accesskey?: string | ObsObject
  class?: string | ObsObject
  dir?: string | ObsObject
  draggable?: string | ObsObject
  dropzone?: string | ObsObject
  hidden?: string | ObsObject
  id?: string | ObsObject
  itemprop?: string | ObsObject
  lang?: string | ObsObject
  spellcheck?: string | ObsObject
  style?: string | ObsObject
  tabindex?: string | ObsObject
  title?: string | ObsObject

  // Events
  onabort?: string | ObsObject
  onautocomplete?: string | ObsObject
  onautocompleteerror?: string | ObsObject
  onblur?: string | ObsObject
  oncancel?: string | ObsObject
  oncanplay?: string | ObsObject
  oncanplaythrough?: string | ObsObject
  onchange?: string | ObsObject
  onclick?: string | ObsObject
  onclose?: string | ObsObject
  oncontextmenu?: string | ObsObject
  oncuechange?: string | ObsObject
  ondblclick?: string | ObsObject
  ondrag?: string | ObsObject
  ondragend?: string | ObsObject
  ondragenter?: string | ObsObject
  ondragexit?: string | ObsObject
  ondragleave?: string | ObsObject
  ondragover?: string | ObsObject
  ondragstart?: string | ObsObject
  ondrop?: string | ObsObject
  ondurationchange?: string | ObsObject
  onemptied?: string | ObsObject
  onended?: string | ObsObject
  onerror?: string | ObsObject
  onfocus?: string | ObsObject
  oninput?: string | ObsObject
  oninvalid?: string | ObsObject
  onkeydown?: string | ObsObject
  onkeypress?: string | ObsObject
  onkeyup?: string | ObsObject
  onload?: string | ObsObject
  onloadeddata?: string | ObsObject
  onloadedmetadata?: string | ObsObject
  onloadstart?: string | ObsObject
  onmousedown?: string | ObsObject
  onmouseenter?: string | ObsObject
  onmouseleave?: string | ObsObject
  onmousemove?: string | ObsObject
  onmouseout?: string | ObsObject
  onmouseover?: string | ObsObject
  onmouseup?: string | ObsObject
  onmousewheel?: string | ObsObject
  onpause?: string | ObsObject
  onplay?: string | ObsObject
  onplaying?: string | ObsObject
  onprogress?: string | ObsObject
  onratechange?: string | ObsObject
  onreset?: string | ObsObject
  onresize?: string | ObsObject
  onscroll?: string | ObsObject
  onseeked?: string | ObsObject
  onseeking?: string | ObsObject
  onselect?: string | ObsObject
  onshow?: string | ObsObject
  onsort?: string | ObsObject
  onstalled?: string | ObsObject
  onsubmit?: string | ObsObject
  onsuspend?: string | ObsObject
  ontimeupdate?: string | ObsObject
  ontoggle?: string | ObsObject
  onvolumechange?: string | ObsObject
  onwaiting?: string | ObsObject
}

export interface IAllAttribute extends IGlobalAttribute {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  accept?: string | ObsObject
  'accept-charset'?: string | ObsObject
  accesskey?: string | ObsObject
  action?: string | ObsObject
  align?: string | ObsObject
  alt?: string | ObsObject
  autocomplete?: string | ObsObject
  autofocus?: string | ObsObject
  autoplay?: string | ObsObject
  autosave?: string | ObsObject
  bgcolor?: string | ObsObject
  border?: string | ObsObject
  buffered?: string | ObsObject
  challenge?: string | ObsObject
  charset?: string | ObsObject
  checked?: string | ObsObject
  cite?: string | ObsObject
  class?: string | ObsObject
  code?: string | ObsObject
  codebase?: string | ObsObject
  color?: string | ObsObject
  cols?: string | ObsObject
  colspan?: string | ObsObject
  content?: string | ObsObject
  contenteditable?: string | ObsObject
  contextmenu?: string | ObsObject
  controls?: string | ObsObject
  coords?: string | ObsObject
  data?: string | ObsObject
  datetime?: string | ObsObject
  default?: string | ObsObject
  defer?: string | ObsObject
  dir?: string | ObsObject
  dirname?: string | ObsObject
  disabled?: string | ObsObject
  download?: string | ObsObject
  draggable?: string | ObsObject
  dropzone?: string | ObsObject
  enctype?: string | ObsObject
  for?: string | ObsObject
  form?: string | ObsObject
  formaction?: string | ObsObject
  headers?: string | ObsObject
  height?: string | ObsObject
  hidden?: string | ObsObject
  high?: string | ObsObject
  href?: string | ObsObject
  hreflang?: string | ObsObject
  'http-equiv'?: string | ObsObject
  icon?: string | ObsObject
  id?: string | ObsObject
  ismap?: string | ObsObject
  itemprop?: string | ObsObject
  keytype?: string | ObsObject
  kind?: string | ObsObject
  label?: string | ObsObject
  lang?: string | ObsObject
  language?: string | ObsObject
  list?: string | ObsObject
  loop?: string | ObsObject
  low?: string | ObsObject
  manifest?: string | ObsObject
  max?: string | ObsObject
  maxlength?: string | ObsObject
  media?: string | ObsObject
  method?: string | ObsObject
  min?: string | ObsObject
  multiple?: string | ObsObject
  muted?: string | ObsObject
  name?: string | ObsObject
  novalidate?: string | ObsObject
  open?: string | ObsObject
  optimum?: string | ObsObject
  pattern?: string | ObsObject
  ping?: string | ObsObject
  placeholder?: string | ObsObject
  poster?: string | ObsObject
  preload?: string | ObsObject
  radiogroup?: string | ObsObject
  readonly?: string | ObsObject
  rel?: string | ObsObject
  required?: string | ObsObject
  reversed?: string | ObsObject
  rows?: string | ObsObject
  rowspan?: string | ObsObject
  scope?: string | ObsObject
  scoped?: string | ObsObject
  seamless?: string | ObsObject
  selected?: string | ObsObject
  shape?: string | ObsObject
  size?: string | ObsObject
  sizes?: string | ObsObject
  span?: string | ObsObject
  spellcheck?: string | ObsObject
  src?: string | ObsObject
  srcdoc?: string | ObsObject
  srclang?: string | ObsObject
  srcset?: string | ObsObject
  start?: string | ObsObject
  step?: string | ObsObject
  style?: string | ObsObject
  summary?: string | ObsObject
  tabindex?: string | ObsObject
  target?: string | ObsObject
  title?: string | ObsObject
  type?: string | ObsObject
  usemap?: string | ObsObject
  value?: string | ObsObject
  width?: string | ObsObject
  wrap?: string | ObsObject
}

export interface IStyles {
  [index: number]: string | ObsObject
  alignContent?: string | ObsObject
  alignItems?: string | ObsObject
  alignSelf?: string | ObsObject
  alignmentBaseline?: string | ObsObject
  animation?: string | ObsObject
  animationDelay?: string | ObsObject
  animationDirection?: string | ObsObject
  animationDuration?: string | ObsObject
  animationFillMode?: string | ObsObject
  animationIterationCount?: string | ObsObject
  animationName?: string | ObsObject
  animationPlayState?: string | ObsObject
  animationTimingFunction?: string | ObsObject
  backfaceVisibility?: string | ObsObject
  background?: string | ObsObject
  backgroundAttachment?: string | ObsObject
  backgroundClip?: string | ObsObject
  backgroundColor?: string | ObsObject
  backgroundImage?: string | ObsObject
  backgroundOrigin?: string | ObsObject
  backgroundPosition?: string | ObsObject
  backgroundPositionX?: string | ObsObject
  backgroundPositionY?: string | ObsObject
  backgroundRepeat?: string | ObsObject
  backgroundSize?: string | ObsObject
  baselineShift?: string | ObsObject
  border?: string | ObsObject
  borderBottom?: string | ObsObject
  borderBottomColor?: string | ObsObject
  borderBottomLeftRadius?: string | ObsObject
  borderBottomRightRadius?: string | ObsObject
  borderBottomStyle?: string | ObsObject
  borderBottomWidth?: string | ObsObject
  borderCollapse?: string | ObsObject
  borderColor?: string | ObsObject
  borderImage?: string | ObsObject
  borderImageOutset?: string | ObsObject
  borderImageRepeat?: string | ObsObject
  borderImageSlice?: string | ObsObject
  borderImageSource?: string | ObsObject
  borderImageWidth?: string | ObsObject
  borderLeft?: string | ObsObject
  borderLeftColor?: string | ObsObject
  borderLeftStyle?: string | ObsObject
  borderLeftWidth?: string | ObsObject
  borderRadius?: string | ObsObject
  borderRight?: string | ObsObject
  borderRightColor?: string | ObsObject
  borderRightStyle?: string | ObsObject
  borderRightWidth?: string | ObsObject
  borderSpacing?: string | ObsObject
  borderStyle?: string | ObsObject
  borderTop?: string | ObsObject
  borderTopColor?: string | ObsObject
  borderTopLeftRadius?: string | ObsObject
  borderTopRightRadius?: string | ObsObject
  borderTopStyle?: string | ObsObject
  borderTopWidth?: string | ObsObject
  borderWidth?: string | ObsObject
  bottom?: string | ObsObject
  boxShadow?: string | ObsObject
  boxSizing?: string | ObsObject
  breakAfter?: string | ObsObject
  breakBefore?: string | ObsObject
  breakInside?: string | ObsObject
  captionSide?: string | ObsObject
  clear?: string | ObsObject
  clip?: string | ObsObject
  clipPath?: string | ObsObject
  clipRule?: string | ObsObject
  color?: string | ObsObject
  colorInterpolationFilters?: string | ObsObject
  columnCount?: any;
  columnFill?: string | ObsObject
  columnGap?: any;
  columnRule?: string | ObsObject
  columnRuleColor?: any;
  columnRuleStyle?: string | ObsObject
  columnRuleWidth?: any;
  columnSpan?: string | ObsObject
  columnWidth?: any;
  columns?: string | ObsObject
  content?: string | ObsObject
  counterIncrement?: string | ObsObject
  counterReset?: string | ObsObject
  cssFloat?: string | ObsObject
  cssText?: string | ObsObject
  cursor?: string | ObsObject
  direction?: string | ObsObject
  display?: string | ObsObject
  dominantBaseline?: string | ObsObject
  emptyCells?: string | ObsObject
  enableBackground?: string | ObsObject
  fill?: string | ObsObject
  fillOpacity?: string | ObsObject
  fillRule?: string | ObsObject
  filter?: string | ObsObject
  flex?: string | ObsObject
  flexBasis?: string | ObsObject
  flexDirection?: string | ObsObject
  flexFlow?: string | ObsObject
  flexGrow?: string | ObsObject
  flexShrink?: string | ObsObject
  flexWrap?: string | ObsObject
  floodColor?: string | ObsObject
  floodOpacity?: string | ObsObject
  font?: string | ObsObject
  fontFamily?: string | ObsObject
  fontFeatureSettings?: string | ObsObject
  fontSize?: string | ObsObject
  fontSizeAdjust?: string | ObsObject
  fontStretch?: string | ObsObject
  fontStyle?: string | ObsObject
  fontVariant?: string | ObsObject
  fontWeight?: string | ObsObject
  glyphOrientationHorizontal?: string | ObsObject
  glyphOrientationVertical?: string | ObsObject
  height?: string | ObsObject
  imeMode?: string | ObsObject
  justifyContent?: string | ObsObject
  kerning?: string | ObsObject
  left?: string | ObsObject
  length: number;
  letterSpacing?: string | ObsObject
  lightingColor?: string | ObsObject
  lineHeight?: string | ObsObject
  listStyle?: string | ObsObject
  listStyleImage?: string | ObsObject
  listStylePosition?: string | ObsObject
  listStyleType?: string | ObsObject
  margin?: string | ObsObject
  marginBottom?: string | ObsObject
  marginLeft?: string | ObsObject
  marginRight?: string | ObsObject
  marginTop?: string | ObsObject
  marker?: string | ObsObject
  markerEnd?: string | ObsObject
  markerMid?: string | ObsObject
  markerStart?: string | ObsObject
  mask?: string | ObsObject
  maxHeight?: string | ObsObject
  maxWidth?: string | ObsObject
  minHeight?: string | ObsObject
  minWidth?: string | ObsObject
  msContentZoomChaining?: string | ObsObject
  msContentZoomLimit?: string | ObsObject
  msContentZoomLimitMax?: any;
  msContentZoomLimitMin?: any;
  msContentZoomSnap?: string | ObsObject
  msContentZoomSnapPoints?: string | ObsObject
  msContentZoomSnapType?: string | ObsObject
  msContentZooming?: string | ObsObject
  msFlowFrom?: string | ObsObject
  msFlowInto?: string | ObsObject
  msFontFeatureSettings?: string | ObsObject
  msGridColumn?: any;
  msGridColumnAlign?: string | ObsObject
  msGridColumnSpan?: any;
  msGridColumns?: string | ObsObject
  msGridRow?: any;
  msGridRowAlign?: string | ObsObject
  msGridRowSpan?: any;
  msGridRows?: string | ObsObject
  msHighContrastAdjust?: string | ObsObject
  msHyphenateLimitChars?: string | ObsObject
  msHyphenateLimitLines?: any;
  msHyphenateLimitZone?: any;
  msHyphens?: string | ObsObject
  msImeAlign?: string | ObsObject
  msOverflowStyle?: string | ObsObject
  msScrollChaining?: string | ObsObject
  msScrollLimit?: string | ObsObject
  msScrollLimitXMax?: any;
  msScrollLimitXMin?: any;
  msScrollLimitYMax?: any;
  msScrollLimitYMin?: any;
  msScrollRails?: string | ObsObject
  msScrollSnapPointsX?: string | ObsObject
  msScrollSnapPointsY?: string | ObsObject
  msScrollSnapType?: string | ObsObject
  msScrollSnapX?: string | ObsObject
  msScrollSnapY?: string | ObsObject
  msScrollTranslation?: string | ObsObject
  msTextCombineHorizontal?: string | ObsObject
  msTextSizeAdjust?: any;
  msTouchAction?: string | ObsObject
  msTouchSelect?: string | ObsObject
  msUserSelect?: string | ObsObject
  msWrapFlow?: string | ObsObject
  msWrapMargin?: any;
  msWrapThrough?: string | ObsObject
  opacity?: string | ObsObject
  order?: string | ObsObject
  orphans?: string | ObsObject
  outline?: string | ObsObject
  outlineColor?: string | ObsObject
  outlineStyle?: string | ObsObject
  outlineWidth?: string | ObsObject
  overflow?: string | ObsObject
  overflowX?: string | ObsObject
  overflowY?: string | ObsObject
  padding?: string | ObsObject
  paddingBottom?: string | ObsObject
  paddingLeft?: string | ObsObject
  paddingRight?: string | ObsObject
  paddingTop?: string | ObsObject
  pageBreakAfter?: string | ObsObject
  pageBreakBefore?: string | ObsObject
  pageBreakInside?: string | ObsObject
  parentRule: CSSRule;
  perspective?: string | ObsObject
  perspectiveOrigin?: string | ObsObject
  pointerEvents?: string | ObsObject
  position?: string | ObsObject
  quotes?: string | ObsObject
  right?: string | ObsObject
  rubyAlign?: string | ObsObject
  rubyOverhang?: string | ObsObject
  rubyPosition?: string | ObsObject
  stopColor?: string | ObsObject
  stopOpacity?: string | ObsObject
  stroke?: string | ObsObject
  strokeDasharray?: string | ObsObject
  strokeDashoffset?: string | ObsObject
  strokeLinecap?: string | ObsObject
  strokeLinejoin?: string | ObsObject
  strokeMiterlimit?: string | ObsObject
  strokeOpacity?: string | ObsObject
  strokeWidth?: string | ObsObject
  tableLayout?: string | ObsObject
  textAlign?: string | ObsObject
  textAlignLast?: string | ObsObject
  textAnchor?: string | ObsObject
  textDecoration?: string | ObsObject
  textFillColor?: string | ObsObject
  textIndent?: string | ObsObject
  textJustify?: string | ObsObject
  textKashida?: string | ObsObject
  textKashidaSpace?: string | ObsObject
  textOverflow?: string | ObsObject
  textShadow?: string | ObsObject
  textTransform?: string | ObsObject
  textUnderlinePosition?: string | ObsObject
  top?: string | ObsObject
  touchAction?: string | ObsObject
  transform?: string | ObsObject
  transformOrigin?: string | ObsObject
  transformStyle?: string | ObsObject
  transition?: string | ObsObject
  transitionDelay?: string | ObsObject
  transitionDuration?: string | ObsObject
  transitionProperty?: string | ObsObject
  transitionTimingFunction?: string | ObsObject
  unicodeBidi?: string | ObsObject
  verticalAlign?: string | ObsObject
  visibility?: string | ObsObject
  webkitAlignContent?: string | ObsObject
  webkitAlignItems?: string | ObsObject
  webkitAlignSelf?: string | ObsObject
  webkitAnimation?: string | ObsObject
  webkitAnimationDelay?: string | ObsObject
  webkitAnimationDirection?: string | ObsObject
  webkitAnimationDuration?: string | ObsObject
  webkitAnimationFillMode?: string | ObsObject
  webkitAnimationIterationCount?: string | ObsObject
  webkitAnimationName?: string | ObsObject
  webkitAnimationPlayState?: string | ObsObject
  webkitAnimationTimingFunction?: string | ObsObject
  webkitAppearance?: string | ObsObject
  webkitBackfaceVisibility?: string | ObsObject
  webkitBackground?: string | ObsObject
  webkitBackgroundAttachment?: string | ObsObject
  webkitBackgroundClip?: string | ObsObject
  webkitBackgroundColor?: string | ObsObject
  webkitBackgroundImage?: string | ObsObject
  webkitBackgroundOrigin?: string | ObsObject
  webkitBackgroundPosition?: string | ObsObject
  webkitBackgroundPositionX?: string | ObsObject
  webkitBackgroundPositionY?: string | ObsObject
  webkitBackgroundRepeat?: string | ObsObject
  webkitBackgroundSize?: string | ObsObject
  webkitBorderBottomLeftRadius?: string | ObsObject
  webkitBorderBottomRightRadius?: string | ObsObject
  webkitBorderImage?: string | ObsObject
  webkitBorderImageOutset?: string | ObsObject
  webkitBorderImageRepeat?: string | ObsObject
  webkitBorderImageSlice?: string | ObsObject
  webkitBorderImageSource?: string | ObsObject
  webkitBorderImageWidth?: string | ObsObject
  webkitBorderRadius?: string | ObsObject
  webkitBorderTopLeftRadius?: string | ObsObject
  webkitBorderTopRightRadius?: string | ObsObject
  webkitBoxAlign?: string | ObsObject
  webkitBoxDirection?: string | ObsObject
  webkitBoxFlex?: string | ObsObject
  webkitBoxOrdinalGroup?: string | ObsObject
  webkitBoxOrient?: string | ObsObject
  webkitBoxPack?: string | ObsObject
  webkitBoxSizing?: string | ObsObject
  webkitColumnBreakAfter?: string | ObsObject
  webkitColumnBreakBefore?: string | ObsObject
  webkitColumnBreakInside?: string | ObsObject
  webkitColumnCount?: any;
  webkitColumnGap?: any;
  webkitColumnRule?: string | ObsObject
  webkitColumnRuleColor?: any;
  webkitColumnRuleStyle?: string | ObsObject
  webkitColumnRuleWidth?: any;
  webkitColumnSpan?: string | ObsObject
  webkitColumnWidth?: any;
  webkitColumns?: string | ObsObject
  webkitFilter?: string | ObsObject
  webkitFlex?: string | ObsObject
  webkitFlexBasis?: string | ObsObject
  webkitFlexDirection?: string | ObsObject
  webkitFlexFlow?: string | ObsObject
  webkitFlexGrow?: string | ObsObject
  webkitFlexShrink?: string | ObsObject
  webkitFlexWrap?: string | ObsObject
  webkitJustifyContent?: string | ObsObject
  webkitOrder?: string | ObsObject
  webkitPerspective?: string | ObsObject
  webkitPerspectiveOrigin?: string | ObsObject
  webkitTapHighlightColor?: string | ObsObject
  webkitTextFillColor?: string | ObsObject
  webkitTextSizeAdjust?: any;
  webkitTransform?: string | ObsObject
  webkitTransformOrigin?: string | ObsObject
  webkitTransformStyle?: string | ObsObject
  webkitTransition?: string | ObsObject
  webkitTransitionDelay?: string | ObsObject
  webkitTransitionDuration?: string | ObsObject
  webkitTransitionProperty?: string | ObsObject
  webkitTransitionTimingFunction?: string | ObsObject
  webkitUserSelect?: string | ObsObject
  webkitWritingMode?: string | ObsObject
  whiteSpace?: string | ObsObject
  widows?: string | ObsObject
  width?: string | ObsObject
  wordBreak?: string | ObsObject
  wordSpacing?: string | ObsObject
  wordWrap?: string | ObsObject
  writingMode?: string | ObsObject
  zIndex?: string | ObsObject
  zoom?: string | ObsObject
}
