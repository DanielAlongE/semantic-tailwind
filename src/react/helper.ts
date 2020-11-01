/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { isString, isObject } from '../lib/type-check';
import { ComponentData } from '../types/reactComponentFactory'

export function handleComputed(computeStr:string, value:string ): string{
  return computeStr.replace(new RegExp("#", "g"), value)
}

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

    classNames += ( Array.isArray(cls) ? (<string[]>cls).join(" ") : cls )
    
  }
  return classNames
}

export function getClassesAndProps(data: ComponentData, _props: any): [string, Record<string, any>]{
  let classNames = ""
  const props: any = { }
  const { directives={}, baseClass } = data
  let directiveCount = 0

  // baseClass
  classNames += Array.isArray(baseClass) ? baseClass.join("") : baseClass

  Object.entries(_props).forEach( ([propKey, propValue]) => {
    if(directives && Object.prototype.hasOwnProperty.call(directives, propKey)){
      let result = getClassNames(propKey, propValue, directives)
      
      const computedStr = data.computed && data.computed[propKey]
      if(computedStr){
        result = handleComputed(computedStr, result)
      }

      if(result){
        classNames += " " + result
      }

      // pass prop to element if directive is a valid html attribute
      if(["checked", "selected", "disabled", "readonly", "multiple", "ismap"].includes(propKey)){
        props[propKey] = propValue
      }

      directiveCount += 1
    }else{
      props[propKey] = propValue
    }
  })

  if(directiveCount === 0 && directives['default']){
    classNames += " " + getClassNames("default", true, directives)
  }

  return [classNames, props]
}

export function darkModeClassSwap(swapList: ComponentData["darkMode"] = [], classNames: string): string {
  swapList.forEach( ([findStr, replaceStr]) => {
    classNames = classNames.replace(new RegExp(findStr, "g"), replaceStr)
  })
  return classNames
}
