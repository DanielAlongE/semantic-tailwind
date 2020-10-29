import { isString, isObject } from '../../lib/type-check';
import { ComponentData } from '../../types/reactComponentBuilder'

function getClassNames(key:string, value:any, directives: ComponentData['directives']): string {
  let classNames = ""
  if(directives && directives.hasOwnProperty(key)){
    let cls: string | string[] = ""
    const currentDirective = directives[key]

    if(isObject(currentDirective) && isString(value)){
      cls = (<any>currentDirective)[value] || ""
    }
    else if(value){
      cls = <string | string[]>currentDirective || ""
    }

    classNames += " " + ( Array.isArray(cls) ? (<string[]>cls).join(" ") : cls )
    
  }
  return classNames
}

export function computePropsAsDirectives(data: ComponentData, _props: any){
  let classNames = data.baseClass || ""
  let props: any = { }

  Object.entries(_props).forEach( ([propKey, propValue]) => {
    if(data.directives && data.directives.hasOwnProperty(propKey)){
      classNames += " " + getClassNames(propKey, propValue, data.directives)
    }else{
      props[propKey] = propValue
    }
  })

  return [classNames, props]
}