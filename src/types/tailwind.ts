import Color from "./color";

export type Opacity = 0 | 25 | 50 | 75 | 100

export type Align = 'center' | 'left' | 'right' | 'justify'

export type Decoration = 'line-through' | 'no-underline' | 'underline'

export type Transform = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

export type Whitespace = 'normal' | 'no-wrap' | 'pre' | 'pre-line' | 'pre-wrap'

export type WordBreak = 'break-normal' |	'break-words' |'break-all' |'truncate'

export interface Text {
    color: Color
}

export default interface Tailwind {
    text?: Text
    opacity?: Opacity
    align?: Align
    transform?: Transform
    whitespace?: Whitespace
    wordBreak?: WordBreak
}