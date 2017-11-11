export class List {
  constructor() {
    this.keys = []
    this.values = []
  }

  set(key, value) {
    this.keys.push(key)
    this.values.push(value)
  }

  get(key) {
    return this.values[this.keys.indexOf(key)]
  }

  remove(key) {
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
    this.values.splice(index, 1)
  }
}
