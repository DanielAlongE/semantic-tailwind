import React from 'react'
import { getConfig } from '../lib/config-handler'
import DefaultElement from './DefaultElement'
import Button from './Button'

const nativeHtmlTags = {
  div: 'div',
  button: 'button',
  a: 'a',
  details: 'details',
  dialog: 'dialog',
  form: 'form',
  input: 'input',
  label: 'label',
  option: 'option',
  select: 'select',
  textarea: 'textarea',
  iframe: 'iframe',
  img: 'img',
  table: 'table',
  td: 'td',
  th: 'th'
}

export const defaultElements = {
  ...nativeHtmlTags,
  Button
}

type ElementControl = React.FC<any>

export function getElementControl (key: string, configObj: any = null): ElementControl {
  const { elements = {} } = configObj || getConfig()

  const _elements = { ...defaultElements, ...elements }

  if (key in _elements) {
    return _elements[key]
  }

  return DefaultElement
}

// export function ElementFactory (key: string) {
//   return (props:any) => {

//     return
//   }
// }
