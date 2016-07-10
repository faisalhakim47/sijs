"use strict";
var emitter_1 = require('./emitter');
var object_1 = require('../tools/object');
var Observable = (function () {
    function Observable(baseData, basePath, id) {
        if (baseData === void 0) { baseData = { _dummy: null }; }
        if (basePath === void 0) { basePath = '_dummy'; }
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
    Observable.prototype.get = function (path) {
        path = path;
        return new ObsGetter(this.id, this.rawData, path, this.EE, this.get, this.childWatcher);
    };
    Observable.prototype.set = function (path, value) {
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
    };
    Observable.prototype.filter = function (path, filterFn) {
        var obs = this.get(path);
        var val = obs.val;
        if (filterFn instanceof String) {
            obs.val = function () { return exports.Filters[filterFn](val()); };
            return obs;
        }
        else if (filterFn instanceof Function) {
            obs.val = function () { return filterFn(val()); };
            return obs;
        }
    };
    Observable.prototype.watch = function (watcher) {
        var _this = this;
        this.EE.on(null, watcher);
        var i = 0;
        Object.keys(this.EE.watchers).forEach(function (listedPath) {
            if (listedPath.indexOf(null) === 0 && null !== listedPath) {
                var name_1 = listedPath + null + i++;
                _this.childWatcher[name_1] = function () {
                    _this.EE.emit(listedPath, object_1.get(_this.rawData, listedPath));
                };
                _this.EE.on(null, _this.childWatcher[name_1]);
            }
        });
    };
    Observable.prototype.unwatch = function (watcher) {
        var _this = this;
        this.EE.off(null, watcher);
        var i = 0;
        Object.keys(this.EE.watchers).forEach(function (listedPath) {
            if (listedPath.indexOf(null) === 0 && 'null' !== listedPath) {
                _this.EE.off(null, _this.childWatcher[listedPath + null + i++]);
            }
        });
    };
    return Observable;
}());
exports.Observable = Observable;
var ObsGetter = (function () {
    function ObsGetter(id, rawData, path, EE, getter, childWatcher) {
        this.id = id;
        this.rawData = rawData;
        this.path = path;
        this.EE = EE;
        this.getter = getter;
        this.childWatcher = childWatcher;
    }
    ObsGetter.prototype.get = function (childPath) {
        return this.getter(this.path + childPath);
    };
    ObsGetter.prototype.raw = function () {
        var ret = object_1.get(this.rawData, this.path);
        if (ret.undefined)
            ret = undefined;
        return ret;
    };
    ObsGetter.prototype.val = function () {
        return Object.freeze(this.raw());
    };
    ObsGetter.prototype.set = function (value) {
        console.trace('set test', this);
        if (object_1.get(this.rawData, this.path) === value)
            return;
        console.log('set pass', object_1.get(this.rawData, this.path), value);
        if (object_1.set(this.rawData, this.path, value)) {
            console.log('set ok', object_1.get(this.rawData, this.path), 'emit...');
            this.EE.emit(this.path, value);
        }
        else {
            console.log('cannot set', this.rawData, 'on path', this.path, 'with', value);
        }
    };
    ObsGetter.prototype.watch = function (watcher) {
        var _this = this;
        this.EE.on(this.path, watcher);
        var i = 0;
        Object.keys(this.EE.watchers).forEach(function (listedPath) {
            if (listedPath.indexOf(_this.path) === 0 && _this.path !== listedPath) {
                var name_2 = listedPath + _this.path + i++;
                _this.childWatcher[name_2] = function () {
                    _this.EE.emit(listedPath, object_1.get(_this.rawData, listedPath));
                };
                _this.EE.on(_this.path, _this.childWatcher[name_2]);
            }
        });
    };
    ObsGetter.prototype.unwatch = function (watcher) {
        var _this = this;
        this.EE.off(this.path, watcher);
        var i = 0;
        Object.keys(this.EE.watchers).forEach(function (listedPath) {
            if (listedPath.indexOf(_this.path) === 0 && _this.path !== listedPath) {
                _this.EE.off(_this.path, _this.childWatcher[listedPath + _this.path + i++]);
            }
        });
    };
    return ObsGetter;
}());
exports.ObsGetter = ObsGetter;
exports.Filters = {};
function registerFilter(name, filterFn) {
    exports.Filters[name] = filterFn;
}
exports.registerFilter = registerFilter;
var idCound = 0;
function genId() {
    return 'Obs_' + idCound++;
}
//# sourceMappingURL=observable.js.map