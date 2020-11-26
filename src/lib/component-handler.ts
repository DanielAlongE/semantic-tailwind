import { Directive, Directives, ClassProp, ComponentData } from "../types/reactComponentFactory";
import { isString, isObject, isBoolean } from './type-check';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


export function handleComputed(computeExpression:string, value:string ): string{
  return computeExpression.replace(new RegExp("#", "g"), value)
}

function getClassNames(key:string, value:any, directives: ComponentData['directives']): string {
  let classNames = ""

  if(directives && Object.prototype.hasOwnProperty.call(directives, key)){
    let cls: string | string[] = ""
    const currentDirective = directives[key]

    if(isObject(currentDirective) && isString(value)){
      // check if default value exist || pick first element
      const allKeys = Object.keys(currentDirective)
      const defaultKey = ("default" in <Record<string,any>>currentDirective) ? "default" : ((<any>currentDirective)[allKeys[0]] || "")
      
      if((value in <Record<string,any>>currentDirective)){
        cls = (<any>currentDirective)[value] || ""
      }else{
        cls = defaultKey ? (<any>currentDirective)[defaultKey] : ""
      }
    }
    else if(value){
      cls = <string | string[]>currentDirective || ""
    }

    classNames += ( Array.isArray(cls) ? (<string[]>cls).join(" ") : cls )
    
  }
  return classNames
}

export function isHtmlProp(prop: string){
  const whiteList = ['accept', 'acceptCharset', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'as', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'charSet', 'challenge', 'checked', 'cite', 'classID', 'cols', 'colSpan', 'content', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'disabled', 'download', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'integrity', 'keyParams', 'keyType', 'kind', 'label', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'nonce', 'noValidate', 'open', 'optimum', 'pattern', 'placeholder', 'playsInline', 'poster', 'preload', 'readOnly', 'rel', 'required', 'reversed', 'rows', 'rowSpan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'summary', 'target', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap']
  return whiteList.includes(prop)
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

export function componentDirectivesToClassNames(component: ComponentData, _props:Record<string, unknown>){
  const directiveSkipList: string[] = []
  const { baseClass="", directives={}, computed={}, matched={} } = component
  let classNames = Array.isArray(baseClass) ? baseClass.join("") : baseClass

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