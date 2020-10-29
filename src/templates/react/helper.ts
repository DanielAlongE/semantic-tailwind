import { isString, isObject } from '../../lib/type-check';
import { ComponentData } from '../../types/reactComponentBuilder'


export function computePropsAsDirectives(data: ComponentData, _props: any){
  let classNames = ""
  let props: any = { }

  Object.entries(_props).forEach( ([propKey, propValue]) => {
    if(data.directives && data.directives.hasOwnProperty(propKey)){

    }else{
      props[propKey] = propValue
    }
  })

  return [classNames, props]
}