#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

interface CliOptions {
   build?: (outDir: string) => void
}

function cli(options: CliOptions){
  const { Command } = require('commander');
  const program = new Command();

  const _build = () => console.log("build argument expected")
  const build = options.build || _build

  program.version('0.0.1');

  program
    .command('build')
    .description('build components from source')
    .option("-o, --output [output]", "output directory")
    .action(function({output=""}){
      build(output)
    });


    program.parse(process.argv);  
}

if(require.main == module){
  cli({})
}

export default cli