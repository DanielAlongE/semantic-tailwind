// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../semantic-tailwind/Button'
import Grid from '../semantic-tailwind/Grid'
import { Provider, useSubscribedState, SubscribedState as S } from 'react-subscribed-state'
import dotProp from 'react-subscribed-state/dist/lib/dotProp'
import { ClassProp, ComponentData, Directives } from 'semantic-tailwind-core/src/types'
import Accordion from '../semantic-tailwind/Accordion'
import Card from '../semantic-tailwind/Card'

function BooleanDirective ({ componentIndex, name }: {componentIndex:number, name:string}) {
  return (
    <NewClassField path={`components.${componentIndex}.directives.${name}`} />
  )
}

function ObjectDirective ({ componentIndex, name }: {componentIndex:number, name:string}) {
  const path = `components.${componentIndex}.directives.${name}`
  const { getStateField } = useSubscribedState((k, v:any = {}, p:any = {}) => {
    // console.log(k, v, p)
    // console.log(path,Object.keys(v).length, Object.keys(p).length)
    // console.log(path,Object.keys(v), Object.keys(p))
    const vKeys: string[] = Object.keys(v)
    const pKeys: string[] = Object.keys(p)

    if (k === path) {
      if (vKeys.length !== pKeys.length) {
        return true
      }

      if ((vKeys.map(x => pKeys.includes(x))).some(x => x === false)) {
        return true
      }
    }
    return false
  })
  const { editObjectKey } = useComponentForm()
  const classObject: Record<string, ClassProp> = getStateField(path, {})

  const { deleteDirectiveProperty, addDirectiveProperty } = useComponentForm()

  return (
    <>
      {Object.entries(classObject).map(([propertyKey, value], i) => (
        <Grid cols="12" className="gap-2" key={`${path}-${propertyKey}`}>
          <Grid.Column className="md:col-span-4" col="4">
            <input className="w-full p-2" onBlur={e => editObjectKey(path, propertyKey, e.target.value)} defaultValue={propertyKey} placeholder="Property key" />
          </Grid.Column>
          <Grid.Column className="md:col-span-7" col="7">
            <NewClassField path={`${path}.${propertyKey}`} />
          </Grid.Column>
          <Grid.Column className="md:col-span-1" col="1">
            <Button onClick={() => deleteDirectiveProperty(componentIndex, name, propertyKey)} className="w-8 h-8 m-auto" circular color="red" type="button">-</Button>
          </Grid.Column>
        </Grid>))}
        <Button onClick={() => addDirectiveProperty(componentIndex, name)} color="green" rounded type="button">Add</Button>
    </>
  )
}

