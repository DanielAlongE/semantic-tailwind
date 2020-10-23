import Color from "./color"

interface Screens {
  sm: string
  md: string
  lg: string
  xl: string
  [key: string]: string
}

type ColorGroup = Record<100|200|300|400|500|600|700|800|900, string> | string

interface Colors {
  transparent: string
  current: string
  black: string
  white: string
  gray: ColorGroup
  red: ColorGroup
  orange: ColorGroup
  yellow: ColorGroup
  green: ColorGroup
  teal: ColorGroup
  blue: ColorGroup
  indigo: ColorGroup
  purple: ColorGroup
  pink: ColorGroup
  [key: string]: ColorGroup
}

interface Spacing {
  px : string
  0 : string
  1 : string
  2 : string
  3 : string
  4 : string
  5 : string
  6 : string
  8 : string
  10 : string
  12 : string
  16 : string
  20 : string
  24 : string
  32 : string
  40 : string
  48 : string
  56 : string
  64 : string
}

interface SpacingNegative {
  '-px' : string
  '-1' : string
  '-2' : string
  '-3' : string
  '-4' : string
  '-5' : string
  '-6' : string
  '-8' : string
  '-10' : string
  '-12' : string
  '-16' : string
  '-20' : string
  '-24' : string
  '-32' : string
  '-40' : string
  '-48' : string
  '-56' : string
  '-64' : string
}

interface AllSpaces extends Spacing, SpacingNegative {

}

interface Translate extends Spacing, SpacingNegative {
  '-full': string
  '-1/2': string
  '1/2': string
  full: string
}

type Positions = Record<'bottom' | 'center' | 'left' | 'left-bottom' | 'left-top' | 'right' | 'right-bottom' | 'right-top' | 'top', string>

interface FontFamily {
  sans: string[]
  serif: string[]
  mono: string[]
}

interface FontSize {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
  '6xl': string
}

interface FontWeight {
  hairline: string
  thin: string
  light: string
  normal: string
  medium: string
  semibold: string
  bold: string
  extrabold: string
  black: string
}

interface Height extends Spacing {
  auto: string,
  full: string,
  screen: string
}

interface MaxWidth {
  none: string
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  "2xl": string
  "3xl": string
  "4xl": string
  "5xl": string
  "6xl": string
  full: string
  "screen-sm": string
  "screen-md": string
  "screen-lg": string
  "screen-xl": string
}

type Opacity = Record<'0' | '25' | '50' | '75' | '100', string>
type Order = Record<'first' | 'last' | 'none' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12', string>
type Width = Record<"0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "auto" | "px" | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "full" | "screen", string>
type GridColumn = Record<'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13', string>
type GridRow = Record<'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7', string>
type Timing = Record<'75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000', string>

