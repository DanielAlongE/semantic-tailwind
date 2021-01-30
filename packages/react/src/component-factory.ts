import React from 'react'
import { isString } from 'semantic-tailwind-core'
import { ComponentData } from 'semantic-tailwind-core/src/types'
import { getElementControl } from './elements'
import { getValidHtmlProp, prepareComponentProps } from './lib/helper'
import { Config } from './types'

function getElementArgs ({ props: { as, ..._p }, data, configObj }:{ props: any, data:ComponentData, configObj?: Config }) {
  const p = prepareComponentProps(_p, data)
  const Element = as || getElementControl(data.as || 'div', configObj)
  const _props = isString(Element) ? getValidHtmlProp(p) : p
  return [Element, _props]
}

export function ComponentFactory (data: ComponentData, configObj: Config) {
  if (data.forwardRef) {
    return React.forwardRef(({ children = null, ...props }: any, ref:unknown) => {
      const [Element, _props] = getElementArgs({ props, data, configObj })
      if (ref) {
        _props.ref = ref
      }
      return React.createElement(Element, _props, children)
    })
  }
  return ({ children = null, ...props }: any) => {
    const [Element, _props] = getElementArgs({ props, data, configObj })
    return React.createElement(Element, _props, children)
  }
}

export default function () {
  console.log('Hello')
}
