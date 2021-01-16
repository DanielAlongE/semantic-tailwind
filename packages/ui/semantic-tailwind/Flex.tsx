import React from 'react'
import { ComponentFactory, getConfig } from 'semantic-tailwind-react'

const configObj = getConfig()

export const GridColumn = ComponentFactory({
  name: 'Grid.Column',
  as: 'div',
  baseClass: [''],
  directives: {
    width: {
      auto: 'auto',
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      8: '8',
      10: '10',
      12: '12',
      16: '16',
      20: '20',
      24: '24',
      32: '32',
      40: '40',
      48: '48',
      56: '56',
      64: '64',
      px: 'px',
      '1/2': '1/2',
      '1/3': '1/3',
      '2/3': '2/3',
      '1/4': '1/4',
      '2/4': '2/4',
      '3/4': '3/4',
      '1/5': '1/5',
      '2/5': '2/5',
      '3/5': '3/5',
      '4/5': '4/5',
      '1/6': '1/6',
      '2/6': '2/6',
      '3/6': '3/6',
      '4/6': '4/6',
      '5/6': '5/6',
      '1/12': '1/12',
      '2/12': '2/12',
      '3/12': '3/12',
      '4/12': '4/12',
      '5/12': '5/12',
      '6/12': '6/12',
      '7/12': '7/12',
      '8/12': '8/12',
      '9/12': '9/12',
      '10/12': '10/12',
      '11/12': '11/12',
      full: 'full',
      screen: 'screen'
    }
  },
  computed: {
    width: 'w-#'
  },
  matched: {
    'width:false,className:false': 'w-11/12',
    'primary,dark': 'bg-black text-@color:primary-500',
    'color:false': 'bg-gray-200'
  },
  filters: {}
}, configObj)

interface GridComponent extends React.FC<any>{
  Column: React.FC<any>
}

const Grid:any = ComponentFactory({
  name: 'Grid',
  as: 'div',
  baseClass: ['flex'],
  directives: {}
}, configObj)

Grid.Column = GridColumn

export default Grid as GridComponent
