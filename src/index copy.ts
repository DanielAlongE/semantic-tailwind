import Tailwind from "./types"
import { isObject } from "util"
import parser from "./parser"

const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const tailwindcss = require('tailwindcss');
const fs = require('fs')

//@apply text-pink-300 text-opacity-25 truncate text-center capitalize whitespace-no-wrap sm:text-blue-800 md:text-orange-300 md:text-5xl md:leading-loose
/**/
const processor = postcss( )

processor.process(`
.btn{
  
  text-left 
}
`).then((result:any) => console.log(result.css))

const cssObj = {
  btn: {
    "@apply": "bg-blue-500 text-white font-bold py-2 px-4 rounded",
    color: "#fff",
    "& primary": {
      color: "blue",
      "&:hover": {
        display: "flex"
      }
  }
    
  }
}



function deplicateStr(str:string, times:number){
  return Array(times).fill(str).join("")
}

function tailwindObjToString(obj: Tailwind){
  let result = "";

  for(let key in obj){

  }
}

function objToCss(obj: Record<string, any>, level:number = -1){
  level += 1;
  let result = "";
  const tab = deplicateStr("  ", level);
  
  console.log({level})

  for(let key in obj){
    result += tab + key;

    if(obj.hasOwnProperty(key)){
      
      if(key.includes("@")){
        result += " ";
        result += obj[key];
        result += ";\n";
      }
      else if( isObject(obj[key]) ){
        result += " {\n";
        result += objToCss(obj[key], level)
        result += tab + "}\n";
      }
      else{
        result += ": ";
        result += obj[key];
        result += ";\n";
      }
       
      
    }
    
  }

  return result;

}

const testTailwind: Tailwind = { 
  text: { 
  color:"pink-300",
  opacity: 25,
  wordBreak: "truncate",
  align: "center",
  transform: "capitalize",
  whitespace: "no-wrap"
  },
  screen: {
    sm:{text:{color:"blue-800"}},
    md:{text:{color:"orange-300", fontSize:"5xl", lineHeight:"loose"}}
  }
}


  //console.log(parser(testTailwind))


/*
fs.readFile('src/app.css', (err, css) => {
  postcss([precss, autoprefixer])
    .process(css, { from: 'src/app.css', to: 'dest/app.css' })
    .then(result => {
      fs.writeFile('dest/app.css', result.css, () => true)
      if ( result.map ) {
        fs.writeFile('dest/app.css.map', result.map, () => true)
      }
    })
})
*/