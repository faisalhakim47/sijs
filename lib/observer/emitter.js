"use strict";
var Emitter = (function () {
    function Emitter() {
        this.watchers = {};
    }
    Emitter.prototype.on = function (name, watcher) {
        var watchers = this.watchers[name]
            ? this.watchers[name]
            : (this.watchers[name] = []);
        watcher.wi = watchers.push(watcher) - 1;
    };
    Emitter.prototype.off = function (name, watcher) {
        if (!watcher) {
            console.trace(name, watcher);
        }
        var watchers = this.watchers[name];
        if (!Array.isArray(watchers))
            return;
        if (typeof watcher.wi === 'number') {
            watchers.splice(watcher.wi, 1);
        }
        else {
            console.warn(watcher, 'does not contain watcher index (wi)');
        }
    };
    Emitter.prototype.emit = function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var watchers = this.watchers[name];
        if (!watchers)
            return;
        var l = watchers.length;
        while (l--) {
            watchers[l].apply(watchers, data);
        }
    };
    return Emitter;
}());
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map