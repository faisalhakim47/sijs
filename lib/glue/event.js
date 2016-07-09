"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var emitter_1 = require('../observer/emitter');
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
var EventGlue = (function (_super) {
    __extends(EventGlue, _super);
    function EventGlue(id, name, eventFn) {
        _super.call(this);
        this.id = id;
        this.name = name;
        this.eventFn = eventFn;
    }
    EventGlue.prototype.install = function () {
        watchEvent(this.id, this.name, this.eventFn);
    };
    EventGlue.prototype.destroy = function () {
        unwatchEvent(this.id, this.name, this.eventFn);
    };
    EventGlue.context = null;
    return EventGlue;
}(glue_1.Glue));
exports.EventGlue = EventGlue;
//# sourceMappingURL=event.js.map