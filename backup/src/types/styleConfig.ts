import { ComponentData, Directives } from "./componentFactory";

export default interface StyleConfig {
  components: ComponentData[]
}

export interface ComponentObject {
  [key: string]: Record<string, ComponentData>
}

export interface ConfigObj {
  components?: ComponentObject
  outDir?: string
  globalDirectives?: Directives[]
  purge?: string[]
  elements?: Record<string, unknown>
}