
export type ClassProp = string[] | string

export type Directive = Record<string, string[] | string>

export interface Component {
  name: string
  as?: string
  baseClass: ClassProp
  directives?: Directive
}