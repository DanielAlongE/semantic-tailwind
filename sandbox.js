const path = require('path');

//console.log(path)

//console.log(path.extname("C:\\Projects\\play.js"))

const some = require(path.resolve(__dirname, "tailwind.config.js"))

const  funcs = Object.entries(some.theme).map(([key, value]) => {
  if(typeof value === "function"){
    //console.log(value)
    return key
  }
  return null
})
.filter(x => x !== null)

const resolveConfigObjects = require('tailwindcss/lib/util/resolveConfig').default
const defaultConfig = require('tailwindcss/stubs/defaultConfig.stub.js')

function getUserConfigObj(){
  try {
    return require(path.resolve(__dirname, "tailwind.confg.js"));
  } catch (error) {
    return {}
  }
}

const userConfig = getUserConfigObj();

function getResovedConfigObjects(){
  return resolveConfigObjects([userConfig, defaultConfig])
}

console.log( getResovedConfigObjects()['theme']['backgroundColor'] )