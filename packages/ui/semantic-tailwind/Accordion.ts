import { ComponentFactory } from 'semantic-tailwind-react'
import React, { HTMLAttributes } from 'react'
import { getConfigObject } from 'semantic-tailwind-core'

const configObj = getConfigObject()

interface AccordionContentProps extends HTMLAttributes<unknown> {
  as?: React.FC<any> | string
  [key: string]: any
}

// AccordionContent Comp comes here --
const AccordionContent = ComponentFactory({
  baseClass: [
    'block',
    'p-2'
  ],
  as: 'AccordionContent',
  directives: {},
  forwardRef: false,
  name: 'Accordion.Content'
}, configObj) as React.FC<AccordionContentProps>

interface AccordionTitleProps extends HTMLAttributes<unknown> {
  color?: 'gray'
  basic?: boolean
  active?: boolean
  as?: React.FC<any> | string
  [key: string]: any
}

// AccordionTitle Comp comes here --
const AccordionTitle = ComponentFactory({
  baseClass: [],
  as: 'div',
  directives: {
    color: {
      gray: [
        'gray'
      ]
    },
    basic: [],
    active: []
  },
  matched: {
    basic: 'text-@color-600 border border-@color-600 border-t-0 border-l-0 border-r-0 hover:bg-@color-200 hover:text-@color-500 p-2',
    'active,basic': 'text-@color-600 border border-@color-600 border-b-0 border-l-0 border-r-0 hover:bg-@color-200 hover:text-@color-500 p-2'
  },
  forwardRef: false,
  name: 'Accordion.Title'
}, configObj) as React.FC<AccordionTitleProps>

interface AccordionProps extends HTMLAttributes<unknown> {
  as?: React.FC<any> | string
  [key: string]: any
}

interface AccordionComponent extends React.FC<AccordionProps> {
  Content: React.FC<AccordionContentProps>
  Title: React.FC<AccordionTitleProps>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Accordion:any = ComponentFactory({
  baseClass: [],
  as: 'div',
  directives: {},
  forwardRef: false,
  name: 'Accordion'
}, configObj)

Accordion.Content = AccordionContent
Accordion.Title = AccordionTitle

export default Accordion as AccordionComponent
