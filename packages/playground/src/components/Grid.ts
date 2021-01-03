import React, { HTMLAttributes } from 'react'
import { ComponentFactory } from 'semantic-tailwind-react'

interface GridColumnProps extends HTMLAttributes<unknown> {
  [key: string]: unknown
  as?: React.FC<any> | string
}

// GridColumn Comp comes here -- 
const GridColumn = ComponentFactory({
  "baseClass": "",
  "as": "div",
  "directives": {},
  "name": "Grid.Column"
}) as React.FC<GridColumnProps>

interface GridRowProps extends HTMLAttributes<unknown> {
  [key: string]: unknown
  as?: React.FC<any> | string
}

// GridRow Comp comes here -- 
const GridRow = ComponentFactory({
  "baseClass": "",
  "as": "div",
  "directives": {},
  "name": "Grid.Row"
}) as React.FC<GridRowProps>

interface GridProps extends HTMLAttributes<unknown> {
  widths?: 1 | 3 | 2.58 | 4.
  cols?: '1' | '2' | '3' | '4' | 'full'
  
  as?: React.FC<any> | string
}

interface GridComponent extends React.FC<GridProps> {
  Column: React.FC<GridColumnProps>
  Row: React.FC<GridRowProps>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Grid:any = ComponentFactory({
  "baseClass": "",
  "as": "div",
  "directives": {
    "widths": {
      "1": "1",
      "3": "3",
      "2.58": "2.58",
      "4.": "4."
    },
    "cols": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "full": "full"
    }
  },
  "name": "Grid"
})

Grid.Column = GridColumn
Grid.Row = GridRow

export default Grid as GridComponent