export interface Theme {
  screens: Screens
  colors: Colors
  spacing: Spacing
  backgroundColor: Colors
  backgroundOpacity: Colors
  backgroundPosition: Positions
  backgroundSize: Record<'auto' | 'cover' | 'contain', string>
  borderColor: Colors
  borderOpacity: Opacity
  borderRadius: Record<'default' | 'none' | 'sm' | 'md' | 'lg' | 'full', string>
  borderWidth: Record<'default' | '0' | '2' | '4' | '8', string>
  boxShadow: Record<'default' | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'outline', string>
  cursor: Record<'default' | 'auto' | 'pointer' | 'wait' | 'text' | 'move' | 'not-allowed', string>
  divideColor: Colors
  divideOpacity: Opacity
  divideWidth: Colors,
  fill: Record<'current', string>
  flex: Record<'1' | 'auto' | 'initial' | 'none', string>
  flexGrow: Record<'0' | 'default', string>
  flexShrink: Record<'0' | 'default', string>
  fontFamily: FontFamily
  fontSize: FontSize
  fontWeight: FontWeight
  height: Height
  inset: Record<'0' | 'auto', string>
  letterSpacing: Record<'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest', string>
  lineHeight: Record<'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10', string>
  listStyleType: Record<'none' | 'disc' | 'decimal', string>
  margin: AllSpaces
  maxHeight: Record<'full' | 'screen', string>
  maxWidth: MaxWidth
  minHeight: Record<'0' | 'full' | 'screen', string>
  minWidth: Record<'0' | 'full', string>
  objectPosition: Positions
  opacity: Opacity
  order: Order
  padding: Spacing
  placeholderColor: Color
  placeholderOpacity: Opacity
  space: AllSpaces
  stroke: Record<'current', string>
  strokeWidth: Record<'0' | '1' | '2', string>
  textColor: Color
  textOpacity: Opacity
  width: Width
  zIndex: Record<'auto' | '10' | '20' | '30' | '40' | '50', string>
  gap: Spacing
  gridTemplateColumns: Record<'none' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12', string>
  gridColumn: Record<'auto' | 'span-1' | 'span-2' | 'span-3' | 'span-4' | 'span-5' | 'span-6' | 'span-7' | 'span-8' | 'span-9' | 'span-10' | 'span-11' | 'span-12', string>
  gridColumnStart: GridColumn
  gridColumnEnd: GridColumn
  gridTemplateRows: Record<'none' | '1' | '2' | '3' | '4' | '5' | '6', string>
  gridRow: Record<'auto' | 'span-1' | 'span-2' | 'span-3' | 'span-4' | 'span-5' | 'span-6', string>
  gridRowStart: GridRow
  gridRowEnd: GridRow
  transformOrigin: Positions
  scale: Record<'0' | '50' | '75' | '90' | '95' | '100' | '105' | '110' | '125' | '150', string>
  rotate: Record<'-180' | '-90' | '-45' | '0' | '180' | '90' | '45', string>
  translate: Translate
  skew: Record<'-12' | '-6' | '-3' | '0' | '12' | '6' | '3',string>
  transitionProperty: Record<'none' | 'all' | 'default' | 'colors' | 'opacity' | 'shadow' | 'transform', string>
  transitionTimingFunction: Record<'linear' | 'in' | 'out' | 'in-out', string>
  transitionDuration: Timing
  transitionDelay: Timing
  animation: Record<'none' | 'spin' | 'ping' | 'pulse' | 'bounce', string>
  keyframes: Record<'none' | 'spin' | 'ping' | 'pulse' | 'bounce', string>  
}

type VariantKeys = 'accessibility:' | 'alignContent' | 'alignItems' | 'alignSelf' | 'appearance' | 'backgroundAttachment' | 'backgroundColor' | 'backgroundOpacity' | 'backgroundPosition' | 'backgroundRepeat' | 'backgroundSize' | 'borderCollapse' | 'borderColor' | 'borderOpacity' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'boxShadow' | 'boxSizing' | 'container' | 'cursor' | 'display' | 'divideColor' | 'divideOpacity' | 'divideWidth' | 'fill' | 'flex' | 'flexDirection' | 'flexGrow' | 'flexShrink' | 'flexWrap' | 'float' | 'clear' | 'fontFamily' | 'fontSize' | 'fontSmoothing' | 'fontStyle' | 'fontWeight' | 'height' | 'inset' | 'justifyContent' | 'letterSpacing' | 'lineHeight' | 'listStylePosition' | 'listStyleType' | 'margin' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth' | 'objectFit' | 'objectPosition' | 'opacity' | 'order' | 'outline' | 'overflow' | 'overscrollBehavior' | 'padding' | 'placeholderColor' | 'placeholderOpacity' | 'pointerEvents' | 'position' | 'resize' | 'space' | 'stroke' | 'strokeWidth' | 'tableLayout' | 'textAlign' | 'textColor' | 'textOpacity' | 'textDecoration' | 'textTransform' | 'userSelect' | 'verticalAlign' | 'visibility' | 'whitespace' | 'width' | 'wordBreak' | 'zIndex' | 'gap' | 'gridAutoFlow' | 'gridTemplateColumns' | 'gridColumn' | 'gridColumnStart' | 'gridColumnEnd' | 'gridTemplateRows' | 'gridRow' | 'gridRowStart' | 'gridRowEnd' | 'transform' | 'transformOrigin' | 'scale' | 'rotate' | 'translate' | 'skew' | 'transitionProperty' | 'transitionTimingFunction' | 'transitionDuration' | 'transitionDelay' | 'animation'

type Variants = Record<VariantKeys, string[]>

export default interface TailwindConfig {
  purge: any[]
  target: string
  prefix: string
  separator: string
  theme: Theme
  variants: Variants
  corePlugins: any
  plugins: any[]
}