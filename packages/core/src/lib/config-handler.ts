import * as path from "path"

export function getConfig(defaultConfig:any = {}, fileName="semantic-tailwind.config"){
  const filePath = path.resolve(process.cwd(), fileName)
  const configObj = require(filePath) || {}
  return { ...defaultConfig, ...configObj }
}