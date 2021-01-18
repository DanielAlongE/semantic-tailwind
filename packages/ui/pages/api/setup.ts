import { NextApiRequest, NextApiResponse } from 'next'
import { componentObjectToArray } from 'semantic-tailwind-core'
import { generateClassNameCache } from '../../lib/cache-handler'
import { getConfig } from '../../lib/config-handler'

function getSetupObject () {
  const { components: _comps = {}, elements } = getConfig()
  const components = componentObjectToArray(_comps)
  // console.log(_comps)
  generateClassNameCache()

  return {
    components,
    elements: Object.keys(elements)
  }
}

export default function setup (req: NextApiRequest, res: NextApiResponse) {
  return res.json(getSetupObject())
}
