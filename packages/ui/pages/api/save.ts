import { NextApiRequest, NextApiResponse } from 'next'
export default function save (req: NextApiRequest, res: NextApiResponse) {
  // console.log(req)
  // console.log(res)
  console.log(process.cwd())

  let { spawn } = require('child_process')

  // 'node' is an executable command (can be executed without a shell)
  // uses streams to transfer data (spawn.stout)
  spawn = spawn('node', ['sandbox.js'])
  spawn.stdout.on('data', function (msg: any) {
    console.log(msg)
    console.log(msg.toString())
  })

  return res.json({ one: '1', two: 2, three: 3 })
}
