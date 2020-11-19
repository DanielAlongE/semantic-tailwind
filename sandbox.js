/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// const xyz = require("./dist/lib/templateMaker")
// const tm = xyz.default()
// const result = tm.addImport("react")
//   .default("React")
//     .named(["useEffect", "useRef", "useState"])

//   .addImport("react-subscribed-state")
//     .named(["useProvider", "useSubscribedState", "SubscribedState as S"])

//   .addImport("firebase")
//     .default("* as Firebase")

//   .addLine("")
//   .addLine("function Styled(){")
// .addMultiLine(`// comment 1
// // comment 2
// // comment 3
// `, 4)
//   .addLine("return (", 1)
//   .addLine("<div>Hello</div>", 2)
//   .addLine(")", 1)
//   .addLine("}")
//   .toString()

  const xyz = require("./dist/react/generate").default

  xyz('.\\style.config.json')