/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

  const file = require("./dist/lib/file-handler")
  const cssHander = require("./dist/lib/css-handler")

  const s = file.read('.\\src\\css\\tailwind.min.css')

  const cls = cssHander.getClasses(s).join("\n")

  file.write(".\\classList.txt", cls)