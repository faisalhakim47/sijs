/**
 * Get object value of given path. example:
 * 
 * ```javascript
 * const obj = { a: { b: 'true' } }
 * const b = get(obj, 'a.b')
 * console.log(obj.a.b === b) // true
 * ```
 */
export function get<T>(obj, path): T {
  if (!path || !obj) return obj

  const parsedPath = pathParse(path)

  let l = parsedPath.length - 1
  for (let i = 0; i < l; i++) {
    obj = obj[parsedPath[i]]
    if (obj === undefined) {
      console.trace('can\'t get object', obj, 'on path', path)
      return undefined
    }
  }

  return obj[parsedPath[l]]
}

/**
 * Set object value of given path. example:
 * 
 * ```javascript
 * const obj = { a: { b: 'true' } }
 * const b = set(obj, 'a.b', 'false')
 * console.log(obj.a.b === 'false') // true
 * ```
 */
export function set(obj, path: string, value) {
  if (!path) return false

  const parsedPath = pathParse(path)

  let l = parsedPath.length - 1
  for (let i = 0; i < l; i++) {
    obj = obj[parsedPath[i]]
    if (!obj) {
      console.warn('can\'t get object', obj, 'on path', path)
      return false
    }
  }

  return obj[parsedPath[l]] = value
}

const pathRx = /\[|\]\./g
export function pathParse(path: string) {
  return path.replace(pathRx, '.').split('.')
}

/*
**  ref: https://stackoverflow.com/questions/5876332/how-can-i-differentiate-between-an-object-literal-other-javascript-objects/5878101#5878101
**  Function to test if an object is a plain object, i.e. is constructed
**  by the built-in Object constructor and inherits directly from Object.prototype
**  or null. Some built-in objects pass the test, e.g. Math which is a plain object
**  and some host or exotic objects may pass also.
**
**  @param {} obj - value to test
**  @returns {Boolean} true if passes tests, false otherwise
*/
export function isPlainObject(obj) {
  // Basic check for Type object that's not null
  if (typeof obj === 'object' && obj !== null) {
    // If Object.getPrototypeOf supported, use it
    if (typeof Object.getPrototypeOf === 'function') {
      var proto = Object.getPrototypeOf(obj)
      return proto === Object.prototype || proto === null
    }

    // Otherwise, use internal class
    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  // Not an object
  return false
}
