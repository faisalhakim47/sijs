"use strict";
var status_1 = require('./status');
var emitter_1 = require('../observer/emitter');
exports.GlobalEvent = new emitter_1.Emitter();
if (status_1.is.browser) {
    var addEvent = function (name, eventFn) {
        window.addEventListener(name, eventFn);
    };
    addEvent('popstate', function (e) {
        exports.GlobalEvent.emit('browser:popstate', e);
    });
    addEvent('online', function (e) {
        exports.GlobalEvent.emit('browser:online', e);
    });
    addEvent('offline', function (e) {
        exports.GlobalEvent.emit('browser:offline', e);
    });
}
//# sourceMappingURL=global-event.js.map