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

console.log(xyz.findMatch("color:blue", {dark:true, color:"red"}))
console.log(xyz.findMatch("primary,color:red,dark:false", {dark:false, color:"red", primary:true}))
