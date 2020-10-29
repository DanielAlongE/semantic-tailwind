import React from 'react';
import { ComponentData } from '../../types/reactComponentBuilder'

export default function ComponentBuilder(data: ComponentData){
  return React.forwardRef(({className, children, key, ...rest}:any, ref:unknown) => {
    let props:any = {}

    if(key){
      props['key'] = key
    }

    if(ref){
      props['ref'] = ref
    }

    // const tailwindcss = computeClasses(rest)
    
    return React.createElement("button", {...props, ...rest, className}, children )
  });
}