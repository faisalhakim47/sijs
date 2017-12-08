export class List<Key, Val> {
  keys: Key[] = []
  values: Val[] = []

  set(key: Key, value: Val) {
    this.keys.push(key)
    this.values.push(value)
  }

  get(key: Key) {
    return this.values[this.keys.indexOf(key)]
  }

  has(key: Key) {
    return this.keys.indexOf(key) !== -1
  }

  find(findFn: (val: Val, key: Key) => Boolean) {
    const { keys, values } = this
    const length = keys.length
    for (let index = 0; index < length; index++) {
      if (findFn(values[index], keys[index]))
        return values[index]
    }
  }

  remove(key: Key) {
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.values.splice(index, 1)
  }
}
