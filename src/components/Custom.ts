import React, { ButtonHTMLAttributes } from 'react'
import { ComponentFactory } from '../react'

interface CustomThreeProps extends ButtonHTMLAttributes<unknown> {
  primary?: boolean
  size?: 'mini' | 'small' | 'large'
  
}

// CustomThree Comp comes here -- 
const CustomThree = ComponentFactory({
  "name": "Custom.Three",
  "baseClass": "",
  "as": "button",
  "directives": {
    "primary": "",
    "size": {
      "mini": [
        "text-xs"
      ],
      "small": [
        "text-sm"
      ],
      "large": [
        "text-lg"
      ]
    }
  }
}) as React.FC<CustomThreeProps>

interface CustomTwoProps extends ButtonHTMLAttributes<unknown> {
  primary?: boolean
  size?: 'mini' | 'small' | 'large'
  
}

// CustomTwo Comp comes here -- 
const CustomTwo = ComponentFactory({
  "name": "Custom.Two",
  "baseClass": "",
  "as": "button",
  "directives": {
    "primary": "",
    "size": {
      "mini": [
        "text-xs"
      ],
      "small": [
        "text-sm"
      ],
      "large": [
        "text-lg"
      ]
    }
  }
}) as React.FC<CustomTwoProps>

interface CustomOneProps extends ButtonHTMLAttributes<unknown> {
  primary?: boolean
  size?: 'mini' | 'small' | 'large' | string
  
}

// CustomOne Comp comes here -- 
const CustomOne = ComponentFactory({
  "name": "Custom.One",
  "baseClass": "",
  "as": "button",
  "directives": {
    "primary": "",
    "size": {
      "mini": [
        "text-xs"
      ],
      "small": [
        "text-sm"
      ],
      "large": [
        "text-lg"
      ],
      "string": ""
    }
  }
}) as React.FC<CustomOneProps>

interface CustomComponent {
  Three: React.FC<CustomThreeProps>
  Two: React.FC<CustomTwoProps>
  One: React.FC<CustomOneProps>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Custom:any = {}

Custom.Three = CustomThree
Custom.Two = CustomTwo
Custom.One = CustomOne

export default Custom as CustomComponent