import * as fs from 'fs'

export function read (filePath: string): string {
  try {
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return ''
  }
}

export function write (filePath: string, data: string) {
  try {
    fs.writeFileSync(filePath, data)
    return true
  } catch (error) {
    return false
  }
}

export function stringToJson<T> (str: string, _default:unknown = {}) {
  try {
    return <T>JSON.parse(str)
  } catch (error) {
    console.error(error)
    return <T>_default
  }
}

export function jsonToString (json: unknown, _default = '{}') {
  try {
    return JSON.stringify(json, null, 2)
  } catch (error) {
    console.error(error)
    return _default
  }
}

export function mkdir (path:string) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      return resolve(true)
    }

    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        console.error(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject(false)
      }
      return resolve(true)
    })
  })
}
