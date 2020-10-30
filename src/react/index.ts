import React from 'react';
import { ComponentData } from '../types/reactComponentFactory'
import { computePropsAsDirectives } from './helper'
 
export function ComponentFactory(data: ComponentData){
  return React.forwardRef((props:any = {}, ref:unknown) => {
    const {className, children, key, ...rest} = props
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
    const [cls, _props] = computePropsAsDirectives(data, rest)
    
    return React.createElement(comp, {...p, ..._props, ...rest, className: `${className} ${cls}`}, children )
  });
}