interface NewClassFieldProps {
  path: string
  isString?: boolean
  listId?: string
  placeholder?: string
  value?: string[]
  splitBy?: RegExp | string
  joinBy?: string
  onSearch?: (t: string) => void
  onUpdate?: (t: string, p: string[]) => void
}
function NewClassField ({
  path,
  isString = false,
  listId = 'suggest_classnames',
  placeholder = 'Class',
  value,
  splitBy = /[\s,]+/,
  joinBy = ' ',
  onSearch,
  onUpdate
}: NewClassFieldProps) {
  const { setStateField, getStateField } = useSubscribedState()

  const stringToArray = (v: string | string[], splitBy: RegExp | string): string[] => {
    const result = (typeof v === 'string')
      ? v.split(splitBy)
      : Array.isArray(v) ? v : []

    return result.filter(x => x !== '')
  }

  const inputRef = useRef<any>()

  const buttons = <S fields={[path]} >
        {({ getStateField }) => {
          const _v: string | string[] = value || getStateField(path, [])
          const val: string[] = stringToArray(_v, splitBy)

          console.log({ _v, val, value, splitBy })
          return (
            <>
              {val.map((c, i) => {
                if (!c) {
                  return null
                }
                return (<Button className="mx-2 mb-2" rounded onClick={() => editClassById(i, val)} color="gray" index={i} key={`${path}.${i}`} type="button">{c}</Button>)
              })}
            </>
          )
        }}
      </S>

  const editClassById = (id:number, cls:string[]) => {
    if (inputRef.current) {
      const v = cls.filter((_, i) => i !== id)

      inputRef.current.value = cls[id] || ''
      inputRef.current.focus()

      if (onUpdate) {
        return onUpdate('', v)
      }
      setStateField(path, v)
    }
  }

  const handleSearch = (text: string) => {
    if (onSearch) return onSearch(text)
    setStateField('suggestion_search', text)
  }

  const handleUpdate = (text: string) => {
    if (!text) {
      return
    }
    const _v: string[] = value || getStateField(path, [])
    const v = stringToArray(_v, splitBy)

    if (onUpdate) {
      return onUpdate(text, v)
    }

    const val = text.split(splitBy)
    console.log('handleUpdate', text)

    const result = [...v, ...val]

    setStateField(
      path,
      isString ? result.join(joinBy) : result
    )
  }

  return (
    <>
      {buttons}
      <input list={listId} className="p-2 h-10 mr-2 mb-2 w-32 border border-gray-500" ref={inputRef} placeholder={placeholder}
      onBlur={e => {
        const v = e.target.value
        if (v) {
          console.log('onBlur', e.target.value)
          handleUpdate(e.target.value)
          e.target.value = ''
        }
      }}
      onChange={e => {
        handleSearch(e.target.value)
        // console.log(`text:'${e.target.value}', count: ${e.target.value.length}`)
      }}
        onKeyDown={e => {
          // const { code, key, ctrlKey } = e
          // console.log({ code, key, ctrlKey })
          if (['Enter', 'Space', 'Comma'].includes(e.code)) {
            e.preventDefault()
            handleSearch('')
            if (!inputRef.current) {
              return
            }

            handleUpdate(inputRef.current.value)
            inputRef.current.value = ''
          }
        }} />
    </>
  )
}

function DirectivesForm ({ componentIndex }:{componentIndex:number}) {
  const path = `components.${componentIndex}.directives`
  const { stateRef } = useSubscribedState(k => k === path)
  const data:Directives = dotProp.get(stateRef.current, path, {})

  const { addBooleanDirective, addVariableDirective, deleteDirective, editObjectKey } = useComponentForm()
  return (
    <Grid className="group divide-y divide-gray-400" cols="12">
      {Object.entries(data).map(([directiveName, value], index) => (
        <React.Fragment key={`directive-${directiveName}-${index}`}>
          <Grid.Column col="1" className="p-2 group-hover:bg-gray-100  md:col-span-1">
            <Button onClick={() => deleteDirective(componentIndex, directiveName)} rounded color="blue" type="button">-</Button>
          </Grid.Column>
          <Grid.Column col="11" className="p-2 group-hover:bg-gray-100 md:col-span-3">
            <input className="p-2 h-10 border border-gray-500 min-w-full" defaultValue={directiveName} onBlur={e => editObjectKey(path, directiveName, e.target.value)} placeholder="Directive Name" />
          </Grid.Column>
          <Grid.Column col="12" className="p-2 group-hover:bg-gray-100 md:col-span-8">
            {(Array.isArray(value) || typeof value === 'string')
              ? <BooleanDirective componentIndex={componentIndex} name={directiveName} />
              : <ObjectDirective componentIndex={componentIndex} name={directiveName} />}
          </Grid.Column>
        </React.Fragment>
      ))}
      <Grid.Column className="md:col-start-5 md:col-span-8" col="12">
        <Button onClick={() => addBooleanDirective(componentIndex)} className="m-2" rounded color="blue" type="button">Add Bolean Directive</Button>
        <Button onClick={() => addVariableDirective(componentIndex)} className="m-2" rounded color="blue" type="button">Add variable Directive</Button>
      </Grid.Column>
    </Grid>
  )
}

