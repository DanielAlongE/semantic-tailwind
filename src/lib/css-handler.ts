export function getClasses(css: string){

  const handlePseudo = ( m:string, m1:string ) => {
    // console.log(`m1: ${m1} -> ${m2} -> ${m3}`)
    if(m1){
      return m
    }
    return ""
  }

  const t = css
    .replace("{", "{\n")
    .replace("}", "}\n")
    .split("\n")
    .map(c => c ? c.match(/^(\s*\.([a-zA-Z0-9:/_\\-]+))+/g) : null)
    //.map(c => c ? c.replace(/^(\s*\.([a-zA-Z0-9:/_\\-]+))+/g, "$2") : null)
    .map(c => c?.join("")
                .replace(/[ ]+$/g, "")
                .replace(/^[ ]+/g, "")
                .replace(/[ ]+/g, "\n")
                .replace(/\./g, "")
                // 
    )
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