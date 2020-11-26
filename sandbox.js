
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// const file = require("./dist/lib/file-handler")
// const cssHander = require("./dist/lib/css-handler")

// const s = file.read('.\\src\\css\\style.css')

// const cls = cssHander.getClasses(s)

// const str = Array.from(new Set(cls)).join("\n")

// file.write(".\\classList.txt", str)

const { componentDirectivesToClassNames } = require('./dist/lib/processDirectives')

const props = {primary:true, size:"some", color:'red', dark:true}

const cls = componentDirectivesToClassNames({
  name:"test", baseClass:["@color py-2 "], 
  directives:{primary:["bg-blue-500"], color:{red:"red-500"}, size:{mini:["text-xs"]}},
  matched: {
    "color:red": "border-@color",
    "size:mini": "@size:some",
    "primary,color:red,dark": "text-@color bg-black"
  }
}, props)

console.log(cls)
