import { NextApiRequest, NextApiResponse } from 'next'
import { fetchClassNames } from '../../lib/cache-handler'

// const filterMatch = (text: string, classNames: string[]) => {
//   const matchStart: string[] = []
//   const matchBody: string[] = []

//   if (text) {
//     classNames.forEach(o => {
//       if (o.indexOf(text) === 0) {
//         matchStart.push(o)
//       } else if (o.includes(text)) {
//         matchBody.push(o)
//       }
//     })
//   }

//   return Array.from(new Set([...matchStart, ...matchBody])).slice(0, 12)
// }

export default function suggestion (req: NextApiRequest, res: NextApiResponse) {
  let result: string[] = []
  result = fetchClassNames()

  return res.json(result)
}
