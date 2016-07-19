export function isString(str): str is string {
  return typeof str === 'string' ||
    str.constructor === String ||
    str instanceof String
}

export function isBoolean(bln): bln is string {
  return typeof bln === 'boolean' ||
    bln.constructor === Boolean ||
    bln instanceof Boolean
}

export function isObject(obj): obj is string {
  return typeof obj === 'object' && !Array.isArray(obj)
}
