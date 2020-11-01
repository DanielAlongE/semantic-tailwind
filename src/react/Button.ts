import React from "react";


const Button = React.forwardRef(({className, children, key, ...rest}:any, ref:unknown) => {
  const props: any = {}

  if(key){
    props['key'] = key
  }

  if(ref){
    props['ref'] = ref
  }

  // const tailwindcss = computeClasses(rest)
  
  return React.createElement("button", {...props, ...rest, className}, children )
});

export default Button