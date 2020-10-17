type DirectiveOption = string | Record<string, string>

type Directive = Record<string, DirectiveOption>

interface Component {
  name: string
  class: string
  as: string,
  directives?: Directive[]
  children?: Component[]
}
export default interface StyleConfig {
  components: Component[]
}