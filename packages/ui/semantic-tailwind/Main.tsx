// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'

export default function () {
  const seeRef = useRef<unknown>()
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    console.log(seeRef)
  })

  return (
    <div className={toggle ? 'text-white bg-black group' : 'group'}>
    <h1 className="text-green-500">Welcome on board</h1>
    <button tabIndex={0} className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none focus:shadow-lg focus:text-red-200 mr-1 mb-1" type="button">
      Small
    </button>
    <hr />

    <Button className="m-2" basic dark={!toggle} onClick={() => setToggle(x => !x)}>{toggle ? 'Light' : 'Dark'}</Button>
    <br />
    <Button className="m-2" dark={toggle}>Click</Button>
    <br />
    <Button className="m-2 w-16 h-16" circular basic size="mini" dark={toggle}>Click Basic</Button>
    <br />
    <Button className="m-2" primary size="large" rounded dark={toggle}>Click Primary</Button>
    <br />
    <Button className="m-2" size="small" color="" rounded dark={toggle}>Click</Button>

  <div className="group-hover:bg-green-200">
      <br />
      {['red', 'blue', 'green', 'orange', 'yellow', 'teal'].map(
        color => <Button key={color} className="m-2" color={color} basic size="large" rounded dark={toggle}>Click {color}</Button>
      )}

    <br />
      {['red', 'blue', 'green', 'orange', 'yellow', 'teal'].map(
        color => <Button key={color} className="m-2" color={color} size="large" rounded dark={toggle}>Click {color}</Button>
      )}
    <br />
      {['red', 'blue', 'green', 'orange', 'yellow', 'teal'].map(
        color => <Button key={color} className="m-2 w-16 h-16" circular color={color} size="small" dark={toggle}>{color}</Button>
      )}
    <br />
      {['red', 'blue', 'green', 'orange', 'yellow', 'teal'].map(
        color => <Button key={color} className="m-2 w-16 h-16" basic circular color={color} size="small" dark={toggle}>{color}</Button>
      )}
      </div>

  </div>
  )
}
