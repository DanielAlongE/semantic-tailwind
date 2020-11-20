/* eslint-disable for-direction */
import { getComponentGroups } from "../lib/config-handler"
import * as fileHanler from "../lib/file-handler"
import { ComponentData } from "../types/reactComponentFactory"
import StyleConfig from "../types/styleConfig"
import templateMaker from "../lib/templateMaker"
import { isObject, isString } from "../lib/type-check"

function isDefaultComp(c:string){
  return c && c.indexOf(".") === -1
}

function directiveToTypes(comp: ComponentData){
  let result = ""

  const directives = comp.directives || {}

  const objKeyToType = (obj: Record<string, unknown>) => {
    const keyList = Object.keys(obj)
    keyList.push("string")
    return keyList.join(" |")
  }

  Object.entries(directives).forEach( ([directive, value]) => {
    result += `${directive}?: `
    if(Array.isArray(value) || isString(value)){
      result += "Boolean\n"
    }
    else if(isObject(value)){
      result += objKeyToType(<Record<string, unknown>>value)
    }else{
      result += "any"
    }
  })
  return result
}

function getComponentInterface(as: string){
  const dict = {
    button: ["ButtonHTMLAttributes", "react"],
    html: ["AllHTMLAttributes", "react"]
  }

  if(as in dict){
    return dict["button"]
  }

  return dict["html"]
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
    t.addImport(interfacePath).named([interfaceName])
    const flatName = name.replace(".", "")
    const propInterface =  flatName + "Props"

    t.addLine("")
    t.addLine(`interface ${propInterface} extends ${interfaceName}<{}> {`, tab)
    t.addLine(`${directiveToTypes(c)}`, tab+1)
    t.addLine(`}`, tab)
    
    if(!isDefault){
      compProperties.push([name, flatName, propInterface])
      
      t.addLine(`\n// ${flatName} Comp comes here -- `)
      t.addLine(`const ${flatName} = ComponentFactory(${fileHanler.jsonToString(c)}) as React.FC<${propInterface}>`)
    }

    // root component expected to be on index 0
    if(i === 0){
    
      if(isDefault){
        t.addLine("")
        t.addLine(`interface ${groupName}Component extends React.FC<${propInterface}> {`, tab)
        compProperties.forEach( ([dottedName, , compInterface]) => {
          const [,childName] = dottedName.split('.')
          childName && t.addLine(`${childName}: ${compInterface}`, tab+1)
        })
        t.addLine(`}`, tab)
    
        t.addLine("")
        t.addLine(`const ${groupName}:any = ComponentFactory(${fileHanler.jsonToString(c)})`)
      }else{
        t.addLine("")
        t.addLine(`interface ${groupName}Component {`, tab)
        compProperties.forEach( ([dottedName, , compInterface]) => {
          const [,childName] = dottedName.split('.')
          childName && t.addLine(`${childName}: ${compInterface}`, tab+1)
        })
        t.addLine(`}`, tab)

        t.addLine("")
        t.addLine(`const ${flatName}:any = {}`)

        t.addLine("")
        compProperties.forEach( ([dottedName, compPropName]) => {
          t.addLine(`${dottedName} = ${compPropName}`)
        })
      }


      // export component group
      t.addLine("")
      t.addLine(`export default ${groupName} as ${groupName}Component`)
      

    }
  }

  return t.toString()
}

export default function generate(styleFilePath: string) {
  const str = fileHanler.read(styleFilePath)
  const { components } = fileHanler.stringToJson<StyleConfig>( str, [] )
  const groups = getComponentGroups(components)

  Object.entries(groups).forEach( ([groupName, comps]) => {
    console.log( generateComponentFile(groupName, comps) )
  })
}