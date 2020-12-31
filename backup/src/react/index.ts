/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { componentDirectivesToClassNames } from '../lib/component-handler';
import { isString } from '../lib/type-check';
import { ComponentData } from '../types/componentFactory'
import { getValidHtmlProp } from './helper';
 
export function ComponentFactory(data: ComponentData, _comp?: React.FC<any>){
  return React.forwardRef((props:any = {}, ref:unknown) => {
    const {className="", as:renderAs, children=null, key, ...rest} = props
    //:{className?:string, children?:any, key?:string, rest?:any}
  
    const p: any = {}
  
    // componentType
    const comp = renderAs ? renderAs : 
                    _comp ? _comp : (data.as || "div")
  
    if(key){
      p['key'] = key
    }
  
    if(ref){
      p['ref'] = ref
    }

    const _props = isString(comp) ? getValidHtmlProp(rest) : rest

    const cls = componentDirectivesToClassNames(data, rest, className)

    return React.createElement(comp, {...p, className: cls, ..._props}, children )
  });
}
