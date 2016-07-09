"use strict";
var emitter_1 = require('./emitter');
var observable_1 = require('./observable');
var compute_1 = require('./compute');
var object_1 = require('../tools/object');
var ObsArray = (function () {
    function ObsArray(baseData, basePath) {
        if (baseData === void 0) { baseData = { _dummy: [] }; }
        if (basePath === void 0) { basePath = '_dummy'; }
        this.baseData = baseData;
        this.basePath = basePath;
        var rawItems = object_1.get(baseData, basePath);
        if (rawItems.undefined) {
            throw new Error('cannot create on undefined path');
        }
        else if (!Array.isArray(this.obsItems)) {
            throw new Error('cannot create on non-Array path');
        }
        this.rawItems = rawItems;
        this.obsItems = this.rawItems.map(function (item, i) {
            return new observable_1.Observable(rawItems, i.toString());
        });
        this.EE = new emitter_1.Emitter();
    }
    ObsArray.prototype.length = function () {
        return this.obsItems.length;
    };
    ObsArray.prototype.get = function (index) {
        return this.obsItems[index];
    };
    ObsArray.prototype.getAll = function () {
        return this.obsItems;
    };
    ObsArray.prototype.val = function () {
        return this.obsItems;
    };
    ObsArray.prototype.set = function (index, value) {
        this.obsItems[index].set(null, value);
    };
    ObsArray.prototype.pop = function () {
        var val = this.rawItems.pop();
        this.obsItems.pop();
        this.EE.emit('remove', {
            index: this.obsItems.length
        });
        this.EE.emit('change');
        return val;
    };
    ObsArray.prototype.push = function (val) {
        var r = this.rawItems.push(val);
        var index = this.rawItems.length - 1;
        val = new observable_1.Observable(this.rawItems, index.toString());
        this.obsItems.push(val);
        this.EE.emit('add', { index: index, val: val });
        this.EE.emit('change');
        return r;
    };
    ObsArray.prototype.shift = function () {
        var val = this.rawItems.shift();
        this.obsItems.shift();
        this.EE.emit('remove', { index: 0 });
        this.EE.emit('change');
        return val;
    };
    ObsArray.prototype.unshift = function (val) {
        var r = this.rawItems.unshift(val);
        val = new observable_1.Observable(this.rawItems, '0');
        this.obsItems.unshift(val);
        this.EE.emit('add', { index: 0, val: val });
        this.EE.emit('change');
        return r;
    };
    ObsArray.prototype.splice = function (start, delCount) {
        var _this = this;
        var vals = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            vals[_i - 2] = arguments[_i];
        }
        var d = (_a = this.rawItems).splice.apply(_a, [start, delCount].concat(vals));
        for (var i = delCount; i--;) {
            this.EE.emit('remove', { index: start + i });
        }
        (_b = this.obsItems).splice.apply(_b, [start, delCount].concat(vals.map(function (val, i) {
            var index = start + i;
            val = new observable_1.Observable(_this.rawItems, index.toString());
            _this.EE.emit('add', { index: index, val: val });
            return val;
        })));
        this.EE.emit('change');
        return d;
        var _a, _b;
    };
    ObsArray.prototype.filter = function (deps, filterFn) {
        var _this = this;
        deps.push(this);
        var obs = compute_1.compute(deps, function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i - 0] = arguments[_i];
            }
            return _this.obsItems.filter(function (item, i) { return filterFn.apply(void 0, [item, i].concat(data)); });
        });
        return obs;
    };
    ObsArray.prototype.watch = function (p1, p2) {
        if (typeof p1 === 'string') {
            this.EE.on(p1, p2);
        }
        else {
            this.EE.on('change', p1);
        }
    };
    ObsArray.prototype.unwatch = function (p1, p2) {
        if (typeof p1 === 'string') {
            this.EE.off(p1, p2);
        }
        else {
            this.EE.off('change', p1);
        }
    };
    return ObsArray;
}());
exports.ObsArray = ObsArray;
//# sourceMappingURL=observable-array.js.map