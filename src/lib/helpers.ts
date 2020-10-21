const path = require("path");
const _resolveConfigObjects = require('tailwindcss/lib/util/resolveConfig').default
const defaultConfig = require('tailwindcss/stubs/defaultConfig.stub.js')

export function getUserConfigObj(dir=__dirname, file="tailwind.confg.js"){
  try {
    return require(path.resolve(dir, file));
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