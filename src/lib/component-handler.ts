import { Directive, Directives, ClassProp, ComponentData } from "../types/reactComponentFactory";
import { isString, isObject, isBoolean } from './type-check';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function handleComputed(computeExpression:string, value:string ): string{
  return computeExpression.replace(new RegExp("#", "g"), value)
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

function getDirectiveClass(key:string, value:string, directives:Directives){

    const currentDirective = (key in directives) ? directives[key] : ""
    let cls: ClassProp

    if(!currentDirective){
      return ""
    }

    if(isObject(currentDirective)){
      const objDirective = <Directive>currentDirective
      if(value && value in objDirective){
        cls = objDirective[value]
      }else{
        const allKeys = Object.keys(objDirective)
        const defaultKey = allKeys.length ? allKeys[0] : ""
        cls = objDirective[defaultKey] || ""
        
      }
    }
    else if(isString(currentDirective)){
      // boolean directive
      cls = <ClassProp>currentDirective || ""

    }else{
      cls = ""
    }

  return Array.isArray(cls) ? (<string[]>cls).join(" ") : (<string>cls)
  
}

export function handleReferences(directives: Directives = {}, props:any, classNames: string): string {
  const onMatch = (match: string): string => {
    const ref = match.slice(1, match.length)
    const [key, val=""] = ref.split(":")
    
    const value = val ? val :
          (key in props) ? (props[key] || "default") : "default"
    
    //console.log(match, key, value)
    // 
    return getDirectiveClass(key, value, directives)
  }

  return classNames.replace(/@[a-zA-Z:]+/g, onMatch)
}

export function findMatch(pattern: string, props: any): [boolean, string[]]{
  const rawArgs = pattern.split(",")
  const directives: string[] = []

  const result = rawArgs.map( x => {
    const [d,v] = x.split(":")
    
    if(d in props){
      directives.push(d)
      if(v === undefined){
        return isBoolean(props[d]) ? props[d] === true : true
      }
      else if(["true", "false"].includes(v)){
        return v === "true" ? props[d] === true : props[d] === false
      }
      else{
        return props[d] === v
      }
    }
    else if(v === "false"){
      directives.push(d)
      return true
    }
    return false
  })

  const isMatched = result.every(x => x === true)
  
  return [ isMatched, (isMatched ? directives : []) ]
}

export function handleMatched(matchedObj: ComponentData['matched'] = {}, props: any): [string, string[]] {
  let matchedProps: string[] = []
  let classNames = "";
  let rank = 0;

  
  Object.entries(matchedObj).forEach(([pattern, expression]) => {
     const [isMatch, directives] = findMatch(pattern, props)

     if(isMatch && directives.length > rank){
      matchedProps = [...directives]
      classNames = `${expression}`
      rank = directives.length
     }
  })

  return [ classNames, matchedProps ]
}

export function componentDirectivesToClassNames(component: ComponentData, _props:Record<string, unknown>, _baseClass=""){
  const directiveSkipList: string[] = []
  const { baseClass="", directives={}, computed={}, matched={} } = component
  let classNames = (Array.isArray(baseClass) ? baseClass.join(" ") : baseClass) + (_baseClass ? ` ${_baseClass}` : "")

  // check for matches
  if(component.matched){
    const [cls, matchedDirectives] = handleMatched(matched, _props)
    directiveSkipList.push(...matchedDirectives)
    classNames += cls ? ` ${cls}` : ''
  }

  Object.entries(_props).filter(([key]) => {
    // filter out matched directives
    return !directiveSkipList.includes(key)
  }).forEach(([key, value]) => {
    let cls = ""
    
    if(Object.prototype.hasOwnProperty.call(directives, key)){
      cls = getDirectiveClass(key, (<string>value), directives)

      // console.log(key, value, cls)

      if(Object.prototype.hasOwnProperty.call(computed, key)){
        const computedStr = computed[key]
        if(computedStr){
          cls = handleComputed(computedStr, cls)
        }
      }

    }
    
    if(cls){
      classNames += ` ${cls}`
    }

  })

  // match and replace references
  if(classNames && classNames.includes("@")){
    classNames = handleReferences(directives, _props, classNames)
  }

  // const props: any = {}

  // Object.entries(_props).filter(([key]) => {
  //   if(Object.keys(directives).includes(key) && !isHtmlProp(key)){
  //     return false
  //   }
  //   return true
  // })
  // .forEach(([key, value]) => props[key] = value)

  return classNames

}