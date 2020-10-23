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

type BackgroundPosition = 'bottom' | 'center' | 'left' | 'left-bottom' | 'left-top' | 'right' | 'right-bottom' | 'right-top' | 'top'

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

export interface Theme {
  screens: Screens
  colors: Colors
  spacing: Spacing
  backgroundColor: Colors
  backgroundOpacity: Colors
  backgroundPosition: Record<BackgroundPosition, string>
  backgroundSize: Record<'auto' | 'cover' | 'contain', string>
  borderColor: Colors
  borderOpacity: string
  borderRadius: Record<'default' | 'none' | 'sm' | 'md' | 'lg' | 'full', string>
  borderWidth: Record<'default' | '0' | '2' | '4' | '8', string>
  boxShadow: Record<'default' | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'outline', string>
  cursor: Record<'default' | 'auto' | 'pointer' | 'wait' | 'text' | 'move' | 'not-allowed', string>
  divideColor: Colors
  divideOpacity: Colors
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
  
}

export default interface TailwindConfig {
  purge: any[]
  target: string
  prefix: string
  separator: string
  theme: Theme
}