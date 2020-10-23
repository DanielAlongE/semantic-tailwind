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
  .action(({cheese, sauce}:{cheese: any, sauce:any}) => {
    console.log({cheese, sauce})
  })
  .parse(process.argv);


if (program.cheese === undefined) console.log('no cheese');
else if (program.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${program.cheese}`);