function ComputedForm ({ componentIndex }:{componentIndex:number}) {
  const computedPath = `components.${componentIndex}.computed`
  // const { getStateField } = useSubscribedState(k => k === computedPath)
  const directivePath = `components.${componentIndex}.directives`

  const { addComputed, deleteComputed } = useComputed()
  const { editObjectKey } = useComponentForm()
  return (
  <>
    <S fields={[computedPath]}>
      {({ getStateField }) => {
        const computedData:Directives = getStateField(computedPath, {})
        return (
        <Grid className="group divide-y divide-gray-400" cols="12">
        {Object.entries(computedData).map(([directiveName]) => (
          <React.Fragment key={`${computedPath}-${directiveName}`}>
            <Grid.Column col="1" className="p-2 group-hover:bg-gray-100  md:col-span-1">
              <Button onClick={() => deleteComputed(componentIndex, directiveName)} rounded color="blue" type="button">-</Button>
            </Grid.Column>
            <Grid.Column col="11" className="p-2 group-hover:bg-gray-100 md:col-span-3">
              <input list="suggest_directives" className="p-2 h-10 border border-gray-500 min-w-full" defaultValue={directiveName} onBlur={e => editObjectKey(computedPath, directiveName, e.target.value)} placeholder="Directive Name" />
            </Grid.Column>
            <Grid.Column col="12" className="p-2 group-hover:bg-gray-100 md:col-span-8">
              <NewClassField path={`components.${componentIndex}.computed.${directiveName}`} isString={true} />
            </Grid.Column>
          </React.Fragment>
        ))}
        <Grid.Column className="md:col-start-5 md:col-span-8" col="12">
          <Button onClick={() => addComputed(componentIndex)} className="m-2" rounded color="blue" type="button">Add Computed</Button>
        </Grid.Column>
      </Grid>)
      }}
    </S>
    <S fields={[directivePath]}>{({ getStateField }) => {
      const d = getStateField(directivePath, {})
      const directives = Object.keys(d)

      return <datalist id='suggest_directives'>{directives.map(o => <option key={o}>{o}</option>)}</datalist>
    }}</S>
  </>
  )
}

function SmartInput ({
  onKeyDown,
  onBlur,
  onChange,
  onExit,
  clearOnExit = false,
  value,
  ...rest
}: {
  onKeyDown?: (v: string) => void
  onBlur?: (v: string) => void
  onChange?: (v: string) => void
  onExit?: (v: string) => void
  clearOnExit?: boolean
  value?: string
  [key: string]: any
}) {
  const valueRef = useRef(value || '')
  const inputRef = useRef<any>()

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleExit = () => {
    onExit && onExit(valueRef.current)
    if (clearOnExit) {
      valueRef.current = ''
      inputRef.current.value = ''
    }
  }

  return (
    <input ref={inputRef} className="p-2 h-10 mr-2 mb-2 w-32 border border-gray-500"
      defaultValue={valueRef.current}
      onBlur={e => {
        onBlur && onBlur(valueRef.current)
        handleExit()
      }}
      onChange={e => {
        valueRef.current = e.target.value
        onChange && onChange(valueRef.current)
      }}
      onKeyDown={e => {
        if (['Enter', 'Space', 'Comma'].includes(e.code)) {
          e.preventDefault()
          onKeyDown && onKeyDown(valueRef.current)
          handleExit()
        }
      }}
      {...rest} />
  )
}

function ButtonInputToggle ({
  value,
  name,
  setValue,
  inputProps = {},
  buttonProps = {}
}:
  {
  value: string
  name: string
  setValue: (name:string, value: string) => void
  inputProps?: any
  buttonProps?: any
}) {
  const [isInput, setIsInput] = useState(false)
  const valueRef = useRef<string>(value)

  if (!valueRef.current) return null

  if (isInput) {
    return <SmartInput value={valueRef.current} onChange={v => { valueRef.current = v }} onExit={v => {
      setValue(name, v)
      valueRef.current = v
      setIsInput(false)
    }} onBlur={() => setIsInput(false)} {...inputProps} />
  }

  return (
    <Button className="mx-2 mb-2" rounded type='button' onClick={() => setIsInput(true)} {...buttonProps}>{valueRef.current}</Button>
  )
}

