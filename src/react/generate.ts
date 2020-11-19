import { ComponentData } from "../types/reactComponentFactory"
import * as fileHanler from "../lib/file-handler"
import StyleConfig from "../types/styleConfig"

export function getComponentPages(comps: ComponentData[]){
  const groups: Record<string, ComponentData[]> = {}
  comps.forEach((c) => {
    const [groupName, childName] = c.name.split(".")
    if(groupName){
      if(groupName in groups){

        childName 
          ? groups[groupName].push(c) 
          : groups[groupName].unshift(c)

      }else{
        groups[groupName] = [c]
      }
    }
  })

  return groups
}



export default function generate(styleFilePath: string) {
  const str = fileHanler.read(styleFilePath)
  const { components } = fileHanler.stringToJson<StyleConfig>( str, [] )
  const groups = getComponentPages(components)
  console.log( Object.entries(groups).forEach(([key, comp]) => {
    
    console.log(comp.map( c => {
        const isDefault = c.name && c.name.indexOf(".") === -1
        return key + ` ${isDefault ? ' =>' : ''} ` + c.name
      }).join("\n")
    )
  }) )
}