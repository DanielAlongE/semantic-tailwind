import React from 'react';

function computePropsAsDirectives(data, _props){
  let classNames = ""
  let props = {}

  

  return [classNames, props]
}

export default function ComponentBuilder(data){
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