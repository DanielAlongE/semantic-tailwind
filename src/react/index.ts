/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ComponentData } from '../types/reactComponentFactory'
import { getClassesAndProps, handleFilters, handleMatched, handleReferences } from './helper'
 
export function ComponentFactory(data: ComponentData, _comp?: React.FC<any>){
  return React.forwardRef((props:any = {}, ref:unknown) => {
    const {className="", children, key, ...rest} = props
    //:{className?:string, children?:any, key?:string, rest?:any}
  
    const p: any = {}
  
    // componentType
    const comp = _comp ? _comp : (data.as || "div")

    // directives
    const { directives= {} } = data
     
  
    if(key){
      p['key'] = key
    }
  
    if(ref){
      p['ref'] = ref
    }

    let computedClassNames = ""
    let skipList: string[] = []

    // handle matched props
    if(data.matched){
      const [s, matchedClassNames] = handleMatched(data.matched, props)
      skipList = [...s]
      computedClassNames += ` ${matchedClassNames}`
    }
  
    // const tailwindcss = computeClasses(rest)
    const [_className, _props] = getClassesAndProps(data, rest, skipList)

    computedClassNames += ` ${_className} ${className}`

    // match and replace references
    if(computedClassNames.indexOf("@") > -1){
      computedClassNames = handleReferences(directives, props, computedClassNames)
    }
    

    if(data.filters){
      computedClassNames = handleFilters(data.filters, props, computedClassNames)
    }
    
    return React.createElement(comp, {...p, ..._props, ...rest, className: computedClassNames}, children )    
  });
}
