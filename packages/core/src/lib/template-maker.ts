export function templateMaker(){
  let imports: Record<string, string[]> = {}
  let lines: string[] = []

  const _handleImports = (path:string, _default:string, named: string[] = []) => {
    if(path in imports){
      const [d, ...rest] = imports[path]
      const first = _default || d
      imports[path] = [first, ...Array.from(new Set([...rest, ...named]))]
    }else{
      imports[path] = [_default, ...named]
    }

  }

  const _multiplyString = (str:string, times:number) => {
    return Array(times).fill(str).join("")
  }

  const _processImports = () => {
    return Object.entries(imports).map(([path, [def, ...named]]) => {
      let str = ""
      str += `import `
      str += def ? `${def}` : ""
      str += def && named.length ? `, ` : ""
      str += named.length ? `{ ${named.join(", ")} }` : ""
      str += ` from `
      str += `'${path}'`
      return str
    }).join("\n")

    // import React, { useEffect, useRef, useState } from 'react'

  }

  const clear = () => {
    imports = {}
    lines = []
  }

  const toString = () => {
    return ( _processImports() + "\n" + lines.join("\n") )
  }

  const addLine = (text:string, indentation = 0, space="  ") => {
    lines.push(_multiplyString(space, indentation) + text)
    return { addLine, toString, addMultiLine }
  }

  const addMultiLine = (text:string, indentation = 0, space="  ") => {
    text.split(/\n/g).forEach( line => lines.push(_multiplyString(space, indentation) + line) )
    return { addLine, toString, addMultiLine }
  }

  const addImport = (path: string) => {

    return {
      default(val: string){
        _handleImports(path, val)

        return {...this, addImport, addLine}
      },
      named(val: string[]){
        _handleImports(path, "", val)
        return {...this, addImport, addLine}
      }
    }
  }


  return {
    clear,
    addImport,
    addLine,
    addMultiLine,
    toString
  }

}