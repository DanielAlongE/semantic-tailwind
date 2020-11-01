/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ComponentData } from '../types/reactComponentFactory'
import { getClassesAndProps, darkModeClassSwap } from './helper'

 
export function ComponentFactory(data: ComponentData){
  return React.forwardRef((props:any = {}, ref:unknown) => {
    const {className="", dark, children, key, ...rest} = props
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

    if(dark && data.darkMode){
      computedClassNames = darkModeClassSwap(data.darkMode, computedClassNames)
    }
    
    return React.createElement(comp, {...p, ..._props, ...rest, className: computedClassNames}, children )    
  });
}
