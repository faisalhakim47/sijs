"use strict";
const emitter_1 = require('./emitter');
const object_1 = require('../tools/object');
class Observable {
    constructor(baseData = { _dummy: null }, basePath = '_dummy', id) {
        this.baseData = baseData;
        this.basePath = basePath;
        this.id = id;
        this.childWatcher = {};
        this.childArray = {};
        this.childNum = {};
        this.rawData = object_1.get(baseData, basePath);
        if (this.rawData.undefined) {
            throw new Error('cannot create on undefined path');
        }
        if (!id) {
            this.id = genId();
        }
        this.EE = new emitter_1.Emitter();
    }
    get(path) {
        path = path;
        return new ObsGetter(this.id, this.rawData, path, this.EE, this.get, this.childWatcher);
    }
    set(path, value) {
        if (!path) {
            object_1.set(this.baseData, this.basePath, value);
            this.rawData = object_1.get(this.baseData, this.basePath);
            return;
        }
        if (object_1.get(this.rawData, path) === value)
            return;
        if (object_1.set(this.rawData, path, value)) {
            this.EE.emit(path, value);
        }
    }
    filter(path, filterFn) {
        const obs = this.get(path);
        const val = obs.val;
        if (filterFn instanceof String) {
            obs.val = () => exports.Filters[filterFn](val());
            return obs;
        }
        else if (filterFn instanceof Function) {
            obs.val = () => filterFn(val());
            return obs;
        }
    }
    watch(watcher) {
        this.EE.on(null, watcher);
        let i = 0;
        Object.keys(this.EE.watchers).forEach((listedPath) => {
            if (listedPath.indexOf(null) === 0 && null !== listedPath) {
                const name = listedPath + null + i++;
                this.childWatcher[name] = () => {
                    this.EE.emit(listedPath, object_1.get(this.rawData, listedPath));
                };
                this.EE.on(null, this.childWatcher[name]);
            }
        });
    }
    unwatch(watcher) {
        this.EE.off(null, watcher);
        let i = 0;
        Object.keys(this.EE.watchers).forEach((listedPath) => {
            if (listedPath.indexOf(null) === 0 && 'null' !== listedPath) {
                this.EE.off(null, this.childWatcher[listedPath + null + i++]);
            }
        });
    }
}
exports.Observable = Observable;
class ObsGetter {
    constructor(id, rawData, path, EE, getter, childWatcher) {
        this.id = id;
        this.rawData = rawData;
        this.path = path;
        this.EE = EE;
        this.getter = getter;
        this.childWatcher = childWatcher;
    }
    get(childPath) {
        return this.getter(this.path + childPath);
    }
    raw() {
        let ret = object_1.get(this.rawData, this.path);
        if (ret.undefined)
            ret = undefined;
        return ret;
    }
    val() {
        return Object.freeze(this.raw());
    }
    set(value) {
        if (object_1.get(this.rawData, this.path) === value)
            return;
        if (object_1.set(this.rawData, this.path, value)) {
            this.EE.emit(this.path, value);
        }
    }
    watch(watcher) {
        this.EE.on(this.path, watcher);
        let i = 0;
        Object.keys(this.EE.watchers).forEach((listedPath) => {
            if (listedPath.indexOf(this.path) === 0 && this.path !== listedPath) {
                const name = listedPath + this.path + i++;
                this.childWatcher[name] = () => {
                    this.EE.emit(listedPath, object_1.get(this.rawData, listedPath));
                };
                this.EE.on(this.path, this.childWatcher[name]);
            }
        });
    }
    unwatch(watcher) {
        this.EE.off(this.path, watcher);
        let i = 0;
        Object.keys(this.EE.watchers).forEach((listedPath) => {
            if (listedPath.indexOf(this.path) === 0 && this.path !== listedPath) {
                this.EE.off(this.path, this.childWatcher[listedPath + this.path + i++]);
            }
        });
    }
}
exports.ObsGetter = ObsGetter;
exports.Filters = {};
function registerFilter(name, filterFn) {
    exports.Filters[name] = filterFn;
}
exports.registerFilter = registerFilter;
let idCound = 0;
function genId() {
    return 'Obs_' + idCound++;
}
//# sourceMappingURL=observable.js.map