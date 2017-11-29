/**
 * @template K, V
 */
export class List {
  constructor() {
    /** @type {K[]} */
    this.keys = []
    /** @type {V[]} */
    this.values = []
  }

  /**
   * @param {K} key 
   * @param {V} value 
   */
  set(key, value) {
    this.keys.push(key)
    this.values.push(value)
  }

  /**
   * @param {K} key 
   */
  get(key) {
    return this.values[this.keys.indexOf(key)]
  }

  /**
   * @param {(value: V, key: K) => Boolean} findFn 
   */
  find(findFn) {
    const { keys, values } = this
    const length = keys.length
    for (let index = 0; index < length; index++) {
      if (findFn(values[index], keys[index]))
        return values[index]
    }
  }

  /**
   * @param {K} key 
   */
  remove(key) {
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.values.splice(index, 1)
  }
}
