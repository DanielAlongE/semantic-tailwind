
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// const file = require("./dist/lib/file-handler")
// const cssHander = require("./dist/lib/css-handler")

// const s = file.read('.\\src\\css\\style.css')

// const cls = cssHander.getClasses(s)

// const str = Array.from(new Set(cls)).join("\n")

// file.write(".\\classList.txt", str)

const getClassesAndProps = require('./dist/lib/processDirectives').default
const [cls, props] = getClassesAndProps({
  name:"test", baseClass:["py-2"], 
  directives:{primary:["bg-blue-500"], size:{mini:["text-xs"]}}}, 
  {primary:true, size:"mini", whatever:true},
  ['primary', 'size']
  )

console.log(cls)
console.log(props)