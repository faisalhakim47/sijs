/**
 * @template Key, Val
 */
export class List {
  constructor() {
    /** @type {Key[]} */
    this.keys = []
    /** @type {Val[]} */
    this.values = []
  }

  /**
   * @param {Key} key 
   * @param {Val} value 
   */
  set(key, value) {
    this.keys.push(key)
    this.values.push(value)
  }

  /**
   * @param {Key} key 
   */
  get(key) {
    return this.values[this.keys.indexOf(key)]
  }

  /**
   * @param {Key} key 
   */
  has(key) {
    return this.keys.indexOf(key) !== -1
  }

  /**
   * @param {(val: Val, key: Key) => Boolean} findFn 
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
   * @param {Key} key 
   */
  remove(key) {
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.values.splice(index, 1)
  }
}
