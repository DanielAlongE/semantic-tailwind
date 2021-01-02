import cli from "semantic-tailwind-cli"

cli({build: function(output){
  process.cwd()
  console.log(module.filename, output, process.cwd())
}})