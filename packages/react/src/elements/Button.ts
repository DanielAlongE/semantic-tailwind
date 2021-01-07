import React from 'react'
import { getValidHtmlProp } from '../lib/helper'

const Button = React.forwardRef((props:any = {}, ref:unknown) => {
  const { children = null, className = '', ...rest } = props
  const _props = getValidHtmlProp(rest)
  if (ref) {
    _props.ref = ref
  }
  return React.createElement('button', { className, ..._props }, children)
})

export default Button
