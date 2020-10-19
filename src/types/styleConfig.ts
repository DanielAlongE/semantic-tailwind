export type DirectiveOption = string | Record<string, string>

export type Directives = Record<string, DirectiveOption>

export interface Component {
  name: string
  class: string
  as: string,
  directives?: Directives
  children?: Component[]
}
export default interface StyleConfig {
  components: Component[]
}