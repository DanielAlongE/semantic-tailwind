const { fileHandler } = require("./packages/core/dist/lib/")

fileHandler.mkdir("packages-all/packages-one/packages-two").then(console.log, console.log)

