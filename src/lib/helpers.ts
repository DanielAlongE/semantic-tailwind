const path = require("path");
const _resolveConfigObjects = require('tailwindcss/lib/util/resolveConfig').default
const defaultConfig = require('tailwindcss/stubs/defaultConfig.stub.js')

export function getUserConfigObj(filePath=""){
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
    userConfigObj = getUserConfigObj();
  }

  return _resolveConfigObjects([userConfigObj, defaultConfig])
}