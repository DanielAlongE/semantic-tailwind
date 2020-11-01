/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ComponentData } from '../types/reactComponentFactory'
import { getClassesAndProps, handleFilters } from './helper'

 
export function ComponentFactory(data: ComponentData){
  return React.forwardRef((props:any = {}, ref:unknown) => {
    const {className="", children, key, ...rest} = props
    //:{className?:string, children?:any, key?:string, rest?:any}
  
    const p: any = {}
  
    // componentType
    const comp = data.as || "div"
     
  
    if(key){
      p['key'] = key
    }
  
    if(ref){
      p['ref'] = ref
    }
  
    // const tailwindcss = computeClasses(rest)
    const [_className, _props] = getClassesAndProps(data, rest)

    let computedClassNames = `${_className} ${className}`

    if(data.filters){
      computedClassNames = handleFilters(data.filters, props, computedClassNames)
    }
    
    return React.createElement(comp, {...p, ..._props, ...rest, className: computedClassNames}, children )    
  });
}
