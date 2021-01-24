const { AccordionContent } = require('./elements/Accordion')
const { defaultConfig } = require('semantic-tailwind-react')
module.exports = {
  ...defaultConfig,
  css: ['css/style-dark.css'],
  elements: {
    AccordionContent
  },
  outDir: 'semantic-tailwind'
}