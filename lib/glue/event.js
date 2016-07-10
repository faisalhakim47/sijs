"use strict";
const glue_1 = require('./glue');
const emitter_1 = require('../observer/emitter');
exports.eventBus = new emitter_1.Emitter();
window['_EBE'] = exports.eventBus.emit;
function watchEvent(id, name, eventFn) {
    return exports.eventBus.on(id + ':' + name, eventFn);
}
exports.watchEvent = watchEvent;
function unwatchEvent(id, name, eventFn) {
    return exports.eventBus.off(id + ':' + name, eventFn);
}
exports.unwatchEvent = unwatchEvent;
class EventGlue extends glue_1.Glue {
    constructor(id, name, eventFn) {
        super();
        this.id = id;
        this.name = name;
        this.eventFn = eventFn;
    }
    install() {
        watchEvent(this.id, this.name, this.eventFn);
    }
    destroy() {
        unwatchEvent(this.id, this.name, this.eventFn);
    }
}
EventGlue.context = null;
exports.EventGlue = EventGlue;
//# sourceMappingURL=event.js.map