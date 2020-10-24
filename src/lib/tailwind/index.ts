import TailwindConfig, {Theme} from "../../types/tailwindConfig";
import variantHandler from "./variant-handler";

export function typography( configObj: TailwindConfig ){
  let result: string[] = [];
  const category = "Typography";
  
  // fontFamily
  const fontFamily = Object.keys(configObj.theme.fontFamily)
    .map( family => `font-${family}`)
  result = [
    ...fontFamily,
    ...variantHandler('fontFamily', fontFamily, configObj)
  ]
    

  // fontSize
  const fontSize = Object.keys(configObj.theme.fontSize).map( size => `text-${size}`)
  result = [
    ...fontSize,
    ...variantHandler('fontSize', fontFamily, configObj)
  ]

  return result
}

const plugins = []



export default function tailwind(){

}