import Color from "./color";

export type Opacity = 0 | 25 | 50 | 75 | 100

export type Align = 'center' | 'left' | 'right' | 'justify'

export type Decoration = 'line-through' | 'no-underline' | 'underline'

export type Transform = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

export type Whitespace = 'normal' | 'no-wrap' | 'pre' | 'pre-line' | 'pre-wrap'

export type WordBreak = 'break-normal' |	'break-words' |'break-all' |'truncate'

export type FontSize =  'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

export type FontStyle = 'italic' | 'not-italic'

export type FontWeight = 'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'

export type FontFamily = 'sans' | 'serif' | 'mono'

export type LetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest' 
 
export type LineHeight = '5' | '6' | '7' | '8' | '9' | '10' | 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
 
export default interface Text {
    color: Color
    opacity?: Opacity
    align?: Align
    transform?: Transform
    whitespace?: Whitespace
    wordBreak?: WordBreak,
    fontSize?: FontSize,
    fontStyle?: FontStyle,
    fontWeight?: FontWeight
    fontFamily?: FontFamily
    letterSpacing?: LetterSpacing,
    lineHeight?: LineHeight
}