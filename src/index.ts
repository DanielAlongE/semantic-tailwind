import { getStyleObj, resolveConfigObjects } from "./lib/helpers";
import { typography } from "./lib/tailwind";
const { program } = require('commander');
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
  .option('--sauce <flavour>', 'sauce flavour', 'peperoni')
  .option('--no-sauce', 'Remove sauce')
  .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
  .option('--no-cheese', 'plain with no cheese')
  .option('-s, --style', 'print style')
  .action(({cheese, sauce, style}:{cheese: any, sauce:any, style:string}) => {
    if(style){
      const configObj = resolveConfigObjects()
      const result = typography(configObj)
      console.log(result)
    }else{
    console.log({cheese, sauce})
    }
  })
  .parse(process.argv);


if (program.cheese === undefined) console.log('no cheese');
else if (program.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${program.cheese}`);