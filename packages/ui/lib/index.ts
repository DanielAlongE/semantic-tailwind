import { getClasses } from 'semantic-tailwind-core'
import * as fs from 'fs'
import * as path from 'path'
import { getConfig } from './config-handler'

export function readFile (filePath: string): string {
  try {
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return ''
  }
}

export function writeFile (filePath: string, data: string) {
  try {
    fs.writeFileSync(filePath, data)
    return true
  } catch (error) {
    return false
  }
}

function processCssFiles (filePaths: string[]): string[] {
  const result: string[] = []

  filePaths.forEach(fileName => {
    const resolvedPath = path.resolve(process.cwd(), fileName)
    const cssString = readFile(resolvedPath)
    const classArray = getClasses(cssString)
    result.push(...classArray)
  })

  console.log({ filePaths })

  return Array.from(new Set(result))
}

export function getClassNameArray () {
  const { css } = getConfig()

  return processCssFiles(css)
}
