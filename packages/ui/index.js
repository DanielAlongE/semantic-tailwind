#!/usr/bin/env node

console.log("hello 2")

const { default: startServer } = require('next/dist/server/lib/start-server')

const port = 3000
const dir = __dirname
startServer({ dir }, port)
  .then(async (app) => {
    console.log(
      `started server on 'localhost':${port}`,
      dir
    )
    await app.prepare()
  })