function MatchedKey ({ componentIndex, name }:{componentIndex: number, name: string}) {
  const { editObjectKey } = useComponentForm()
  const d = name.split(',').filter(x => x !== '')
  const itemRef = useRef<string[]>(d)
  const [, setRender] = useState({})

  const reRender = () => setRender({})

  const handleSubmit = () => {
    editObjectKey(`components.${componentIndex}.matched`, name, itemRef.current.join(','))
    // console.log(itemRef.current.join(','))
  }

  const getDirectiveIndex = (directive: string) => {
    const [d] = directive.split(':')
    const count = itemRef.current.length

    for (let i = 0; i < count; i += 1) {
      const [_d] = itemRef.current[i].split(':')
      if (d === _d) {
        return i
      }
    }

    return -1
  }

  const addNew = (v: string) => {
    if (v && !itemRef.current.includes(v)) {
      const index = getDirectiveIndex(v)
      if (index > -1) {
        itemRef.current[index] = v
      } else {
        itemRef.current.push(v)
      }
      reRender()
    }
  }

  const updateItem = (value: string, index: number) => {
    itemRef.current[index] = value
    if (!value) {
      itemRef.current = itemRef.current.filter(x => x !== '')
      reRender()
    }
  }

  const setValue = useCallback((name, v) => updateItem(v, +name), [])

  return (
    <>
      {itemRef.current.map((k, i) => {
        return (<ButtonInputToggle key={k} name={`${i}`} value={k} setValue={setValue} />)
      })}
      <SmartInput list='suggest_matched' onExit={(v) => addNew(v)} clearOnExit={true} />
      <button type='button' onClick={handleSubmit}>Update</button>
    </>
  )
}

function MatchedForm ({ componentIndex }:{componentIndex:number}) {
  const matchedPath = `components.${componentIndex}.matched`
  // const { getStateField } = useSubscribedState(k => k === matchedPath)
  const directivePath = `components.${componentIndex}.directives`

  const { addMatched, deleteMatched } = useMatched()

  return (
  <>
    <S fields={[matchedPath]}>
      {({ getStateField }) => {
        const matchedData:Directives = getStateField(matchedPath, {})
        return (
        <Grid className="group divide-y divide-gray-400" cols="12">
        {Object.entries(matchedData).map(([directiveName]) => (
          <React.Fragment key={`${matchedPath}-${directiveName}`}>
            <Grid.Column col="1" className="p-2 group-hover:bg-gray-100  md:col-span-1">
              <Button onClick={() => deleteMatched(componentIndex, directiveName)} rounded color="blue" type="button">-</Button>
            </Grid.Column>
            <Grid.Column col="11" className="p-2 group-hover:bg-gray-100 md:col-span-3">
              <MatchedKey componentIndex={componentIndex} name={directiveName} />
            </Grid.Column>
            <Grid.Column col="12" className="p-2 group-hover:bg-gray-100 md:col-span-8">
              <NewClassField path={`components.${componentIndex}.matched.${directiveName}`} isString={true} />
            </Grid.Column>
          </React.Fragment>
        ))}
        <Grid.Column className="md:col-start-5 md:col-span-8" col="12">
          <Button onClick={() => addMatched(componentIndex)} className="m-2" rounded color="blue" type="button">Add Match</Button>
        </Grid.Column>
      </Grid>)
      }}
    </S>
    <S fields={[directivePath]}>{({ getStateField }) => {
      const d = getStateField(directivePath, {})
      const matches: string[] = []

      Object.entries(d).forEach(([name, value]: [string, any]) => {
        matches.push(name)
        // const currentDirective =
        if (Array.isArray(value) || typeof value === 'string') {
          matches.push(`${name}:true`)
          matches.push(`${name}:false`)
        } else {
          Object.keys(value).forEach(k => {
            matches.push(`${name}:${k}`)
          })
        }
      })

      return <datalist id='suggest_matched'>{matches.map(o => <option key={o}>{o}</option>)}</datalist>
    }}</S>
  </>
  )
}

function FilterForm ({ componentIndex }: { componentIndex: number }) {
  const inputRef = useRef('')
  const [items, setItems] = useState<string[]>([])

  const handleSubmit = () => {
    setItems(x => [...x, inputRef.current])
  }

  return (<div>
      {items.map(x => <SmartInput key={x} disabeld='true' value={x} />)}
      <input className='bg-teal-300' onChange={e => { inputRef.current = e.target.value }} onKeyDown={e => {
        console.log(e.key)
        if (e.key === 'Enter') {
          handleSubmit()
        }
      }} />
  </div>)
}

