console.log("semantic-tailwind!")

const { default: startServer } = require('next/dist/server/lib/start-server')
const { program } = require('commander');

program
  .option('--port <number>')
  .parse(process.argv);

const port = program.port ? +program.port : 3333

const dir = __dirname
startServer({ dir }, port)
  .then(async (app) => {
    console.log(
      `started server on 'localhost':${port}`,
      dir
    )
    await app.prepare()
  })

  // #!/usr/bin/env node