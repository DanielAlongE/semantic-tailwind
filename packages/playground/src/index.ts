import { getConfig } from "semantic-tailwind-core"

export default function(){
  console.log("playground")
  console.log(getConfig({some:'some', one:'one', can:'can', outDir:'./some/components'}))
}