import { requireNoCache } from 'semantic-tailwind-core'
import { getClassNameArray, writeFile } from './index'

export function generateClassNameCache () {
  const classNames = getClassNameArray()

  writeFile('.semantic-tailwind.classes.json', JSON.stringify(classNames, null, 2))
  return classNames
}

export function fetchClassNames () {
  let classNames
  try {
    classNames = requireNoCache('.semantic-tailwind.classes.json')
  } catch (error) {
    classNames = generateClassNameCache()
  }

  return classNames as string[]
}
