/* eslint-disable no-use-before-define */
import React from 'react'
// import { ComponentFactory } from 'semantic-tailwind-react'
import Custom from '../components/Custom'
// import { getValidHtmlProp } from 'semantic-tailwind-react/dist/lib/helper'

// <Custom.Two size="large" primary>I am a button</Custom.Two>
const ColorShowcase = ({ color }: any) => {
  return <div>{color}</div>
}

function ColorMapper (Comp: React.FC<any>) {
  return function (props:any) {
    const color = props.color === 'Blue' ? 'Read' : props.color
    return <Comp color={color} />
  }
}

const MappedColorShowcase = ColorMapper(ColorShowcase)

export default function Index () {
  // const CustomOne = ComponentFactory({
  //   baseClass: '',
  //   as: 'button',
  //   directives: {
  //     primary: '',
  //     size: {
  //       mini: [
  //         'text-xs'
  //       ],
  //       small: [
  //         'text-sm'
  //       ],
  //       large: [
  //         'text-lg'
  //       ],
  //       string: ''
  //     }
  //   },
  //   name: 'Custom.One'
  // })

  // const SmallRef = React.forwardRef(({ children, ...props }: any, ref:unknown) => {
  //   const vProps = getValidHtmlProp(props)
  //   console.log('Small', { props, vProps })
  //   return React.createElement('div', { ref, ...vProps }, children)
  // })

  // const Small = ({ children, ...props }: any) => {
  //   const vProps = getValidHtmlProp(props)
  //   console.log('Small', { props, vProps })
  //   return React.createElement('div', vProps, children)
  // }

  // const Div = ({ children, ref, ...props }: any) => {
  //   if (ref) {
  //     console.log(ref)
  //   }
  //   return React.createElement(SmallRef, props, children)
  // }
  // getElementControl('Button')({ baseClass: ['show'] })
  // console.log(Div)
  //    <Custom.Three ref={console.warn} size="mini" primary>Some one is here</Custom.Three>

  return (<div>
    <MappedColorShowcase color="Blue" />
    <h1>Hello</h1>
    <Custom.Three className="bg-blue-500" as="a" href="wow" size="small" primary={false} ref={console.log}>Give me all</Custom.Three>
  </div>)
}
