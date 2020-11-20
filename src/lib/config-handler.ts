import { ComponentData } from "../types/reactComponentFactory"

export function getComponentGroups(comps: ComponentData[]){
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