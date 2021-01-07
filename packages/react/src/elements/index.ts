import React from 'react'
import { getConfigObject } from 'semantic-tailwind-core'
import DefaultElement from './DefaultElement'
import Button from './Button'

const elementRegister = {
  Button
}

type ElementControl = React.FC<any>

export function getElementControl (key: string): ElementControl {
  const { elements = {} } = getConfigObject()

  const allElements = { ...elementRegister, ...elements }

  if (key in allElements) {
    return allElements[key]
  }

  return DefaultElement
}

// export function ElementFactory (key: string) {
//   return (props:any) => {

//     return
//   }
// }
