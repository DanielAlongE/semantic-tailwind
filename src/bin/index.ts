#!/usr/bin/env node

// import { write } from "../lib/file-handler";
import { getStyleObj, resolveConfigObjects } from "../lib/helpers";
import * as program from 'commander';
import { typography } from "../lib/tailwind";


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
  // .option('--sauce <flavour>', 'sauce flavour', 'peperoni')
  // .option('--no-sauce', 'Remove sauce')
  // .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
  // .option('--no-cheese', 'plain with no cheese')
  .option('-s, --style', 'print style')
  .option('-t, --test', 'test app')
  .action(({test, style}:{test: any, style:string}) => {
    if(style){
      const configObj = resolveConfigObjects()
      const result = typography(configObj)
      // write("testing.json", JSON.stringify(result,null, 2))
      console.log(result, result.length)
    }
    else if(test){
      console.log("------ test ------")
      console.log(process.cwd())
    }
  })
  .parse(process.argv);


// if (program.cheese === undefined) console.log('no cheese');
// else if (program.cheese === true) console.log('add cheese');
// else console.log(`add cheese type ${program.cheese}`);