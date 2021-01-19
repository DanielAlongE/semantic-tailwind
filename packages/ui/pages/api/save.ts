import { NextApiRequest, NextApiResponse } from 'next'
import { getConfig } from '../../lib/config-handler'
import { writeFile } from '../../lib'
import { pathResolver, componentArrayToObject } from 'semantic-tailwind-core'

function handleSave (data: any) {
  const { componentFile } = getConfig()
  const _componentFile = pathResolver(componentFile)

  return writeFile(_componentFile, JSON.stringify(
    componentArrayToObject(data || [])
    , null, 2))
}

export default function save (req: NextApiRequest, res: NextApiResponse) {
  console.log('save', req.method, req.body)

  const result = handleSave(req.body)

  if (result) return res.json({ message: 'file saved successfully!' })

  res.statusCode = 301
  return res.json({ message: 'oops something when wrong!' })
}
