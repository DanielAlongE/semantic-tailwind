import Text from "./text";

export type Screen = 'sm' | 'md' | 'lg' | 'xl'

export interface ScreenTailWind {
    sm?: Omit<Tailwind, "screen">
    md?: Omit<Tailwind, "screen">
    lg?: Omit<Tailwind, "screen">
    xl?: Omit<Tailwind, "screen">
}

export default interface Tailwind {
    text?: Text
    screen?: ScreenTailWind
}