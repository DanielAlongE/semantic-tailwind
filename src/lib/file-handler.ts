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