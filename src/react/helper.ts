/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { isString, isObject } from '../lib/type-check';
import { ComponentData } from '../types/reactComponentFactory'

function getClassNames(key:string, value:any, directives: ComponentData['directives']): string {
  let classNames = ""
  if(directives && Object.prototype.hasOwnProperty.call(directives, key)){
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

export function computePropsAsDirectives(data: ComponentData, _props: any): [string, Record<string, any>]{
  let classNames = ""
  const props: any = { }

  // baseClass
  classNames += Array.isArray(data.baseClass) ? data.baseClass.join("") : data.baseClass

  Object.entries(_props).forEach( ([propKey, propValue]) => {
    if(data.directives && Object.prototype.hasOwnProperty.call(data.directives, propKey)){
      classNames += " " + getClassNames(propKey, propValue, data.directives)
    }else{
      props[propKey] = propValue
    }
  })

  return [classNames, props]
}

export function darkModeClassSwap(swapList: ComponentData["darkMode"] = [], classNames: string): string {
  swapList.forEach( ([findStr, replaceStr]) => {
    classNames = classNames.replace(new RegExp(findStr, "g"), replaceStr)
  })
  return classNames
}