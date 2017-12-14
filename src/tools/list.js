"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor() {
        this.keys = [];
        this.values = [];
    }
    set(key, value) {
        this.keys.push(key);
        this.values.push(value);
    }
    get(key) {
        return this.values[this.keys.indexOf(key)];
    }
    has(key) {
        return this.keys.indexOf(key) !== -1;
    }
    find(findFn) {
        const { keys, values } = this;
        const length = keys.length;
        for (let index = 0; index < length; index++) {
            if (findFn(values[index], keys[index]))
                return values[index];
        }
    }
    remove(key) {
        const index = this.keys.indexOf(key);
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }
}
exports.List = List;
