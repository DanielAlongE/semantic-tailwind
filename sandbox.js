/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const xyz = require("./dist/react/helper")
//onst path = require('path')
//const Me = require("./dist/lib/helpers.js").resolveConfigObjects
//{  } 
 
// require('C:\\Projects\\semantic-tailwind\\tailwind.confg.js')
// console.log(path.relative(__dirname, "tailwind.confg.js"))

// const { read, write } = require('./dist/lib/file-handler')
// const json = read('C:\\Projects\\semantic-tailwind\\style.config.json')
// const data = Me()
// console.log( write('C:\\Projects\\semantic-tailwind\\sample.json', JSON.stringify(data, null, 2) ) )

// console.log(xyz.findMatch("color:blue", {dark:true, color:"red"}))
// console.log(xyz.findMatch("primary,color:red,dark:false", {dark:false, color:"red", primary:true}))

// console.log(xyz.handleMatched({
//   "primary,color:red,dark:false": "text-@color bg-black",
//   "color:red": "bg-@color"
// }, {dark:false, color:"red", primary:true}))

console.log(
  xyz.getClassesAndProps({
    name:"test", baseClass:["py-2"], 
    directives:{primary:["bg-blue-500"], color:{red:"red-500"}, size:{mini:["text-xs"]}},
    matched: {
      "primary,color:red,dark": "text-@color bg-black",
    }
  },
    {primary:true, size:"mini", color:'red', dark:true})

)

// console.log(
//   xyz.handleMatched(
//     {
//       "primary,color:red,dark": "text-@color bg-black",
//       "color:red": "border-@color",
//       "size:mini": "@size"      
//     }
//   ,
//     {primary:true, size:"mini", color:'red', dark:true})

// )