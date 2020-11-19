/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const xyz = require("./dist/lib/templateMaker")

const tm = xyz.default()
// import React, { useEffect, useRef, useState } from 'react'
// import { useProvider, useSubscribedState, SubscribedState as S } from 'react-subscribed-state'

// tm.addImport("react").default("React")
// tm.addImport("react").named(["useEffect", "useRef", "useState"])

// console.log("\n\n", tm.addImport("react-subscribed-state").named(["useProvider", "useSubscribedState", "SubscribedState as S"]) )

// tm.addImport("firebase").default("* as Firebase")

// tm.addLine("")

// tm.addLine("function Styled(){")
// tm.addLine("return (", 1)
// tm.addLine("<div>Hello</div>", 2)
// tm.addLine(")", 1)
// tm.addLine("}")

// tm.toString()


tm.addImport("react")
  .default("React")
    .named(["useEffect", "useRef", "useState"])

  .addImport("react-subscribed-state")
    .named(["useProvider", "useSubscribedState", "SubscribedState as S"])
    .named(["SubscribedState as Sos"])

  .addImport("firebase")
    .default("* as Firebase")

  .addLine("")
  .addLine("function Styled(){")
.addMultiLine(`// comment 1
// comment 2
// comment 3
`, 4)
  .addLine("return (", 1)
  .addLine("<div>Hello</div>", 2)
  .addLine(")", 1)
  .addLine("}")
  .toString()