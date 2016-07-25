const ampRx = /&/g
const ltRx = /</g
const aposRx = /\'/g
const quotRx = /\"/g
const harmCharsRx = /[&<\"\']/

export function escape(str): string {
  if (str == null) return ''
  if (typeof str !== 'string') str = str.toString()
  if (harmCharsRx.test(str)) {
    return str
      .replace(ampRx, '&amp;')
      .replace(ltRx, '&lt;')
      .replace(aposRx, '&apos;')
      .replace(quotRx, '&quot;')
  } else {
    return str
  }
}

export function camelToSnake(str: string): string {
  return str.replace(/\.?[A-Z]+/g, (x, y) => {
    return "-" + y.toLowerCase()
  }).replace(/^-/, '')
}
