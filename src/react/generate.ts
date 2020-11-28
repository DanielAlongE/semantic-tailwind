/* eslint-disable for-direction */
import { getComponentGroups } from "../lib/config-handler"
import * as fileHandler from "../lib/file-handler"
import { ComponentData } from "../types/reactComponentFactory"
import StyleConfig from "../types/styleConfig"
import templateMaker from "../lib/templateMaker"
import { isObject, isString, isNumeric } from "../lib/type-check"
import getComponentInterface from "./componentInterface"
import * as path from "path"

function isDefaultComp(c:string){
  return c && c.indexOf(".") === -1
}

function directiveToTypes(comp: ComponentData){
  let result = ""

  const directives = comp.directives || {}

  const objKeyToType = (obj: Record<string, unknown>) => {
    let keyList: Array<string | number> = Object.keys(obj)
    const isAllNumbers = keyList.every( x => isNumeric(x))

      keyList = keyList.map( k => {
        return ["number", "string", "boolean"].includes(k as string) || isAllNumbers ? k : `'${k}'`
      })

    return keyList.join(" | ") + "\n"
  }

  Object.entries(directives).forEach( ([directive, value]) => {
    result += `${directive}?: `
    if(Array.isArray(value) || isString(value)){
      result += "boolean\n"
    }
    else if(isObject(value)){
      result += objKeyToType(<Record<string, unknown>>value)
    }else{
      result += "any"
    }
  })
  return result
}



function generateComponentFile(groupName: string, components: ComponentData[]){
  const t = templateMaker()
  const tab = 0

  // [name, flatName, type]
  const compProperties: [string, string, string][] = []

  for(let i=components.length-1; i>=0; i-=1){
    const c = components[i]
    const { name, as="" } = c
    const isDefault = isDefaultComp(name)


    const [interfaceName, interfacePath] = getComponentInterface(as)

    t.addImport('react').default('React')
    t.addImport(interfacePath).named([interfaceName])

    t.addImport("semantic-tailwind").named(["ComponentFactory"])

    const flatName = name.replace(".", "")
    const propInterface =  flatName + "Props"

    t.addLine("")

    t.addLine(`interface ${propInterface} extends ${interfaceName}<unknown> {`, tab)
    const _d = directiveToTypes(c)
    t.addMultiLine(_d ? `${_d}` : "[key: string]: unknown", tab+1)
    t.addLine(`as?: React.FC<any> | string`, tab+1)
    t.addLine(`}`, tab)
    
    if(!isDefault){
      compProperties.push([name, flatName, propInterface])
      
      t.addLine(`\n// ${flatName} Comp comes here -- `)
      t.addLine(`const ${flatName} = ComponentFactory(${fileHandler.jsonToString(c)}) as React.FC<${propInterface}>`)
    }

    // root component expected to be on index 0
    if(i === 0){
    
      if(isDefault){
        t.addLine("")
        t.addLine(`interface ${groupName}Component extends React.FC<${propInterface}> {`, tab)
        compProperties.forEach( ([dottedName, , compInterface]) => {
          const [,childName] = dottedName.split('.')
          childName && t.addLine(`${childName}: React.FC<${compInterface}>`, tab+1)
        })
        t.addLine(`}`, tab)
    
        t.addLine("")
        t.addLine("// eslint-disable-next-line @typescript-eslint/no-explicit-any")
        t.addLine(`const ${groupName}:any = ComponentFactory(${fileHandler.jsonToString(c)})`)
      }else{
        t.addLine("")
        t.addLine(`interface ${groupName}Component {`, tab)
        compProperties.forEach( ([dottedName, , compInterface]) => {
          const [,childName] = dottedName.split('.')
          childName && t.addLine(`${childName}: React.FC<${compInterface}>`, tab+1)
        })
        t.addLine(`}`, tab)

        t.addLine("")
        t.addLine("// eslint-disable-next-line @typescript-eslint/no-explicit-any")
        t.addLine(`const ${groupName}:any = {}`)
      }
      
      t.addLine("")
      compProperties.forEach( ([dottedName, compPropName]) => {
        t.addLine(`${dottedName} = ${compPropName}`)
      })

      // export component group
      t.addLine("")
      t.addLine(`export default ${groupName} as ${groupName}Component`)
      

    }
  }

  return t.toString()
}

export default function generate(styleFilePath: string, outputDir:string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(styleFilePath)
  const { components } = config

  const groups = components ? getComponentGroups(components) : {}

  Object.entries(groups).forEach( ([groupName, comps]) => {
    const result = generateComponentFile(groupName, comps)
    fileHandler.write(path.join(outputDir, `${groupName}.ts`), result)
  })
}