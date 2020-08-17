import { type } from "os"

export function isString(str:unknown): boolean {
    return typeof str == "string";
}

export function isObject(obj:unknown): boolean {
    return (obj instanceof Object)
  }