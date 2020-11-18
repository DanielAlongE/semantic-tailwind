import { ComponentData } from "../types/reactComponentFactory"

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

export default function (fileName: string) {
  const _imports = {}
  const _lines = []



}