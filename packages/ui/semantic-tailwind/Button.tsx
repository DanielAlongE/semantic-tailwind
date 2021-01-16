// eslint-disable-next-line no-use-before-define
import React, { ButtonHTMLAttributes } from 'react'
import { ComponentFactory, getConfig } from 'semantic-tailwind-react'

const configObj = getConfig()

interface ButtonProps extends ButtonHTMLAttributes<{}> {
  primary?: boolean
  basic?: boolean
  glamore?: boolean
  color?: 'gray' | 'red' | 'blue' | 'green' | 'orange' | 'yellow' | 'teal' | string
  size?: 'mini' | 'small' | 'large'
  rounded?: boolean
  circular?: boolean
  dark?: boolean
  disabled?: boolean
  [key: string]: any
}

export default ComponentFactory({
  name: 'Button',
  as: 'Button',
  baseClass: ['p-2'],
  directives: {
    primary: '',
    basic: '',
    glamore: '',
    color: {
      gray: 'gray',
      red: 'red',
      blue: 'blue',
      green: 'green',
      orange: 'orange',
      yellow: 'yellow',
      teal: 'teal'
    },
    size: {
      mini: ['text-xs'],
      small: ['text-sm'],
      large: ['text-lg']
    },
    rounded: ['rounded'],
    circular: ['rounded-full'],
    dark: '',
    disabled: 'cursor-not-allowed bg-opacity-25 text-opacity-50'
  },
  computed: {
  },
  matched: {
    primary: 'bg-@color:primary-500 text-white',
    'primary,dark': 'bg-black text-@color:primary-500',
    color: 'text-@color-100 hover:bg-@color-500 hover:text-@color-300 bg-@color-600',
    'color,dark': 'text-@color-200 hover:bg-@color-700 hover:text-@color-200 bg-@color-900',
    'color,active': 'text-@color-300 hover:bg-@color-500 hover:text-@color-300 bg-@color-800',
    'color,basic': 'border border-@color-600 hover:bg-@color-200 text-@color-600 bg-white',
    'color,basic,dark': 'border border-@color-500 bg-black text-@color-200 hover:bg-@color-800',
    'basic:false': 'border border-@color-600 hover:bg-@color-200 text-@color-600 bg-white',
    'basic:false,dark': 'border border-@color-500 bg-black text-@color-200 hover:bg-@color-800 ',
    basic: 'border border-@color-600 hover:bg-@color-200 text-@color-600 bg-white',
    'basic,dark': 'border border-@color-500 bg-black text-@color-200 hover:bg-@color-800'
    // "color,active":"text-@color-400 bg-@color-800"
  },
  filters: {
    dark: [
    // [".+", ""],
    // [".+", "bg-black text-@color-200"],
    // ["(([a-z0-9:]+)*text-([a-z0-9]+)-([a-z0-9]+))", ""],
    // ["(bg-([a-z0-9-]+))", "{text-$2} @color"],
    ],
    disabled: [
      ['focus:[a-z0-9-]+', ''],
      ['active:[a-z0-9-]+', ''],
      ['hover:[a-z0-9-]+', '']
    ]
  }
}, configObj) as React.FC<ButtonProps>
