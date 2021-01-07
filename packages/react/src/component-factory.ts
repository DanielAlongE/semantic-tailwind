import React from 'react'
import { isString } from 'semantic-tailwind-core'
import { ComponentData } from 'semantic-tailwind-core/src/types'
import { getElementControl } from './elements'
import { getValidHtmlProp, prepareComponentProps } from './lib/helper'

function getElementArgs ({ as, ...props }: any, data: ComponentData, comp?: React.FC<any>) {
  const p = prepareComponentProps(props, data)
  const Element = as || comp || getElementControl(data.as || 'div')
  const _props = isString(Element) ? getValidHtmlProp(p) : p
  return [Element, _props]
}

export function ComponentFactory (data: ComponentData, comp?: React.FC<any>) {
  if (data.forwardRef) {
    return React.forwardRef(({ children = null, ...props }: any, ref:unknown) => {
      const [Element, _props] = getElementArgs(props, data, comp)
      if (ref) {
        _props.ref = ref
      }
      return React.createElement(Element, _props, children)
    })
  }
  return ({ children = null, ...props }: any) => {
    const [Element, _props] = getElementArgs(props, data, comp)
    return React.createElement(Element, _props, children)
  }
}

export default function () {
  console.log('Hello')
}
