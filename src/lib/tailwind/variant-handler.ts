import TailwindConfig, { UtilityKeys } from "../../types/tailwindConfig"

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
    let result: string[] = [ ]

    if(breakpoints.length){
      breakpoints.forEach( b => {
        classNames.forEach(c => {
          result.push(`${b}${separator}${c}`)
        })
      })
    }
    
    return result
    
  }

export const variants = {
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

export default function variantHandler(utilityName:UtilityKeys, classNames:string[], configObj: TailwindConfig): string[] {
  const variantNames = configObj.variants[utilityName];
  let result: string[] = []
  const count = variantNames.length;
  if(count > 0){
    for(let i=count-1; i>=0; i-=1){
      const currentVariant = variantNames[i]
      const vFunc = variants[currentVariant]

      if(!vFunc){
        continue
      }

      if(i == 0 && currentVariant === 'responsive'){
        result = [ ...result, ...vFunc(result, configObj)]
      }else{
        result = [ ...result, ...vFunc(classNames, configObj)]
      }
      
    }
  }

  return result
}