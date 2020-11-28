
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// const file = require("./dist/lib/file-handler")
const { getConfigObject } = require("./dist/lib/config-handler")


console.log( getConfigObject() )
