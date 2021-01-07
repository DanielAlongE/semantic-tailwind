import * as path from 'path'
import { getConfigObject } from 'semantic-tailwind-core'
import generate from './generate'

export default function build (output?:string) {
  const configObj = getConfigObject()

  const _outDir = output || configObj.outDir

  if (!_outDir) {
    throw new Error('No outDir supplied')
  }

  const resolvedPath = path.resolve(process.cwd(), _outDir)

  generate(configObj, resolvedPath)
    .then(() => console.log('Done'))
    .catch(() => console.log('Oops an error occured!'))

  // console.log(module.filename, output, resolvedPath)
}