function useMatched () {
  const { setStateField } = useSubscribedState()

  const deleteMatched = (componentIndex: number, matchedKey:string) => {
    setStateField(`components.${componentIndex}.matched`, (d:any) => {
      const { [matchedKey]: x, ...rest } = d
      return rest
    })
  }

  const addMatched = (componentIndex: number) => {
    setStateField(`components.${componentIndex}.matched`, (d:any = {}) => {
      const count = d ? Object.keys(d).length : ''
      let name = `directive${count || ''}`
      if (name in d) {
        name += `${count}`
      }
      return ({ ...d, [name]: '' })
    })
  }

  return {
    addMatched,
    deleteMatched
  }
}

function useComputed () {
  const { setStateField } = useSubscribedState()

  const deleteComputed = (componentIndex: number, computedKey:string) => {
    setStateField(`components.${componentIndex}.computed`, (d:any) => {
      const { [computedKey]: x, ...rest } = d
      return rest
    })
  }

  const addComputed = (componentIndex: number) => {
    setStateField(`components.${componentIndex}.computed`, (d:any = {}) => {
      const count = d ? Object.keys(d).length : ''
      let name = `directive${count || ''}`
      if (name in d) {
        name += `${count}`
      }
      return ({ ...d, [name]: '' })
    })
  }

  return {
    addComputed,
    deleteComputed
  }
}

function useComponentForm () {
  const { stateRef, setStateField } = useSubscribedState()

  const uniqueComponentName = (name:string) => {
    const comps: ComponentData[] = dotProp.get(stateRef.current, 'components', [])
    const count = comps.filter(x => x?.name?.indexOf(name) === 0).length
    return count ? `${name}${count}` : name
  }

  const addComponent = (name = 'Custom.Component') => {
    const compData: ComponentData = {
      name: uniqueComponentName(name),
      baseClass: [],
      as: 'div',
      directives: {},
      forwardRef: false
    }

    setStateField('components', (s:any[]) => {
      return [...s, compData]
    })
  }

  const deleteComponent = (id: number) => {
    setStateField('components', (c:any[]) => c.filter((_, i) => i !== id))
  }

  const deleteDirective = (componentIndex: number, directiveKey:string) => {
    setStateField(`components.${componentIndex}.directives`, (d:any) => {
      const { [directiveKey]: x, ...rest } = d
      return rest
    })
  }

  const deleteDirectiveProperty = (componentIndex: number, directiveKey:string, name:string) => {
    setStateField(`components.${componentIndex}.directives.${directiveKey}`, (d:any) => {
      const obj: any = {}
      // console.log(d)
      if (d) {
        Object.entries(d).forEach(([k, v]) => {
          if (name !== k) {
            obj[k] = v
          }
        })
      }
      // console.log(obj)
      return obj
    })
  }

  const addDirectiveProperty = (componentIndex: number, directiveKey:string) => {
    setStateField(`components.${componentIndex}.directives.${directiveKey}`, (d:any = {}) => {
      const count = d ? Object.keys(d).length : 0
      // console.log(d)
      let name = `option${count || ''}`
      if (name in d) {
        name += `${count}`
      }
      return { ...d, [name]: [] }
    })
  }

  const addBooleanDirective = (componentIndex: number) => {
    setStateField(`components.${componentIndex}.directives`, (d:any = {}) => {
      const count = d ? Object.keys(d).length : ''
      let name = `directive${count || ''}`
      if (name in d) {
        name += `${count}`
      }
      return ({ ...d, [name]: [] })
    })
  }

  const addVariableDirective = (componentIndex: number) => {
    setStateField(`components.${componentIndex}.directives`, (d:any = {}) => {
      const count = d ? Object.keys(d).length : ''
      const name = `directive${count || ''}`

      return ({ ...d, [name]: {} })
    })
  }

  const editObjectKey = (path:string, key:string, newKey:string) => {
    if (!newKey) return
    else if (key === newKey) return

    setStateField(path, (d:any) => {
      const obj: any = {}

      // if (newKey in d) return { ...d }

      if (d) {
        if (newKey in d) {
          const count = Object.keys(d).filter(x => x.indexOf(newKey) === 0).length
          newKey += `${count}`
        }

        Object.entries(d).forEach(([k, v]: [string, any]) => {
          console.log({ key, newKey, k })
          if (key === k) {
            obj[newKey] = v
          } else {
            obj[k] = v
          }
        })
      }
      return obj
    })
  }

  const editObjectValue = (path:string, key:string, value:any) => {
    // console.log(path, key, value)
    setStateField(path, (d:any) => {
      if (d) {
        const obj: any = { ...d }
        obj[key] = value
        return obj
      }
      return d
    })
  }

  const updateClassValue = (path:string, value:any) => {
    setStateField(path, value)
  }

  return {
    stateRef,
    deleteDirective,
    addComponent,
    deleteComponent,
    addBooleanDirective,
    addVariableDirective,
    deleteDirectiveProperty,
    addDirectiveProperty,
    editObjectKey,
    editObjectValue,
    updateClassValue
  }
}

