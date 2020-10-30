import React from 'react';
import { ComponentData } from '../../types/reactComponentBuilder'
import { computePropsAsDirectives } from './helper'
 
export default function ComponentBuilder(data: ComponentData){
  return React.forwardRef(({className, children, key, ...rest}:any, ref:unknown) => {
    const props: any = {}

    // componentType
    const comp = data.as || "button"
     

    if(key){
      props['key'] = key
    }

    if(ref){
      props['ref'] = ref
    }

    // const tailwindcss = computeClasses(rest)
    const [cls, _props] = computePropsAsDirectives(data, rest)
    
    return React.createElement(comp, {...props, ..._props, ...rest, className: `${className} ${cls}`}, children )
  });
}