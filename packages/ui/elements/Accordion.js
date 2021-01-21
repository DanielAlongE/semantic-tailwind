const React = require('react')

exports.AccordionContent = ({
  className = '',
  children = null,
  active = false,
  ...rest
}) => React.createElement('div', {className:`${className} ${active ? '' : 'hidden'}`, ...rest }, children)