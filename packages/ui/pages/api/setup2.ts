import { NextApiRequest, NextApiResponse } from 'next'
// import { readFile } from '../../lib'
// import { componentObjectToArray } from 'semantic-tailwind-core'
// import { generateClassNameCache } from '../../lib/cache-handler'
import { getConfig } from '../../lib/config-handler'

// function getSetupObject () {
//   const { components: _comps = {} } = getConfig()
//   const components = componentObjectToArray(_comps)
//   // console.log(_comps)
//   generateClassNameCache()

//   return {
//     components
//   }
// }

export default function setup (req: NextApiRequest, res: NextApiResponse) {
  const currDate = new Date().toString()
  const config = getConfig()
  const components = config.components

  const str = ('semantic-tailwind.components.json')

  return res.json([components, currDate, str])
}
