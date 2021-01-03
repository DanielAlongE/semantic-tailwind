import { getConfigObject } from "semantic-tailwind-core"

export default function(){
  console.log("playground")
  console.log(getConfigObject({some:'some', one:'one', can:'can', outDir:'./some/components'}))
}