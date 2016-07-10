"use strict";
const emitter_1 = require('./emitter');
const observable_1 = require('./observable');
const compute_1 = require('./compute');
const object_1 = require('../tools/object');
class ObsArray {
    constructor(baseData = { _dummy: [] }, basePath = '_dummy') {
        this.baseData = baseData;
        this.basePath = basePath;
        const rawItems = object_1.get(baseData, basePath);
        if (rawItems.undefined) {
            throw new Error('cannot create on undefined path');
        }
        else if (!Array.isArray(this.obsItems)) {
            throw new Error('cannot create on non-Array path');
        }
        this.rawItems = rawItems;
        this.obsItems = this.rawItems.map((item, i) => {
            return new observable_1.Observable(rawItems, i.toString());
        });
        this.EE = new emitter_1.Emitter();
    }
    length() {
        return this.obsItems.length;
    }
    get(index) {
        return this.obsItems[index];
    }
    getAll() {
        return this.obsItems;
    }
    val() {
        return this.obsItems;
    }
    set(index, value) {
        this.obsItems[index].set(null, value);
    }
    pop() {
        const val = this.rawItems.pop();
        this.obsItems.pop();
        this.EE.emit('remove', {
            index: this.obsItems.length
        });
        this.EE.emit('change');
        return val;
    }
    push(val) {
        const r = this.rawItems.push(val);
        const index = this.rawItems.length - 1;
        val = new observable_1.Observable(this.rawItems, index.toString());
        this.obsItems.push(val);
        this.EE.emit('add', { index: index, val: val });
        this.EE.emit('change');
        return r;
    }
    shift() {
        const val = this.rawItems.shift();
        this.obsItems.shift();
        this.EE.emit('remove', { index: 0 });
        this.EE.emit('change');
        return val;
    }
    unshift(val) {
        const r = this.rawItems.unshift(val);
        val = new observable_1.Observable(this.rawItems, '0');
        this.obsItems.unshift(val);
        this.EE.emit('add', { index: 0, val: val });
        this.EE.emit('change');
        return r;
    }
    splice(start, delCount, ...vals) {
        const d = this.rawItems.splice(start, delCount, ...vals);
        for (let i = delCount; i--;) {
            this.EE.emit('remove', { index: start + i });
        }
        this.obsItems.splice(start, delCount, ...vals.map((val, i) => {
            const index = start + i;
            val = new observable_1.Observable(this.rawItems, index.toString());
            this.EE.emit('add', { index: index, val: val });
            return val;
        }));
        this.EE.emit('change');
        return d;
    }
    filter(deps, filterFn) {
        deps.push(this);
        const obs = compute_1.compute(deps, (...data) => {
            return this.obsItems.filter((item, i) => filterFn(item, i, ...data));
        });
        return obs;
    }
    watch(p1, p2) {
        if (typeof p1 === 'string') {
            this.EE.on(p1, p2);
        }
        else {
            this.EE.on('change', p1);
        }
    }
    unwatch(p1, p2) {
        if (typeof p1 === 'string') {
            this.EE.off(p1, p2);
        }
        else {
            this.EE.off('change', p1);
        }
    }
}
exports.ObsArray = ObsArray;
//# sourceMappingURL=observable-array.js.map