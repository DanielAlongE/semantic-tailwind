import * as fs from "fs";

export function read(filePath: string){
  return fs.readFileSync(filePath)
}

export function write(){

}