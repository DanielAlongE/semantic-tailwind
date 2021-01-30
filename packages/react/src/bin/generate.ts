/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable for-direction */
import { isObject, isString, isNumeric, templateMaker, componentObjectToArray } from 'semantic-tailwind-core'
import { fileHandler } from 'semantic-tailwind-cli'
import { ComponentData } from 'semantic-tailwind-core/src/types'
import * as path from 'path'
import { getComponentInterface } from '../lib/component-interface'

function isDefaultComp (c:string) {
  return c && c.indexOf('.') === -1
}

function directiveToTypes (comp: ComponentData) {
  // let result = ''

  const directives = comp.directives || {}

  const objKeyToType = (obj: Record<string, unknown>) => {
    let keyList: Array<string | number> = Object.keys(obj)
    const isAllNumbers = keyList.every(x => isNumeric(x))

    keyList = keyList.map(k => {
      return ['number', 'string', 'boolean'].includes(k as string) || isAllNumbers ? k : `'${k}'`
    })

    return keyList.join(' | ') // + '\n'
  }

  return Object.entries(directives).map(([directive, value]) => {
    let result = `${directive}?: `
    if (Array.isArray(value) || isString(value)) {
      result += 'boolean' // \n
    } else if (isObject(value)) {
      result += objKeyToType(<Record<string, unknown>>value)
    } else {
      result += 'any'
    }

    return result
  }).join('\n')
}

function generateComponentFile (groupName: string, components: ComponentData[]) {
  const t = templateMaker()
  let tab = 0

  // [name, flatName, type]
  const compProperties: [string, string, string][] = []

  t.addImport('semantic-tailwind-react').named(['ComponentFactory', 'getConfig'])

  t.addLine('')
  t.addLine('const configObj = getConfig()')

  for (let i = components.length - 1; i >= 0; i -= 1) {
    const c = components[i]
    const { name = '', as = '' } = c
    const isDefault = isDefaultComp(name)

    console.log(i, name, isDefault)

    const [interfaceName, interfacePath] = getComponentInterface(as)

    t.addImport('react').default('React')
    t.addImport(interfacePath).named([interfaceName])

    const flatName = name.replace('.', '')
    const propInterface = flatName + 'Props'

    t.addLine('')

    t.addLine(`interface ${propInterface} extends ${interfaceName}<unknown> {`, tab)
    const _d = directiveToTypes(c)
    tab += 1
    _d && t.addMultiLine(_d, tab)
    c.forwardRef && t.addLine('ref?: unknown', tab)
    t.addLine('as?: React.FC<any> | string', tab)
    t.addLine('[key: string]: any', tab)
    t.addLine('}', tab -= 1)

    if (!isDefault) {
      compProperties.push([name, flatName, propInterface])
      t.addLine(`\n// ${flatName} Comp comes here --`)
      t.addLine(`const ${flatName} = ComponentFactory(${fileHandler.jsonToString(c)}, configObj) as React.FC<${propInterface}>`)
    }

    // root component expected to be on index 0
    if (i === 0) {
      if (isDefault) {
        t.addLine('')
        t.addLine(`interface ${groupName}Component extends React.FC<${propInterface}> {`, tab)
        compProperties.forEach(([dottedName, , compInterface]) => {
          const [, childName] = dottedName.split('.')
          childName && t.addLine(`${childName}: React.FC<${compInterface}>`, tab + 1)
        })
        t.addLine('}', tab)

        t.addLine('')
        t.addLine('// eslint-disable-next-line @typescript-eslint/no-explicit-any')
        t.addLine(`const ${groupName}:any = ComponentFactory(${fileHandler.jsonToString(c)}, configObj)`)
      } else {
        t.addLine('')
        t.addLine(`interface ${groupName}Component {`, tab)

        compProperties.forEach(([dottedName, , compInterface]) => {
          const [, childName] = dottedName.split('.')
          childName && t.addLine(`${childName}: React.FC<${compInterface}>`, tab + 1)
        })

        t.addLine('}', tab)

        t.addLine('')
        t.addLine('// eslint-disable-next-line @typescript-eslint/no-explicit-any')
        t.addLine(`const ${groupName}:any = {}`)
      }

      t.addLine('')
      compProperties.forEach(([dottedName, compPropName]) => {
        t.addLine(`${dottedName} = ${compPropName}`)
      })

      // export component group
      t.addLine('')
      t.addLine(`export default ${groupName} as ${groupName}Component`)
    }
  }

  return t.toString()
}

export default async function generate (configObject: any, outDir:string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { components = {}, outDir: o = 'components' } = configObject
  const _outDir = path.resolve(process.cwd(), outDir || o)

  if (!_outDir) {
    return Promise.reject('outDir not supplied')
  }

  console.log(`outDir: ${_outDir}`)

  const isDir = await fileHandler.mkdir(_outDir)

  if (!isDir) {
    return Promise.reject('could not create outDir')
  }

  return new Promise((resolve, reject) => {
    const o = Object.entries(components).map(([groupName, compObj]: [string, any]) => {
      const comps = componentObjectToArray({ [groupName]: compObj })
      const result = generateComponentFile(groupName, comps)
      return fileHandler.write(path.join(_outDir, `${groupName}.ts`), result)
    })

    if (o.every(x => x === true)) {
      resolve('Successful')
    }

    reject('An error occured')
  })
}
