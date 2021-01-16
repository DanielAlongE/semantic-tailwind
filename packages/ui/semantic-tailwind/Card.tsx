import React from 'react'
import { ComponentFactory, getConfig } from 'semantic-tailwind-react'

const configObj = getConfig()

export const CardContent = ComponentFactory({
  name: 'Card.Content',
  as: 'div',
  baseClass: [''],
  directives: {
  }
}, configObj)

export const CardHeader = ComponentFactory({
  name: 'Card.Header',
  as: 'h1',
  baseClass: [''],
  directives: {

  }
}, configObj)

interface CardComponent extends React.FC<any>{
  Content: React.FC<any>
  Header: React.FC<any>
}

const Card:any = ComponentFactory({
  name: 'Card',
  as: 'div',
  baseClass: ['p-2'],
  directives: {
    rounded: 'rounded',
    shadow: 'shadow',
    color: {
      gray: 'gray',
      red: 'red',
      blue: 'blue',
      green: 'green',
      orange: 'orange',
      yellow: 'yellow',
      teal: 'teal'
    }
  },
  matched: {
    'basic:false': 'border border-@color-600 hover:bg-@color-100 text-@color-600 bg-white'
  }
}, configObj)

Card.Content = CardContent
Card.Header = CardHeader

export default Card as CardComponent