function ComponentInfo ({ index }:{index:number}) {
  const path = `components.${index}`
  const { getStateField } = useSubscribedState()
  const data: ComponentData = getStateField(path, {})
  const elements: string[] = getStateField('elements')
  const { as = 'div' } = data

  const { editObjectValue, deleteComponent } = useComponentForm()

  const updateName = (value: string) => {
    if (value) {
      editObjectValue(path, 'name', value)
    }
  }

  const updateRenderAs = (value: string) => editObjectValue(path, 'as', value)

  return (
    <Grid className="group divide-y divide-gray-400" cols="12">
      <Grid.Column className="p-2 md:col-span-4" col="12">
        <input onBlur={e => {
          updateName(e.target.value)
        }} defaultValue={data.name}
          placeholder="Component Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" />
      </Grid.Column>
      <Grid.Column className="p-2 md:col-span-7" col="11">
        <NewClassField path={`components.${index}.baseClass`} />
      </Grid.Column>
      <Grid.Column className="p-2 md:col-span-1" col="1">
        <Button onClick={() => deleteComponent(index)} rounded color="red" type="button">-</Button>
      </Grid.Column>
      <Grid.Column className="p-2 md:col-span-4" col="12">
        <label>Render As:
          <select defaultValue={as} onChange={e => { updateRenderAs(e.target.value) }}>
            {elements.map(x => <option key={x}>{x}</option>)}
          </select>
        </label>
      </Grid.Column>
    </Grid>
  )
}

function ComponentForm ({ index }:{index:number}) {
  const [active, setActive] = useState(0)
  const toggleActive = (id: number) => setActive(x => x === id ? -1 : id)
  const panes = [
    { label: 'Main', render: <ComponentInfo index={index} /> },
    { label: 'Directives', render: <DirectivesForm componentIndex={index} /> },
    { label: 'Computed', render: <ComputedForm componentIndex={index} /> },
    { label: 'Matched', render: <MatchedForm componentIndex={index} /> },
    { label: 'Filters', render: <FilterForm componentIndex={index} /> }
  ]

  // const ContentRender = ({ className, children, active = false, ...rest }: any) => <div className={`${className} ${active ? '' : 'hidden'}`}>{children}</div>
  return (
      <Card rounded color="red">
        <Card.Header>Component {index}</Card.Header>
        <Accordion className="m-2 border border-gray-600">
          {panes.map(({ label, render }, i) => {
            const isActive = active === i
            return (
            <React.Fragment key={`pane-${index}-${i}`}>
              <Accordion.Title basic onClick={() => toggleActive(i)} active={ isActive }>{label}</Accordion.Title>
              <Accordion.Content active={ isActive }>
                {isActive && render}
              </Accordion.Content>
            </React.Fragment>)
          })}
        </Accordion>
      </Card>
  )
}

function Main () {
  const { addComponent } = useComponentForm()

  return (
    <>
      <ComponentGroupTab />
      <Button className="m-2" rounded color="red" onClick={() => addComponent()}>Add Component</Button>
      <SaveButton />
      <S fields={['components', 'activeComponentIndex']}>
        {({ stateRef }) => {
          // const components:  = stateRef?.current?.components || []
          const activeComponentIndex:number = stateRef?.current?.activeComponentIndex || 0
          const component: ComponentData[] | null = dotProp.get(stateRef.current, `components.${activeComponentIndex}`, null)

          if (!component) {
            return null
          }

          // {components.map((_, i) => <ComponentForm key={`comp-${i}`} index={i} />)}
          return (
            <form onSubmit={e => { e.preventDefault() }}>
              <ComponentForm index={activeComponentIndex} />
            </form>
          )
        }}
      </S>

    </>

  )
}

