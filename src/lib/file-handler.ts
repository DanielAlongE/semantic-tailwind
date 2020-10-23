import * as fs from "fs";

export function read(filePath: string): string {
  try {
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return ""
  }
  
}

export function write(){

}