export type ClassProp = string[] | string

export type Directive = Record<string, ClassProp | string>

export type Directives = Record<string, Directive | ClassProp>

export interface ComponentData {
  name?: string
  as?: string
  forwardRef?: boolean
  baseClass: ClassProp
  directives?: Directives
  matched?: Record<string, string>
  computed?: Record<string, string>
  filters?: Record<string, Array<[string, string]>>
}
