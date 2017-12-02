/**
 * @param {string} path 
 */
export function normalizePath(path) {
  if (path[0] !== '/') path = '/' + path
  if (path[path.length - 1] === '/') path = path.slice(0, -1)
  return path
}
