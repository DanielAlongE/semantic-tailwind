import React from 'react'
import { getValidHtmlProp } from '../lib/helper'

const DefaultElement = (props: any) => {
  const { children = null, className = '', ...rest } = props
  const _props = getValidHtmlProp(rest)
  return React.createElement('div', { className, ..._props }, children)
}

export default DefaultElement
