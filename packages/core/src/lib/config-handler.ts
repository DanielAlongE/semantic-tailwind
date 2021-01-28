import * as path from 'path'
import { requireNoCache } from './require-handler'

export function pathResolver (p: string) {
  if (path.isAbsolute(p)) {
    return p
  }
  return path.resolve(process.cwd(), p)
}

export function componentArrayToObject<T = any> (componentArray: T[]) {
  const componentObject:Record<string, Record<string, T>> = {}

  componentArray.forEach((c: any) => {
    const { name = '', ...rest } = c
    const n = name.split('.')
    const groupName: string = n[0]
    const childName: string = n[1] || '_'

    if (groupName in componentObject) {
      componentObject[groupName][childName] = rest
    } else {
      componentObject[groupName] = { [childName]: rest }
    }
  })

  return componentObject
}

export function componentObjectToArray<T = any> (componentObject: Record<string, Record<string, T>>) {
  const componentArray: T[] = []

  Object.entries(componentObject).forEach(([groupName, childObj]) => {
    Object.entries(childObj).forEach(([childName, c]) => {
      // const name = ["_","default"].includes(childName) ? groupName : `${groupName}.${childName}`
      if (['_', 'default'].includes(childName)) {
        componentArray.unshift({ ...c, name: groupName })
      } else {
        componentArray.push({ ...c, name: `${groupName}.${childName}` })
      }
    })
  })

  return componentArray
}

export function getComponentGroups<T = any> (comps: T[]) {
  const groups: Record<string, T[]> = {}
  comps.forEach((c: any) => {
    const name:string = c.name || ''
    const n = name.split('.')
    const groupName: string = n[0]
    const childName: string = n[1] || '_'

    if (groupName) {
      if (groupName in groups) {
        childName
          ? groups[groupName].push(c)
          : groups[groupName].unshift(c)
      } else {
        groups[groupName] = [c]
      }
    }
  })

  return groups
}

function configComponentPlugin (configObj: any) {
  const { components, componentFile = 'semantic-tailwind.components.json' } = configObj
  if (!components) {
    try {
      const _componentFile = pathResolver(componentFile)
      return { ...configObj, components: requireNoCache(_componentFile) }
    } catch (error) {

    }
  }

  return { ...configObj, components: {} }
}

function configElementPlugin (configObj: any) {
  const { _elements = {}, elements = {}, ...rest } = configObj

  if (_elements || elements) {
    return { ...rest, elements: { ..._elements, ...elements } }
  }
  return configObj
}

function configPluginHandler (configObj: any, plugins: Array<(o: any) => any>) {
  plugins.forEach(p => {
    configObj = p(configObj)
  })

  return configObj
}

export function getConfigObject<T = any> (defaultConfig:any = {}, fileName = 'semantic-tailwind.config'): T {
  const filePath = pathResolver(fileName)
  console.log(`_filePath: ${filePath}`)
  let configObj = {}

  try {
    configObj = require(filePath)
  } catch (error) {
    console.log(`oops an error occured [${error.name}]`)
    console.log(process.cwd())
    console.log(__filename)
  }

  // console.log(Object.keys(configObj))

  return configPluginHandler(
    { ...defaultConfig, ...configObj },
    [configComponentPlugin, configElementPlugin])
}
