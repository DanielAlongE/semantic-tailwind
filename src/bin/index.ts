#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from "path"
import { getConfigObject } from "../lib/config-handler";
import generate from "../react/generate";

const { Command } = require('commander');
const program = new Command();

program.version('0.0.1');

program
  .command('build')
  .description('generate components from source')
  .option("-o, --output [output]", "output directory")
  .action(function(options:any){
    const configObj = getConfigObject()
    const cwd = process.cwd();
    const output = options.output

    const outDir = output ? path.resolve(cwd, output) : ""

    generate(configObj, outDir)
      .then(msg => console.log(msg))
      .catch(e => console.error(e))

  });


  program.parse(process.argv);