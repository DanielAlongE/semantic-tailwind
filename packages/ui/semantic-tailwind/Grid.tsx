import React from 'react'
import { ComponentFactory, getConfig } from 'semantic-tailwind-react'

const configObj = getConfig()

export const GridColumn = ComponentFactory({
  name: 'Grid.Column',
  as: 'div',
  baseClass: [''],
  directives: {
    col: {
      auto: 'auto',
      1: 'span-1',
      2: 'span-2',
      3: 'span-3',
      4: 'span-4',
      5: 'span-5',
      6: 'span-6',
      7: 'span-7',
      8: 'span-8',
      9: 'span-9',
      10: 'span-10',
      11: 'span-11',
      12: 'span-12',
      full: 'span-full',
      start_1: 'start-1',
      start_2: 'start-2',
      start_3: 'start-3',
      start_4: 'start-4',
      start_5: 'start-5',
      start_6: 'start-6',
      start_7: 'start-7',
      start_8: 'start-8',
      start_9: 'start-9',
      start_10: 'start-10',
      start_11: 'start-11',
      start_12: 'start-12',
      start_13: 'start-13',
      start_auto: 'start-auto',
      'end-1': 'end-1',
      end_2: 'end-2',
      end_3: 'end-3',
      end_4: 'end-4',
      end_5: 'end-5',
      end_6: 'end-6',
      end_7: 'end-7',
      end_8: 'end-8',
      end_9: 'end-9',
      end_10: 'end-10',
      end_11: 'end-11',
      end_12: 'end-12',
      end_13: 'end-13',
      end_auto: 'end-auto'
    }
  },
  computed: {
    col: 'col-#'
  },
  matched: {
    'primary,dark': 'bg-black text-@color:primary-500',
    'color:true': 'bg-gray-200'
  },
  filters: {}
}, configObj)

interface GridComponent extends React.FC<any>{
  Column: React.FC<any>
}

const Grid:any = ComponentFactory({
  name: 'Grid',
  as: 'div',
  baseClass: ['grid'],
  directives: {
    cols: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      8: '8',
      10: '10',
      12: '12',
      none: 'none'
    }
  },
  computed: {
    cols: 'grid-cols-#'
  }
}, configObj)

Grid.Column = GridColumn

export default Grid as GridComponent
