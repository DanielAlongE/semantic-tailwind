
export type ClassProp = string[] | string

export type Directive = Record<string, ClassProp | string>

export interface ComponentData {
  name: string
  as?: string
  baseClass: ClassProp
  directives?: Directive
}