/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { isString, isObject } from '../lib/type-check';
import { ComponentData } from '../types/reactComponentFactory'


export function handleComputed(computeExpression:string, value:string ): string{
  return computeExpression.replace(new RegExp("#", "g"), value)
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

export function getClassesAndProps(data: ComponentData, _props: any, skipList: string[] = []): [string, Record<string, any>]{
  let classNames = ""
  const props: any = { }
  const { directives={}, baseClass } = data
  let directiveCount = 0

  // baseClass
  classNames += Array.isArray(baseClass) ? baseClass.join("") : baseClass

  Object.entries(_props).forEach( ([propKey, propValue]) => {
    
      if(directives && Object.prototype.hasOwnProperty.call(directives, propKey)){
        let result = ""

        // skip if directive was matched
        if(!skipList.includes(propKey)){
          result = getClassNames(propKey, propValue, directives)
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

export function handleFilters(filterObj: ComponentData['filters'] = {}, props:any, classNames: string): string {
  Object.entries(filterObj).forEach(([directive, filterArray]) => {
    if(directive in props){
      filterArray.forEach(([findStr, replaceStr]) => {
        classNames = classNames.replace(new RegExp(findStr, "g"), replaceStr)
      })
    }
  })

  return classNames
}

export function handleReferences(directives: ComponentData['directives'] = {}, props:any, classNames: string): string {
  const onMatch = (match: string): string => {
    const key = match.slice(1, match.length)
    const value = (key in props) ? props[key] : "default"
    console.log(match, key, value)
    return getClassNames(key, value, directives)
  }

  return classNames.replace(/@[a-zA-Z]+/g, onMatch)
}

export function findMatch(pattern: string, props: any): [boolean, string[]]{
  const rawArgs = pattern.split(",")
  const directives: string[] = []

  const result = rawArgs.map( x => {
    const [d,v] = x.split(":")
    
    directives.push(d)
    if(d in props){
      const propValueIsBoolean = (props[d] === true || props[d] === false)
    }
    return (d in props) && (v!==undefined ? (props[d] === v) : true)
  })

  const isMatched = result.every(x => x === true)

  return [isMatched, directives]

}
