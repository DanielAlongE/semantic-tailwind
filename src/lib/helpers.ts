import { read } from "./file-handler";
const path = require("path");
const _resolveConfigObjects = require('tailwindcss/lib/util/resolveConfig').default
const defaultConfig = require('tailwindcss/stubs/defaultConfig.stub.js')

export function getStyleObj(filePath=""){
  if(!filePath){
    filePath = path.resolve(process.cwd(), "style.config.json")
    console.log(filePath)
  }
  try {
    const jsonString = read(filePath)
    return JSON.parse(jsonString)
  } catch (error) {
    return {}
  }
}

export function getUserTailwindConfig(filePath=""){
  if(!filePath){
    filePath = path.resolve(process.cwd(), "tailwind.config.js")
  }
  try {
    return require(filePath)
  } catch (error) {
    return {}
  }
}

export function resolveConfigObjects(userConfigObj?: any){

  if(!userConfigObj){
    userConfigObj = getUserTailwindConfig();
  }

  return _resolveConfigObjects([userConfigObj, defaultConfig])
}