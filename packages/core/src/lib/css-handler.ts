export function getClasses(css: string){

  const handlePseudo = ( m:string, m1:string ) => {
    // console.log(`m1: ${m1} -> ${m2} -> ${m3}`)
    if(m1){
      return m
    }
    return ""
  }

  const handleDots = ( m:string, m1:string, slash:string ) => {
    if(m1 && slash){
      return m
    }
    return "\n"
  }

  const t = css
    //.replace(/\./g, "\n.")
    // .replace(/{/g, "{\n")
    .replace(/}/g, "}\n")
    .split("\n")
    // .map(c => {console.log(c); return c})
    .map(c => c ? c.match(/^([\s,]*(\.[a-zA-Z0-9:./_\\-]+))+/g) : null)
    //.map(c => c ? c.replace(/^(\s*\.([a-zA-Z0-9:/_\\-]+))+/g, "$2") : null)
    .map(c => c?.join("")
                .replace(/[ ]+$/g, "")
                .replace(/^[ ]+/g, "")
                .replace(/[\s,]+/g, "\n")
                .replace(/((\\*)(\.))/g, handleDots)
    )
    .join("\n")
    .split("\n")
    .filter( c => !([null, undefined, ''].includes(c)) )
    .map( c => c?.replace(/:{2}[a-zA-Z0-9_\\-]+$/g, "") // remove ::
      .replace(/(\\*):{1}([a-zA-Z0-9_\\-]+)$/g, handlePseudo) // :
      .replace(/(\\*):{1}([a-zA-Z0-9_\\-]+)$/g, handlePseudo)
      .replace(/\\/g,"")
    )

    console.log(t)
    return t
  // return css.match(/\.-?([_a-zA-Z]+[_a-zA-Z0-9-]*)\s*\{/g) || []
}