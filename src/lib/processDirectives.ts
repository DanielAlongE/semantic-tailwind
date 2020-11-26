import { ComponentData } from "../types/reactComponentFactory";
import { isString, isObject, isBoolean } from '../lib/type-check';
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

export function handleReferences(directives: ComponentData['directives'] = {}, props:any, classNames: string): string {
  const onMatch = (match: string): string => {
    const ref = match.slice(1, match.length)
    const [key, val] = ref.split(":")
    
    const value = val ? val :
          (key in props) ? (props[key] || "default") : "default"
    
    //console.log(match, key, value)
    return getClassNames(key, value, directives)
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

export function handleMatched(matchedObj: ComponentData['matched'] = {}, props: any): [string[], string] {
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

  return [ matchedProps, classNames ]
}

export function getClassesAndProps(data: ComponentData, _props: any, skipList: string[] = []): [string, Record<string, any>]{
  let classNames = ""
  const props: any = { }
  const { directives={}, baseClass } = data
  // let directiveCount = 0

  // baseClass
  classNames += Array.isArray(baseClass) ? baseClass.join("") : baseClass

  Object.entries(_props).forEach( ([propKey, propValue]) => {
    
      if(directives && Object.prototype.hasOwnProperty.call(directives, propKey)){
        let result = ""

        // skip if directive was matched
        if(!skipList.includes(propKey)){
          result = getClassNames(propKey, propValue, directives)

          // replace computed properties
          const computedStr = data.computed && data.computed[propKey]
          if(computedStr){
            result = handleComputed(computedStr, result)
          }
        }
      


      if(result){
        classNames += " " + result
      }

      // pass prop to element if directive is a valid html attribute
      if(isHtmlProp(propKey)){
        props[propKey] = propValue
      }

      // directiveCount += 1
    }else{
      props[propKey] = propValue
    }
  })

  // if(directiveCount === 0 && directives['default']){
  //   classNames += " " + getClassNames("default", true, directives)
  // }

  return [classNames, props]
}

export default function processDirectives(component: ComponentData, _props:Record<string, unknown>, skipList: string[] = []){
  const directiveSkipList: string[] = []
  const { baseClass="", directives={}, computed={}, matched={} } = component
  let classNames = Array.isArray(baseClass) ? baseClass.join("") : baseClass

  // check for matches
  if(component.matched){
    const [matchedDirectives, cls] = handleMatched(matched, _props)
    directiveSkipList.push(...matchedDirectives)
    classNames += cls ? ` ${cls}` : ''
  }

  Object.entries(_props).filter(([key]) => {
    // filter out matched directives
    return !directiveSkipList.includes(key)
  }).forEach(([key, value]) => {
    let cls = ""
    
    if(Object.prototype.hasOwnProperty.call(directives, key)){
      cls = getClassNames(key, value, directives)

      console.log(key, value, cls)

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

  const props: any = {}

  Object.entries(_props).filter(([key]) => {
    if(Object.keys(directives).includes(key) && !isHtmlProp(key)){
      return false
    }
    return true
  })
  .forEach(([key, value]) => props[key] = value)

  return [classNames, props]

}