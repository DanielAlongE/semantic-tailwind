import * as fs from "fs";

export function read(filePath: string): string {
  try {
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return ""
  }
  
}

export function write(filePath: string, data: string){
  try {
    fs.writeFileSync(filePath, data);
    return true
  } catch (error) {
    return false
  }
}

export function stringToJson<T>(str: string, _default:unknown = {}){
  try {
    return <T>JSON.parse(str)
  } catch (error) {
    console.error(error)
    return <T>_default
  }
}