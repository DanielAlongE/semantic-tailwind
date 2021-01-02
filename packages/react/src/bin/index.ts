import cli from "semantic-tailwind-cli"
import * as path from "path"

cli({build: function(output){
  
  const resolvedPath = path.resolve(process.cwd(), output)

  console.log(module.filename, output, resolvedPath)
}})