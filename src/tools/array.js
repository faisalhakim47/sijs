/**
 * @param {Array} array1 
 * @param {Array} array2 
 */
export function equalArray(array1, array2) {
  const length = array1.length
  if (length !== array2.length) return false
  for (let index = 0; index < length; index++)
    if (array1[index] !== array2[index])
      return false
  return true
}
