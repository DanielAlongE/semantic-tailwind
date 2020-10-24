import Color from "../../types/color";
import TailwindConfig, {Theme} from "../../types/tailwindConfig";
import { isObject, isString } from "../type-check";
import variantHandler from "./variant-handler";

function getColorKeys(colors: Color): string[] {
  let result: string[] = []
  Object.entries(colors).forEach( ([key, value]) => {
    if(isString(value)){
      result.push(key)
    }
    else if(isObject(value)){
      Object.keys(value).forEach( c => result.push(`${key}-${c}`))
    }
  })
  return result
}

export function typography( configObj: TailwindConfig ){
  let result: string[] = [];
  const category = "Typography";
  
  // fontFamily
  const fontFamily = Object.keys(configObj.theme.fontFamily)
    .map( family => `font-${family}`)
  result = [
    ...result,
    ...fontFamily,
    ...variantHandler('fontFamily', fontFamily, configObj)
  ]

  console.log('fontFamily', result)
    

  // fontSize
  const fontSize = Object.keys(configObj.theme.fontSize).map( size => `text-${size}`)
  result = [
    ...result,
    ...fontSize,
    ...variantHandler('fontSize', fontFamily, configObj)
  ]

  // fontWeight
  const fontWeight = Object.keys(configObj.theme.fontWeight).map( weight => `font-${weight}`)
  result = [
    ...result,
    ...fontWeight,
    ...variantHandler('fontWeight', fontFamily, configObj)
  ]

  // textColor
  const textColor = getColorKeys(configObj.theme.textColor).map( color => `text-${color}`)
  result = [
    ...result,
    ...textColor,
    ...variantHandler('textColor', textColor, configObj)
  ]


  return result
}

const plugins = []



export default function tailwind(){

}