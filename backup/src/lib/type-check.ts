export function isString(str:unknown): boolean {
    return typeof str == "string";
}

export function isObject(obj:unknown): boolean {
    return (obj instanceof Object)
  }

export const isBoolean = (val: unknown) => 'boolean' === typeof val;

export const isNumeric = (val: unknown) => new RegExp(/^\d+\.{0,1}\d*$/).test(val as string)