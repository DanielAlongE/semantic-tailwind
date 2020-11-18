export default function templateMaker(){
  let imports: Record<string, Array<string | null>> = {}

  const _handleImports = (path:string, _default:string | null, named: string[] = []) => {
    if(path in imports){
      const [d, ...r] = imports[path]
      const first = _default || d
      const rest = <string[]>r
      imports[path] = [first, ...Array.from(new Set([...rest, ...named]))]
    }else{
      imports[path] = [_default, ...named]
    }

  } 

  return {
    clear(){
      imports = {}
    },
    addImport(path: string){
      return {
        default(val: string){
          _handleImports(path, val)
        },
        named(val: string[]){
          _handleImports(path, null, val)
        }
      }
    },
    generate(){
      console.log(imports)
    }
  }

}