function ComponentGroupTab () {
  const { getStateField, setStateField } = useSubscribedState(k => {
    console.log('k => ' + k)
    return ['activeGroupIndex', 'activeComponentIndex'].includes(k) || k === 'components' || /^components\.[0-9]+/.test(k)
  })

  const groups: Record<string, [number, string][]> = {}
  const comps: ComponentData[] = getStateField('components', [])
  const activeGroupIndex: number = getStateField('activeGroupIndex', 0)
  const activeComponentIndex: number = getStateField('activeComponentIndex', 0)

  const setActiveGroup = (id:number) => setStateField('activeGroupIndex', id)
  const setActiveComponent = (id:number) => setStateField('activeComponentIndex', id)

  comps.forEach((c, i) => {
    const name = c?.name || ''
    const [groupName, childName] = name.split('.') || []
    if (groupName) {
      if (groupName in groups) {
        childName
          ? groups[groupName].push([i, name])
          : groups[groupName].unshift([i, name])
      } else {
        groups[groupName] = [[i, name]]
      }
    }
  })

  const ParentCompList = Object.entries(groups).map(([key, value]) => {
    return [value[0][0], key]
  })

  const childrenCompList = Object.values(groups).reduce((p, c) => {
    if (c[0][0] === activeGroupIndex) {
      // console.log("reduce", p, c)
      return [...c]
    }
    return p
  }, [])
  // .filter(x => x[0] && x[0][0] === activeGroupIndex)

  // console.log({childrenCompList, groups, ParentCompList})

  return (
    <>
      <div>
        {ParentCompList.map(([index, name], i) => <Button active={index === activeGroupIndex} onClick={() => setActiveGroup(+index)} key={`grouplist-${name}`} color="teal">{name} ({index})</Button>)}
      </div>
      <div>
        {childrenCompList.map(([index, name], i) => <Button active={index === activeComponentIndex} onClick={() => setActiveComponent(+index)} key={`complist-${name}`} color="blue">{name} {index}</Button>)}
      </div>

    </>
  )
}

function SaveButton () {
  const { getStateField } = useSubscribedState()

  const handleSubmit = () => {
    const components = getStateField('components')

    fetch(`${window.location.origin}/api/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(components)
    })
      .then(console.log)
      .catch(console.error)
  }
  return (
    <button type="button" onClick={handleSubmit}>Save</button>
  )
}

function StyleJson () {
  const { stateRef } = useSubscribedState(k => {
    console.log('StyleJson', k)
    return true// k.includes("components")
  })

  const { components } = stateRef.current

  const str = JSON.stringify(components, null, 2)

  return (
    <>
      <textarea className="min-w-full" rows={4} defaultValue={str} />
    </>
  )
}

function ClassNameSuggestion () {
  const { setStateField } = useSubscribedState()
  useEffect(() => {
    fetch('/api/suggestion')
      .then(res => res.json())
      .then(classNames => setStateField('classNames', classNames))
  }, [])

  const filterClassNames = (text: string, classNames: string[]) => {
    const matchStart: string[] = []
    const matchBody: string[] = []
    let result: string[] = []

    if (text) {
      classNames.forEach(o => {
        if (o.indexOf(text) === 0) {
          matchStart.push(o)
        } else if (o.includes(text)) {
          matchBody.push(o)
        }
      })
      result = Array.from(new Set([...matchStart, ...matchBody])).slice(0, 12)
    }

    return result
  }

  return (
    <S fields={['classNames', 'suggestion_search']} delay={500}>
      {({ getStateField }) => {
        const classNames: string[] = getStateField('classNames', [])
        const text: string = getStateField('suggestion_search', '')

        console.log({ text })
        // if (suggestion.length === 0) return null
        return <datalist id='suggest_classnames'>{filterClassNames(text, classNames).map(o => <option key={o}>{o}</option>)}</datalist>
      }}
    </S>
  )
}

interface Data {
  classes: string[]
  components: any[]
  elements: string[]
}

export default function Form ({ data }: {data: Data}) {
  const { classes = [], components = [], elements = [] } = data

  const initialState = {
    classes,
    components,
    elements
  }
  return (
    <Provider initialState={initialState}>
      <Main />
      <StyleJson />
      <ClassNameSuggestion />
    </Provider>
  )
}
