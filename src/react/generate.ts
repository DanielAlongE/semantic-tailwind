import { getComponentGroups } from "../lib/config-handler"
import * as fileHanler from "../lib/file-handler"
import StyleConfig from "../types/styleConfig"


export default function generate(styleFilePath: string) {
  const str = fileHanler.read(styleFilePath)
  const { components } = fileHanler.stringToJson<StyleConfig>( str, [] )
  const groups = getComponentGroups(components)
  console.log( Object.entries(groups).forEach(([key, comp]) => {
    
    console.log(comp.map( c => {
        const isDefault = c.name && c.name.indexOf(".") === -1
        return key + ` ${isDefault ? ' =>' : ''} ` + c.name
      }).join("\n")
    )
  }) )
}