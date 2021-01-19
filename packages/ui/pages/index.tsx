/* eslint-disable no-use-before-define */
import { DocumentContext } from 'next/dist/next-server/lib/utils'
import React from 'react'
import Forms from '../components/Forms'
import { getConfig } from 'semantic-tailwind-react'

function Index ({ data }: any) {
  const configObj = getConfig()
  console.log(configObj)
  return (<Forms data={data} />)
}

Index.getInitialProps = async (ctx: DocumentContext) => {
  let data = {}
  const host = ctx.req?.headers.host
  const time = new Date().getMilliseconds()
  if (host) {
    const url = `http://${host}/api/setup?t=${time}`
    console.log(url)
    const res = await fetch(url)
    data = await res.json()
  }
  // Object.keys(ctx.req?.headers || {})
  // console.log({ data })
  return { data }
}

export default Index
