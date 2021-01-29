import { getConfigObject } from 'semantic-tailwind-core'
import { defaultElements } from '../elements'
import { Config } from '../types'

export const defaultConfig = {
  componentFile: 'semantic-tailwind.components.json',
  outDir: './src/semantic-tailwind',
  _elements: { ...defaultElements }
}

export function getConfig (): Config {
  return getConfigObject(defaultConfig)
}
