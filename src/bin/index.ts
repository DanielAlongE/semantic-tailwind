#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from "path"
import generate from "../react/generate";

const { Command } = require('commander');
const program = new Command();

program.version('0.0.1');

// program
//   .command('install [name]', 'install one or more packages')
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza')
//   .action((options: any) => {
//     //console.log(options);
//   });
// program.parse(process.argv);

program
  .command('build [source]')
  .description('generate components from source')
  .option("-o, --output [output]", "output directory")
  .action(function(source:string, options:any){
    const cwd = process.cwd();
    const output = options.output;

    const sourcePath = path.resolve(cwd, source)
    const outputPath = path.resolve(cwd, output)

    console.log("cwd ", cwd)
    console.log("__dirname ", __dirname)

    if(source && output){
      console.log('build %s --output %s', source, output);
      console.log('build %s --output %s', sourcePath, outputPath);
      generate(sourcePath, outputPath)
    }else{
      console.error("output directory is required")
    }
  });


  program.parse(process.argv);

// if (program.cheese === undefined) console.log('no cheese');
// else if (program.cheese === true) console.log('add cheese');
// else console.log(`add cheese type ${program.cheese}`);