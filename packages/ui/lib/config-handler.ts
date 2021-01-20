import { getConfigObject } from 'semantic-tailwind-core'

const defaultConfig = {
  componentFile: './semantic-tailwind.components.json',
  outDir: './src/semantic-tailwind',
  css: ['css/style.css']
}

interface Config {
  componentFile: string
  outDir: string
  css: string[]
}

export function getConfig (): Config {
  return getConfigObject(defaultConfig)
}
