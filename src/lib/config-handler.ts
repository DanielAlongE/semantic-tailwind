/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentData } from "../types/componentFactory"
import { ComponentObject, ConfigObj } from "../types/styleConfig"
import * as path from "path"

export function componentArrayToObject( componentArray: ComponentData[] ){
  const componentObject:any = {}

  componentArray.forEach( c => {
    const { name="", ...rest } = c
    const [groupName, childName="_"] = name.split(".")

    if(groupName in componentObject){
      componentObject[groupName][childName] = rest
    }else{
      componentObject[groupName] = {[childName]: rest}
    }
  })

  return componentObject
}

export function componentObjectToArray(componentObject: ComponentObject) {
  const componentArray: ComponentData[] = []

  Object.entries(componentObject).forEach( ([groupName, childObj]) => {
    Object.entries(childObj).forEach(([childName, c]) => {
      const name = ["_","default"].includes(childName) ? groupName : `${groupName}.${childName}`
      componentArray.push({...c, name})
    })
  })

  return componentArray
}

export function getComponentGroups(comps: ComponentData[]){
  const groups: Record<string, ComponentData[]> = {}
  comps.forEach((c) => {
    const { name="" } = c
    const [groupName, childName] = name.split(".")
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

export function getConfigObject(configPath=""): ConfigObj {
  const _configPath = configPath ? configPath : path.join(process.cwd(),'semantic-tailwind.config.js')
  try {
    return require(_configPath)
  } catch (error) {
    console.error('unable to load configObj')
    return {}
  }
}