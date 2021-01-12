export function resolveFilePath (filePath: string): string {
  const path = require('path')
  try {
    return require.resolve(filePath)
  } catch (error) {
    return path.resolve(filePath)
  }
}

export function removeFileFromRequireCache (filePath: string) {
  if (filePath in require.cache) delete require.cache[filePath]
}

export const requireNoCache = function (_filePath: string) {
  const filePath = resolveFilePath(_filePath)
  removeFileFromRequireCache(filePath)
  return require(filePath)
}
