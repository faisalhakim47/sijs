"use strict";
class Emitter {
    constructor() {
        this.watchers = {};
    }
    on(name, watcher) {
        const watchers = this.watchers[name]
            ? this.watchers[name]
            : (this.watchers[name] = []);
        watcher.wi = watchers.push(watcher) - 1;
    }
    off(name, watcher) {
        if (!watcher) {
            console.trace(name, watcher);
        }
        const watchers = this.watchers[name];
        if (!Array.isArray(watchers))
            return;
        if (typeof watcher.wi === 'number') {
            watchers.splice(watcher.wi, 1);
        }
        else {
            console.warn(watcher, 'does not contain watcher index (wi)');
        }
    }
    emit(name, ...data) {
        const watchers = this.watchers[name];
        if (!watchers)
            return;
        let l = watchers.length;
        while (l--) {
            watchers[l](...data);
        }
    }
}
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map