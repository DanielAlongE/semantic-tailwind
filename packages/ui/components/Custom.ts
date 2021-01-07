import React, { ButtonHTMLAttributes } from 'react'
import { ComponentFactory } from 'semantic-tailwind-react'

interface CustomThreeProps extends ButtonHTMLAttributes<unknown> {
  primary?: boolean
  size?: 'mini' | 'small' | 'large'

  ref?: unknown
  as?: React.FC<any> | string
  [key: string]: any
}

// CustomThree Comp comes here --
const CustomThree = ComponentFactory({
  baseClass: '',
  as: 'Button',
  forwardRef: true,
  directives: {
    primary: 'welcome',
    size: {
      mini: [
        'text-xs'
      ],
      small: [
        'text-sm'
      ],
      large: [
        'text-lg'
      ]
    }
  },
  name: 'Custom.Three'
}) as React.FC<CustomThreeProps>

interface CustomTwoProps extends ButtonHTMLAttributes<unknown> {
  primary?: boolean
  size?: 'mini' | 'small' | 'large'

  as?: React.FC<any> | string
  [key: string]: any
}

// CustomTwo Comp comes here --
const CustomTwo = ComponentFactory({
  baseClass: '',
  as: 'button',
  directives: {
    primary: '',
    size: {
      mini: [
        'text-xs'
      ],
      small: [
        'text-sm'
      ],
      large: [
        'text-lg'
      ]
    }
  },
  name: 'Custom.Two'
}) as React.FC<CustomTwoProps>

interface CustomOneProps extends ButtonHTMLAttributes<unknown> {
  primary?: boolean
  size?: 'mini' | 'small' | 'large' | string

  as?: React.FC<any> | string
  [key: string]: any
}

// CustomOne Comp comes here --
const CustomOne = ComponentFactory({
  baseClass: '',
  as: 'button',
  directives: {
    primary: '',
    size: {
      mini: [
        'text-xs'
      ],
      small: [
        'text-sm'
      ],
      large: [
        'text-lg'
      ],
      string: ''
    }
  },
  name: 'Custom.One'
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
