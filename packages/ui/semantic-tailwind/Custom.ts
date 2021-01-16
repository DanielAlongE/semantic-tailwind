import React, { HTMLAttributes } from 'react'
import { ComponentFactory, getConfig } from 'semantic-tailwind-react'

const configObj = getConfig()

interface GridColumnProps extends HTMLAttributes<unknown> {
  [key: string]: unknown
}

// GridColumn Comp comes here --
const GridColumn = ComponentFactory({
  name: 'Grid.Column',
  baseClass: '',
  as: 'div',
  directives: {}
}, configObj) as React.FC<GridColumnProps>

interface GridRowProps extends HTMLAttributes<unknown> {
  [key: string]: unknown
}

// GridRow Comp comes here --
const GridRow = ComponentFactory({
  name: 'Grid.Row',
  baseClass: '',
  as: 'div',
  directives: {}
}, configObj) as React.FC<GridRowProps>

interface GridProps extends HTMLAttributes<unknown> {
  widths?: 1 | 3 | 2.58 | 4.0
  cols?: '1' | '2' | '3' | '4' | 'full'

}

interface GridComponent extends React.FC<GridProps> {
  Column: React.FC<GridColumnProps>
  Row: React.FC<GridRowProps>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Grid:any = ComponentFactory({
  name: 'Grid',
  baseClass: '',
  as: 'div',
  directives: {
    widths: {
      1: '1',
      3: '3',
      2.58: '2.58',
      '4.': '4.'
    },
    cols: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      full: 'full'
    }
  }
}, configObj)

Grid.Column = GridColumn
Grid.Row = GridRow

export default Grid as GridComponent
