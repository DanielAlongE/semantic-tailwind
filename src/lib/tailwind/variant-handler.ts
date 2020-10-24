import TailwindConfig from "../../types/tailwindConfig"

function namedVariant(name: string){
  return (classNames: string[], configObj: TailwindConfig): string[] => {
    const { separator = ":" } = configObj
    return classNames.map( (c) => `${name}${separator}${c}`)
  }
}

function responsive(classNames: string[], configObj: TailwindConfig): string[] {
    const screens = configObj.theme.screens || {}
    const breakpoints = Object.keys(screens)
    const { separator = ":" } = configObj

    if(breakpoints.length){
      let result: string[] = []

      breakpoints.forEach( b => {
        classNames.forEach(c => {
          result.push(`${b}${separator}${c}`)
        })
      })
      return result
    }else{
      return classNames
    }
    
  }

export default {
  responsive,
  hover: namedVariant('hover'),
  focus: namedVariant('focus'),
  active: namedVariant('active'),
  disabled: namedVariant('disabled'),
  visited: namedVariant('visited'),
  checked: namedVariant('checked'), 
  "first-child": namedVariant('first-child'),
  "last-child": namedVariant('last-child'),
  "odd-child": namedVariant('odd-child'),
  "even-child": namedVariant('even-child'),
  "group-hover": namedVariant('group-hover'),
  "group-focus": namedVariant('group-focus'),
  "focus-within": namedVariant('focus-within'),
  "focus-visible": namedVariant('focus-visible'),
}